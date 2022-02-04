import './registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/axios'
import './plugins/fbsdk'
import './plugins/ismobile'
import './plugins/leaflet'
import './plugins/formatprice'
import './plugins/day'
import "./plugins/v-mask"
import './assets/dynamictransitions'
import 'croppie-constrained/croppie.css'
import './sass/main.sass'
import './sass/overrides.sass'
import './assets/transitions.css'
import './plugins/components'
import './workers/workersetup'
Vue.config.productionTip = false



new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
