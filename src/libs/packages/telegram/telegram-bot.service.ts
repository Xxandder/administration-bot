import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { userService } from "~/packages/users/user.js";
import { CallbackDataCommands, InlineCommands, RegistrationStage } from "./libs/enums/enums.js";
import { type CommonKeyboard, type InlineKeyboard, type RegistrationStageValues } from "./libs/types/types.js";
import { getActualMessageObject } from './libs/helpers/helpers.js';
import { fullNameSchema } from './libs/validation-schemas/validation-schemas.js';
import { EnterFullName } from './libs/keyboards/keyboards.js';
 
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
            if(!user.isRegistered){
                await this.handleRegistrationCallback(chatId, callbackData);
            }
        }catch(e){
            throw(e);
        }

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
        }
    };

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
                                EnterFullName);
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
            const registrationStage = await userService.getRegistrationStageByUserId(user?.id as number);
            const messageObject = await getActualMessageObject(chatId, registrationStage?.name as RegistrationStageValues);
            await this.sendMessage(chatId, 
                messageObject.text, 
                messageObject.options)
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