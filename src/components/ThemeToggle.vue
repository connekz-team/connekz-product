<script setup lang="ts">
import { useThemeToggle } from '../composables/useTheme'

const { isDark, toggle } = useThemeToggle()
</script>

<template>
  <v-btn
    icon
    variant="text"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
  </v-btn>
</template>
