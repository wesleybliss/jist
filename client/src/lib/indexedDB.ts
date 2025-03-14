// import { Gist } from '@shared/schema'

const DB_NAME = 'gistsDB'
const STORE_NAME = 'gists'
const DB_VERSION = 1

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)
        
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
        
        request.onupgradeneeded = event => {
            const db = (event.target).result
            
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' })
            }
        }
    })
}

//: Gist[]
export const saveGists = async gists => {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    
    return Promise.all(
        gists.map(gist => 
            new Promise((resolve, reject) => {
                const request = store.put(gist)
                
                request.onsuccess = () => resolve(undefined)
                request.onerror = () => reject(request.error)
            }),
        ),
    )
}

//: Gist[]
export const getGists = async () => {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    
    return new Promise((resolve, reject) => {
        const request = store.getAll()
        
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

//Promise<Gist | undefined>
export const getGistById = async id => {
    const db = await initDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    
    return new Promise((resolve, reject) => {
        const request = store.get(id)
        
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}
