import { type ContentType } from '~/libs/enums/content-type.enum.js';
import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js'
import { type ValueOf } from '~/libs/types/types.js';

class FileModel extends AbstractModel {
  public filePath!: string;

  public contentType!: ValueOf<typeof ContentType>;

  public static override get tableName(): string {
    return DatabaseTableName.FILES;
  }
}

export { FileModel };
