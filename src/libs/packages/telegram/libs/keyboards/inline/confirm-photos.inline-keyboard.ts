import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';
import { InlineKeyboardMarkup } from "node-telegram-bot-api";

const ConfirmPhotos: InlineKeyboardMarkup = {
        inline_keyboard:[ 
            [{text: "Підтвердити", callback_data: CallbackDataCommands.CONFIRM_PHOTOS}],
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
} as const;

export { ConfirmPhotos };