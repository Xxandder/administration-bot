import { TelegramBotService } from "./telegram-bot.service.js"
import TelegramBot from "node-telegram-bot-api"
import { UserEntity } from "~/packages/users/user.entity.js"
import { userService } from "~/packages/users/user.js"
import { CallbackDataCommands, CommonTextMessages } from "./libs/enums/enums.js"

class CallbackHandler{
    private telegramBotService: TelegramBotService

    constructor(telegramBotService: TelegramBotService){
        this.telegramBotService = telegramBotService
    }

    async handleCallbackQuery(query: TelegramBot.CallbackQuery){
        try{
            const chatId = query.message?.chat.id.toString();

            if (!chatId) {
                console.error('Invalid chat ID.');
                return;
            }
            const user = await userService.findByChatId(chatId);

            if (!user) {
                console.error('User not found.');
                return;
            }

            const callbackData = query.data;

            if (!callbackData) {
                console.error('Invalid callback data.');
                return;
            }

            if (!user.isRegistered) {
                await this.handleRegistrationCallback(callbackData, user);
            } else if (user.isCreatingAppeal) {
                await this.handleCreatingAppealCallback(callbackData, user);
            } else {
                await this.handleCommonCallback(callbackData, user);
            }

        }catch (error) {
            console.error('Error handling callback query:', error);
            throw error;
        }
    }

    async handleRegistrationCallback(callbackData: string, user: ReturnType<UserEntity['toObject']>){
        try {
            switch (callbackData) {
                case CallbackDataCommands.GO_BACK:
                    await userService.moveToPreviousRegistrationStage(user.id);
                    break;
                case CallbackDataCommands.CONFIRM_PERSONAL_DATA:
                    await userService.moveToNextRegistrationStage(user.id);
                    await this.telegramBotService.sendMessage(user.chatId, CommonTextMessages.FINAL_REGISTRATION)
                    break;
                default:
                    console.error('Invalid registration callback.');
                    break;
            }

            await this.telegramBotService.sendActualMessage(user.chatId);
        } catch (error) {
            console.error('Error handling registration callback:', error);
            throw error;
        }
    }

    async handleCreatingAppealCallback(callbackData: string, user: ReturnType<UserEntity['toObject']>){
        
    }

    async handleCommonCallback(callbackData: string, user: ReturnType<UserEntity['toObject']>){
        
    }


}

export { CallbackHandler };