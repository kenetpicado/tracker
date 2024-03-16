import { createToaster } from '@meforma/vue-toaster'

export const toast = createToaster({
  position: 'bottom',
  duration: 2000,
  max: 2,
  pauseOnHover: false
})
