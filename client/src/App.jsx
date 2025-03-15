import { Switch, Route, useLocation } from 'wouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { Toaster } from '@/components/ui/toaster'
import Home from '@/pages/home'
import GistPage from '@/pages/gist'
import Sidebar from '@/components/layout/sidebar'
import NotFound from '@/pages/not-found'
import { useState, useEffect } from 'react'
import { authenticateWithGitHub, authenticateUser } from './lib/api'
import { useToast } from './hooks/use-toast'
import { saveGists } from './lib/indexedDB'
import { sampleGists } from './lib/dev-data'
import { useDebugStore } from './lib/debug-store'
import { initializeTheme } from './lib/theme-store'

// Initialize sample data in development mode
if (import.meta.env.DEV) {
    saveGists(sampleGists).catch(console.error)
}

const Router = () => {
    
    const [location/* , setLocation */] = useLocation()
    const { toast } = useToast()
    const debugEnabled = useDebugStore(state => state.enabled)
    
    const [loading, setLoading] = useState(true)
    const [code, setCode] = useState()
    
    /* useEffect(() => {
        if (debugEnabled) {
            setLocation("/gist/sample1")
        }
    }, [debugEnabled]) */
    
    useEffect(() => {
        initializeTheme()
    }, [])
    
    // Allow access if debug mode is enabled or in development
    /* if (location === "/" && !debugEnabled && !import.meta.env.DEV) {
        return <Home />
    } */
    
    useEffect(() => {
        const url = new URL(window.location.href)
        const _code = url.searchParams.get('code')
        
        setCode(_code)
        
        if (_code /* && !debugEnabled */) {
            console.log('authenticating with code', _code)
            authenticateWithGitHub(_code)
                .then(token => {
                    console.log('authenticating user with token', token)
                    return authenticateUser(token)
                })
                .then(() => window.location.href = '/')
                .catch(e => {
                    console.error(e)
                    toast({
                        title: 'Error',
                        description: 'Failed to authenticate with GitHub',
                        variant: 'destructive',
                    })
                })
                .finally(() => {
                    console.log('finally')
                    // strip code from url
                    const url = new URL(window.location.href)
                    
                    url.searchParams.delete('code')
                    setLoading(false)
                    window.history.replaceState({}, '', url.toString())
                })
        } else {
            setLoading(false)
        }
    }, [debugEnabled])
    
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    /* if (location === "/" && !debugEnabled) {
        return <Home />
    } */
    
    if (location === '/' && !code?.length && (!localStorage.getItem('user')?.length || !user))
        return <Home />
    
    if (loading)
        return <p>Loading...</p>
    
    if (!localStorage.getItem('user')?.length || !user) {
        return <Home />
    } else {
        console.log('user', user)
    }
    
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <Switch>
                    <Route path="/gist/:id" component={GistPage} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        </div>
    )
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
            <Toaster />
        </QueryClientProvider>
    )
}

export default App
