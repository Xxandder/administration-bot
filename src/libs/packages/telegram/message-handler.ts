import { UserEntity, userService } from "~/packages/users/user.js";
import { TelegramBotService } from "./telegram-bot.service.js"
import TelegramBot from "node-telegram-bot-api";
import { InlineCommands } from "./libs/enums/enums.js";

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

    }

    async handleCreatingAppeal(message: TelegramBot.Message, user: ReturnType<UserEntity['toObject']>){
        
    }

}

export { MessageHandler };