try {
  window.FB.init({
    appId: process.env.VUE_APP_FB_APP_ID,
    cookie: false,
    version: 'v10.0'
  })
} catch {
  console.log('fb init error')
}
