import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { RegistrationStageTableColumnName, UsersTableColumnName } from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class RegistrationStageModel extends AbstractModel{
    public name!: string;

    public static override get tableName(): string{
        return DatabaseTableName.REGISTRATION_STAGE;
    }

    public static get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasManyRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.REGISTRATION_STAGE}
                            .${RegistrationStageTableColumnName.ID}`,
                    to: `${DatabaseTableName.USERS}
                    .${UsersTableColumnName.REGISTRATION_STAGE_ID}`
                        
                }
            }
        }
    }
}

export { RegistrationStageModel };