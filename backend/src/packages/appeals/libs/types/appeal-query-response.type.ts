import { type FileModelType } from './file-model.type.js';

type AppealQueryResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    categoryId: number;
    category: {
        id: number;
        name: string;
    },
    location: {
        id: number;
        latitude: number;
        longitude: number;
        address: string
    }
    photos: FileModelType[]
    description: string;
    isFinished: boolean;
}

export { type AppealQueryResponse };