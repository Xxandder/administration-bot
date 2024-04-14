import { type ContentType } from '~/libs/enums/enums.js';
import { type Entity, type ValueOf } from '~/libs/types/types.js';

class FileEntity implements Entity {
  private id: number | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private filePath: string;

  private contentType: ValueOf<typeof ContentType>;

  private constructor({
    id,
    filePath,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    filePath: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.filePath = filePath;
    this.contentType = contentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    filePath,
    contentType,
    createdAt,
    updatedAt,
  }: {
    id: number;
    filePath: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date;
    updatedAt: Date;
  }): FileEntity {
    return new FileEntity({
      id,
      filePath,
      contentType,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    filePath,
    contentType,
  }: {
    filePath: string;
    contentType: ValueOf<typeof ContentType>;
  }): FileEntity {
    return new FileEntity({
      id: null,
      filePath,
      contentType,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    filePath: string;
    contentType: ValueOf<typeof ContentType>;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      filePath: this.filePath,
      contentType: this.contentType,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    filePath: string;
    contentType: ValueOf<typeof ContentType>;
  } {
    return {
      filePath: this.filePath,
      contentType: this.contentType,
    };
  }
}

export { FileEntity };
