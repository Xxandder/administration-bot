import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { UserDetailsTableColumnName, RegistrationStageTableColumnName, UsersTableColumnName } from './libs/enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';
import { RegistrationStageModel } from './registration-stage.model';

class UserModel extends AbstractModel{
    public chatId!: string;
    public isRegistered!: boolean;

    public static override get tableName(): string{
        return DatabaseTableName.USERS;
    }

    public static get relationMappings(): RelationMappings{
        return {
            details: {
                relation: Model.HasOneRelation,
                modelClass: UserDetailsModel,
                join: {
                    from: `${DatabaseTableName.USERS}
                            .${UsersTableColumnName.ID}`,
                    to:    `${DatabaseTableName.USER_DETAILS}
                        .${UserDetailsTableColumnName.USER_ID}`
                        
                }
            },
            registrationStage: {
                relation: Model.BelongsToOneRelation,
                modelClass: RegistrationStageModel,
                join: {
                    from: `${DatabaseTableName.USERS}
                            .${UsersTableColumnName.REGISTRATION_STAGE_ID}`,
                    to:    `${DatabaseTableName.REGISTRATION_STAGE}
                        .${RegistrationStageTableColumnName.ID}`
                        
                }
            }
        }
    }
}

export { UserModel };