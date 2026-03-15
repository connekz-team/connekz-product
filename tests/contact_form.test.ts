import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  useContactForm,
} from '../src/composables/useContactForm'

describe('Contact Form Validation', () => {
  describe('validateName', () => {
    it('returns error when empty', () => {
      expect(validateName('')).toBe('Name is required')
      expect(validateName('  ')).toBe('Name is required')
    })

    it('returns error when too short', () => {
      expect(validateName('A')).toBe('Name must be at least 2 characters')
    })

    it('returns empty string when valid', () => {
      expect(validateName('Jo')).toBe('')
      expect(validateName('John Doe')).toBe('')
    })
  })

  describe('validateEmail', () => {
    it('returns error when empty', () => {
      expect(validateEmail('')).toBe('Email is required')
    })

    it('returns error for invalid email', () => {
      expect(validateEmail('not-email')).toBe('Please enter a valid email')
      expect(validateEmail('foo@')).toBe('Please enter a valid email')
      expect(validateEmail('@bar.com')).toBe('Please enter a valid email')
    })

    it('returns empty string for valid email', () => {
      expect(validateEmail('user@example.com')).toBe('')
      expect(validateEmail('test.user@domain.co')).toBe('')
    })
  })

  describe('validatePhone', () => {
    it('returns error when empty', () => {
      expect(validatePhone('')).toBe('Phone is required')
    })

    it('returns error for invalid phone', () => {
      expect(validatePhone('123')).toBe('Please enter a valid phone number (min 10 digits)')
      expect(validatePhone('abc')).toBe('Please enter a valid phone number (min 10 digits)')
    })

    it('returns empty string for valid phone', () => {
      expect(validatePhone('+1 (555) 123-4567')).toBe('')
      expect(validatePhone('1234567890')).toBe('')
      expect(validatePhone('+44 20 7946 0958')).toBe('')
    })
  })

  describe('validateMessage', () => {
    it('returns error when empty', () => {
      expect(validateMessage('')).toBe('Message is required')
    })

    it('returns error when too short', () => {
      expect(validateMessage('Hi')).toBe('Message must be at least 10 characters')
    })

    it('returns empty string when valid', () => {
      expect(validateMessage('Hello, I need help with something.')).toBe('')
    })
  })
})

describe('useContactForm composable', () => {
  it('initializes with empty form', () => {
    const { form } = useContactForm()
    expect(form.name).toBe('')
    expect(form.email).toBe('')
    expect(form.phone).toBe('')
    expect(form.message).toBe('')
  })

  it('does not show errors for untouched fields', () => {
    const { errors } = useContactForm()
    expect(errors.value.name).toBe('')
    expect(errors.value.email).toBe('')
    expect(errors.value.phone).toBe('')
    expect(errors.value.message).toBe('')
  })

  it('shows errors after touching fields', () => {
    const { errors, touchField } = useContactForm()
    touchField('name')
    expect(errors.value.name).toBe('Name is required')
  })

  it('clears errors when valid input is provided', () => {
    const { form, errors, touchField } = useContactForm()
    touchField('name')
    expect(errors.value.name).toBe('Name is required')
    form.name = 'John'
    expect(errors.value.name).toBe('')
  })

  it('reports isValid correctly', () => {
    const { form, isValid } = useContactForm()
    expect(isValid.value).toBe(false)

    form.name = 'John Doe'
    form.email = 'john@example.com'
    form.phone = '+1 (555) 123-4567'
    form.message = 'Hello, I need help with something.'
    expect(isValid.value).toBe(true)
  })

  it('touchAll marks all fields as touched', () => {
    const { errors, touchAll } = useContactForm()
    touchAll()
    expect(errors.value.name).toBe('Name is required')
    expect(errors.value.email).toBe('Email is required')
    expect(errors.value.phone).toBe('Phone is required')
    expect(errors.value.message).toBe('Message is required')
  })

  it('reset clears form and errors', () => {
    const { form, errors, touchAll, reset } = useContactForm()
    form.name = 'John'
    touchAll()
    expect(errors.value.email).not.toBe('')

    reset()
    expect(form.name).toBe('')
    expect(errors.value.name).toBe('')
    expect(errors.value.email).toBe('')
  })
})
