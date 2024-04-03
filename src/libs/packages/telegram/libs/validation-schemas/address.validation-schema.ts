import joi from 'joi';
import { ValidationErrorTextMessage } from '../enums/enums.js';
import { MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH } from '../constants/constants.js';

const fullNameSchema = joi.string()
    .min(MIN_ADDRESS_LENGTH)
    .max(MAX_ADDRESS_LENGTH)
    .required()
    .messages({
        'string.base': ValidationErrorTextMessage.EMPTY_NAME,
        'string.empty': ValidationErrorTextMessage.EMPTY_NAME,
        'string.min': ValidationErrorTextMessage.ADDRESS_TO_SHORT,
        'string.max': ValidationErrorTextMessage.ADDRESS_TO_LONG,
    });

export { fullNameSchema };