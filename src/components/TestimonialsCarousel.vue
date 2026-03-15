<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  logo: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'This platform completely transformed how our team collaborates. The results have been incredible.',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Acme Corp',
    logo: 'https://via.placeholder.com/60x60?text=AC',
  },
  {
    quote: 'We saw a 40% increase in productivity within the first month. Truly a game-changer for us.',
    name: 'James Wilson',
    role: 'VP of Engineering',
    company: 'TechFlow Inc',
    logo: 'https://via.placeholder.com/60x60?text=TF',
  },
  {
    quote: 'The customer support is outstanding. Every issue was resolved quickly and professionally.',
    name: 'Maria Garcia',
    role: 'Product Manager',
    company: 'Innovate Labs',
    logo: 'https://via.placeholder.com/60x60?text=IL',
  },
  {
    quote: 'Seamless integration with our existing tools. Our developers loved the clean API design.',
    name: 'David Park',
    role: 'Lead Developer',
    company: 'CloudNine Solutions',
    logo: 'https://via.placeholder.com/60x60?text=C9',
  },
  {
    quote: 'The best investment we made this year. ROI was visible within weeks of deployment.',
    name: 'Emily Thompson',
    role: 'CEO',
    company: 'Bright Ventures',
    logo: 'https://via.placeholder.com/60x60?text=BV',
  },
]

const currentIndex = ref(0)
const isHovered = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const slideStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}))

function next() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

function goTo(index: number) {
  currentIndex.value = index
}

function startAutoScroll() {
  stopAutoScroll()
  intervalId = setInterval(() => {
    if (!isHovered.value) {
      next()
    }
  }, 5000)
}

function stopAutoScroll() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function pauseAutoScroll() {
  isHovered.value = true
}

function resumeAutoScroll() {
  isHovered.value = false
}

onMounted(() => {
  startAutoScroll()
})

onUnmounted(() => {
  stopAutoScroll()
})

defineExpose({ currentIndex, isHovered, testimonials })
</script>

<template>
  <section
    class="testimonials-section"
    role="region"
    aria-labelledby="testimonials-heading"
  >
    <v-container class="testimonials-container">
      <h2
        id="testimonials-heading"
        class="text-h4 font-weight-bold text-center mb-10"
      >
        What Our Clients Say
      </h2>

      <div
        data-testid="carousel"
        class="testimonials-carousel"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
      >
        <div class="testimonials-track" :style="slideStyle">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonials-slide"
          >
            <v-card
              class="pa-8 pa-md-12 text-center"
              elevation="0"
              rounded="xl"
            >
              <img
                :src="testimonial.logo"
                :alt="`${testimonial.company} logo`"
                class="testimonials-logo mx-auto mb-6"
                width="60"
                height="60"
                loading="lazy"
              />
              <blockquote class="text-h6 text-md-h5 font-weight-light font-italic text-medium-emphasis mb-6">
                "{{ testimonial.quote }}"
              </blockquote>
              <p class="text-body-1 font-weight-bold mb-1">{{ testimonial.name }}</p>
              <p class="text-body-2 text-primary font-weight-medium">
                {{ testimonial.role }}, {{ testimonial.company }}
              </p>
            </v-card>
          </div>
        </div>
      </div>

      <div class="testimonials-dots" role="tablist" aria-label="Testimonial navigation">
        <button
          v-for="(_, i) in testimonials"
          :key="i"
          role="tab"
          :aria-selected="i === currentIndex"
          :aria-label="`Go to testimonial ${i + 1}`"
          class="testimonials-dot"
          :class="{ 'testimonials-dot--active': i === currentIndex }"
          @click="goTo(i)"
        />
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: 5rem 0;
  background: linear-gradient(to bottom, rgba(var(--v-theme-surface-variant), 0.3), transparent);
}

.testimonials-container {
  max-width: 960px;
}

.testimonials-carousel {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}

.testimonials-track {
  display: flex;
  transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonials-slide {
  min-width: 100%;
  flex-shrink: 0;
}

.testimonials-logo {
  display: block;
  border-radius: 50%;
  object-fit: cover;
}

.testimonials-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 2rem;
}

.testimonials-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(var(--v-theme-on-surface), 0.25);
  transition: all 0.2s ease;
  padding: 0;
}

.testimonials-dot:hover {
  background: rgba(var(--v-theme-on-surface), 0.45);
}

.testimonials-dot--active {
  background: rgb(var(--v-theme-primary));
  transform: scale(1.3);
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.4);
}
</style>
