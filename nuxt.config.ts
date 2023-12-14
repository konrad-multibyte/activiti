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
        s3Bucket: process.env.S3_BUCKET
    },
    vite: {
        server: {
            hmr: {
                protocol: 'wss'
            }
        }
    },
    nitro: {
        firebase: {
            gen: 2,
            httpsOptions: {
                region: 'europe-west1',
                maxInstances: 2
            }
        }
    }
})
