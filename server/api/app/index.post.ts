import { randomUUID } from 'crypto'
import { saveDocument, saveFile } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    const uploadfiles = await readMultipartFormData(event)
    if (uploadfiles !== undefined) {
        for (const file of uploadfiles) {
            if (file.filename !== undefined) {
                const id = randomUUID()
                const extension = file.filename.split('.').pop()
                saveFile(`${id}.${extension}`, file.data)
                saveDocument('apps', id, {
                    id,
                    filename: file.filename,
                    type: file.type,
                    extension
                })
            }
        }
    }
})
