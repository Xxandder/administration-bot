import { type InlineKeyboard } from "../../types/inline-keyboard.type.js";
import { CallbackDataCommands } from '../../enums/enums.js';

const MainMenu: InlineKeyboard = {
    reply_markup: {
        inline_keyboard:[ 
            [{text: "Звернення", callback_data: CallbackDataCommands.CREATE_APPEAL}],
            [{text: "Довідка", callback_data: 'a'}],
            [{text: "Про проект", callback_data: 'a'}],
            [{text: "Поділитися", callback_data: 'a'}]
        ]
    }
} as const;

export { MainMenu };