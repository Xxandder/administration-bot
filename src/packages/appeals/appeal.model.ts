import { type RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { AppealTableColumnName, AppealCategoryTableColumnName } from './libs/enums/enums.js';

import { AppealCategoryModel } from './appeal-category.model.js';

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
            category: {
                relation: Model.HasManyRelation,
                modelClass: AppealCategoryModel,
                join: {
                    from: `${DatabaseTableName.APPEALS}.${AppealTableColumnName.CATEGORY_ID}`,
                    to: `${DatabaseTableName.APPEAL_CATEGORY}.${AppealCategoryTableColumnName.ID}`
                }
            }
        }
    }
}

export { AppealModel };