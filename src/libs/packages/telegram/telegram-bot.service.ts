import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { userService } from "~/packages/users/user.js";
import { InlineCommands, RegistrationStage } from "./libs/enums/enums.js";
import { type CommonKeyboard, type InlineKeyboard, type RegistrationStageValues } from "./libs/types/types.js";
import { getActualMessageObject } from './libs/helpers/helpers.js';

dotenv.config();

class TelegramBotService {
    private bot: TelegramBot;

    public constructor(){
        this.bot = new TelegramBot(process.env?.['TG_BOT_TOKEN'] ?? '');
        this.bot.on('message', this.messageHandler)
    }

    private async messageHandler(message: TelegramBot.Message) {
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
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

    private async handleUserRegistration(message: TelegramBot.Message){
        const chatId = message.chat.id.toString();
        try{
            const user = await userService.findByChatId(chatId);
            if(!user){
                return null;
            }
            const registrationStage = await userService.getRegistrationStageByUserId(user?.registrationStageId ?? 1);
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
                        }
                    break;
                case RegistrationStage.TYPING_FULL_NAME:
                    if(this.checkIsMessageHasOnlyText(message)){
                        try{

                        }catch(e){
                            
                        }
                    }
            }
        }catch(e){
            
        }
    }

    private async handleStart(chatId: string){
        const user = userService.create(chatId);
        await this.sendActualMessage(chatId);
    }
    
    private async sendActualMessage(chatId: string){
        try{
            const user = await userService.findByChatId(chatId);
            const registrationStage = await userService.getRegistrationStageByUserId(user?.registrationStageId ?? 1);
            const messageObject = await getActualMessageObject(chatId, registrationStage?.name as RegistrationStageValues);
            await this.sendMessage(chatId, 
                messageObject.text, 
                messageObject.options)
        }catch(e){

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