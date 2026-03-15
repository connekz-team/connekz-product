<template>
  <section class="services-section" role="region" :aria-labelledby="headingId">
    <v-container>
      <h2 :id="headingId" class="text-h4 font-weight-bold text-center mb-8">
        {{ title }}
      </h2>
      <v-row justify="center">
        <v-col
          v-for="(service, index) in serviceItems"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="service-card pa-6 text-center h-100"
            rounded="lg"
            elevation="2"
            tabindex="0"
            :aria-label="service.title"
          >
            <v-card-item>
              <v-icon
                size="48"
                color="primary"
                aria-hidden="true"
                class="mb-4"
              >
                {{ service.icon }}
              </v-icon>
              <h3 class="text-h6 font-weight-bold mb-2">{{ service.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">{{ service.desc }}</p>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useSeoMeta } from '../composables/useSeoMeta'

useSeoMeta({
  title: 'Services',
  description: 'Explore our comprehensive range of services including web design, mobile apps, cloud solutions, and more.',
  path: '/services',
})

const props = defineProps({
  title: {
    type: String,
    default: 'Our Services & Features',
  },
  services: {
    type: Array,
    default: null,
  },
})

const headingId = 'services-heading'

const defaultServices = [
  {
    icon: 'mdi-web',
    title: 'Web Design',
    desc: 'Beautiful, responsive websites crafted with modern design principles and seamless user experiences.',
  },
  {
    icon: 'mdi-cellphone',
    title: 'Mobile Apps',
    desc: 'Native and cross-platform mobile applications built for performance and usability.',
  },
  {
    icon: 'mdi-cloud-outline',
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure and services to power your business operations reliably.',
  },
  {
    icon: 'mdi-shield-check-outline',
    title: 'Cybersecurity',
    desc: 'Comprehensive security audits and protection strategies to safeguard your digital assets.',
  },
  {
    icon: 'mdi-chart-line',
    title: 'Data Analytics',
    desc: 'Actionable insights from your data through advanced analytics and intuitive dashboards.',
  },
  {
    icon: 'mdi-palette-outline',
    title: 'Brand Identity',
    desc: 'Cohesive brand strategies including logo design, style guides, and visual storytelling.',
  },
]

const serviceItems = computed(() => props.services ?? defaultServices)
</script>

<style scoped>
.services-section {
  padding: 4rem 0;
}

.service-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.service-card:hover,
.service-card:focus-visible {
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24) !important;
}

.service-card:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.h-100 {
  height: 100%;
}

@media (hover: none) {
  .service-card:hover {
    transform: none;
    box-shadow: none !important;
  }
}
</style>
