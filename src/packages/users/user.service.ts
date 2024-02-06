import { type UserRepository } from "./user.repository.js"
import { type UserEntity } from "./user.entity.js";
import { type UpdateUserDetailsPayload } from "./libs/types/types.js";

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
        const updatedUser = await this.userRepository.updateRegistrationStage({id, backwards: false});
        if(!updatedUser){
            throw new Error('User not found');
        }
        return updatedUser.toObject();
    }

    public async moveToPreviousRegistrationStage(id: number){
        const updatedUser = await this.userRepository.updateRegistrationStage({id, backwards: true});
        if(!updatedUser){
            throw new Error('User not found');
        }
        return updatedUser.toObject();
    }

    public async create(chatId: string){
        const item = await this.findByChatId(chatId);
        if(item){
            throw new Error('User already exists');
        }
    }
}

export { UserService };