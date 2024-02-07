import { type CommonKeyboard } from "../../types/types.js";

const EnterPhoneNumber: CommonKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Відправити мій номер телефону', request_contact: true }]
        ],
        one_time_keyboard: true
    }
} as const;

export { EnterPhoneNumber };