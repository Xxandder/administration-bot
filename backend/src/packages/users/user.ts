import { CreatingAppealStageModel } from "./creating-appeal-stage.model.js";
import { CreatingAppealStageRepository } from "./creating-appeal-stage.repository.js";
import { RegistrationStageModel } from "./registration-stage.model.js";
import { RegistrationStageRepository } from './registration-stage.repository.js';
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserEntity } from "./user.entity.js";

const registrationStageRepository = new RegistrationStageRepository(RegistrationStageModel);
const creatingAppealStageRepository = new CreatingAppealStageRepository(CreatingAppealStageModel);

const userRepository = new UserRepository(UserModel);

const userService = new UserService({userRepository})

export { 
    registrationStageRepository, 
    userService,  
    userRepository,
    creatingAppealStageRepository
};

export { UserModel,
    UserEntity };

export { UsersTableColumnName } from './libs/enums/enums.js';

