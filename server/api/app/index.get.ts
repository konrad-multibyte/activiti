import { getDocuments } from '~/composables/firebase'

export default defineEventHandler(async (_event) => {
    const collection = await getDocuments('apps')
    return collection
})
