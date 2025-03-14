// import { users } from '@shared/schema'

export class MemStorage {
    
    constructor() {
        this.users = new Map()
        this.currentId = 1
    }
    
    async getUser(username) {
        return Array.from(this.users.values()).find(user => user.username === username)
    }
    
    async getUserByToken(token) {
        console.log('getUserByToken', token, this.users.values())
        return Array.from(this.users.values()).find(user => user.accessToken === token)
    }
    
    async createUser(insertUser) {
        const id = this.currentId++
        const user = {
            ...insertUser,
            id,
            createdAt: new Date(),
        }
        
        this.users.set(user.username, user)
        return user
    }
}

export const storage = new MemStorage()
