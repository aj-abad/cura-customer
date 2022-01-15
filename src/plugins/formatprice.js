import Vue from 'vue'

const formatPrice = (price, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price)
}

Vue.prototype.$formatPrice = formatPrice
