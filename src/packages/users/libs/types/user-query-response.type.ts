type UserQueryResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    chatId: string;
    isRegistered: boolean;
    registrationStage: {
        id: number;
        name: string;
    };
    details: {
        id: number;
        fullName: string | null;
        phoneNumber: string | null;
    }
}

export { type UserQueryResponse };