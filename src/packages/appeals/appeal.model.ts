import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { AppealTableColumnName } from './libs/enums/enums.js';

import { AppealCategoryModel } from './appeal-category.model.js';

class AppealModel extends AbstractModel{
    public latitude!: number;

    public longitude!: number;

    public description!: string;

    public isFinished!: boolean;

    public static override get tableName(): string{
        return DatabaseTableName.APPEAL;
    }
    
}

export { AppealModel };