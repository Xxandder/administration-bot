import { type Repository } from "~/libs/types/types.js";
import { type UserModel } from "./user.model.js";
import { UserEntity } from "./user.entity.js";
import { UserRelation } from "./libs/enums/enums.js";
import { type UserQueryResponse,
type UserCreateQueryPayload } from './libs/types/types.js';
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
            .withGraphJoined([UserRelation.DETAILS, UserRelation.RELATION_STAGE])
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
            .withGraphJoined([UserRelation.DETAILS, UserRelation.RELATION_STAGE])
            .castTo<UserQueryResponse>();
        
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



}

export { UserRepository };