import { CreatingAppealStageValues, MessageData } from "../types/types.js";
import { CommonStage, CreatingAppealStage, CreatingAppealStageMessage } from "../enums/enums.js";
import { getActualCommonMessageObject } from "./helpers.js";
import { CategoriesKeyboard, ConfirmAppeal, ReturnBack } from "../keyboards/keyboards.js";

const getActualCreatingAppealMessageObject = async (chatId: string, stage: CreatingAppealStageValues):
 Promise<MessageData> => {
    switch(stage){
        case CreatingAppealStage.CHOOSE_CATEGORY:
            return {
                text: CreatingAppealStageMessage.CHOOSE_CATEGORY,
                options: CategoriesKeyboard
            }
        case CreatingAppealStage.ENTER_DESCRIPTION:
             return {
                text: CreatingAppealStageMessage.ENTER_DESCRIPTION,
                options: ReturnBack
            }
        case CreatingAppealStage.SEND_GEO:
            return {
                text: CreatingAppealStageMessage.SEND_GEO,
                options: ReturnBack
            }
        case CreatingAppealStage.SEND_PHOTOS:
            return {
                text: CreatingAppealStageMessage.SEND_PHOTOS,
                options: ReturnBack
            }
        case CreatingAppealStage.CONFIRMATION:
            return {
                text: CreatingAppealStageMessage.CONFIRMATION,
                options: ConfirmAppeal
            }
        default: 
            return getActualCommonMessageObject(CommonStage.MAIN_MENU);
    }
}

export { getActualCreatingAppealMessageObject };