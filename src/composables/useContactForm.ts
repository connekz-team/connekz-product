import { reactive, computed } from 'vue'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactFormErrors {
  name: string
  email: string
  phone: string
  message: string
}

const PHONE_REGEX = /^\+?[\d\s\-()]{10,}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateName(value: string): string {
  if (!value.trim()) return 'Name is required'
  if (value.trim().length < 2) return 'Name must be at least 2 characters'
  return ''
}

export function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email'
  return ''
}

export function validatePhone(value: string): string {
  if (!value.trim()) return 'Phone is required'
  if (!PHONE_REGEX.test(value.trim())) return 'Please enter a valid phone number (min 10 digits)'
  return ''
}

export function validateMessage(value: string): string {
  if (!value.trim()) return 'Message is required'
  if (value.trim().length < 10) return 'Message must be at least 10 characters'
  return ''
}

export function useContactForm() {
  const form = reactive<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const touched = reactive({
    name: false,
    email: false,
    phone: false,
    message: false,
  })

  const errors = computed<ContactFormErrors>(() => ({
    name: touched.name ? validateName(form.name) : '',
    email: touched.email ? validateEmail(form.email) : '',
    phone: touched.phone ? validatePhone(form.phone) : '',
    message: touched.message ? validateMessage(form.message) : '',
  }))

  const isValid = computed(() => {
    return (
      !validateName(form.name) &&
      !validateEmail(form.email) &&
      !validatePhone(form.phone) &&
      !validateMessage(form.message)
    )
  })

  function touchField(field: keyof ContactFormData) {
    touched[field] = true
  }

  function touchAll() {
    touched.name = true
    touched.email = true
    touched.phone = true
    touched.message = true
  }

  function reset() {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
    touched.name = false
    touched.email = false
    touched.phone = false
    touched.message = false
  }

  return { form, errors, isValid, touchField, touchAll, reset }
}
