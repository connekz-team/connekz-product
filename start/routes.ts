import router from '@adonisjs/core/services/router'

const ContactController = () => import('#controllers/contact_controller')

router
  .group(() => {
    router.post('contact', [ContactController, 'store'])
  })
  .prefix('api')
