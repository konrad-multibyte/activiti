import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDocs, collection, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_APP_ID
}

const app = initializeApp(firebaseConfig)

// export const analytics = getAnalytics(app)
// export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)

export const saveFile = (fullPath: string, bytes: Buffer) => {
    const storageRef = ref(storage, fullPath)
    uploadBytes(storageRef, bytes.buffer)
}

export const saveDocument = (path: string, pathSegments: string, document: object) => {
    const documentRef = doc(firestore, path, pathSegments)
    setDoc(documentRef, document)
}

// Firestore
export async function getDocuments (c: string) {
    const querySnapshot = await getDocs(collection(firestore, c))
    return querySnapshot.docs.map(doc => doc.data())
}

export async function getDocument (collection: string, id: string) {
    const documentRef = doc(firestore, collection, id)
    const document = await getDoc(documentRef)
    return document.data()
}

export async function updateDocument (collection: string, id: string, document: object) {
    const documentRef = doc(firestore, collection, id)
    const result = await updateDoc(documentRef, document)
    return result
}

export async function deleteDocument (collection: string, id: string) {
    const documentRef = doc(firestore, collection, id)
    const result = await deleteDoc(documentRef)
    return result
}
