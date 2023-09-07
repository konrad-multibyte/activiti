import { getDocuments } from '~/composables/firebase'

export default defineEventHandler(async () => {
    const collection = await getDocuments('templatedocument')
    return collection
})
