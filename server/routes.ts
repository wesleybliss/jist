import type { Express } from "express"
import { createServer } from "http"
import { storage } from "./storage"
import { insertUserSchema } from "@shared/schema"
import { Octokit } from "@octokit/rest"

export async function registerRoutes(app: Express) {
    console.log('registerRoutes')
    
    app.use('/api/proxy', async (req, res) => {
        try {
            const url = unescape(req.query.url);
            const method = req.method;
            const headers = req.headers;
            let body
            
            // Do not foward host header
            delete headers.host

            if (!url) {
                return res.status(400).send('URL parameter is required');
            }
            
            // Determine if the request has a body
            if (method !== 'GET' && method !== 'HEAD') {
                const chunks = [];
                for await (const chunk of req) {
                    chunks.push(chunk);
                }
                body = Buffer.concat(chunks);

                if (body.length > 0) {
                    headers['Content-Length'] = body.length.toString();
                } else {
                    delete headers['Content-Length'];
                }
            } else {
                delete headers['Content-Length'];
            }
            
            // Configure fetch options
            const options = {
                method,
                headers,
                body,
            };

            console.log('api proxying', url, options);
            
            const response = await fetch(url, options);
            const data = await response.text(); // Use text() to handle all types of responses
            res.status(response.status).send(data);


        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while proxying the request');
        }
    });
    
    app.post("/api/auth/github", async (req, res) => {
        console.log('api/auth/github', req.body)
        
        const validation = insertUserSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({ message: "Invalid request body" })
        }

        const { username, accessToken } = validation.data
        
        try {
            const octokit = new Octokit({ auth: accessToken })
            await octokit.users.getAuthenticated()
            
            const user = await storage.createUser({ username, accessToken })
            req.session.userId = user.id
            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: "Invalid GitHub token" })
        }
    })

    app.get("/api/gists", async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }

        /* const user = await storage.getUserByToken(token)
        
        if (!user)
            return res.status(401).json({ message: "Invalid token" }) */
        
        console.log('api/gists', 'authenticating with octokit', token)
        try {
            const octokit = new Octokit({ auth: token })
            const response = await octokit.gists.list()
            res.json(response.data)
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch gists" })
        }
    })

    app.get("/api/gists/:id", async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }

        /* const user = await storage.getUserByToken(token)
        if (!user) {
            return res.status(401).json({ message: "Invalid token" })
        } */

        try {
            const octokit = new Octokit({ auth: token })
            const response = await octokit.gists.get({ gist_id: req.params.id })
            res.json(response.data)
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch gist" })
        }
    })

    const httpServer = createServer(app)
    return httpServer
}
