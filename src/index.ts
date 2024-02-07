import { registrationStageRepository, userService, userRepository} from './packages/users/user.js';

import { telegramBot } from './libs/packages/telegram/telegram.js';

import { fullNameSchema } from './libs/packages/telegram/libs/validation-schemas/full-name.validation-schema.js';
const { error, value } = fullNameSchema.validate('John Doe');
console.log(error);
console.log(value);


//npm run start:tsx