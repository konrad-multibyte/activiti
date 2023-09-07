import { MongoClient, ServerApiVersion } from 'mongodb'

export default defineEventHandler(async (event) => {
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
        const template = await client.db(config.mongoDb).collection('document-templates').find({}).toArray()
        return template
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})
