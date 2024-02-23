import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { Categories } from '../../constants/constants.js';

const CategoriesKeyboard: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:
            Categories.map((value, index)=>{
                return [{text: value, callback_data: `${value}/${index}`}]
            })
    }
} as const;

export { CategoriesKeyboard };