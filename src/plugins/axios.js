import Vue from 'vue'
import Axios from 'axios'
Axios.defaults.baseURL = process.env.VUE_APP_API
// Axios.defaults.baseURL = "/api";
Axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$http = Axios
