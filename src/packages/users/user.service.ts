import { type UserRepository } from "./user.repository.js"
import { UserEntity } from "./user.entity.js";
import { type UpdateUserDetailsPayload } from "./libs/types/types.js";
import { registrationStageRepository } from "./user.js";

type UserServiceDependencies = {
    userRepository: UserRepository
}

class UserService { 
    private userRepository: UserRepository;

    constructor({userRepository}: UserServiceDependencies){
        this.userRepository = userRepository
    }

    public async findById(id: number): Promise<ReturnType<UserEntity['toObject']> | null>{
        const user = await this.userRepository.findById(id);

        if(!user){
            throw new Error('User not found');
        }
        return user.toObject();
    }

    public async findByChatId(chatId: string): Promise<ReturnType<UserEntity['toObject']> | null>{
        const user = await this.userRepository.findByChatId(chatId);

        if(!user){
            throw new Error('User not found');
        }
        return user.toObject();
    }

    public async updateDetails({id, details}: UpdateUserDetailsPayload){
        const updatedUser = await this.userRepository.updateDetails({id, details});
        if(!updatedUser){
            throw new Error('User not found');
        }
        return updatedUser.toObject();
    }

    public async moveToNextRegistrationStage(id: number){
        try{
            const updatedUser = await this.userRepository.updateRegistrationStage({id, backwards: false});
            if(!updatedUser){
                throw new Error('User not found');
            }
            return updatedUser.toObject();
        }catch(e){
           throw(e);
        }
        
        
    }

    public async moveToPreviousRegistrationStage(id: number){
        const updatedUser = await this.userRepository.updateRegistrationStage({id, backwards: true});
        if(!updatedUser){
            throw new Error('User not found');
        }
        return updatedUser.toObject();
    }

    public async moveToNextCreatingAppealStage(id: number){
        try{
            const updatedUser = await this.userRepository.updateCreatingAppealStage({id, backwards: false});
            if(!updatedUser){
                throw new Error('User not found');
            }
            return updatedUser.toObject();
        }catch(e){
           throw(e);
        }
    }

    public async moveToPreviousCreatingAppealStage(id: number){
        const updatedUser = await this.userRepository.updateCreatingAppealStage({id, backwards: true});
        if(!updatedUser){
            throw new Error('User not found');
        }
        return updatedUser.toObject();
    }

    public async create(chatId: string){
        try{
            const item = await this.findByChatId(chatId);
            throw new Error('User already exists');
        }catch(e){
            const user = await this.userRepository.create(UserEntity.initializeNew({
                chatId
            }))
            return user.toObject();
        }

    }

    public async getRegistrationStageByUserId(id: number){
        try{
            const item = await this.findById(id);
            const registrationStage = await registrationStageRepository.findById(item?.registrationStageId ?? 1);
            return registrationStage?.toObject();
        }catch(e){
            throw new Error('User not found');
        }

    }
}

export { UserService };