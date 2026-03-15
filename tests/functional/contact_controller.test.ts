import { test } from '@japa/runner'
import mail from '@adonisjs/mail/services/main'

const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  message: 'Hello, I would like to get in touch with you about a project.',
}

test.group('ContactController - store', (group) => {
  group.each.setup(() => {
    mail.fake()
  })

  group.each.teardown(() => {
    mail.restore()
  })

  test('returns 201 on valid submission', async ({ client }) => {
    // Mock fetch for reCAPTCHA verification
    const originalFetch = globalThis.fetch
    globalThis.fetch = async (url: any) => {
      if (String(url).includes('recaptcha')) {
        return new Response(JSON.stringify({ success: true, score: 0.9 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return originalFetch(url)
    }

    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'valid-token')
      .json(validPayload)

    response.assertStatus(201)
    response.assertBodyContains({ message: 'Your message has been sent successfully.' })

    const { mails } = mail.fake()
    mails.assertSent((msg) => {
      return msg.subject?.includes('John Doe') ?? false
    })

    globalThis.fetch = originalFetch
  })

  test('returns 422 when name is missing', async ({ client }) => {
    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'valid-token')
      .json({ ...validPayload, name: '' })

    response.assertStatus(422)
  })

  test('returns 422 when email is invalid', async ({ client }) => {
    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'valid-token')
      .json({ ...validPayload, email: 'not-an-email' })

    response.assertStatus(422)
  })

  test('returns 422 when phone is invalid', async ({ client }) => {
    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'valid-token')
      .json({ ...validPayload, phone: '123' })

    response.assertStatus(422)
  })

  test('returns 422 when message is too short', async ({ client }) => {
    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'valid-token')
      .json({ ...validPayload, message: 'Hi' })

    response.assertStatus(422)
  })

  test('returns 400 when recaptcha token is missing', async ({ client }) => {
    const response = await client.post('/api/contact').json(validPayload)

    response.assertStatus(400)
    response.assertBodyContains({ message: 'reCAPTCHA token is required' })
  })

  test('returns 400 when recaptcha score is too low', async ({ client }) => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = async (url: any) => {
      if (String(url).includes('recaptcha')) {
        return new Response(JSON.stringify({ success: true, score: 0.2 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return originalFetch(url)
    }

    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'low-score-token')
      .json(validPayload)

    response.assertStatus(400)
    response.assertBodyContains({ message: 'Invalid reCAPTCHA. Please try again.' })

    globalThis.fetch = originalFetch
  })

  test('returns 400 when recaptcha verification fails', async ({ client }) => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = async (url: any) => {
      if (String(url).includes('recaptcha')) {
        return new Response(JSON.stringify({ success: false, score: 0.0 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return originalFetch(url)
    }

    const response = await client
      .post('/api/contact')
      .header('recaptcha-token', 'invalid-token')
      .json(validPayload)

    response.assertStatus(400)
    response.assertBodyContains({ message: 'Invalid reCAPTCHA. Please try again.' })

    globalThis.fetch = originalFetch
  })
})
