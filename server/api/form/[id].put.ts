import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import Form from '../../../types/Form'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const uploadFiles = await readMultipartFormData(event)
    const config = useRuntimeConfig(event)
    const client = new MongoClient(config.mongoUri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    })
    const files = []
    try {
        await client.connect()
        if (uploadFiles != null) {
            for (const file of uploadFiles) {
                if (file.type === 'application/json') {
                    try {
                        const form = JSON.parse(file.data.toString())
                        const result = await client.db(config.mongoDb).collection<Form>('forms').updateOne({ _id: new ObjectId(id) }, { $set: form }, {})
                        files.push(result)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    } finally {
        try {
            await client.close()
        } catch (error) {
            console.log(error)
        }
    }
    return { uploadFiles }
})
