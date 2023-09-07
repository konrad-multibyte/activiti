import { randomUUID } from 'crypto'
import { saveDocument, saveFile } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    const uploadFiles = await readMultipartFormData(event)

    if (uploadFiles !== undefined) {
        for (const file of uploadFiles) {
            console.log(file)
            if (file.filename !== undefined) {
                const id = randomUUID()
                const extension = file.filename.split('.').pop()
                saveFile(`${id}.${extension}`, file.data)
                saveDocument('templatedocument', id, {
                    id,
                    filename: file.filename,
                    type: file.type,
                    extension
                })
            }
        }
    }
})
