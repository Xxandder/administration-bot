type KeyboardButton = {
    text: string;
    request_contact?: boolean 
};

type CommonKeyboard = {
    reply_markup: {
        keyboard : KeyboardButton[][] ,
        one_time_keyboard? : boolean
    }
}

export { type CommonKeyboard };