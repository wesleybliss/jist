import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => set({ theme })
        }),
        {
            name: 'theme-storage'
        }
    )
)

// Update theme based on system preference
export const initializeTheme = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = useThemeStore.getState().theme
    
    document.documentElement.setAttribute(
        'data-theme',
        theme === 'system' ? (isDark ? 'dark' : 'light') : theme
    )
}

// Watch for system theme changes
if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const theme = useThemeStore.getState().theme
        if (theme === 'system') {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
        }
    })
}
