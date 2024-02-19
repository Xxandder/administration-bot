import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { StageTableColumnName, UsersTableColumnName } from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class CreatingAppealStageModel extends AbstractModel{
    public name!: string;
    public orderNumber!: number;

    public static override get tableName(): string{
        return DatabaseTableName.CREATING_APPEAL_STAGE;
    }

    public static get relationMappings(): RelationMappings {
        return {
            user: {
                relation: Model.HasManyRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.CREATING_APPEAL_STAGE}
                            .${StageTableColumnName.ID}`,
                    to: `${DatabaseTableName.USERS}
                    .${UsersTableColumnName.CREATING_APPEAL_STAGE_ID}`
                }
            }
        }
    }
}

export { CreatingAppealStageModel };