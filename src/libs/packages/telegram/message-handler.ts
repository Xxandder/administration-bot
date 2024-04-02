import { UserEntity, userService } from "~/packages/users/user.js";
import { TelegramBotService } from "./telegram-bot.service.js"
import TelegramBot from "node-telegram-bot-api";
import { InlineCommands, RegistrationStage } from "./libs/enums/enums.js";
import { fullNameSchema } from "./libs/validation-schemas/validation-schemas.js";
import { ReturnBack } from "./libs/keyboards/keyboards.js";

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
        
    }

}

export { MessageHandler };