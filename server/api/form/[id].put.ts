import { updateDocument } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const uploadFiles = await readMultipartFormData(event)
    if (uploadFiles !== undefined) {
        await updateDocument('forms', id, uploadFiles[0].data)
    }
})
