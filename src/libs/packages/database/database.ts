import knex, { type Knex } from 'knex';
import config from '../../../../knexfile.js';
import { Abstract } from './abstract.model.js';

const knexInstance = knex(config.development);
Abstract.knex(knexInstance);


export { DatabaseTableName } from './enums/enums.js';
export { Abstract as AbstractModel } from './abstract.model.js';