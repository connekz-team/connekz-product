import vine from '@vinejs/vine'

export const contactValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().trim().email().maxLength(255),
    phone: vine
      .string()
      .trim()
      .regex(/^\+?[\d\s\-()]{10,}$/),
    message: vine.string().trim().minLength(10).maxLength(5000),
  })
)
