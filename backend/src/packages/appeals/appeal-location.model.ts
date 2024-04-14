import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { AppealModel } from './appeal.model.js';

import { AppealLocationTableColumnName, 
    AppealTableColumnName ,
    AppealRelation
} from './libs/enums/enums.js';

class AppealLocationModel extends AbstractModel{
    public latitude!: number;

    public longitude!: number;

    public address!: string;

    public static override get tableName(): string{
        return DatabaseTableName.APPEAL_LOCATIONS;
    }

    public static get relationMappings(): RelationMappings{
        return {
            [AppealRelation.APPEAL]: {
                relation: Model.HasOneRelation,
                modelClass: AppealModel,
                join: {
                    from: `${DatabaseTableName.APPEAL_LOCATIONS}.${AppealLocationTableColumnName.ID}`,
                    to: `${DatabaseTableName.APPEALS}.${AppealTableColumnName.LOCATION_ID}`,
                    
                }
            }
        }
    }

}

export { AppealLocationModel };