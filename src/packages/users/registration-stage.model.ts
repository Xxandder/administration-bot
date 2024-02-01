import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';

class RegistrationStageModel extends AbstractModel{
    public name!: string;

    public static override get tableName(): string{
        return DatabaseTableName.REGISTRATION_STAGE;
    }
}

export { RegistrationStageModel };