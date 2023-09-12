import { deleteDocument } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    await deleteDocument('forms', id)
})
