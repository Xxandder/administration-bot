type KeyboardButton = {
    text: string;
    callback_data: string
};

type InlineKeyboard = {
    reply_markup: {
        inline_keyboard : 
                KeyboardButton[][]
    }
}

export { type InlineKeyboard };