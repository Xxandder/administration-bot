import { RegistrationStage, RegistrationTextMessage } from "../enums/enums.js"
import { ValueOf } from "~/libs/types/types.js"
import { EnterFullName, EnterPhoneNumber } from '../keyboards/keyboards.js';
import { type MessageData, type RegistrationStageValues } from "../types/types.js";
import { getConfirmationMessageText } from './get-confirmation-message-text.helper.js';
import { userService } from "~/packages/users/user.js";

const getActualMessageObject = async (chatId: string, stage: RegistrationStageValues): Promise<MessageData> => {
    switch(stage){
        case RegistrationStage.SENDING_PHONE_NUMBER:
            return {
                text: RegistrationTextMessage.ENTER_PHONE_NUMBER,
                options: EnterPhoneNumber
            }
        case RegistrationStage.TYPING_FULL_NAME:
            return {
                text: RegistrationTextMessage.ENTER_FULL_NAME,
                options: EnterFullName
            }
        case RegistrationStage.CONFIRMATION:
            try{
                const user = await userService.findByChatId(chatId);
                return {
                    text: getConfirmationMessageText({
                        fullName: user?.fullName as string,
                        phoneNumber: user?.phoneNumber as string
                    }),
                    options: EnterFullName
                }
            }catch(e){
                throw new Error('User Not found')
            }
        default: 
            throw new Error('Such stage doesn\'t exist');
    }
}

export { getActualMessageObject };