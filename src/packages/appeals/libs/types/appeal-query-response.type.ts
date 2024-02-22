type FileQueryResponse = {
    id: number;
    filePath: string;
    contentType: string;
}

type AppealQueryResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    categoryId: number;
    category: {
        id: number;
        name: string;
    }
    photos: FileQueryResponse[]
    latitude: number;
    longitude: number;
    description: string;
    isFinished: boolean;
}

export { type AppealQueryResponse };