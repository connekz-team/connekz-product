import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ThemeToggle from '../../src/components/ThemeToggle.vue'

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

function mountToggle() {
  return mount(ThemeToggle, {
    global: {
      plugins: [createTestVuetify()],
    },
  })
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    mockMatchMedia(false)
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders a button', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('has accessible aria-label', () => {
    const wrapper = mountToggle()
    const btn = wrapper.find('button')
    expect(btn.attributes('aria-label')).toBe('Switch to dark theme')
  })

  it('toggles theme on click', async () => {
    const wrapper = mountToggle()
    await nextTick()

    const btn = wrapper.find('button')
    await btn.trigger('click')
    await nextTick()

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(btn.attributes('aria-label')).toBe('Switch to light theme')
  })

  it('toggles back to light on second click', async () => {
    const wrapper = mountToggle()
    await nextTick()

    const btn = wrapper.find('button')
    await btn.trigger('click')
    await nextTick()
    await btn.trigger('click')
    await nextTick()

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(btn.attributes('aria-label')).toBe('Switch to dark theme')
  })

  it('persists preference to localStorage on click', async () => {
    const wrapper = mountToggle()
    await nextTick()

    await wrapper.find('button').trigger('click')
    await nextTick()

    expect(localStorage.getItem('theme-preference')).toBe('dark')
  })
})
