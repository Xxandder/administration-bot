import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';

const EnterFullName: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:[ 
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
    }
} as const;

export { EnterFullName };