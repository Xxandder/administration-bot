import { UserEntity, userService } from "~/packages/users/user.js";
import { TelegramBotService } from "./telegram-bot.service.js"
import TelegramBot from "node-telegram-bot-api";
import { CreatingAppealStage, InlineCommands, RegistrationStage } from "./libs/enums/enums.js";
import { descriptionSchema, fullNameSchema } from "./libs/validation-schemas/validation-schemas.js";
import { ReturnBack } from "./libs/keyboards/keyboards.js";
import { appealService } from "~/packages/appeals/appeals.js";
import { AppealEntity } from "~/packages/appeals/appeal.entity.js";
import { ContentType } from "~/libs/enums/enums.js";
import { MAX_NUMBER_OF_PHOTOS } from "./libs/constants/constants.js";

class MessageHandler{
    private telegramBotService: TelegramBotService

    constructor(telegramBotService: TelegramBotService){
        this.telegramBotService = telegramBotService
    }

    async handleMessage(message: TelegramBot.Message){
        const chatId = message.chat.id.toString();

        try{
            const user = await userService.findByChatId(chatId);

            if(!user){
                console.error('User not found');
                return;
            }

            if(user && !user.isRegistered){
                await this.handleUserRegistration(message, user);
            }
            else if(user && user.isCreatingAppeal){
                await this.handleCreatingAppeal(message, user)
            }
            else{
                await this.telegramBotService.sendActualMessage(chatId);
            }
        }catch(e){
            if(message.text &&
                 message.text === InlineCommands.START && 
                 this.telegramBotService.checkIsMessageHasOnlyText(message)){
                await this.telegramBotService.handleStart(chatId);
            }
        }
    }

    async handleUserRegistration(message: TelegramBot.Message, user: ReturnType<UserEntity['toObject']>){
        try{
            const registrationStage = await userService.getRegistrationStageByUserId(user.id as number);
            switch (registrationStage?.name){
                case RegistrationStage.SENDING_PHONE_NUMBER:
                    if(message.contact &&
                        message.contact.user_id === parseInt(user.chatId)){
                            await userService.updateDetails({
                                id: user.id as number,
                                details: {
                                    phoneNumber: message.contact.phone_number,
                                    fullName: null
                                }
                            })
                            await userService.moveToNextRegistrationStage(user.id);    
                    }
                    break;
                case RegistrationStage.TYPING_FULL_NAME:
                    if(this.telegramBotService.checkIsMessageHasOnlyText(message)){
                        const { error, value } = fullNameSchema.validate(message.text);
                        if(error){
                            await this.telegramBotService.sendMessage(user.chatId, 
                                error.details[0]?.message as string, 
                                ReturnBack);
                        }else{
                            await userService.updateDetails({
                                id: user.id as number,
                                details: {
                                    phoneNumber: null,
                                    fullName: message.text as string
                                }
                            })
                            await userService.moveToNextRegistrationStage(user.id);
                        } 
                    }
                    break;
            }
            await this.telegramBotService.sendActualMessage(user.chatId)
        }catch(e){
            throw e;
        }
    }

    async handleCreatingAppeal(message: TelegramBot.Message, user: ReturnType<UserEntity['toObject']>){
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
            const currentAppeal = await appealService.findNotFinishedByUserId(user?.id as number);
            if(!user){
                return null;
            }
            if(!currentAppeal){
                return null;
            }
            const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user.id as number);
            switch(creatingAppealStage?.name){
                case CreatingAppealStage.ENTER_DESCRIPTION:
                    await this.handleEnteringDescription(message, user, currentAppeal);
                    break;
                case CreatingAppealStage.SEND_PHOTOS:
                    await this.handleSendingPhotos(message, user, currentAppeal)
                    break;
                case CreatingAppealStage.SEND_GEO:
                    await this.handleSendingGeo(message, user, currentAppeal)
                    break;
                default:
                    await this.telegramBotService.sendActualMessage(chatId)
                    break;         
            }
        
        }
        catch(e){
            console.log(e)
            await this.telegramBotService.sendActualMessage(chatId);
        }
    }

    async handleEnteringDescription(message: TelegramBot.Message,
        user: ReturnType<UserEntity['toObject']>,
        currentAppeal: ReturnType<AppealEntity['toObject']>) {
            if (this.telegramBotService.checkIsMessageHasOnlyText(message)) {
                const { error, value } = descriptionSchema.validate(message.text);
                if (error) {
                    await this.telegramBotService.sendMessage(user.chatId, error.details[0]?.message as string, ReturnBack);
                } else {
                    await appealService.updateDescription(currentAppeal.id as number, value);
                    await userService.moveToNextCreatingAppealStage(user.id);
                    await this.telegramBotService.sendActualMessage(user.chatId);
                }
            }
    }

    async handleSendingPhotos(message: TelegramBot.Message,
        user: ReturnType<UserEntity['toObject']>,
        currentAppeal: ReturnType<AppealEntity['toObject']>) {
            if (message.photo) {
                this.telegramBotService.isUserSendingPhotos[user.chatId] = true;
                for (let index = 3; index < message.photo.length; index += 4) {
                    await appealService.addPhotos(currentAppeal?.id as number, [{
                        path: message.photo[index]?.file_id as string,
                        contentType: ContentType.JPEG
                    }]);
                }
                const currentPhotos = await appealService.getPhotosLinks(currentAppeal?.id as number);
                const currentNumberOfPhotos = currentPhotos ? currentPhotos.length : 0;
                if (currentNumberOfPhotos >= MAX_NUMBER_OF_PHOTOS) {
                    this.telegramBotService.isUserSendingPhotos[user.chatId] = false;
                    await userService.moveToNextCreatingAppealStage(user.id);
                    await this.telegramBotService.sendActualMessage(user.chatId);
                }
            }
    }

    async handleSendingGeo(message: TelegramBot.Message,
        user: ReturnType<UserEntity['toObject']>,
        currentAppeal: ReturnType<AppealEntity['toObject']>) {
            if(message.venue){
                const longitude = message.venue?.location.longitude;
                const latitude = message.venue?.location.latitude;
                const address = message.venue?.address;
                  
                    const location = await appealService.updateLocation(currentAppeal?.id as number,
                            {longitude, latitude, address} );
                   
                            await userService.moveToNextCreatingAppealStage(user.id);
                            await this.telegramBotService.sendAppeal(user.chatId, currentAppeal?.id as number);
                    
                }
                if(message.location){
                    const longitude = message.location.longitude
                    const latitude = message.location.latitude;
                 
                    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ru&key=${process.env['GOOLGE_COORDINATES_API_KEY']}`;
                    await fetch(url)
                    .then(async response => {
                        if (!response.ok) {
                            await appealService.updateLocation(currentAppeal?.id as number,
                                {longitude, latitude, address: 'Точка на мапі'} );
                        }
                        return response.json();
                        })
                        .then(async data => {
                            await appealService.updateLocation(currentAppeal?.id as number,
                                {longitude, latitude, address: data.results[0].formatted_address} );
                        })
                        .catch(async error => {
                            await appealService.updateLocation(currentAppeal?.id as number,
                                {longitude, latitude, address: 'Точка на мапі'} );
                        });
                    await userService.moveToNextCreatingAppealStage(user.id);
                   await this.telegramBotService.sendAppeal(user.chatId, currentAppeal?.id as number);
            }
    }


}

export { MessageHandler };