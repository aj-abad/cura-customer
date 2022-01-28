<template>
  <div
    class="px-6 mb-6 d-flex justify-space-between"
    :aria-label="`Step ${currentStep} of ${steps}`"
  >
    <!-- TODO add progress indicator -->
    <div
      class="d-flex align-center"
      v-for="i in steps"
      :key="i"
      :class="{ 'flex-grow-1': i < steps }"
    >
      <div class="step"></div>
      <div class="line flex-grow-1" v-if="i < steps"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressIndicator",
  props: {
    steps: Number,
    currentStep: Number,
  },
};
</script>

<style lang="stylus" scoped>
.step {
  height: 20px;
  width: @height;
  background: var(--v-bglight-darken2);
  border-radius: 100%;
}

.line {
  height: 4px;
  background: var(--v-bglight-darken1);
}
</style>