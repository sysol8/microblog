import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  S3_BUCKET_NAME,
  S3_DEFAULT_REGION,
  S3_ENDPOINT_URL,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
} from '../config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private readonly bucket = S3_BUCKET_NAME;
  private readonly region = S3_DEFAULT_REGION;
  private readonly endpoint = S3_ENDPOINT_URL;
  private readonly accessKeyId = S3_ACCESS_KEY_ID;
  private readonly secretAccessKey = S3_SECRET_ACCESS_KEY;

  constructor() {
    /*this.s3 = new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });*/
  }
}
