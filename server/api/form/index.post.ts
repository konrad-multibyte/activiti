import { MongoClient } from 'mongodb'
import Form from '../../../types/Form'

export default defineEventHandler(async (event) => {
    const uploadfiles = await readMultipartFormData(event)
    console.log(uploadfiles)
    const config = useRuntimeConfig(event)
    if (uploadfiles !== undefined) {
        const client = new MongoClient(config.mongoUri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true
            }
        })
        const files = []
        try {
            await client.connect()
            for (const file of uploadfiles) {
                if (file.type === 'application/json') {
                    try {
                        const form = JSON.parse(file.data.toString())
                        const result = await client.db(config.mongoDb).collection<Form>('forms').insertOne(form)
                        files.push(result)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } finally {
            await client.close()
        }

        return { files }
    } else {
        throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'The payload is not provided. Please provide multipart form data.' })
    }
})
