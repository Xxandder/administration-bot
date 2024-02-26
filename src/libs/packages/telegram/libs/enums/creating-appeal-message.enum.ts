import { MAX_NUMBER_OF_PHOTOS } from '../constants/constants.js';

const CreatingAppealStageMessage = {
    CHOOSE_CATEGORY: 'Оберіть категорію',
    ENTER_DESCRIPTION: 'Опишіть вашу проблему',
    SEND_PHOTOS: 'Надішліть до 3 фотографій',
    MAX_NUMBER_OF_PHOTOS: `Ви не можете надіслати більше, ніж ${MAX_NUMBER_OF_PHOTOS}`,
    SEND_GEO: 'Надішлить GEO мітку місця проблеми',
    GEO_IS_TOO_FAR: 'Будь ласка, оберіть локацію Красноградського району',
    CONFIRMATION: 'Будь ласка, перевірте всі дані та підтвердіть, у разі якщо все вірно'
}

export { CreatingAppealStageMessage };