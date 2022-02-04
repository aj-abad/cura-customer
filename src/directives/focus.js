import Vue from "vue"

Vue.directive('focus', {
  inserted: function (el, binding) {
    setTimeout(() => {
      el.querySelector("input").focus()
    }, binding.value ?? 0)
  }
})