import { type FileModelType } from './file-model.type.js'

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
    photos: FileModelType[]
    latitude: number;
    longitude: number;
    description: string;
    isFinished: boolean;
}

export { type AppealQueryResponse };