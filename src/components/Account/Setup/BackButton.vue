<template>
  <v-btn @click="goBack()" plain>
    <v-icon small>mdi-chevron-left</v-icon> Go back
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
      else $emit("show-exit-dialog");
    },
  },
};
</script>