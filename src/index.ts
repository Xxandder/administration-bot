import { registrationStageRepository, userService, userRepository} from './packages/users/user.js';

import { telegramBot } from './libs/packages/telegram/telegram.js';


// Testing of loading images

// import { s3 } from './libs/packages/s3/s3.js';
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
// await s3.sendFile({
//     fileKey: 'image.jpg', // Имя файла в S3
//     buffer: Buffer.from(buffer), // Преобразование буфера изображения в Buffer
//     contentType: 'image/jpeg', // Тип содержимого файла
//   });
// ===========

console.log(telegramBot);




//npm run start:tsx