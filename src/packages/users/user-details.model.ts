import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';

class UserDetailsModel extends AbstractModel{
    public phoneNumber!: string;
    public fullName!: string;

    public static override get tableName(): string{
        return DatabaseTableName.USER_DETAILS;
    }
}

export { UserDetailsModel };