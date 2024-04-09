import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';
import { InlineKeyboardMarkup } from "node-telegram-bot-api";

const SendGeo: InlineKeyboardMarkup = {
        inline_keyboard:[
            [{text: "Ввести вручну", callback_data: CallbackDataCommands.ENTER_ADDRESS}],
            [{text: "Повернутися", callback_data: CallbackDataCommands.GO_BACK}]
        ]
} as const;

export { SendGeo };