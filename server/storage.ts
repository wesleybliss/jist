import { users, type User, type InsertUser } from "@shared/schema"

export interface IStorage {
    getUser(username: string): Promise<User | undefined>
    createUser(user: InsertUser): Promise<User>
    getUserByToken(token: string): Promise<User | undefined>
}

export class MemStorage implements IStorage {
    private users: Map<string, User>
    private currentId: number

    constructor() {
        this.users = new Map()
        this.currentId = 1
    }

    async getUser(username: string): Promise<User | undefined> {
        return Array.from(this.users.values()).find(user => user.username === username)
    }

    async getUserByToken(token: string): Promise<User | undefined> {
        console.log('getUserByToken', token, this.users.values())
        return Array.from(this.users.values()).find(user => user.accessToken === token)
    }

    async createUser(insertUser: InsertUser): Promise<User> {
        const id = this.currentId++
        const user: User = {
            ...insertUser,
            id,
            createdAt: new Date()
        }
        this.users.set(user.username, user)
        return user
    }
}

export const storage = new MemStorage()
