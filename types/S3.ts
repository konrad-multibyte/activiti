import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

export function upload (clientConfig: {
    endpoint: string,
    credentials: {
        accessKeyId: string,
        secretAccessKey: string
    },
    region: string
}, bucket: string, name: string, data: Buffer) {
    const result = new Upload({
        client: new S3Client(clientConfig),
        params: {
            Bucket: bucket,
            Key: name,
            Body: data
        }
    })
    return result
}
