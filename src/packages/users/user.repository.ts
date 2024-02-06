import { type Repository } from "~/libs/types/types.js";
import { type UserModel } from "./user.model.js";
import { UserEntity } from "./user.entity.js";
import { UserRelation } from "./libs/enums/enums.js";
import { type UserQueryResponse,
type UserCreateQueryPayload,
type UpdateUserDetailsPayload,
type UpdateRegistrationStagePayload } from './libs/types/types.js';
import { DEFAULT_REGISTRATION_STAGE_ORDER_NUMBER } from './libs/constants/constants.js';
import { registrationStageRepository } from './user.js';

class UserRepository implements Repository{
    private userModel: typeof UserModel;

    constructor(userModel: typeof UserModel){
        this.userModel = userModel;
    }

    public async findById(id: number): Promise<UserEntity | null>{
        const user = await this.userModel
            .query()
            .withGraphJoined(`[${UserRelation.DETAILS}, ${UserRelation.RELATION_STAGE}]`)
            .findById(id)
            .castTo<UserQueryResponse | undefined>();

        if(!user){
            return null;
        }

        return UserEntity.initialize({
            id: user.id,
            createdAt: new Date(user.createdAt),
            updatedAt:  new Date(user.updatedAt),
            chatId: user.chatId,
            isRegistered: user.isRegistered,
            registrationStageId: user.registrationStage.id,
            fullName: user.details.fullName ?? null,
            phoneNumber: user.details.phoneNumber ?? null
        })
    }

    public async findByChatId(chatId: string): Promise<UserEntity | null>{
        
        const user = await this.userModel
            .query()
            .withGraphJoined(`[${UserRelation.DETAILS}, ${UserRelation.RELATION_STAGE}]`)
            .findOne({chatId})
            .castTo<UserQueryResponse | undefined>();

        if(!user){
            return null;
        }

        return UserEntity.initialize({
            id: user.id,
            createdAt: new Date(user.createdAt),
            updatedAt:  new Date(user.updatedAt),
            chatId: user.chatId,
            isRegistered: user.isRegistered,
            registrationStageId: user.registrationStage.id,
            fullName: user.details.fullName ?? null,
            phoneNumber: user.details.phoneNumber ?? null
        })
    }

    public async create(entity: UserEntity): Promise<UserEntity>{
       
        const { chatId } = entity.toNewObject();

        const registrationStage = await registrationStageRepository.findByOrderNumber(DEFAULT_REGISTRATION_STAGE_ORDER_NUMBER);
        
        const registrationStageId = registrationStage?.toObject().id;

        const user = await this.userModel
            .query()
            .insertGraph({
                chatId,
                isRegistered: false,
                registrationStageId: registrationStageId,
                details: {
                    phoneNumber: null,
                    fullName: null
                }
            } as UserCreateQueryPayload)
        return await this.findById(user.id) as UserEntity;
    }

    public async updateDetails({id, details}: UpdateUserDetailsPayload):
    Promise<UserEntity | null>{
        const user = (await this.findById(id));
        if(!user){
            return null;
        }
        const userObj = user.toObject();
        const detailsToUpdate = Object.fromEntries(
            Object.entries(details).filter(([key, value]) => value !== undefined && value !== null)
          );

        await this.userModel
          .relatedQuery(UserRelation.DETAILS)
          .for(userObj.id)
          .patch(detailsToUpdate)

        const updatedUser = await this.userModel
            .query()
            .withGraphJoined(`[${UserRelation.DETAILS}, ${UserRelation.RELATION_STAGE}]`)
            .findById(userObj.id)
            .castTo<UserQueryResponse>();
      
        return UserEntity.initialize({
            id: updatedUser.id,
            createdAt: new Date(updatedUser.createdAt),
            updatedAt:  new Date(updatedUser.updatedAt),
            chatId: updatedUser.chatId,
            isRegistered: updatedUser.isRegistered,
            registrationStageId: updatedUser.registrationStage.id,
            fullName: updatedUser.details.fullName ?? null,
            phoneNumber: updatedUser.details.phoneNumber ?? null
        })
    }

    public async updateRegistrationStage({id, backwards = false}: UpdateRegistrationStagePayload): 
            Promise<UserEntity | null>{
        const user = await this.userModel
            .query()
            .withGraphJoined(`[${UserRelation.DETAILS}, ${UserRelation.RELATION_STAGE}]`)
            .findById(id)
            .castTo<UserQueryResponse>();
        if(!user){
            return null;
        }
        const newRegistrationStage = !backwards ? await registrationStageRepository.getNext(
            user.registrationStage.orderNumber) : await registrationStageRepository.getPrevious(
                user.registrationStage.orderNumber);
        await this.userModel
            .query()
            .patch({ registrationStageId: newRegistrationStage?.toObject().orderNumber as number})
            .where({ id });
        
        const updatedUser = await this.userModel
            .query()
            .withGraphJoined(`[${UserRelation.DETAILS}, ${UserRelation.RELATION_STAGE}]`)
            .findById(id)
            .castTo<UserQueryResponse>(); 
        
        return UserEntity.initialize({
                id: updatedUser.id,
                createdAt: new Date(updatedUser.createdAt),
                updatedAt:  new Date(updatedUser.updatedAt),
                chatId: updatedUser.chatId,
                isRegistered: updatedUser.isRegistered,
                registrationStageId: updatedUser.registrationStage.id,
                fullName: updatedUser.details.fullName ?? null,
                phoneNumber: updatedUser.details.phoneNumber ?? null
            })
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
      }

      public findAll(): ReturnType<Repository['findAll']> {
        return Promise.resolve([]);
      }

    public delete(): ReturnType<Repository['delete']> {
        const DELETED_COUNT = 0;
    
        return Promise.resolve(DELETED_COUNT);
    }

}

export { UserRepository };