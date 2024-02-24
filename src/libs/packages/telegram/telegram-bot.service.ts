import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { userService } from "~/packages/users/user.js";
import { CallbackDataCommands, InlineCommands, RegistrationStage, CommonStage, CreatingAppealStage, CreatingAppealStageMessage } from "./libs/enums/enums.js";
import { CreatingAppealStageValues, type CommonKeyboard, type InlineKeyboard, type RegistrationStageValues } from "./libs/types/types.js";
import { getActualRegistrationMessageObject, getActualCommonMessageObject } from './libs/helpers/helpers.js';
import { descriptionSchema, fullNameSchema } from './libs/validation-schemas/validation-schemas.js';
import { ReturnBack, ConfirmPersonalData, ConfirmPhotos } from './libs/keyboards/keyboards.js';
import { getActualCreatingAppealMessageObject } from "./libs/helpers/get-actual-creating-appeal-message.helper.js";
import { appealService } from "~/packages/appeals/appeals.js";
import { MAX_NUMBER_OF_PHOTOS } from "./libs/constants/constants.js";
import { ContentType } from "~/libs/enums/content-type.enum.js";

dotenv.config();

class TelegramBotService {
    private bot: TelegramBot;

    public constructor(){
        this.checkIsMessageHasOnlyText = this.checkIsMessageHasOnlyText.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
        this.handleUserRegistration = this.handleUserRegistration.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.sendActualMessage = this.sendActualMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.callbackHandler = this.callbackHandler.bind(this);
        this.handleCommonCallback = this.handleCommonCallback.bind(this);
        this.handleCreatingAppealCallback = this.handleCreatingAppealCallback.bind(this);

        this.bot = new TelegramBot(process.env?.['TG_BOT_TOKEN'] ?? '', {polling:true});
        this.bot.on('message', this.messageHandler);
        this.bot.on('callback_query', (query)=>this.callbackHandler((query.message?.chat.id as number).toString(),
         query.data as string));
    }

    private async messageHandler(message: TelegramBot.Message) {
        const chatId = message.chat.id.toString();
        let user;
        try{
            user = await userService.findByChatId(chatId);

            if(user && !user.isRegistered){
                await this.handleUserRegistration(message);
            }
            else if(user && user.isCreatingAppeal){
                console.log('message with photo')
                await this.handleCreatingAppeal(message)
            }
            else{
                console.log('registered user')
            }
        }catch(e){
            if(message.text &&
                 message.text === InlineCommands.START && 
                 this.checkIsMessageHasOnlyText(message)){
                await this.handleStart(chatId);
            }
            else{
               
                
            }
        }
    }


    private async callbackHandler(chatId: string, callbackData: string){
        try{
            const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
            else if(!user.isRegistered){
                await this.handleRegistrationCallback(chatId, callbackData);
            }
            else if(user.isCreatingAppeal){
                await this.handleCreatingAppealCallback(chatId, callbackData)
            }
            else{
                await this.handleCommonCallback(chatId, callbackData);
            }
        }catch(e){
            throw(e);
        }

    }

    private async handleCommonCallback(chatId: string, callbackData: string){
        const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
        switch(callbackData){
            case CallbackDataCommands.CREATE_APPEAL:
                await userService.updateIsCreatingAppeal(
                    {id: user.id, isCreatingAppeal: true});
                await appealService.create(user.id);
                await this.sendActualMessage(chatId);
                break;
        }
    }

    private async handleCreatingAppealCallback(chatId: string, callbackData: string){
        const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
        const currentAppeal = await appealService.findNotFinishedByUserId(user.id);
        
        const categoriesCallbackPattern = /^category\/\d+$/;
        if(categoriesCallbackPattern.test(callbackData) && user.creatingAppealStageId === 1){
            const categoryId = parseInt(callbackData.split('/')[1] as string);
            await appealService.updateCategoryId(currentAppeal?.id as number, categoryId);
            await userService.moveToNextCreatingAppealStage(user.id);
        }
        switch(callbackData){
            case CallbackDataCommands.GO_BACK:
                await userService.moveToPreviousCreatingAppealStage(user.id);
                break;
            case CallbackDataCommands.CONFIRM_PHOTOS:
                await userService.moveToNextRegistrationStage(user.id);
                break;
        }
        await this.sendActualMessage(chatId);
    }


    private async handleRegistrationCallback(chatId: string, callbackData: string){
        const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
        switch(callbackData){
            case CallbackDataCommands.GO_BACK:
                await userService.moveToPreviousRegistrationStage(user.id);
                await this.sendActualMessage(chatId);
                break;
            case CallbackDataCommands.CONFIRM_PERSONAL_DATA:
                await userService.moveToNextRegistrationStage(user.id);
                await this.sendActualMessage(chatId);
                break;
        }
    };

