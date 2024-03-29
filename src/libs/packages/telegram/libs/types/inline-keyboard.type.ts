import { ReplyKeyboardMarkup } from "node-telegram-bot-api";

type KeyboardButton = {
    text: string;
    callback_data: string
};

type InlineKeyboard = {
    reply_markup: {
        inline_keyboard : 
                KeyboardButton[][] | ReplyKeyboardMarkup 
    }
}

export { type InlineKeyboard };