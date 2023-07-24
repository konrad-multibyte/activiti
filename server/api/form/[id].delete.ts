import { MongoClient, ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const config = useRuntimeConfig(event)
    const client = new MongoClient(config.mongoUri, {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true
        }
    })
    try {
        await client.connect()
        const confirmation = await client.db(config.mongoDb).collection('forms').deleteOne({ _id: new ObjectId(id) })
        return { confirmation }
    } finally {
        await client.close()
    }
})
