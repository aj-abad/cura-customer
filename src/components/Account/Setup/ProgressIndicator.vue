<template>
  <div
    class="px-6 mb-6 d-flex justify-space-between"
    :aria-label="`Step ${currentStep} of ${steps}`"
  >
    <div
      class="d-flex align-center"
      v-for="i in steps"
      :key="i"
      :class="{ 'flex-grow-1': i < steps }"
    >
      <div class="step position-relative"></div>
      <div class="line flex-grow-1 position-relative" v-if="i < steps">
        <div class="position-absolute h-100 top left line-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es";
export default {
  name: "ProgressIndicator",
  props: {
    steps: Number,
    currentStep: Number,
  },
  watch: {
    currentStep() {
      //TODO animation on step change
      anime;
    },
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

  .line-inner {
    background: var(--v-primary-base);
  }
}
</style>