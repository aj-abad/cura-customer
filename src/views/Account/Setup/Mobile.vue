<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <div class="mb-6">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Mobile number</h2>
    </div>
    <div>
      <v-text-field
        class="mb-4"
        dense
        rounded
        outlined
        hide-details
        label="Mobile number"
        v-model.trim="mobile"
        prefix="+63"
        inputmode="numeric"
        v-mask="'### ### ####'"
        pattern="[0-9]{1}"
      />
      <p>
        <small>
          We'll use your mobile number for two-factor authentication (2FA) and to
          contact you during bookings.
        </small>
      </p>
    </div>
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
export default {
  name: "Mobile",
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
    canGoForward() {
      return validateMobile(this.userInfo.mobile);
    },
  },
  watch: {
    mobile() {
      return (this.userInfo.mobile = this.mobile.replaceAll(" ", ""));
    },
  },
  inject: ["userInfo", "meta"],
  mixins: [multiStep],
};
</script>