import AWS from 'aws-sdk';
import S3, { PutObjectRequest } from 'aws-sdk/clients/s3';
import fs from 'fs';
import path from 'path';

export interface S3Config {
  accessKeyId: string,
  secretAccessKey: string,
  bucketName: string,
  cfDomain: string,
}

export default class S3Client {
  private readonly s3: S3;

  private readonly bucketName: string;

  private readonly cfDomain: string;

  constructor({ accessKeyId, secretAccessKey, bucketName, cfDomain }: S3Config) {
    this.s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
    });
    this.bucketName = bucketName || '';
    this.cfDomain = cfDomain || '';
  }

  uploadFile(filePath: string): Promise<string> {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    console.log('Uploading...');

    // Setting up S3 upload parameters
    const params: PutObjectRequest = {
      Bucket: this.bucketName || '',
      Key: fileName,
      Body: fileContent,
      ContentType: 'image/png',
    };

    return new Promise((resolve, reject) => {
      // Uploading files to the bucket
      this.s3.upload(params, (err: Error) => {
        if (err) return reject(err);

        return resolve(`https://${this.cfDomain}/${fileName}`);
      });
    });
  };
}
