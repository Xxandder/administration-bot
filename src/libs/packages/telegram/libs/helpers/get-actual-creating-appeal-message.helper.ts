import { CreatingAppealStageValues, MessageData } from "../types/types.js";
import { CommonStage, CreatingAppealStage, CreatingAppealStageMessage } from "../enums/enums.js";
import { getActualCommonMessageObject } from "./helpers.js";
import { CategoriesKeyboard, ConfirmAppeal, ConfirmPhotos, ReturnBack, SendGeo } from "../keyboards/keyboards.js";

const getActualCreatingAppealMessageObject = async (chatId: string, stage: CreatingAppealStageValues):
 Promise<MessageData> => {
    switch(stage){
        case CreatingAppealStage.CHOOSE_CATEGORY:
            return {
                text: CreatingAppealStageMessage.CHOOSE_CATEGORY,
                options: {reply_markup:CategoriesKeyboard}
            }
        case CreatingAppealStage.ENTER_DESCRIPTION:
             return {
                text: CreatingAppealStageMessage.ENTER_DESCRIPTION,
                options: {reply_markup:ReturnBack}
            }
        case CreatingAppealStage.SEND_GEO:
            return {
                text: CreatingAppealStageMessage.SEND_GEO,
                options: {reply_markup:SendGeo}
            }
        case CreatingAppealStage.SEND_PHOTOS:
            return {
                text: CreatingAppealStageMessage.SEND_PHOTOS,
                options: {reply_markup:ConfirmPhotos}
            }
        case CreatingAppealStage.CONFIRMATION:
            return {
                text: CreatingAppealStageMessage.CONFIRMATION,
                options: {reply_markup:ConfirmAppeal}
            }
        default: 
            return getActualCommonMessageObject(CommonStage.MAIN_MENU);
    }
}

export { getActualCreatingAppealMessageObject };