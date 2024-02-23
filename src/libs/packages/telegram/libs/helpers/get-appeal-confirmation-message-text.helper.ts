import { ValueOf } from "~/libs/types/types.js";
import { Categories } from "../constants/constants.js";

type Parameters = {
    category: typeof Categories[number];
    description: string
}

const getAppealConfirmationMessage = ({category, description}: Parameters) : string =>{
    const messageText = `Категорія: ${category} 
    Опис - ${description}`;
    return messageText;
}

export { getAppealConfirmationMessage };