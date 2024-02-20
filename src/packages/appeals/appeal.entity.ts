import { type Entity } from "~/libs/types/types.js";

class AppealEntity implements Entity{
    private id: number | null;

    private createdAt: Date | null;

    private updatedAt: Date | null;

    private userId: number;

    private categoryId: number | null;

    private latitude: number | null;

    private longitude: number | null;

    private description: string | null;

    private isFinished: boolean;

    public constructor({
        id, 
        createdAt,
        updatedAt,
        userId,
        categoryId,
        latitude,
        longitude,
        description,
        isFinished
    }:{
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        latitude: number | null;
        longitude: number | null;
        description: string | null;
        isFinished: boolean;
    }){
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.categoryId = categoryId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.isFinished = isFinished;
    }

    public static initialize({
        id, 
        createdAt,
        updatedAt,
        userId,
        categoryId = null,
        latitude = null,
        longitude = null,
        description = null,
        isFinished = false
    }:{
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        latitude: number | null;
        longitude: number | null;
        description: string | null;
        isFinished: boolean;
    }){
        return new AppealEntity({
            id, 
            createdAt,
            updatedAt,
            userId,
            categoryId,
            latitude,
            longitude,
            description,
            isFinished
        })
      
    }

    public static initializeNew({
        userId,
        categoryId = null,
        latitude = null,
        longitude = null,
        description = null,
        isFinished = false
    }:{
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        latitude: number | null;
        longitude: number | null;
        description: string | null;
        isFinished: boolean;
    }){
        return new AppealEntity({
            id: null, 
            createdAt: null,
            updatedAt: null,
            userId,
            categoryId,
            latitude,
            longitude,
            description,
            isFinished
        })
      
    }

    public toObject(): {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        userId: number;
        categoryId: number | null;
        latitude: number | null;
        longitude: number | null;
        description: string | null;
        isFinished: boolean;
    } {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
            categoryId: this.categoryId,
            latitude: this.latitude,
            longitude: this.longitude,
            description: this.description,
            isFinished: this.isFinished
        }
    }

    public toNewObject(): {
        userId: number;
        categoryId: number | null;
        latitude: number | null;
        longitude: number | null;
        description: string | null;
        isFinished: boolean;
    } {
        return {
            userId: this.userId,
            categoryId: this.categoryId,
            latitude: this.latitude,
            longitude: this.longitude,
            description: this.description,
            isFinished: this.isFinished
        }
    }

}

export { AppealEntity };