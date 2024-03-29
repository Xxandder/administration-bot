import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type FileUploadPayload = {
  filePath: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileUploadPayload };
