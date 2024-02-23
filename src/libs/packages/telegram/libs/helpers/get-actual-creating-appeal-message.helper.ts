import { CreatingAppealStageValues, MessageData } from "../types/types.js";
import { CommonStage, CreatingAppealStage, CreatingAppealStageMessage } from "../enums/enums.js";
import { getActualCommonMessageObject } from "./helpers.js";
import { CategoriesKeyboard } from "../keyboards/keyboards.js";

const getActualCreatingAppealMessageObject = async (chatId: string, stage: CreatingAppealStageValues):
 Promise<MessageData> => {
    switch(stage){
        case CreatingAppealStage.CHOOSE_CATEGORY:
            return {
                text: CreatingAppealStageMessage.CHOOSE_CATEGORY,
                options: CategoriesKeyboard
            }
        
        default: 
            return getActualCommonMessageObject(CommonStage.MAIN_MENU);
    }
}

export { getActualCreatingAppealMessageObject };