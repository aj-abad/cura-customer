<template>
  <div class="bglight d-flex flex-column justify-end">
    <div class="my-2">
      <v-btn @click="goBack()" plain>
        <v-icon small>mdi-chevron-left</v-icon> Go back
      </v-btn>
    </div>
    <progress-indicator :steps="4" :currentStep="currentStep" />
    <v-sheet
      class="flex-grow-1 rounded-xl bottom-sheet"
      style="overflow: hidden"
    >
      <transition :name="transition">
        <router-view class="account-setup-view" />
      </transition>
    </v-sheet>
    <div class="position-absolute w-100 pa-6 bottom left">
      <v-btn color="primary" elevation="0" large block>
        Next <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "@/components/Account/ProgressIndicator";
export default {
  name: "AccountSetup",
  components: { ProgressIndicator },
  data() {
    return {
      transition: "slide-push",
      userInfo: {
        firstName: "",
        lastName: "",
        mobile: "",
        profilePhoto: "",
      },
    };
  },
  computed: {
    currentStep() {
      return this.$route.meta.step;
    },
  },
  provide() {
    return {
      userInfo: this.userInfo,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
  beforeRouteLeave(to, from, next) {
    alert("x");
    next(false);
  },
};
</script>

<style lang="stylus" scoped>
.account-setup-view {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 72px !important;
}
</style>