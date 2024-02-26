import { ReplyKeyboardMarkup } from "node-telegram-bot-api";
import { type CommonKeyboard } from "../../types/types.js";

const EnterPhoneNumber: ReplyKeyboardMarkup  = 
{
    keyboard: [
        [{ text: 'Відправити мій номер телефону', request_contact: true }]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
    
} as const;

export { EnterPhoneNumber };