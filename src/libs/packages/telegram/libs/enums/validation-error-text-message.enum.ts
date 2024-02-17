import { MAX_FULL_NAME_LENGTH, MIN_FULL_NAME_LENGTH } from '../constants/constants.js';

const ValidationErrorTextMessage = {
    EMPTY_NAME: 'Поле ім\'я не моуж бути пустим',
    WRONG_NAME_FORMAT: "Неверный формат строки",
    NAME_TOO_LONG: `Довжина ім\'я не має перевищувати ${MAX_FULL_NAME_LENGTH} символи завдовшки`,
    NAME_TOO_SHORT: `Довжина ім\'я має бути більше ${MIN_FULL_NAME_LENGTH} символів завдовшки`,
}

export { ValidationErrorTextMessage };