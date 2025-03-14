import { useQuery } from "@tanstack/react-query"
import { useLocation } from "wouter"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { getGists, saveGists } from "@/lib/indexedDB"
import { useEffect, useState } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { useDebugStore } from "@/lib/debug-store"
import { sampleGists } from "@/lib/dev-data"
import { fetchGists } from "@/lib/api"

const GistList = ({ search }: { search: string }) => {
    const [, setLocation] = useLocation()
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const debugEnabled = useDebugStore((state) => state.enabled)
    console.log('GistList', { debugEnabled })
    const { data: gists, isLoading } = useQuery({
        queryKey: ["/api/gists"],
        queryFn: async ({ queryKey }) => {
            console.log('GistList queryFn')
            /* if (debugEnabled) {
                return sampleGists
            } */

            try {
                // Try to fetch from API first
                const response = await fetchGists()
                const data = await response.json()
                console.log('fetchGists', data)
                // Save to IndexedDB for offline access
                await saveGists(data)
                return data
            } catch (error) {
                // If offline or error, load from IndexedDB
                console.error('GistList queryFn', error)
                console.log("Loading from IndexedDB...")
                return getGists()
            }
        }
    })

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine)
        window.addEventListener("online", updateOnlineStatus)
        window.addEventListener("offline", updateOnlineStatus)
        return () => {
            window.removeEventListener("online", updateOnlineStatus)
            window.removeEventListener("offline", updateOnlineStatus)
        }
    }, [])

    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader>
                            <div className="h-5 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                        </CardHeader>
                    </Card>
                ))}
            </div>
        )
    }

    const filteredGists = gists?.filter(gist => 
        gist.description?.toLowerCase().includes(search.toLowerCase()) ||
        Object.keys(gist.files).some(filename => 
            filename.toLowerCase().includes(search.toLowerCase())
        )
    )

    return (
        <ScrollArea className="h-full">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    {isOnline ? (
                        <>
                            <Wifi className="h-4 w-4" />
                            <span>Online</span>
                        </>
                    ) : (
                        <>
                            <WifiOff className="h-4 w-4" />
                            <span>Offline</span>
                        </>
                    )}
                </div>
                <div className="space-y-4">
                    {filteredGists?.map(gist => console.log('gist', gist) || (
                        <Card
                            key={gist.id}
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => setLocation(`/gist/${gist.id}`)}
                        >
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    {Object.keys(gist.files)[0]}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {format(new Date(gist.created_at), "PPP")}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}

export default GistList
