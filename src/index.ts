import { registrationStageRepository} from './packages/users/user.js';
console.log(await registrationStageRepository.getMaxOrderNumber());