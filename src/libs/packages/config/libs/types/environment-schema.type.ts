import { type AppEnvironment} from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/value-of.type';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>
    };
    DB: {
        USERNAME: string;
        PASSWORD: string;
        HOST: string;
        PORT: number;
        NAME: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    }
}

export { type EnvironmentSchema };