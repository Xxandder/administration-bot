import joi from 'joi';
import { AppealsValidationErrorTextMessage } from '../enums/enums.js';
import { MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH } from '../constants/constants.js';

const address = joi.string()
    .min(MIN_ADDRESS_LENGTH)
    .max(MAX_ADDRESS_LENGTH)
    .required()
    .messages({
        'string.base': AppealsValidationErrorTextMessage.EMPTY_ADDRESS,
        'string.empty': AppealsValidationErrorTextMessage.EMPTY_ADDRESS,
        'string.min': AppealsValidationErrorTextMessage.ADDRESS_TO_SHORT,
        'string.max': AppealsValidationErrorTextMessage.ADDRESS_TO_LONG,
    });

export { address };