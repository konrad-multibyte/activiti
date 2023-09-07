// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['assets/css/main.css'],
    runtimeConfig: {
        mongoUri: process.env.MONGO_URI,
        mongoDb: process.env.MONGO_DB,
        s3Uri: process.env.S3_URI,
        s3Region: process.env.S3_REGION,
        s3Key: process.env.S3_KEY,
        s3AccessKey: process.env.S3_ACCESSKEY,
        s3Bucket: process.env.S3_BUCKET,
        fbApiKey: process.env.FB_API_KEY,
        FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
        FB_PROJECT_ID: process.env.FB_PROJECT_ID,
        FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
        FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
        FB_APP_ID: process.env.FB_APP_ID,
        FB_MEASUREMENT_ID: process.env.FB_APP_ID
    },
    vite: {
        server: {
            hmr: {
                protocol: 'wss'
            }
        }
    }
})
