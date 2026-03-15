<script setup lang="ts">
import { ref } from 'vue'
import { useContactForm } from '../composables/useContactForm'
import { useSeoMeta } from '../composables/useSeoMeta'

useSeoMeta({
  title: 'Contact Us',
  description: 'Get in touch with our team. We would love to hear from you and discuss how we can help.',
  path: '/contact',
})

const { form, errors, isValid, touchField, touchAll, reset } = useContactForm()
const loading = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).grecaptcha) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(script)
  })
}

function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const grecaptcha = (window as any).grecaptcha
    if (!grecaptcha) {
      reject(new Error('reCAPTCHA not loaded'))
      return
    }
    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
        .then(resolve)
        .catch(reject)
    })
  })
}

function showSnackbar(message: string, color: string) {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

async function handleSubmit() {
  touchAll()
  if (!isValid.value) return

  loading.value = true
  try {
    await loadRecaptchaScript()
    const token = await getRecaptchaToken()

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'recaptcha-token': token,
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.message || 'Failed to send message')
    }

    showSnackbar('Message sent successfully!', 'success')
    reset()
  } catch (error: any) {
    showSnackbar(error.message || 'Something went wrong. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="contact-page" max-width="720">
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">Contact Us</h1>
        <p class="text-body-1 text-medium-emphasis mb-8">
          We'd love to hear from you. Fill out the form below and we'll get back to you soon.
        </p>

        <v-form @submit.prevent="handleSubmit" novalidate>
          <v-text-field
            v-model="form.name"
            label="Name"
            variant="outlined"
            :error-messages="errors.name"
            prepend-inner-icon="mdi-account"
            class="mb-1"
            @blur="touchField('name')"
          />

          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            variant="outlined"
            :error-messages="errors.email"
            prepend-inner-icon="mdi-email"
            class="mb-1"
            @blur="touchField('email')"
          />

          <v-text-field
            v-model="form.phone"
            label="Phone"
            type="tel"
            variant="outlined"
            :error-messages="errors.phone"
            prepend-inner-icon="mdi-phone"
            class="mb-1"
            @blur="touchField('phone')"
          />

          <v-textarea
            v-model="form.message"
            label="Message"
            variant="outlined"
            :error-messages="errors.message"
            prepend-inner-icon="mdi-message-text"
            rows="5"
            class="mb-4"
            @blur="touchField('message')"
          />

          <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            :loading="loading"
            :disabled="loading"
          >
            <v-icon start>mdi-send</v-icon>
            Send Message
          </v-btn>
        </v-form>

        <p class="text-caption text-medium-emphasis mt-4 text-center">
          This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.
        </p>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="4000"
      location="top"
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn variant="text" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.contact-page {
  padding-top: 48px;
  padding-bottom: 48px;
}
</style>
