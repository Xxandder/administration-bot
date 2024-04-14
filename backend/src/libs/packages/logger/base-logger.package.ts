import { type Logger as LibraryLogger, pino} from 'pino';
import pretty from 'pino-pretty';

import {  type Logger } from './libs/types/types.js';

class BaseLogger implements Logger{
    public logger: LibraryLogger;

    public constructor(){
        this.logger = pino(pretty.default());
        this.logger.info('Logger is created...')
    }

    public debug(
        message: string,
        parameters: Record<string, unknown> = {}
    ): ReturnType<Logger['debug']> {
        this.logger.debug(parameters, message)
    }

    public error(
        message: string,
        parameters: Record<string, unknown> = {}
    ): ReturnType<Logger['error']> {
        this.logger.error(parameters, message)
    }

    public warn(
        message: string,
        parameters: Record<string, unknown> = {}
    ): ReturnType<Logger['warn']> {
        this.logger.warn(parameters, message)
    }

    public info(
        message: string,
        parameters: Record<string, unknown> = {}
    ): ReturnType<Logger['info']> {
        this.logger.info(parameters, message)
    }
}

export { BaseLogger };