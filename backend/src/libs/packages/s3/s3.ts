

import { S3 } from './s3.service.js';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3({
  region: process.env['AWS_BUCKET_REGION'] as string,
  accessKeyId: process.env['AWS_ACCESS_KEY'] as string,
  secretAccessKey: process.env['AWS_SECRET_KEY'] as string,
  bucketName: process.env['AWS_BUCKET_NAME'] as string,
});

export { s3 };
export { type S3 } from './s3.service.js';
