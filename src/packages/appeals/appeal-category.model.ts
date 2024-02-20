import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';

import { AppealCategoryTableColumnName } from './libs/enums/enums.js';

class AppealCategoryModel extends AbstractModel{
    public name!: string;

    public static override get tableName(): string{
        return DatabaseTableName.APPEAL_CATEGORY;
    }
    
}

export { AppealCategoryModel };