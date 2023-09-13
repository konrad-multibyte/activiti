import { getDocument } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const document = await getDocument('forms', id)
    return document
})
