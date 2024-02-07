import { InlineKeyboard } from './inline-keyboard.type.js';
import { CommonKeyboard } from './common-keyboard-type.js';

type MessageData = {
    text: string;
    options? : InlineKeyboard  | CommonKeyboard
}

export { type MessageData };