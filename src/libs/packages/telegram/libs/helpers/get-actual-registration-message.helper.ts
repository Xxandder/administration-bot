import { RegistrationStage, RegistrationTextMessage, CommonStage } from "../enums/enums.js"
import { ValueOf } from "~/libs/types/types.js"
import { ReturnBack, EnterPhoneNumber, ConfirmPersonalData } from '../keyboards/keyboards.js';
import { type MessageData, type RegistrationStageValues } from "../types/types.js";
import { getConfirmationMessageText } from './get-confirmation-message-text.helper.js';
import { userService } from "~/packages/users/user.js";
import { getActualCommonMessageObject } from './get-actual-common-message.helper.js';

const getActualRegistrationMessageObject = async (chatId: string, stage: RegistrationStageValues): Promise<MessageData> => {
    switch(stage){
        case RegistrationStage.SENDING_PHONE_NUMBER:
            return {
                text: RegistrationTextMessage.ENTER_PHONE_NUMBER,
                options: {reply_markup: EnterPhoneNumber }
                
            }
        case RegistrationStage.TYPING_FULL_NAME:
            return {
                text: RegistrationTextMessage.ENTER_FULL_NAME,
                options: {reply_markup:ReturnBack}
            }
        case RegistrationStage.CONFIRMATION:
            try{
                const user = await userService.findByChatId(chatId);
                return {
                    text: getConfirmationMessageText({
                        fullName: user?.fullName as string,
                        phoneNumber: user?.phoneNumber as string
                    }),
                    options: {reply_markup:ConfirmPersonalData}
                }
            }catch(e){
                throw new Error('User Not found')
            }
        default: 
            return getActualCommonMessageObject(CommonStage.MAIN_MENU);
    }
}

export { getActualRegistrationMessageObject };