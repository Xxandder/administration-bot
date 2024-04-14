import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';
import { InlineKeyboardMarkup } from "node-telegram-bot-api";

const ReturnBack: InlineKeyboardMarkup = {
        inline_keyboard:[ 
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
} as const;

export { ReturnBack };