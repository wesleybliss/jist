import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create()(
    persist(
        set => ({
            theme: 'system',
            setTheme: theme => set({ theme }),
        }),
        {
            name: 'theme-storage',
        },
    ),
)

// Update theme based on system preference
export const initializeTheme = () => {
    
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = useThemeStore.getState().theme
    
    // eslint-disable-next-line no-restricted-globals
    document.documentElement.setAttribute(
        'data-theme',
        theme === 'system' ? (isDark ? 'dark' : 'light') : theme,
    )
}

// Watch for system theme changes
if (typeof window !== 'undefined') {
    
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const theme = useThemeStore.getState().theme
        
        if (theme === 'system') {
            // eslint-disable-next-line no-restricted-globals
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
        }
    })
}