    private async handleCreatingAppeal(message: TelegramBot.Message){
    
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
            const currentAppeal = await appealService.findNotFinishedByUserId(user?.id as number);
            if(!user){
                return null;
            }
            const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user.id as number);
            switch(creatingAppealStage?.name){
                case CreatingAppealStage.ENTER_DESCRIPTION:
                    if(this.checkIsMessageHasOnlyText(message)){
                        const { error, value } = descriptionSchema.validate(message.text);
                        if(error){
                            await this.sendMessage(chatId, 
                                error.details[0]?.message as string, 
                                ReturnBack);
                        }else{
                            await appealService.updateDescription(currentAppeal?.id as number, value)
                            await userService.moveToNextCreatingAppealStage(user.id);
                            await this.sendActualMessage(chatId); 
                        }
                    }else{
                          
                    }
                case CreatingAppealStage.SEND_PHOTOS:
                    const currentPhotos = await appealService.getPhotosLinks(currentAppeal?.id as number);
                    const currentNumberOfPhotos = currentPhotos ? currentPhotos.length : 0;
                    // console.log('current number of photos: ', currentNumberOfPhotos);
                    // console.log('message photos length: ', message?.photo?.length)
                    if(message.photo){
                        if(message.photo.length/4 + currentNumberOfPhotos > MAX_NUMBER_OF_PHOTOS){
                            await userService.moveToNextCreatingAppealStage(user.id);
                            await this.sendActualMessage(chatId);  
                        }else{
                            for(let index = 3; index < message.photo.length; index += 4){
                                await appealService.addPhotos(currentAppeal?.id as number, [{
                                    path: message.photo[index]?.file_id as string,
                                    contentType: ContentType.JPEG
                                }]
                                )}
                            }
                            
                            if(message.photo.length/4 + currentNumberOfPhotos >= MAX_NUMBER_OF_PHOTOS*3){
                                await userService.moveToNextCreatingAppealStage(user.id);
                                await this.sendActualMessage(chatId);  
                            }
                            else{
                                await this.sendMessage(chatId, 
                                    'Ви можете надіслати ще фото, або продовжити', 
                                    ConfirmPhotos);
                            }
                        }
                        break;
                    default:
                        await this.sendActualMessage(chatId)
                        break;         
            }
        
        }
            
        catch(e){
            await this.sendActualMessage(chatId);
        }
        
    }   

    private async handleUserRegistration(message: TelegramBot.Message){
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
            const registrationStage = await userService.getRegistrationStageByUserId(user.id as number);
            switch (registrationStage?.name){
                case RegistrationStage.SENDING_PHONE_NUMBER:
                    if(message.contact &&
                        message.contact.user_id === parseInt(chatId)){
                            await userService.updateDetails({
                                id: user.id as number,
                                details: {
                                    phoneNumber: message.contact.phone_number,
                                    fullName: null
                                }
                            })
                            await userService.moveToNextRegistrationStage(user.id);
                            await this.sendActualMessage(chatId);
                    }else{
                        await this.sendActualMessage(chatId);
                    }
                    break;
                case RegistrationStage.TYPING_FULL_NAME:
                    if(this.checkIsMessageHasOnlyText(message)){
                        const { error, value } = fullNameSchema.validate(message.text);
                        if(error){
                            await this.sendMessage(chatId, 
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
                            await this.sendActualMessage(chatId);
                        }
                      
                    }else{
                        await this.sendActualMessage(chatId);
                    }
                    break;
                default:
                    await this.sendActualMessage(chatId)
                    break;
            }
        }catch(e){
            throw e;
        }
    }

    private async handleStart(chatId: string){
        const user = await userService.create(chatId);
        await this.sendActualMessage(chatId);
    }
    
    private async sendActualMessage(chatId: string){
        
        try{
            const user = await userService.findByChatId(chatId);
            if(!user?.isRegistered){
                const registrationStage = await userService.getRegistrationStageByUserId(user?.id as number);
                const messageObject = await getActualRegistrationMessageObject(chatId, registrationStage?.name as RegistrationStageValues);
                
                await this.sendMessage(chatId, messageObject.text, messageObject.options)
            }
            else if(user.isCreatingAppeal){
                const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user?.id as number);
                const messageObject = await getActualCreatingAppealMessageObject(chatId, creatingAppealStage?.name as CreatingAppealStageValues);

                await this.sendMessage(chatId, messageObject.text, messageObject.options)
            }
            else{
                const messageObject = await getActualCommonMessageObject(CommonStage.MAIN_MENU);
                await this.sendMessage(chatId, messageObject.text, messageObject.options)
            }
            
        }catch(e){
            throw e;
        }
    }

    private async sendMessage(chatId: string, text: string, keyboard?: InlineKeyboard | CommonKeyboard) {
        
        this.bot.sendMessage(parseInt(chatId), text, keyboard);
    }

    private checkIsMessageHasOnlyText(message: TelegramBot.Message){
        const text = message.text;
        return text && !message.photo &&
            !message.audio && 
            !message.document && 
            !message.sticker && 
            !message.video && 
            !message.voice && 
            !message.video_note && 
            !message.contact && 
            !message.location && 
            !message.venue && 
            !message.new_chat_members && 
            !message.left_chat_member && 
            !message.new_chat_title && 
            !message.new_chat_photo && 
            !message.delete_chat_photo && 
            !message.group_chat_created && 
            !message.supergroup_chat_created && 
            !message.channel_chat_created && 
            !message.migrate_to_chat_id && 
            !message.migrate_from_chat_id && 
            !message.pinned_message && 
            !message.invoice && 
            !message.successful_payment
    }

}

export { TelegramBotService }