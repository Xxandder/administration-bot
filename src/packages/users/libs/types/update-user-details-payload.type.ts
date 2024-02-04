type UpdateUserDetailsPayload = {
    chatId: string;
    details: {
        [key: string]: string | null;
        phoneNumber: string | null;
        fullName: string | null;
    }
}

export { UpdateUserDetailsPayload };