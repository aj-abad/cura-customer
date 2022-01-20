<template>
  <div>
    <back-nav />
    <div class="px-6">
      <h2>What's your email?</h2>
      <h3 class="font-weight-medium grey--text text--darken-2">
        We'll check if you have an account.
      </h3>
      <form @submit.prevent="submitEmail()" class="mt-6">
        <v-text-field
          id="email-input"
          v-model.trim="email"
          outlined
          rounded
          dense
          label="Email address"
          hide-details
          class="mb-4"
        />
        <v-btn
          type="submit"
          block
          :class="{ 'pointer-events-none': isLoading }"
          rounded
          color="primary"
          elevation="0"
          class="py-6"
          :disabled="!isValidEmail"
        >
          <v-progress-circular
            indeterminate
            color="white"
            :width="2.5"
            :size="20"
            v-if="isLoading"
          />
          <span v-else>Continue</span>
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import focusElement from "@/mixins/focuselement";
const validator = require("email-validator");
export default {
  name: "Email",
  mixins: [focusElement],
  data() {
    return {
      focusElement: "#email-input",
      email: sessionStorage.getItem("email") ?? "",
      isLoading: false,
      isDone: false,
    };
  },
  computed: {
    isValidEmail() {
      return validator.validate(this.email);
    },
  },
  methods: {
    submitEmail() {
      if (this.isLoading || this.isDone) return null;
      this.isLoading = true;
      // this.$emit("showloading", true, "Checking...");
      const email = this.email?.trim()?.toLowerCase();
      this.$http
        .post("/auth/checkemail", { email, userType: 1 })
        .then((res) => {
          sessionStorage.setItem("email", email);
          const route = res.data?.emailExists ? "signin" : "signup";
          this.$emit("showloading", false, "Checking...");
          this.$router.push(`/account/${route}?email=${email}`);
        })
        .catch((err) => {
          this.$emit("snackbarmessage", err?.response?.data?.errorMessage);
        })
        .finally(() => {
          this.isLoading = false;
          // this.$emit("showloading", false, null);
        });
    },
  },
};
</script>
