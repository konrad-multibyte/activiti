import { randomUUID } from 'crypto'
import { saveDocument } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    const uploadfiles = await readMultipartFormData(event)
    if (uploadfiles !== undefined) {
        for (const file of uploadfiles) {
            if (file.type === 'application/json') {
                try {
                    const id = randomUUID()
                    const data = JSON.parse(file.data.toString())
                    saveDocument('forms', id, {
                        id,
                        data
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    } else {
        throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'The payload is not provided. Please provide multipart form data.' })
    }
})
