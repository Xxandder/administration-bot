import joi from 'joi';
import { ValidationErrorTextMessage } from '../enums/enums.js';
import { MIN_FULL_NAME_LENGTH, MAX_FULL_NAME_LENGTH } from '../constants/constants.js';

const fullNameSchema = joi.string()
    .regex(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'` ]+$/)
    .min(MIN_FULL_NAME_LENGTH)
    .max(MAX_FULL_NAME_LENGTH)
    .required()
    .custom((value, helpers) => {
        let words: string[] = value.split(' ')
        words = words.filter(word => word !== '');
        if (words.length !== 3) {
            return helpers.message({custom: ValidationErrorTextMessage.WRONG_NAME_FORMAT});
        }
        return value;
    }, 'customValidation')
    .messages({
        'string.base': ValidationErrorTextMessage.EMPTY_NAME,
        'string.empty': ValidationErrorTextMessage.EMPTY_NAME,
        'string.min': ValidationErrorTextMessage.NAME_TOO_SHORT,
        'string.max': ValidationErrorTextMessage.NAME_TOO_LONG,
        'customValidation': ValidationErrorTextMessage.WRONG_NAME_FORMAT
    });

export { fullNameSchema };