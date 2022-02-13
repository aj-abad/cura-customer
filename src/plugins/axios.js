import Vue from 'vue'
import Axios from 'axios'
import {version} from '../../package.json'
Axios.defaults.baseURL = process.env.VUE_APP_API
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.headers.common['App'] = `Cura Customer v${version}`
Vue.prototype.$http = Axios