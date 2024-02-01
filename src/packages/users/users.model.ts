import { RelationMappings, Model } from 'objection';
import { AbstractModel, DatabaseTableName } from '~/libs/packages/database/database.js';

class UserModel extends AbstractModel{
    public chatId!: string;
    public isRegistered!: boolean;

    public static override get tableName(): string{
        return DatabaseTableName.USERS;
    }
}

export { UserModel };