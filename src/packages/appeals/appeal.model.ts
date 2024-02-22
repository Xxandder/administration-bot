import { type RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { 
    AppealTableColumnName, 
    AppealCategoryTableColumnName,
    AppealRelation,
    AppealsPhotosTableColumnName
} from './libs/enums/enums.js';

import { AppealCategoryModel } from './appeal-category.model.js';
import { UserModel, UsersTableColumnName } from '~/packages/users/user.js';
import { FileModel } from '~/packages/files/files.js';

class AppealModel extends AbstractModel{
    public latitude!: number;

    public longitude!: number;

    public description!: string;

    public isFinished!: boolean;

    public userId!: number;

    public categoryId!: number;

    public static override get tableName(): string{
        return DatabaseTableName.APPEALS;
    }
    
    public static get relationMappings(): RelationMappings{
        return {
            [AppealRelation.CATEGORY]: {
                relation: Model.BelongsToOneRelation,
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
            },
            [AppealRelation.PHOTOS]: {
                relation: Model.ManyToManyRelation,
                modelClass: FileModel,
                join: {
                    from: `${DatabaseTableName.APPEALS}.${AppealTableColumnName.ID}`,
                    through: {
                        from: `${DatabaseTableName.APPEALS_PHOTOS}.${AppealsPhotosTableColumnName.APPEAL_ID}`,
                        to: `${DatabaseTableName.APPEALS_PHOTOS}.${AppealsPhotosTableColumnName.FILE_ID}`
                      },
                    to: `${DatabaseTableName.FILES}.${UsersTableColumnName.ID}`
                }
            }
        }
    }
}

export { AppealModel };