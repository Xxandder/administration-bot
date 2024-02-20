type AppealQueryResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    category: {
        id: number;
        name: string;
    }
    latitude: number;
    longitude: number;
    description: string;
    isFinished: boolean;
}

export { type AppealQueryResponse };