import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { Categories } from '../../constants/constants.js';
import { CallbackDataCommands } from "../../enums/enums.js";
import { InlineKeyboardMarkup } from "node-telegram-bot-api";



const CategoriesKeyboard: InlineKeyboardMarkup  = {
    inline_keyboard:[
        [
            {text: Categories[0], callback_data: `category/${1}`},
            {text: Categories[1], callback_data: `category/${2}`},
        ],
        [
            {text: Categories[2], callback_data: `category/${3}`},
            {text: Categories[3], callback_data: `category/${4}`},
        ],
        [
            {text: Categories[4], callback_data: `category/${5}`},
            {text: Categories[5], callback_data: `category/${6}`},
        ],
        [
            {text: Categories[6], callback_data: `category/${7}`},
            {text: Categories[7], callback_data: `category/${8}`},
        ],
        [
            {text: Categories[8], callback_data: `category/${9}`},
            {text: Categories[9], callback_data: `category/${10}`},
        ],
        [
            {text: Categories[10], callback_data: `category/${11}`},
            {text: Categories[11], callback_data: `category/${12}`},
        ],
        [
            {text: Categories[12], callback_data: `category/${13}`},
            {text: Categories[13], callback_data: `category/${14}`},
        ],
        [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
    ]
    
} as const;


export { CategoriesKeyboard };