import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'wouter'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { getGists, saveGists } from '@/lib/indexedDB'
import { useDebugStore } from '@/lib/debug-store'
import { fetchGists } from '@/lib/api'

const GistList = ({ search }) => {
    const [, setLocation] = useLocation()
    
    const debugEnabled = useDebugStore(state => state.enabled)
    
    console.log('GistList', { debugEnabled })
    const { data: gists, isLoading } = useQuery({
        queryKey: ['/api/gists'],
        queryFn: async (/* { queryKey } */) => {
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
                console.log('Loading from IndexedDB...')
                return getGists()
            }
        },
    })
    
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
            filename.toLowerCase().includes(search.toLowerCase()),
        ),
    )
    
    return (
        <ScrollArea className="h-full">
            <div className="p-4">
                <div className="space-y-2">
                    {filteredGists?.map(gist => console.log('gist', gist) || (
                        <Card
                            key={gist.id}
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => setLocation(`/gist/${gist.id}`)}>
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    {Object.keys(gist.files)[0]}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {format(new Date(gist.created_at), 'PPP')}
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
