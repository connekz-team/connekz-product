<script setup>
import { ref, inject, computed } from 'vue'

const navigateTo = inject('navigateTo', () => {})

const currentYear = computed(() => new Date().getFullYear())

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', page: 'About' },
      { label: 'Careers', page: 'About' },
      { label: 'Press', page: 'About' },
      { label: 'Blog', page: 'Home' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Design', page: 'Services' },
      { label: 'Mobile Apps', page: 'Services' },
      { label: 'Cloud Solutions', page: 'Services' },
      { label: 'Cybersecurity', page: 'Services' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', page: 'Contact' },
      { label: 'Contact Us', page: 'Contact' },
      { label: 'FAQ', page: 'Home' },
      { label: 'Status', page: 'Home' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', page: 'Home' },
      { label: 'Terms of Service', page: 'Home' },
      { label: 'Cookie Policy', page: 'Home' },
      { label: 'Licenses', page: 'Home' },
    ],
  },
]

const socialLinks = [
  { icon: 'mdi-facebook', label: 'Facebook', href: 'https://facebook.com' },
  { icon: 'mdi-twitter', label: 'Twitter', href: 'https://twitter.com' },
  { icon: 'mdi-instagram', label: 'Instagram', href: 'https://instagram.com' },
  { icon: 'mdi-linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: 'mdi-github', label: 'GitHub', href: 'https://github.com' },
]

const newsletterEmail = ref('')

function handleSubscribe() {
  if (!newsletterEmail.value.trim()) return
  console.log('Newsletter subscribe:', newsletterEmail.value.trim())
  newsletterEmail.value = ''
}
</script>

<template>
  <v-footer class="footer-section pa-0" tag="footer" role="contentinfo">
    <v-container class="pt-12 pb-6">
      <!-- Top section: columns + newsletter -->
      <v-row>
        <!-- Sitemap columns -->
        <v-col
          v-for="column in footerColumns"
          :key="column.title"
          cols="6"
          sm="6"
          md="3"
          lg="2"
        >
          <h3 class="text-subtitle-1 font-weight-bold mb-3">{{ column.title }}</h3>
          <nav :aria-label="column.title + ' links'">
            <ul class="footer-links">
              <li v-for="link in column.links" :key="link.label">
                <v-btn
                  variant="text"
                  density="compact"
                  class="footer-link text-body-2 text-medium-emphasis pa-0 mb-1"
                  @click="navigateTo(link.page)"
                >
                  {{ link.label }}
                </v-btn>
              </li>
            </ul>
          </nav>
        </v-col>

        <!-- Newsletter -->
        <v-col cols="12" md="12" lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">Stay Updated</h3>
          <p class="text-body-2 text-medium-emphasis mb-3">
            Subscribe to our newsletter for the latest updates and insights.
          </p>
          <form
            class="d-flex ga-2"
            @submit.prevent="handleSubscribe"
            aria-label="Newsletter subscription"
          >
            <v-text-field
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              variant="outlined"
              density="compact"
              hide-details
              aria-label="Email address for newsletter"
              class="flex-grow-1"
            />
            <v-btn
              type="submit"
              color="primary"
              variant="flat"
              density="compact"
              height="40"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </v-btn>
          </form>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <!-- Bottom section: copyright + social -->
      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="auto" class="text-center text-sm-start">
          <p class="text-body-2 text-medium-emphasis mb-0">
            &copy; {{ currentYear }} Vue App. All rights reserved.
          </p>
        </v-col>
        <v-col cols="12" sm="auto" class="text-center text-sm-end">
          <nav aria-label="Social media links" class="d-flex justify-center justify-sm-end ga-1 flex-wrap">
            <v-btn
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              icon
              variant="text"
              size="small"
            >
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </nav>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  text-transform: none;
  letter-spacing: normal;
  justify-content: flex-start;
  min-width: 0;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
