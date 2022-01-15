import Vue from 'vue'
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet'
import '../assets/leaflet.css'

import { Icon } from 'leaflet'
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: `${process.env.VUE_APP_CLIENT_URL}/img/svg/pin.svg`,
  iconUrl: `${process.env.VUE_APP_CLIENT_URL}/img/svg/pin.svg`,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-popup', LPopup)
Vue.component('l-icon', LIcon)
