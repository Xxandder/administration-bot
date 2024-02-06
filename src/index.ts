import { registrationStageRepository, userService, userRepository} from './packages/users/user.js';
import { UserService } from './packages/users/user.service.js';
// console.log(await registrationStageRepository.getMaxOrderNumber());
console.log(1)
const newUser = await userService.create('123456');
console.log(newUser);
console.log(2)
console.log(await userService.findByChatId('123456'));

console.log(await userService.moveToNextRegistrationStage(newUser.id));
console.log(await userService.moveToNextRegistrationStage(newUser.id));
console.log(await userService.moveToNextRegistrationStage(newUser.id));

