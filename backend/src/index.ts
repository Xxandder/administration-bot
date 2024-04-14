import { registrationStageRepository, userService, userRepository} from './packages/users/user.js';

import { telegramBot } from './libs/packages/telegram/telegram.js';


console.log(telegramBot);

import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});



