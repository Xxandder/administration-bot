import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { Categories } from '../../constants/constants.js';
import { CallbackDataCommands } from "../../enums/enums.js";
import { InlineKeyboardMarkup } from "node-telegram-bot-api";

const CategoriesKeyboard: InlineKeyboardMarkup  = {
    inline_keyboard:
        [...Categories.map((value, index)=>{
            return [{text: value, callback_data: `category/${index+1}`}]
        }),
        [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
    ]
    
} as const;

export { CategoriesKeyboard };