import { getDocument, getFileDownloadUrl } from '~/composables/firebase'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params
    const app = await getDocument('apps', id)
    if (app !== undefined) {
        const downloadUrl = getFileDownloadUrl(app.filename)
        return { app, downloadUrl }
    } else {
        return app
    }
})
