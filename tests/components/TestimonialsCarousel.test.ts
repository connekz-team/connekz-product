import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TestimonialsCarousel from '../../src/components/TestimonialsCarousel.vue'

function mountCarousel() {
  return mount(TestimonialsCarousel, {
    global: {
      stubs: {
        'v-container': { template: '<div><slot /></div>' },
        'v-card': { template: '<div><slot /></div>' },
      },
    },
  })
}

describe('TestimonialsCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    const wrapper = mountCarousel()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders all testimonial slides', () => {
    const wrapper = mountCarousel()
    const slides = wrapper.findAll('.testimonials-slide')
    expect(slides.length).toBe(wrapper.vm.testimonials.length)
  })

  it('renders navigation dots matching testimonial count', () => {
    const wrapper = mountCarousel()
    const dots = wrapper.findAll('.testimonials-dot')
    expect(dots.length).toBe(wrapper.vm.testimonials.length)
  })

  it('starts at index 0', () => {
    const wrapper = mountCarousel()
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('auto-scrolls to next slide after 5 seconds', async () => {
    const wrapper = mountCarousel()
    expect(wrapper.vm.currentIndex).toBe(0)

    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(1)
  })

  it('cycles back to first slide after last', async () => {
    const wrapper = mountCarousel()
    const total = wrapper.vm.testimonials.length

    vi.advanceTimersByTime(5000 * total)
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('navigates to specific slide on dot click', async () => {
    const wrapper = mountCarousel()
    const dots = wrapper.findAll('.testimonials-dot')

    await dots[2].trigger('click')
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(2)

    await dots[4].trigger('click')
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(4)
  })

  it('marks active dot correctly', async () => {
    const wrapper = mountCarousel()
    const dots = wrapper.findAll('.testimonials-dot')

    expect(dots[0].classes()).toContain('testimonials-dot--active')
    expect(dots[1].classes()).not.toContain('testimonials-dot--active')

    await dots[3].trigger('click')
    await nextTick()

    const updatedDots = wrapper.findAll('.testimonials-dot')
    expect(updatedDots[3].classes()).toContain('testimonials-dot--active')
    expect(updatedDots[0].classes()).not.toContain('testimonials-dot--active')
  })

  it('pauses auto-scroll on hover', async () => {
    const wrapper = mountCarousel()
    const carousel = wrapper.find('[data-testid="carousel"]')

    await carousel.trigger('mouseenter')
    expect(wrapper.vm.isHovered).toBe(true)

    vi.advanceTimersByTime(10000)
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(0)
  })

  it('resumes auto-scroll on mouse leave', async () => {
    const wrapper = mountCarousel()
    const carousel = wrapper.find('[data-testid="carousel"]')

    await carousel.trigger('mouseenter')
    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(0)

    await carousel.trigger('mouseleave')
    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(wrapper.vm.currentIndex).toBe(1)
  })

  it('applies correct transform style based on currentIndex', async () => {
    const wrapper = mountCarousel()
    const track = wrapper.find('.testimonials-track')

    expect(track.attributes('style')).toContain('translateX(-0%)')

    const dots = wrapper.findAll('.testimonials-dot')
    await dots[2].trigger('click')
    await nextTick()

    expect(track.attributes('style')).toContain('translateX(-200%)')
  })
})
