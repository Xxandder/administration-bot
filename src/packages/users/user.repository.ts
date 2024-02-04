import { type Repository } from "~/libs/types/types.js";
import { type UserModel } from "./user.model.js";
import { UserEntity } from "./user.entity.js";
import { UserRelation } from "./libs/enums/enums.js";
import { type UserQueryResponse } from './libs/types/types.js';
import { DEFAULT_REGISTRATION_STAGE_ID } from './libs/constants/constants.js';
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

    // public async create(entity: UserEntity): Promise<UserEntity>{
    //     const { chatId } = entity.toNewObject();

    //     const registrationStage = registrationStageRepository.findByOrderNumber(1);

    //     const user = await this.userModel
    //         .query()
    //         .insertGraph({
    //             chatId,
    //             registrationStageId: 1
    //         })

    // }



}

export { UserRepository };