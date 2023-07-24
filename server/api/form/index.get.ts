import { MongoClient } from 'mongodb'
import Form from '../../../types/Form'

export default defineEventHandler(async (event) => {
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
        const forms = await client.db(config.mongoDb).collection<Form>('forms').find<Form>({}).toArray()
        return forms
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})
