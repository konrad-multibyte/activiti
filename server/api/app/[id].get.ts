import { MongoClient, ServerApiVersion } from 'mongodb'

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
        const app = await client.db(config.mongoDb).collection('apps').findOne({ id })
        return { app }
    } finally {
        await client.close()
    }
})
