import { CommonStage, CommonTextMessages } from "~/libs/packages/telegram/libs/enums/enums.js";
import { type MessageData, type CommonStageValues } from "../types/types.js";
import { MainMenu } from "../keyboards/keyboards.js";

const getActualCommonMessageObject = async (stage: CommonStageValues): Promise<MessageData> => {
    switch(stage){
        case CommonStage.MAIN_MENU:
            return {
                text: CommonTextMessages.MAIN_MENU,
                options:  {reply_markup:MainMenu}
            }
        default: 
            throw new Error('Such stage doesn\'t exist');
    }
}

export { getActualCommonMessageObject };