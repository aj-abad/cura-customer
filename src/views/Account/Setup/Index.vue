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
          @canforward="canGoForward = $event"
          @forward="goForward()"
          :currentStep="currentStep"
          :steps="steps"
        />
      </transition>
    </v-sheet>
    <div class="position-absolute w-100 pa-6 pt-0 bottom left">
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
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "@/components/Account/Setup/ProgressIndicator";
import BackButton from "@/components/Account/Setup/BackButton";
export default {
  name: "AccountSetup",
  components: { ProgressIndicator, BackButton },
  data() {
    return {
      exitDialog: false,
      isLocked: true,
      transition: "slide-push",
      canGoForward: false,
      userInfo: {
        firstName: "",
        lastName: "",
        birthDate: "",
        mobile: this.$store.getters.getUser.mobile ?? "",
        profilePhoto: null,
      },
      meta:{
        //additional data go here
        mobileDialog: false,
      }
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
      meta: this.meta,
    };
  },
  methods: {
    goForward() {
      if (!this.canGoForward) return;
      //special actions go here
      switch (this.currentStep){
        case 2:
          //open mobile dialog if user doesn't have mobile number set
          if (this.userInfo.mobile) break;
          return this.meta.mobileDialog = true;
        case 3:
          //set profile photo
      }



      const nextStep = this.$router.options.routes
        .find((route) => route.name === "AccountSetup")
        .children.find((route) => route.meta.step === this.currentStep + 1);
      if (nextStep) return this.$router.push(nextStep.path);
    },
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