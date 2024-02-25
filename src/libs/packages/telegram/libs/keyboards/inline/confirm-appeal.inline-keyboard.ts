import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';

const ConfirmAppeal: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:[ 
            [{text: "Підтвердити", callback_data: CallbackDataCommands.CONFIRM_APPEAL}],
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
    }
} as const;

export { ConfirmAppeal };