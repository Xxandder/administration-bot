import { InlineKeyboard } from './inline-keyboard.type.js';
import { CommonKeyboard } from './common-keyboard-type.js';
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'node-telegram-bot-api';

type MessageData = {
    text: string;
    options? : {reply_markup: ReplyKeyboardMarkup | InlineKeyboardMarkup }
}

export { type MessageData };