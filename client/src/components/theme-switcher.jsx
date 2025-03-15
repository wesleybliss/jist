import { Moon, Sun, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/lib/theme-store'
import { useState, useEffect } from 'react'
import { Wifi, WifiOff } from 'lucide-react'

export function ThemeSwitcher() {
    const { theme, setTheme } = useThemeStore()
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    
    useEffect(() => {
        
        
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        // eslint-disable-next-line no-restricted-globals
        document.documentElement.setAttribute(
            'data-theme',
            theme === 'system' ? (isDark ? 'dark' : 'light') : theme,
        )
    }, [theme])
    
    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine)

        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)

        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
    }, [])
    
    return (
        <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme('light')}
                    className={theme === 'light' ? 'bg-accent' : ''}>
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Light</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme('dark')}
                    className={theme === 'dark' ? 'bg-accent' : ''}>
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Dark</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme('system')}
                    className={theme === 'system' ? 'bg-accent' : ''}>
                    <Laptop className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">System</span>
                </Button>
            </div>
            <div className="flex justify-end items-center gap-2 text-sm text-muted-foreground">
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
        </div>
    )
}
