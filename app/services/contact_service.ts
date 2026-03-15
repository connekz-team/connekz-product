import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export interface ContactData {
  name: string
  email: string
  phone: string
  message: string
}

export default class ContactService {
  async verifyRecaptcha(token: string): Promise<boolean> {
    const secret = env.get('RECAPTCHA_SECRET_KEY')

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })

    const data = await response.json()
    return data.success === true && data.score > 0.5
  }

  async sendNotification(data: ContactData): Promise<void> {
    const adminEmail = env.get('ADMIN_EMAIL')

    await mail.send((message) => {
      message
        .to(adminEmail)
        .subject(`New Contact Form Submission from ${data.name}`)
        .htmlView('mail/contact-notification', { data })
    })
  }
}
