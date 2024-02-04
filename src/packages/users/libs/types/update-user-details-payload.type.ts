type UpdateUserDetailsPayload = {
    chatId: string;
    details: {
        phoneNumber: string | null;
        fullName: string | null;
    }
}

export { UpdateUserDetailsPayload };