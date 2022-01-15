import Vue from 'vue'
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(relativeTime).extend(localizedFormat)
Vue.prototype.$date = dayjs
