import { computed, watch, onMounted } from 'vue'
import { useTheme as useVuetifyTheme } from 'vuetify'

export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

function getStoredTheme(): ThemeName | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable
  }
  return null
}

function storeTheme(theme: ThemeName): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // localStorage unavailable
  }
}

function getSystemPreference(): ThemeName {
  try {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
  } catch {
    // matchMedia unavailable
  }
  return 'light'
}

export function useThemeToggle() {
  const vuetifyTheme = useVuetifyTheme()

  const theme = computed<ThemeName>(() => vuetifyTheme.global.name.value as ThemeName)

  const isDark = computed(() => theme.value === 'dark')

  function applyTheme(newTheme: ThemeName): void {
    vuetifyTheme.global.name.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    storeTheme(newTheme)
  }

  function toggle(): void {
    applyTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  function setTheme(newTheme: ThemeName): void {
    applyTheme(newTheme)
  }

  // Sync data-theme attribute whenever Vuetify theme changes
  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
  })

  // Initialize on mount: restore saved preference or use system preference
  onMounted(() => {
    const initial = getStoredTheme() ?? getSystemPreference()
    applyTheme(initial)

    // Listen for system preference changes
    try {
      if (typeof window.matchMedia === 'function') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => {
          if (!getStoredTheme()) {
            applyTheme(e.matches ? 'dark' : 'light')
          }
        }
        mediaQuery.addEventListener('change', handler)
      }
    } catch {
      // matchMedia unavailable
    }
  })

  return { theme, isDark, toggle, setTheme }
}
