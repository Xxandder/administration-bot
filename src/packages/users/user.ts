import { RegistrationStageModel } from "./registration-stage.model.js";
import { RegistrationStageRepository } from './registration-stage.repository.js';
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

const registrationStageRepository = new RegistrationStageRepository(RegistrationStageModel);

const userRepository = new UserRepository(UserModel);

const userService = new UserService({userRepository})

export { 
    registrationStageRepository, 
    userService,  
    userRepository
};

export { UserModel };

export { UsersTableColumnName } from './libs/enums/enums.js';