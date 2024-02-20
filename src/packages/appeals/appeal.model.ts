import { type RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { 
    AppealTableColumnName, 
    AppealCategoryTableColumnName,
    AppealRelation
} from './libs/enums/enums.js';

import { AppealCategoryModel } from './appeal-category.model.js';
import { UserModel, UsersTableColumnName } from '~/packages/users/user.js';

class AppealModel extends AbstractModel{
    public latitude!: number;

    public longitude!: number;

    public description!: string;

    public isFinished!: boolean;

    public static override get tableName(): string{
        return DatabaseTableName.APPEALS;
    }
    
    public static get relationMappings(): RelationMappings{
        return {
            [AppealRelation.CATEGORY]: {
                relation: Model.HasManyRelation,
                modelClass: AppealCategoryModel,
                join: {
                    from: `${DatabaseTableName.APPEALS}.${AppealTableColumnName.CATEGORY_ID}`,
                    to: `${DatabaseTableName.APPEAL_CATEGORY}.${AppealCategoryTableColumnName.ID}`
                }
            },
            [AppealRelation.USER]: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.APPEALS}.${AppealTableColumnName.USER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UsersTableColumnName.ID}`
                }
            }
        }
    }
}

export { AppealModel };