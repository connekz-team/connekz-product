<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps({
  activePage: {
    type: String,
    default: 'Home',
  },
})

const emit = defineEmits(['navigate'])

const display = useDisplay()

const isDrawerOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { title: 'Home', icon: 'mdi-home' },
  { title: 'About', icon: 'mdi-information' },
  { title: 'Services', icon: 'mdi-cog' },
  { title: 'Contact', icon: 'mdi-email' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <v-app-bar
    :elevation="isScrolled ? 2 : 0"
    class="app-header"
    :class="{ 'app-header--scrolled': isScrolled }"
    density="comfortable"
  >
    <div class="app-header__logo" role="banner">
      <span class="app-header__logo-text" aria-label="Site logo">Logo</span>
    </div>

    <v-spacer />

    <nav
      v-if="display.smAndUp.value"
      class="app-header__nav-desktop"
      aria-label="Main navigation"
    >
      <v-btn
        v-for="item in navItems"
        :key="item.title"
        variant="text"
        :class="{ 'app-header__nav-link--active': props.activePage === item.title }"
        class="app-header__nav-link"
        :aria-current="props.activePage === item.title ? 'page' : undefined"
        @click="emit('navigate', item.title)"
      >
        {{ item.title }}
      </v-btn>
    </nav>

    <ThemeToggle />

    <v-app-bar-nav-icon
      v-if="display.xs.value"
      :aria-label="isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'"
      :aria-expanded="String(isDrawerOpen)"
      aria-controls="mobile-nav-drawer"
      @click="toggleDrawer"
    />
  </v-app-bar>

  <v-navigation-drawer
    id="mobile-nav-drawer"
    v-model="isDrawerOpen"
    temporary
    role="navigation"
    aria-label="Mobile navigation"
  >
    <v-list nav aria-label="Navigation links">
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :active="props.activePage === item.title"
        :aria-current="props.activePage === item.title ? 'page' : undefined"
        @click="isDrawerOpen = false; emit('navigate', item.title)"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.app-header {
  transition: box-shadow 300ms ease;
}

.app-header--scrolled {
  box-shadow: 0 2px 8px var(--shadow-color);
}

.app-header__logo {
  display: flex;
  align-items: center;
  padding-left: 16px;
}

.app-header__logo-text {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.app-header__nav-desktop {
  display: flex;
  gap: 4px;
}

.app-header__nav-link--active {
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  border-radius: 0;
}
</style>
