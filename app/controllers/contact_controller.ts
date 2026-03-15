import type { HttpContext } from '@adonisjs/core/http'
import { contactValidator } from '#validators/contact_validator'
import ContactService from '#services/contact_service'

export default class ContactController {
  private contactService = new ContactService()

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(contactValidator)

    const recaptchaToken = request.header('recaptcha-token')
    if (!recaptchaToken) {
      return response.badRequest({ message: 'reCAPTCHA token is required' })
    }

    const isValidRecaptcha = await this.contactService.verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      return response.badRequest({ message: 'Invalid reCAPTCHA. Please try again.' })
    }

    await this.contactService.sendNotification(data)

    return response.created({ message: 'Your message has been sent successfully.' })
  }
}
