import { type Entity } from "~/libs/types/types.js";

class RegistrationStageEntity implements Entity{
    private id: number | null;

    private createdAt: Date | null;

    private updatedAt: Date | null;

    private name: string;

    private orderNumber: number | null;

    public constructor({
        id, 
        createdAt,
        updatedAt,
        name,
        orderNumber
    }: {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        orderNumber: number | null;
    }){
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.orderNumber = orderNumber;
    }

    public static initialize({
        id, 
        createdAt,
        updatedAt,
        name,
        orderNumber
    }: {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        orderNumber: number | null;
    }){
        return new RegistrationStageEntity({
            id, 
            createdAt,
            updatedAt,
            name,
            orderNumber
        })
    }

    public static initializeNew({
        name,
        orderNumber
    }: {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        orderNumber: number | null;
    }){
        return new RegistrationStageEntity({
            id: null, 
            createdAt: null,
            updatedAt: null,
            name,
            orderNumber
        })
    }

    public toNewObject(): {
        name: string;
        orderNumber: number
    } {
        return {
            name: this.name,
            orderNumber: this.orderNumber as number
        }
    }

    public toObject(): {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        orderNumber: number
    } {
        return {
            id: this.id as number,
            createdAt: this.createdAt as Date,
            updatedAt: this.updatedAt as Date,
            name: this.name,
            orderNumber: this.orderNumber as number
        }
    }
}

export { RegistrationStageEntity };