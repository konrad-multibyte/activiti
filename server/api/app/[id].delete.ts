import { deleteDocument, deleteFile } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const app = await deleteDocument('apps', id)
    if (app !== undefined) {
        await deleteFile(`${app.id}.${app.extension}`)
    }
})
