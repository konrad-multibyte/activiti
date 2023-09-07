import { randomUUID } from 'crypto'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { upload } from '../../../types/S3'
import DocumentTemplate from '../../../types/DocumentTemplate'

export default defineEventHandler(async (event) => {
    const uploadFiles = await readMultipartFormData(event)
    const config = useRuntimeConfig(event)
    const files = []
    if (uploadFiles !== undefined) {
        const client = new MongoClient(config.mongoUri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })
        try {
            for (const file of uploadFiles) {
                try {
                    const document = new DocumentTemplate(file.filename, file.name, file.type, config.s3Bucket, file.data)
                    document.uploadData({
                        endpoint: config.s3Uri,
                        credentials: {
                            accessKeyId: config.s3Key,
                            secretAccessKey: config.s3AccessKey
                        },
                        region: config.s3Region
                    })
                    document.uploadMetaData(config.mongoUri, config.mongoDb)
                    // const id = randomUUID()
                    // const key = `${id}.${file.filename?.split('.')[file.filename.split('.').length - 1]}`
                    // const result = await upload({
                    //     endpoint: config.s3Uri,
                    //     credentials: {
                    //         accessKeyId: config.s3Key,
                    //         secretAccessKey: config.s3AccessKey
                    //     },
                    //     region: config.s3Region
                    // },
                    // config.s3Bucket, key, file.data).done()
                    // if (result) {
                    //     const metadata = {
                    //         key,
                    //         filename: file.filename,
                    //         name: file.name,
                    //         type: file.type,
                    //         etag: result.ETag.replace(/(["])/g, ''),
                    //         bucket: result.Bucket,
                    //         location: result.Location
                    //     }
                    //     await client.db(config.mongoDb).collection('template-document').insertOne(metadata)
                    //     files.push(metadata)
                    // }
                } catch (error) {
                    return error
                }
            }
            return files
        } finally {
            await client.close()
        }
    }
})
