import { registrationStageRepository, userService, userRepository} from './packages/users/user.js';

import { telegramBot } from './libs/packages/telegram/telegram.js';


// Testing of loading images

// import { fileService } from './packages/files/files.js';
// import fs from 'fs';
// const imagePath = './src/dog.jpg';
// const readFileToBuffer = (filePath: string): Promise<Buffer> => {
//     return new Promise((resolve, reject) => {
//       fs.readFile(filePath, (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//   };
// const buffer = await readFileToBuffer(imagePath);
// const file = await fileService.create({
//     buffer: Buffer.from(buffer),
//     name: 'newimage.jpg',
//     contentType: 'image/jpeg'
// })
// console.log(file)
// ===========

console.log(telegramBot);




//npm run start:tsx