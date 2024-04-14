import { s3 } from '~/libs/packages/s3/s3.js';

import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService({
  fileRepository,
  s3,
});

export { fileService };
export { FileModel } from './file.model.js';
export { type FileService } from './file.service.js';
export {
  type FileUploadPayload
} from './libs/types/types.js';
