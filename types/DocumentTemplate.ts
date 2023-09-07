import { randomUUID } from 'crypto'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'

export default class DocumentTemplate {
    key!: string
    filename!: string
    name!: string
    type!: string
    etag!: string
    bucket!: string
    location!: string
    data!: Buffer

    constructor (filename: string, name: string, type: string, bucket: string, data: Buffer) {
        this.filename = filename
        this.name = name
        this.type = type
        this.bucket = bucket
        this.data = data
    }

    async uploadData (configuration: S3ClientConfig) {
        try {
            this.key = `${randomUUID()}.${this.filename?.split('.')[this.filename.split('.').length - 1]}`
            const response = await new Upload({
                client: new S3Client(configuration),
                params: {
                    Bucket: this.bucket,
                    Key: this.key,
                    Body: this.data
                }
            }).done()
            if (response) {
                this.etag = response.ETag.replace(/(["])/g, '')
                this.location = response.Location
            }
        } catch (error) {
            console.log(error)
        }
    }

    async uploadMetaData (url: string, db: string) {
        const client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })
        try {
            await client.db(db).collection('template-document').insertOne({
                key: this.key,
                filename: this.filename,
                name: this.name,
                type: this.type,
                etag: this.etag,
                bucket: this.bucket,
                location: this.location
            })
        } finally {
            await client.close()
        }
    }
}
