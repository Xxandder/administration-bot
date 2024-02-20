import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { AppealModel } from './appeal.model.js';

import { AppealCategoryTableColumnName, AppealTableColumnName } from './libs/enums/enums.js';

class AppealCategoryModel extends AbstractModel{
    public name!: string;

    public static override get tableName(): string{
        return DatabaseTableName.APPEAL_CATEGORY;
    }

    public static get relationMappings(): RelationMappings{
        return {
            category: {
                relation: Model.HasManyRelation,
                modelClass: AppealModel,
                join: {
                    from: `${DatabaseTableName.APPEAL_CATEGORY}.${AppealCategoryTableColumnName.ID}`,
                    to: `${DatabaseTableName.APPEALS}.${AppealTableColumnName.CATEGORY_ID}`,
                    
                }
            }
        }
    }

}

export { AppealCategoryModel };