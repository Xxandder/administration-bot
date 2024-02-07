type UserCreateQueryPayload = {
    chatId: string;
    isRegistered: boolean;
    registrationStageId: number;
    details: {
        fullName: string | null | undefined;
        phoneNumber: string | null | undefined;
    }
}

export { UserCreateQueryPayload };