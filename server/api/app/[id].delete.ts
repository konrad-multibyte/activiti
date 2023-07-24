import { MongoClient, ServerApiVersion } from 'mongodb'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const config = useRuntimeConfig(event)
    const client = new MongoClient(config.mongoUri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    })
    try {
        await client.connect()
        const confirmation = await client.db(config.mongoDb).collection('apps').deleteOne({ id })
        const s3 = new S3Client({
            endpoint: config.s3Uri,
            credentials: {
                accessKeyId: config.s3Key,
                secretAccessKey: config.s3AccessKey
            },
            region: config.s3Region
        })
        const command = new DeleteObjectCommand({
            Bucket: config.s3Bucket,
            Key: `${id}.zip`
        })
        try {
            const response = await s3.send(command)
            console.log(response)
        } catch (err) {
            console.error(err)
        }
        return { confirmation }
    } finally {
        await client.close()
    }
})
