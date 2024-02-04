type UserCreateQueryPayload = {
    chatId: string;
    isRegistered: boolean;
    registrationStageId: number;
    details: {
        fullName: string | null;
        phoneNumber: string | null;
    }
}

export { UserCreateQueryPayload };