import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Bug } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { authenticateWithGitHub, authenticateUser } from "@/lib/api"
import { useDebugStore } from "@/lib/debug-store"
import { useEffect } from "react"
import { useLocation } from "wouter"

const Home = () => {
    const { toast } = useToast()
    const { enabled: debugEnabled, toggle: toggleDebug } = useDebugStore()
    const [, setLocation] = useLocation()

    useEffect(() => {
        if (debugEnabled) {
            setLocation("/gist/sample1")
        }
    }, [debugEnabled])

    const handleLogin = async () => {
        try {
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to authenticate with GitHub",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Card className="w-[400px]">
                <CardHeader className="text-center">
                    <CardTitle>GitHub Gists Manager</CardTitle>
                    <CardDescription>
                        Sign in with GitHub to manage your gists
                    </CardDescription>
                    <div className="space-y-2">
                        <Button 
                            className="w-full" 
                            onClick={handleLogin}
                            disabled={debugEnabled}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            Sign in with GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={toggleDebug}
                        >
                            <Bug className="mr-2 h-4 w-4" />
                            {debugEnabled ? 'Disable' : 'Enable'} Debug Mode
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Home
