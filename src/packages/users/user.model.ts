import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { UserDetailsTableColumnName, UsersTableColumnName, StageTableColumnName } from './libs/enums/enums.js';
import { UserDetailsModel } from './user-details.model.js';
import { RegistrationStageModel } from './registration-stage.model.js';
import { UserRelation } from './libs/enums/enums.js';
import { CreatingAppealStageModel } from './creating-appeal-stage.model.js';
import { AppealModel, AppealTableColumnName } from '~/packages/appeals/appeals.js';

class UserModel extends AbstractModel{
    public chatId!: string;
    public isRegistered!: boolean;
    public registrationStageId!: number;

    public static override get tableName(): string{
        return DatabaseTableName.USERS;
    }

    public static get relationMappings(): RelationMappings{
        return {
            [UserRelation.DETAILS]: {
                relation: Model.HasOneRelation,
                modelClass: UserDetailsModel,
                join: {
                    from: `${DatabaseTableName.USERS}
                            .${UsersTableColumnName.ID}`,
                    to:    `${DatabaseTableName.USER_DETAILS}
                        .${UserDetailsTableColumnName.USER_ID}`
                        
                }
            },
            [UserRelation.REGISTRATION_STAGE]: {
                relation: Model.BelongsToOneRelation,
                modelClass: RegistrationStageModel,
                join: {
                    from: `${DatabaseTableName.USERS}
                            .${UsersTableColumnName.REGISTRATION_STAGE_ID}`,
                    to:    `${DatabaseTableName.REGISTRATION_STAGE}
                        .${StageTableColumnName.ID}`
                        
                }
            },
            [UserRelation.CREATING_APPEAL_STAGE]: {
                relation: Model.BelongsToOneRelation,
                modelClass: CreatingAppealStageModel,
                join: {
                    from: `${DatabaseTableName.USERS}
                            .${UsersTableColumnName.CREATING_APPEAL_STAGE_ID}`,
                    to:    `${DatabaseTableName.CREATING_APPEAL_STAGE}
                        .${StageTableColumnName.ID}`
                        
                }
            },
            [UserRelation.APPEALS]: {
                relation: Model.HasManyRelation,
                modelClass: AppealModel,
                join: {
                    from: `${DatabaseTableName.USERS}
                            .${UsersTableColumnName.ID}`,
                    to:    `${DatabaseTableName.APPEALS}
                        .${AppealTableColumnName.USER_ID}`
                        
                }
            }
        }
        
    }
}

export { UserModel };