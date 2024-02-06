import { registrationStageRepository, userService, userRepository} from './packages/users/user.js';

console.log(1)
const newUser = await userService.create('123456');
console.log(newUser);
console.log(2)
console.log(await userService.findByChatId('123456'));
console.log(3)
console.log(await userService.moveToNextRegistrationStage(newUser.id));
console.log(4)
console.log(await userService.moveToNextRegistrationStage(newUser.id));
console.log(5)
console.log(await userService.moveToNextRegistrationStage(newUser.id));
console.log(6)
console.log(await userService.moveToNextRegistrationStage(newUser.id));
console.log(7)
console.log(await userService.moveToPreviousRegistrationStage(newUser.id));
console.log(8)
console.log(await userService.moveToPreviousRegistrationStage(newUser.id));
console.log(9)
console.log(await userService.moveToPreviousRegistrationStage(newUser.id));
console.log(10)
console.log(await userService.updateDetails({id: 18, details:{fullName: 'alex', phoneNumber: null}}));
console.log(11)
console.log(await userService.updateDetails({id: 18, details:{fullName: null, phoneNumber: '+380999999999'}}));



//npm run start:tsx