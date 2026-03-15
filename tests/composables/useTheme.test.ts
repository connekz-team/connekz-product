import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useThemeToggle } from '../../src/composables/useTheme'

function createTestVuetify() {
  return createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: { colors: { primary: '#1867C0' } },
        dark: { colors: { primary: '#2196F3' } },
      },
    },
  })
}

const TestComponent = defineComponent({
  setup() {
    const { theme, isDark, toggle, setTheme } = useThemeToggle()
    return { theme, isDark, toggle, setTheme }
  },
  template: '<div>{{ theme }}</div>',
})

function mockMatchMedia(prefersDark = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: prefersDark && query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

function mountComponent() {
  return mount(TestComponent, {
    global: {
      plugins: [createTestVuetify()],
    },
  })
}

describe('useThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    mockMatchMedia(false)
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to light theme', async () => {
    const wrapper = mountComponent()
    await nextTick()
    expect(wrapper.vm.theme).toBe('light')
    expect(wrapper.vm.isDark).toBe(false)
  })

  it('toggles from light to dark', async () => {
    const wrapper = mountComponent()
    await nextTick()
    wrapper.vm.toggle()
    await nextTick()
    expect(wrapper.vm.theme).toBe('dark')
    expect(wrapper.vm.isDark).toBe(true)
  })

  it('toggles from dark back to light', async () => {
    const wrapper = mountComponent()
    await nextTick()
    wrapper.vm.toggle()
    await nextTick()
    wrapper.vm.toggle()
    await nextTick()
    expect(wrapper.vm.theme).toBe('light')
    expect(wrapper.vm.isDark).toBe(false)
  })

  it('sets data-theme attribute on document element', async () => {
    const wrapper = mountComponent()
    await nextTick()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    wrapper.vm.toggle()
    await nextTick()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('persists theme preference to localStorage', async () => {
    const wrapper = mountComponent()
    await nextTick()
    wrapper.vm.toggle()
    await nextTick()
    expect(localStorage.getItem('theme-preference')).toBe('dark')
    wrapper.vm.toggle()
    await nextTick()
    expect(localStorage.getItem('theme-preference')).toBe('light')
  })

  it('restores saved theme on mount', async () => {
    localStorage.setItem('theme-preference', 'dark')
    const wrapper = mountComponent()
    await nextTick()
    await nextTick()
    expect(wrapper.vm.theme).toBe('dark')
    expect(wrapper.vm.isDark).toBe(true)
  })

  it('setTheme sets specific theme', async () => {
    const wrapper = mountComponent()
    await nextTick()
    wrapper.vm.setTheme('dark')
    await nextTick()
    expect(wrapper.vm.theme).toBe('dark')
    expect(localStorage.getItem('theme-preference')).toBe('dark')
    wrapper.vm.setTheme('light')
    await nextTick()
    expect(wrapper.vm.theme).toBe('light')
    expect(localStorage.getItem('theme-preference')).toBe('light')
  })

  it('falls back to system dark preference when no stored theme', async () => {
    mockMatchMedia(true)
    const wrapper = mountComponent()
    await nextTick()
    await nextTick()
    expect(wrapper.vm.theme).toBe('dark')
  })
})
