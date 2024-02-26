import { MAX_FULL_NAME_LENGTH, MIN_FULL_NAME_LENGTH,
MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH
 } from '../constants/constants.js';

const ValidationErrorTextMessage = {
    EMPTY_NAME: 'Поле ім\'я не моуж бути пустим',
    WRONG_NAME_FORMAT: "Неверный формат строки",
    NAME_TOO_LONG: `Довжина ім\'я не має перевищувати ${MAX_FULL_NAME_LENGTH} символи завдовшки`,
    NAME_TOO_SHORT: `Довжина ім\'я має бути більше ${MIN_FULL_NAME_LENGTH} символів завдовшки`,
    DESCRIPTION_TOO_SHORT: `Опис має містити що найменше ${MIN_DESCRIPTION_LENGTH} символів`,
    DESCRIPTION_TOO_LONG: `Опис має містити не більше ${MAX_DESCRIPTION_LENGTH} символів`

}

export { ValidationErrorTextMessage };