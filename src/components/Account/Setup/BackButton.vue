<template>
  <v-btn @click="goBack()" plain rounded>
    <v-icon small>mdi-chevron-left</v-icon> Back
  </v-btn>
</template>

<script>
export default {
  name: "BackButton",
  props: {
    currentStep: Number,
  },
  methods: {
    goBack() {
      if (this.currentStep > 1) return this.$router.go(-1);
      else this.$emit("showExitDialog");
    },
  },
};
</script>