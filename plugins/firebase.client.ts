import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    console.log(config.fbApiKey)
    const firebaseConfig = {
        apiKey: config.fbApiKey,
        authDomain: config.FB_AUTH_DOMAIN,
        projectId: config.FB_PROJECT_ID,
        storageBucket: config.FB_STORAGE_BUCKET,
        messagingSenderId: config.FB_MESSAGING_SENDER_ID,
        appId: config.FB_APP_ID,
        measurementId: config.FB_MEASUREMENT_ID
    }
    const app = initializeApp(firebaseConfig)
    // const analytics = getAnalytics(app)
    // const auth = getAuth(app)
    // nuxtApp.vueApp.provide('auth', auth)
    // nuxtApp.provide('auth', auth)
    const firestore = getFirestore(app)
    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)
})
