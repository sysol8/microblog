import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/*
@Module({
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const endpoint = config.getOrThrow<string>('S3_ENDPOINT_URL');
        const region   = config.getOrThrow<string>('S3_DEFAULT_REGION');
        const bucket   = config.getOrThrow<string>('S3_BUCKET_NAME');
        const accessKeyId     = config.getOrThrow<string>('S3_ACCESS_KEY_ID');
        const secretAccessKey = config.getOrThrow<string>('S3_SECRET_ACCESS_KEY');
      }
    }
  ]
})*/
