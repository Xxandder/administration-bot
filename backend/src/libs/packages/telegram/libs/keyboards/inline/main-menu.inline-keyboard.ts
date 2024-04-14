import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';
import { InlineKeyboardMarkup } from "node-telegram-bot-api";

const MainMenu: InlineKeyboardMarkup = {
        inline_keyboard:[ 
            [{text: "Сповістити про проблему📝", callback_data: CallbackDataCommands.CREATE_APPEAL}],
            [{text: "Довідка про проєкт📌", callback_data: CallbackDataCommands.INFO}],
            [{
                text: "Поділитися↗️", 
                switch_inline_query: '\nЗапрошуємо красноградців скористатися чат-ботом "Десята фортеця": сервіс для вирішення проблем Красноградської громади'
            }],
        ]
} as const;

export { MainMenu };