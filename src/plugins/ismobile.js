const isMobile = require('is-mobile')
if (isMobile()) {
  if (process.env.NODE_ENV === 'production') {
    window.addEventListener('contextmenu', e => e.preventDefault(), false)
  }
}
