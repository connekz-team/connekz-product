<script setup>
import { ref, provide, watch } from 'vue'
import { useSeoMeta } from './composables/useSeoMeta'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ContactPage from './components/ContactPage.vue'

const currentPage = ref('Home')

const pageMeta = {
  Home: {
    title: 'Home',
    description: 'Discover the future of innovation. Empower your team with cutting-edge tools and seamless experiences.',
    path: '/',
  },
  About: {
    title: 'About Us',
    description: 'Learn about our mission, team, and the values that drive us to build innovative solutions.',
    path: '/about',
  },
  Services: {
    title: 'Services',
    description: 'Explore our comprehensive range of services including web design, mobile apps, cloud solutions, and more.',
    path: '/services',
  },
  Contact: {
    title: 'Contact Us',
    description: 'Get in touch with our team. We would love to hear from you and discuss how we can help.',
    path: '/contact',
  },
}

function applyPageMeta(page) {
  const meta = pageMeta[page] || { title: page, path: `/${page.toLowerCase()}` }
  useSeoMeta(meta)
}

applyPageMeta(currentPage.value)

watch(currentPage, (page) => {
  applyPageMeta(page)
})

function navigateTo(page) {
  currentPage.value = page
}

provide('navigateTo', navigateTo)
</script>

<template>
  <v-app>
    <AppHeader :active-page="currentPage" @navigate="navigateTo" />
    <v-main>
      <HeroSection v-if="currentPage === 'Home'" />
      <ContactPage v-else-if="currentPage === 'Contact'" />
      <v-container v-else>
        <h1 class="text-h4 mt-8">{{ currentPage }}</h1>
        <p class="text-body-1 mt-2">This page is coming soon.</p>
      </v-container>
    </v-main>
  </v-app>
</template>
