import { Moon, Sun, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/lib/theme-store'
import { useEffect } from 'react'

export function ThemeSwitcher() {
    const { theme, setTheme } = useThemeStore()
    
    useEffect(() => {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        document.documentElement.setAttribute(
            'data-theme',
            theme === 'system' ? (isDark ? 'dark' : 'light') : theme,
        )
    }, [theme])
    
    return (
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
    )
}
