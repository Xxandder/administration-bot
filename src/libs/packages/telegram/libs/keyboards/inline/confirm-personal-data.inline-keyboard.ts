import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';

const ConfirmPersonalData: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:[ 
            [{text: "Підтвердити", callback_data: CallbackDataCommands.CONFIRM_PERSONAL_DATA}],
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
    }
} as const;

export { ConfirmPersonalData };