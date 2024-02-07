import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';
import { UserDetailsTableColumnName, UsersTableColumnName } from './libs/enums/enums.js';
import { UserModel } from './user.model.js';

class UserDetailsModel extends AbstractModel{
    public phoneNumber!: string;
    public fullName!: string;

    public static override get tableName(): string{
        return DatabaseTableName.USER_DETAILS;
    }

    public static get relationMappings(): RelationMappings{
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.USER_DETAILS}
                            .${UserDetailsTableColumnName.USER_ID}`,
                    to:    `${DatabaseTableName.USERS}
                        .${UsersTableColumnName.ID}`
                        
                }
            }
        }
    }
}

export { UserDetailsModel };