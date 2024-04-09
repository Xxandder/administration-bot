import { TelegramBotService } from "./telegram-bot.service.js"
import TelegramBot from "node-telegram-bot-api"
import { UserEntity } from "~/packages/users/user.entity.js"
import { userService } from "~/packages/users/user.js"
import { CallbackDataCommands, CommonTextMessages, CreatingAppealStage } from "./libs/enums/enums.js"
import { appealService } from "~/packages/appeals/appeals.js"
import { AppealEntity } from "~/packages/appeals/appeal.entity.js"

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
       
        try {
            const currentAppeal = await appealService.findNotFinishedByUserId(user.id);
            if(!currentAppeal){
                console.error('Appeal not found');
                return;
            }

            const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user.id as number);
            if(creatingAppealStage?.name === CreatingAppealStage.CHOOSE_CATEGORY &&
                 callbackData !== CallbackDataCommands.GO_BACK){
                await this.handleCategoryChoosing(currentAppeal, callbackData, user);
            }else{
                switch (callbackData) {
                    case CallbackDataCommands.GO_BACK:
                        await this.handleGoBackCommand(currentAppeal, user);
                        break;
                    case CallbackDataCommands.CONFIRM_PHOTOS:
                        await this.handlePhotoConfirmation(user);
                        break;
                    case CallbackDataCommands.CONFIRM_APPEAL:
                        await this.handleAppealConfirmation(currentAppeal, user);
                        break;
                    case CallbackDataCommands.ENTER_ADDRESS:
                        await this.handleEnterAddressCommand(CreatingAppealStage.ENTER_ADDRESS, user);
                        break;
                    default:
                        console.error('Invalid creating appeal callback.');
                        break;
                }
    
                
            }
            await this.telegramBotService.sendActualMessage(user.chatId);
            
        } catch (error) {
            console.error('Error handling creating appeal callback:', error);
            throw error;
        }
    }

    async handleEnterAddressCommand(stageName: string, 
        user: ReturnType<UserEntity['toObject']>){
            const updatedUser = await userService.updateAppealStage(user.id, stageName);
    }

    async handleCategoryChoosing(currentAppeal: ReturnType<AppealEntity['toObject']>, 
        callbackData: string,
        user: ReturnType<UserEntity['toObject']>){
            const categoriesCallbackPattern = /^category\/\d+$/;
            if(categoriesCallbackPattern.test(callbackData)){
                    const categoryId = parseInt(callbackData.split('/')[1] as string);
                    await appealService.updateCategoryId(currentAppeal?.id as number, categoryId);
                    await userService.moveToNextCreatingAppealStage(user.id);
            }
    }

    async handlePhotoConfirmation(user: ReturnType<UserEntity['toObject']>) {
        await userService.moveToNextCreatingAppealStage(user.id);
    }

    async handleAppealConfirmation(currentAppeal: ReturnType<AppealEntity['toObject']>,
     user: ReturnType<UserEntity['toObject']>) {
        await userService.moveToNextCreatingAppealStage(user.id);
        await userService.updateIsCreatingAppeal(
            {id: user.id, isCreatingAppeal:false});
        await appealService.updateIsFinished(currentAppeal?.id as number, true);  
        try{
            await this.telegramBotService.sendAppeal(process.env['APPEALS_CHAT_ID'] as string,
            currentAppeal.id as number)  
        }catch(e){
            console.log('Error with sending appeal')
        }
        
    }

    async handleGoBackCommand(currentAppeal: ReturnType<AppealEntity['toObject']>, 
     user: ReturnType<UserEntity['toObject']>) {
        const creatingAppealStage = await userService.getCreatingAppealStageByUserId(user.id as number);
       
        switch(creatingAppealStage?.name){
            case CreatingAppealStage.SEND_GEO:
                await appealService.deletePhotos(currentAppeal?.id as number);
                break;
            case CreatingAppealStage.CHOOSE_CATEGORY:
               
                await appealService.delete(currentAppeal?.id as number);
                break;
        }
        await userService.moveToPreviousCreatingAppealStage(user.id);
    }

    async handleCommonCallback(callbackData: string, 
     user: ReturnType<UserEntity['toObject']>){
        switch(callbackData){
            case CallbackDataCommands.CREATE_APPEAL:
                await userService.updateIsCreatingAppeal(
                    {id: user.id, isCreatingAppeal: true});
                await appealService.create(user.id);
                break;
            case CallbackDataCommands.INFO:
                await this.telegramBotService.sendMessage(user.chatId, CommonTextMessages.INFO);
                break;
        }
        await this.telegramBotService.sendActualMessage(user.chatId);
    }


}

export { CallbackHandler };