import { MIN_DESCRIPTION_LENGTH, 
    MAX_DESCRIPTION_LENGTH, 
    MIN_ADDRESS_LENGTH, 
    MAX_ADDRESS_LENGTH
} from '../constants/constants.js';
    
    const AppealsValidationErrorTextMessage = {
        DESCRIPTION_TOO_SHORT: `Опис має містити що найменше ${MIN_DESCRIPTION_LENGTH} символів`,
        DESCRIPTION_TOO_LONG: `Опис має містити не більше ${MAX_DESCRIPTION_LENGTH} символів`,
        EMPTY_DESCRIPTION: 'Поле опису не може бути пустим',
        EMPTY_ADDRESS: 'Поле адреси не може бути пустим',
        ADDRESS_TO_SHORT: `Адреса має містити що найменше ${MIN_ADDRESS_LENGTH} символів`,
        ADDRESS_TO_LONG: `Адреса має містити не більше ${MAX_ADDRESS_LENGTH} символів`,
    }
    
    export { AppealsValidationErrorTextMessage };