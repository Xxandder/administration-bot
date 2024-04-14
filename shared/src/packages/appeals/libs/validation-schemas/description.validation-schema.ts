import * as joi from 'joi';
import { AppealsValidationErrorTextMessage } from '../enums/enums.js';
import { MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } from '../constants/constants.js';

const descriptionSchema = joi.string()
    .min(MIN_DESCRIPTION_LENGTH)
    .max(MAX_DESCRIPTION_LENGTH)
    .required()
    .messages({
        'string.base': AppealsValidationErrorTextMessage.EMPTY_ADDRESS,
        'string.empty': AppealsValidationErrorTextMessage.EMPTY_ADDRESS,
        'string.min': AppealsValidationErrorTextMessage.DESCRIPTION_TOO_SHORT,
        'string.max': AppealsValidationErrorTextMessage.DESCRIPTION_TOO_LONG,
    });

export { descriptionSchema };