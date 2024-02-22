import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type FileUploadPayload = {
  url: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileUploadPayload };
