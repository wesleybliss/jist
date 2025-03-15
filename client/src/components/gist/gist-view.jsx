import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getGistById } from '@/lib/indexedDB'
import { useDebugStore } from '@/lib/debug-store'
import { sampleGists } from '@/lib/dev-data'
import { fetchGist } from '@/lib/api'

const GistView = ({ id }) => {
    const debugEnabled = useDebugStore(state => state.enabled)
    
    const { data: gist, isLoading } = useQuery({
        queryKey: [`/api/gists/${id}`],
        queryFn: async (/* { queryKey } */) => {
            if (debugEnabled) {
                return sampleGists.find(g => g.id === id)
            }
            
            try {
                // Try to fetch from API first
                const response = await fetchGist(id)
                const data = await response.json()
                
                return data
            } catch (error) {
                console.error(error)
                // If offline or error, load from IndexedDB
                console.log('Loading from IndexedDB...')
                return getGistById(id)
            }
        },
        enabled: !!id,
    })
    
    if (isLoading) {
        return (
            <div className="p-8">
                <Card className="animate-pulse">
                    <CardHeader>
                        <div className="h-6 bg-muted rounded w-1/3" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded" />
                            <div className="h-4 bg-muted rounded" />
                            <div className="h-4 bg-muted rounded w-2/3" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    console.log('gist', gist)
    
    if (!gist || !gist.files) {
        return (
            <div className="p-8">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">Gist not found</p>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    return (
        <ScrollArea className="h-screen">
            <div className="p-8">
                {Object.entries(gist.files).map(([filename, file]) => (
                    <Card key={filename} className="mb-6">
                        <CardHeader>
                            <CardTitle>{filename}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <pre className="overflow-x-auto p-4 bg-muted rounded-md">
                                <code>{file.content}</code>
                            </pre>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    )
}

export default GistView
