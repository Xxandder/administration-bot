import { type Repository } from '~/libs/types/types.js';
import { FileEntity } from '~/packages/files/file.entity.js';
import { type FileModel } from '~/packages/files/file.model.js';

import {
  type FileCommonQueryResponse,
  type FileCreateQueryPayload,
} from './libs/types/types.js';

class FileRepository implements Repository {
  private fileModel: typeof FileModel;

  public constructor(fileModel: typeof FileModel) {
    this.fileModel = fileModel;
  }

  public async findById(id: number): Promise<FileEntity | null> {
    const file = await this.fileModel
      .query()
      .findById(id)
      .castTo<FileCommonQueryResponse | undefined>()
      .execute();

    if (!file) {
      return null;
    }

    return FileEntity.initialize({
      id: file.id,
      filePath: file.filePath,
      contentType: file.contentType,
      createdAt: new Date(file.createdAt),
      updatedAt: new Date(file.updatedAt),
    });
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async create(entity: FileEntity): Promise<FileEntity> {
    const { filePath, contentType } = entity.toNewObject();
    const file = await this.fileModel
      .query()
      .insertGraph({
        filePath,
        contentType,
      } as FileCreateQueryPayload)
      .castTo<FileCommonQueryResponse>()
      .execute();

    return FileEntity.initialize({
      id: file.id,
      filePath: file.filePath,
      contentType: file.contentType,
      createdAt: new Date(file.createdAt),
      updatedAt: new Date(file.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(fileId: number): ReturnType<Repository['delete']> {
    return this.fileModel.query().deleteById(fileId).execute();
  }
}

export { FileRepository };
