import { type ContentType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type FileCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  filePath: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileCommonQueryResponse };
