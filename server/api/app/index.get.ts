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
        const apps = await client.db(config.mongoDb).collection('apps').find({}).toArray()
        return { apps }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})
