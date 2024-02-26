import joi from 'joi';
import { ValidationErrorTextMessage } from '../enums/enums.js';
import { MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } from '../constants/constants.js';

const descriptionSchema = joi.string()
    .min(MIN_DESCRIPTION_LENGTH)
    .max(MAX_DESCRIPTION_LENGTH)
    .required()
    .messages({
        'string.base': ValidationErrorTextMessage.EMPTY_NAME,
        'string.empty': ValidationErrorTextMessage.EMPTY_NAME,
        'string.min': ValidationErrorTextMessage.DESCRIPTION_TOO_SHORT,
        'string.max': ValidationErrorTextMessage.DESCRIPTION_TOO_LONG,
    });

export { descriptionSchema };