import { MAX_NUMBER_OF_PHOTOS } from '../constants/constants.js';

const CreatingAppealStageMessage = {
    CHOOSE_CATEGORY: 'Оберіть категорію',
    ENTER_DESCRIPTION: 'Опишіть вашу проблему',
    SEND_PHOTOS: 'Надішліть фото(максимум 3), та натисніть кнопку "Підтвердити" у цьому меню',
    MAX_NUMBER_OF_PHOTOS: `Ви не можете надіслати більше, ніж ${MAX_NUMBER_OF_PHOTOS}`,
    SEND_GEO: 'Надішліть геолокацію того місця, де виявлено проблему, або натисніть кнопку "Ввести вручну"',
    GEO_IS_TOO_FAR: 'Будь ласка, оберіть локацію Красноградського району',
    CONFIRMATION: 'Будь ласка, перевірте всі дані та підтвердіть, у разі якщо все вірно',
    ENTER_ADDRESS: 'Будь ласка, введіть адресу, за якою виникла проблема'
}

export { CreatingAppealStageMessage };