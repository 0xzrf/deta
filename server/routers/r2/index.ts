import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import type { HttpRequest } from "@aws-sdk/protocol-http";
import { env } from "@/env";
import { QAPair } from "@/server/schemas/qa";

export class QAClassificationStorage {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.client = this.createS3Client();
    this.bucket = env.CLOUDFLARE_BUCKET_NAME;
  }

  async listUserPairs(walletAddress: string): Promise<QAPair[]> {
    let continuationToken: string | undefined;
    const allPairs: QAPair[] = [];

    do {
      const { objects, nextToken } = await this.listObjects(
        "qa/",
        continuationToken
      );

      const pairs = await Promise.all(
        objects.map(async (obj) => {
          if (!obj.Key) return null;
          try {
            const pair = await this.getJSON<QAPair>(obj.Key);
            return pair.walletAddress === walletAddress ? pair : null;
          } catch {
            return null;
          }
        })
      );

      allPairs.push(...pairs.filter((p): p is QAPair => p !== null));
      continuationToken = nextToken;
    } while (continuationToken);

    return allPairs;
  }

  private createS3Client() {
    const client = new S3Client({
      region: "auto",
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });

    client.middlewareStack.add(
      (next) => async (args) => {
        const request = args.request as HttpRequest;
        delete request.headers["x-amz-checksum-mode"];
        request.headers["x-amz-checksum-algorithm"] = "CRC32";
        return next(args);
      },
      { step: "build", name: "r2ChecksumFix", priority: "high" }
    );

    return client;
  }

  async saveJSON(key: string, data: unknown) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: JSON.stringify(data),
        ContentType: "application/json",
      })
    );
  }

  async getJSON<T>(key: string): Promise<T> {
    const response = await this.client.send(
      new GetObjectCommand({ Bucket: this.bucket, Key: key })
    );
    return JSON.parse(await response.Body!.transformToString());
  }

  async listObjects(prefix: string, continuationToken?: string) {
    const response = await this.client.send(
      new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    );

    return {
      objects: response.Contents ?? [],
      nextToken: response.NextContinuationToken,
    };
  }
}
