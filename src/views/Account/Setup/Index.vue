<template>
  <div class="bglight d-flex flex-column justify-end">
    <v-dialog v-model="exitDialog">
      <v-sheet class="rounded-lg text-center pa-4">
        <h3 class="mb-2">Cancel account setup?</h3>
        <p class="mb-4">You may continue setting up your account any time.</p>
        <v-btn
          @click="signOut()"
          large
          elevation="0"
          block
          color="primary"
          class="mb-2"
        >
          Yes, go back
        </v-btn>
        <v-btn @click="exitDialog = false" block plain large elevation="0">
          No, continue
        </v-btn>
      </v-sheet>
    </v-dialog>
    <div class="mt-2 mb-4">
      <back-button
        :currentStep="currentStep"
        @showExitDialog="exitDialog = true"
      />
    </div>
    <progress-indicator :steps="steps" :currentStep="currentStep" />
    <v-sheet
      class="flex-grow-1 rounded-xl bottom-sheet position-relative"
      style="overflow: hidden"
    >
      <transition :name="transition">
        <router-view
          class="account-setup-view"
          :currentStep="currentStep"
          :steps="steps"
        />
      </transition>
    </v-sheet>
    <div class="position-absolute w-100 pa-6 bottom left">
      <forward-button
        :userInfo="userInfo"
        :currentStep="currentStep"
        :steps="steps"
      />
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "@/components/Account/Setup/ProgressIndicator";
import BackButton from "@/components/Account/Setup/BackButton";
import ForwardButton from "@/components/Account/Setup/ForwardButton";
export default {
  name: "AccountSetup",
  components: { ProgressIndicator, BackButton, ForwardButton },
  data() {
    return {
      exitDialog: false,
      isLocked: true,
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
    steps() {
      return this.$router.options.routes.find(
        (route) => route.name === "AccountSetup"
      ).children.length;
    },
    currentStep() {
      return this.$route.meta.step;
    },
  },
  provide() {
    return {
      userInfo: this.userInfo,
    };
  },
  methods: {
    signOut() {
      this.isLocked = false;
      this.$store.dispatch("signOut");
      this.$router.replace("/");
    },
  },
  watch: {
    $route(to, from) {
      if (!to.meta.step) return null;
      const transition =
        to.meta.step > from.meta.step ? "slide-push" : "slide-pop";
      return (this.transition = transition);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.currentStep === 1 && this.isLocked) {
      this.exitDialog = true;
      return next(false);
    }
    return next(true);
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