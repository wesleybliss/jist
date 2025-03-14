import { create } from 'zustand'

export const useDebugStore = create(set => ({
    enabled: false,
    toggle: () => set(state => ({ enabled: !state.enabled })),
}))
