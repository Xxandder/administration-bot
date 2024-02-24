import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';

const ConfirmPhotos: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:[ 
            [{text: "Підтвердити", callback_data: CallbackDataCommands.CONFIRM_PHOTOS}],
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
    }
} as const;

export { ConfirmPhotos };