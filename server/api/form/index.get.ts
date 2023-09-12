import { getDocuments } from '~/composables/firebase'

export default defineEventHandler(async (_event) => {
    try {
        const forms = await getDocuments('forms')
        return forms
    } catch (error) {
        console.log(error)
    }
})
