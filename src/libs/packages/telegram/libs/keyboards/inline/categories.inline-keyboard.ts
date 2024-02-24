import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { Categories } from '../../constants/constants.js';
import { CallbackDataCommands } from "../../enums/enums.js";

const CategoriesKeyboard: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:
            [...Categories.map((value, index)=>{
                return [{text: value, callback_data: `${value}/${index+1}`}]
            }),
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
    }
} as const;

export { CategoriesKeyboard };