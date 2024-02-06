import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity{
    private id: number | null;

    private createdAt: Date | null;

    private updatedAt: Date | null;

    private chatId: string;
    
    private isRegistered: boolean | null;

    private registrationStageId: number | null;

    private phoneNumber: string | null;

    private fullName: string | null;

    public constructor({
        id, 
        createdAt,
        updatedAt,
        chatId,
        isRegistered,
        registrationStageId,
        phoneNumber,
        fullName
    }: {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        chatId: string;
        isRegistered: boolean| null;
        registrationStageId: number | null;
        phoneNumber: string | null;
        fullName: string | null;
    }){
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.chatId = chatId;
        this.isRegistered = isRegistered;
        this.registrationStageId = registrationStageId;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
    }

    public static initialize({
        id, 
        createdAt,
        updatedAt,
        chatId,
        isRegistered,
        registrationStageId,
        phoneNumber,
        fullName
    }: {
        id: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        chatId: string;
        isRegistered: boolean | null;
        registrationStageId: number | null;
        phoneNumber: string | null;
        fullName: string | null;
    }){
        return new UserEntity({
            id, 
            createdAt,
            updatedAt,
            chatId,
            isRegistered,
            registrationStageId,
            phoneNumber,
            fullName
        })
    }

    public static initializeNew({
        chatId,
    }: {
        chatId: string;
    }){
        return new UserEntity({
            id: null, 
            createdAt: null,
            updatedAt: null,
            chatId,
            isRegistered: null,
            registrationStageId: null,
            phoneNumber: null,
            fullName: null
        })
    }

    public toNewObject(): {
        chatId: string;
        isRegistered: boolean;
        registrationStageId: number;
        phoneNumber: string | null;
        fullName: string | null;
    } {
        return {
            chatId: this.chatId,
            isRegistered: this.isRegistered as boolean,
            registrationStageId: this.registrationStageId as number,
            phoneNumber: this.phoneNumber,
            fullName: this.fullName
        }
    }

    public toObject(): {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        chatId: string;
        isRegistered: boolean;
        registrationStageId: number;
        phoneNumber: string | null;
        fullName: string | null;
    } {
        return {
            id: this.id as number,
            createdAt: this.createdAt as Date,
            updatedAt: this.updatedAt as Date,
            chatId: this.chatId,
            isRegistered: this.isRegistered as boolean,
            registrationStageId: this.registrationStageId as number,
            phoneNumber: this.phoneNumber,
            fullName: this.fullName
        }
    }
}

export { UserEntity };