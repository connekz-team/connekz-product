<template>
  <section class="hero-section" aria-labelledby="hero-headline">
    <div class="hero-bg" aria-hidden="true"></div>
    <v-container class="hero-content" style="position: relative; z-index: 2">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" md="8" lg="6">
          <h1
            id="hero-headline"
            class="hero-headline text-h4 text-md-h2 font-weight-bold mb-4 text-white text-center"
          >
            Discover the Future of Innovation
          </h1>
          <p
            class="hero-subtitle text-body-1 text-md-h6 text-center mb-8"
          >
            Empower your team with cutting-edge tools and seamless experiences.
          </p>
          <div class="d-flex justify-center">
            <v-btn
              size="x-large"
              color="primary"
              class="hero-cta"
              elevation="0"
              aria-label="Get started with our platform"
            >
              Get Started
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useSeoMeta } from '../composables/useSeoMeta'

useSeoMeta({
  title: 'Home',
  description: 'Discover the future of innovation. Empower your team with cutting-edge tools and seamless experiences.',
  path: '/',
})
</script>

<style scoped>
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #4facfe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: 1;
  will-change: background-position;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out both;
}

.hero-headline {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.hero-cta {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-cta:hover,
.hero-cta:focus-visible {
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-cta:focus-visible {
  outline: 3px solid white;
  outline-offset: 3px;
}
</style>
