import { create } from 'zustand'

const useStore = create((set) => ({
  theme: 'dark',
  activeSection: 'hero',
  isLoading: true,
  isMenuOpen: false,
  cursorVariant: 'default',

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', newTheme)
      return { theme: newTheme }
    }),
  setActiveSection: (section) => set({ activeSection: section }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsMenuOpen: (open) => set({ isMenuOpen: open }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))

export default useStore
