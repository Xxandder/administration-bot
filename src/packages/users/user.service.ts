import { type UserRepository } from "./user.repository.js"
import { type UserEntity } from "./user.entity.js";

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

    public async findChatId(chatId: string): Promise<ReturnType<UserEntity['toObject']> | null>{
        const user = await this.userRepository.findByChatId(chatId);

        if(!user){
            throw new Error('User not found');
        }
        return user.toObject();
    }
}

export { UserService };