import dotenv from 'dotenv';
import { replaceTemplateWithValue } from '~/libs/helpers/replace-template-with-value.helper.js';

dotenv.config();

const getTelegramFileLink = (path: string) => {
    return replaceTemplateWithValue({
        template: "https://api.telegram.org/file/bot{token}/{path}",
        replacements: {
            token: process.env['TG_BOT_TOKEN'] as string,
            path 
        }
    });
}

export { getTelegramFileLink };