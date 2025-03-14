import { Gist } from "@shared/schema"

const DB_NAME = "gistsDB"
const STORE_NAME = "gists"
const DB_VERSION = 1

export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" })
            }
        }
    })
}

export const saveGists = async (gists: Gist[]) => {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, "readwrite")
    const store = tx.objectStore(STORE_NAME)

    return Promise.all(
        gists.map(gist => 
            new Promise((resolve, reject) => {
                const request = store.put(gist)
                request.onsuccess = () => resolve(undefined)
                request.onerror = () => reject(request.error)
            })
        )
    )
}

export const getGists = async (): Promise<Gist[]> => {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const request = store.getAll()
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export const getGistById = async (id: string): Promise<Gist | undefined> => {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const request = store.get(id)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}
