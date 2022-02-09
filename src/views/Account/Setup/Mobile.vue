<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <v-dialog v-model="meta.mobileDialog">
      <verify-mobile :mobile="mobile" />
    </v-dialog>
    <div class="mb-6">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Mobile number</h2>
    </div>
    <form @submit.prevent="$emit('forward')">
      <v-text-field
        class="mb-4"
        dense
        rounded
        outlined
        :errorMessages="mobileErrorMessages"
        hide-details="auto"
        label="Mobile number"
        v-model.trim="mobile"
        prefix="+63"
        inputmode="numeric"
        v-mask="'### ### ####'"
        v-focus="320"
        :readonly="!!userInfo.mobile"
        :append-icon="!!userInfo.mobile ? 'mdi-check' : null"
      />
      <p>
        <small>
          We'll use your mobile number for two-factor authentication (2FA) and
          to contact you during bookings.
        </small>
      </p>
      <button type="submit" class="d-none"></button>
    </form>
    <div class="mt-auto mb-2">
      <v-btn @click="skipStep()" plain elevation="0" large block>
        Maybe later
      </v-btn>
    </div>
  </div>
</template>

<script>
import multiStep from "@/mixins/multistepform";
import { validateMobile } from "cura-validation-utils";
import VerifyMobile from "@/components/Account/Setup/VerifyMobile";
export default {
  name: "Mobile",
  components: {
    VerifyMobile,
  },
  data() {
    return {
      mobile: this.userInfo.mobile ?? "",
    };
  },
  props: {
    steps: Number,
    currentStep: Number,
  },
  methods: {
    skipStep() {
      const nextStep = this.$router.options.routes
        .find((route) => route.name === "AccountSetup")
        .children.find((route) => route.meta.step === this.currentStep + 1);

      this.userInfo.mobile = "";
      this.$router.push(nextStep);
    },
  },
  computed: {
    mobileUnmask() {
      return this.mobile.replaceAll(" ", "");
    },
    canGoForward() {
      return validateMobile(this.mobileUnmask);
    },
    mobileErrorMessages() {
      if (this.mobileUnmask.length === 10 && !validateMobile(this.mobileUnmask))
        return ["Please enter a valid mobile number."];
      return null;
    },
  },
  inject: ["userInfo", "meta"],
  mixins: [multiStep],
  beforeRouteLeave(to, from, next) {
    if (this.meta.mobileDialog) {
      this.meta.mobileDialog = false;
      return next(false);
    }
    return next();
  },
};
</script>