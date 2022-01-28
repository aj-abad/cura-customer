<template>
  <v-btn
    :disabled="!canGoForward"
    @click="goForward()"
    color="primary"
    elevation="0"
    large
    block
  >
    Next <v-icon small>mdi-chevron-right</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "ForwardButton",
  props: {
    currentStep: Number,
    userInfo: Object,
  },
  computed: {
    canGoForward() {
      if (this.currentStep === 1) {
        const { firstName, lastName } = this.userInfo;
        console.log(firstName, lastName, !!firstName && !!lastName);
        return !!firstName && !!lastName;
      }
      return false;
    },
  },
  methods: {
    goForward() {
      const nextStep = this.$router.options.routes
        .find((route) => route.name === "AccountSetup")
        .children.find((route) => route.meta.step === this.currentStep + 1);
      if (nextStep) return this.$router.push(nextStep.path);
    },
  },
};
</script>