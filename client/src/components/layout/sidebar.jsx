import { useState, useEffect, useRef } from 'react'
// import { useLocation } from 'wouter'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'
import GistList from '../gist/gist-list'
import { ThemeSwitcher } from '../theme-switcher'

const Sidebar = () => {
    const [search, setSearch] = useState('')
    // const [, setLocation] = useLocation()
    const searchInputRef = useRef(null)
    
    useEffect(() => {
        const handleKeyDown = e => {
            // eslint-disable-next-line no-restricted-globals
            if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
                setSearch('')
                searchInputRef.current?.blur()
            }
        }
        
        // eslint-disable-next-line no-restricted-globals
        document.addEventListener('keydown', handleKeyDown)
        
        // eslint-disable-next-line no-restricted-globals
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])
    
    return (
        <div className="w-80 border-r h-screen flex flex-col">
            <div className="p-4 border-b space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        ref={searchInputRef}
                        placeholder="Search gists..."
                        className="pl-9"
                        value={search}
                        onChange={e => setSearch(e.target.value)}/>
                </div>
                <ThemeSwitcher />
            </div>
            {/* <div className="p-4 text-center text-muted-foreground">
                <a href="/">Home</a>
            </div> */}
            <ScrollArea className="flex-1">
                <GistList search={search} />
            </ScrollArea>
        </div>
    )
}

export default Sidebar
