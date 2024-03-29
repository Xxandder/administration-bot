import { type Entity } from "~/libs/types/types.js";

type FileModelType = {
    id: number;
    createdAt: Date;
    updatedAt: Date,
    filePath: string,
    contentType: string
}

class AppealEntity implements Entity{
    private id: number | null;

    private createdAt: Date | null;

    private updatedAt: Date | null;

    private userId: number;

    private categoryId: number | null;

    private categoryName: string | null;

    private photos: FileModelType[] | null;

    private latitude: number | null;

    private longitude: number | null;

    private address: string | null;

    private description: string | null;

    private isFinished: boolean;

    public constructor({
        id, 
        createdAt,
        updatedAt,
        userId,
        categoryId,
        categoryName,
        photos,
        latitude,
        longitude,
        address,
        description,
        isFinished
    }:{
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        categoryName: string | null;
        photos: FileModelType[] | null;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        description: string | null;
        isFinished: boolean;
    }){
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.photos = photos;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.description = description;
        this.isFinished = isFinished;
    }

    public static initialize({
        id, 
        createdAt,
        updatedAt,
        userId,
        categoryId = null,
        categoryName = null,
        photos = null,
        latitude = null,
        longitude = null,
        address = null,
        description = null,
        isFinished = false
    }:{
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        categoryName: string | null;
        photos: FileModelType[] | null;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        description: string | null;
        isFinished: boolean;
    }){
        return new AppealEntity({
            id, 
            createdAt,
            updatedAt,
            userId,
            categoryId,
            categoryName,
            photos,
            latitude,
            longitude,
            address,
            description,
            isFinished
        })
      
    }

    public static initializeNew({
        userId,
    }:{
        userId: number;
    }){
        return new AppealEntity({
            id: null, 
            createdAt: null,
            updatedAt: null,
            userId,
            categoryId: null,
            categoryName: null,
            photos: null,
            latitude: null,
            longitude: null,
            address: null,
            description: null,
            isFinished: false
        })
      
    }

    public toObject(): {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        categoryName: string | null;
        photos: FileModelType[] | null;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        description: string | null;
        isFinished: boolean;
    } {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
            categoryId: this.categoryId,
            categoryName: this.categoryName,
            photos: this.photos,
            latitude: this.latitude,
            longitude: this.longitude,
            address: this.address,
            description: this.description,
            isFinished: this.isFinished
        }
    }

    public toNewObject(): {
        userId: number;
        categoryId: number | null;
        categoryName: string | null;
        photos: FileModelType[] | null;
        latitude: number | null;
        longitude: number | null;
        address: string | null;
        description: string | null;
        isFinished: boolean;
    } {
        return {
            userId: this.userId,
            categoryId: this.categoryId,
            categoryName: this.categoryName,
            photos: this.photos,
            latitude: this.latitude,
            longitude: this.longitude,
            address: this.address,
            description: this.description,
            isFinished: this.isFinished
        }
    }

}

export { AppealEntity };