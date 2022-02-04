const multiStep = {
  mounted() {
    this.$emit('canforward', this.canGoForward);
  },
  watch: {
    canGoForward() {
      this.$emit("canforward", this.canGoForward);
    },
  },
}


export default multiStep