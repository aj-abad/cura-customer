const focusElementOnMount = {
  mounted() {
    setTimeout(() => {
      document.querySelector(this.focusElement).focus();
    }, 320)
  },
}

export default focusElementOnMount