import {
    PutObjectCommand,
    type PutObjectCommandInput,
    S3Client,
    type S3ClientConfig,
    S3ServiceException,
  } from '@aws-sdk/client-s3';
  

import { replaceTemplateWithValue } from '~/libs/helpers/helpers.js';
import { ContentType } from '~/libs/enums/enums.js';
import { ValueOf } from '~/libs/types/types.js';


  type S3Dependencies = {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  };

  type S3FileUploadRequestDto = {
    fileKey: string;
    buffer: Buffer;
    contentType: ValueOf<typeof ContentType>;
  };
  
  class S3 {
    private region: string;
    private bucketName: string;
  
    private s3Client: S3Client;
  
    public constructor({
      region,
      accessKeyId,
      secretAccessKey,
      bucketName,
    }: S3Dependencies) {
      this.region = region;
      this.bucketName = bucketName;
  
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
      } as S3ClientConfig);
    }
  
    public get S3Client(): S3Client {
      return this.s3Client;
    }
  
    public async sendFile({
      fileKey,
      buffer,
      contentType,
    }: S3FileUploadRequestDto): Promise<void> {
      const putObjectCommand = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: buffer,
        ContentType: contentType,
      } as PutObjectCommandInput);
  
      await this.s3Client.send(putObjectCommand);
    }
  
    public getUrl(fileKey: string): string {
      return replaceTemplateWithValue({
        template: 'https://{bucket}.s3.{region}.amazonaws.com/{fileKey}',
        replacements: {
          bucket: this.bucketName,
          region: this.region,
          fileKey,
        },
      });
    }
  
    // private throwError(error: unknown): never {
    //   if (error instanceof S3ServiceException) {
    //     throw new FileError({
    //       message: error.message,
    //       status: error.$response?.statusCode as ValueOf<typeof HTTPCode>,
    //     });
    //   }
  
    //   throw new FileError({});
    // }
  }
  
  export { S3 };
  