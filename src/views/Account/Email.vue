<template>
  <div>
    <back-nav />
    <div class="px-6">
      <h2>What's your email?</h2>
      <h3 class="font-weight-medium grey--text text--darken-2">
        We'll check if you have an account.
      </h3>
      <form @submit.prevent="submitEmail()" class="mt-6">
        <v-labeled-text-field
          v-focus="320"
          type="email"
          v-model.trim="email"
          label="Email address"
          class="mb-4"
        />
        <v-btn
          type="submit"
          large
          block
          :class="{ 'pointer-events-none': isLoading }"
          color="primary"
          elevation="0"
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
const validator = require("email-validator");
export default {
  name: "Email",
  data() {
    return {
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
      const email = this.email?.trim()?.toLowerCase();
      this.$http
        .post("/auth/checkemail", { email })
        .then((res) => {
          sessionStorage.setItem("email", email);
          const name = res.data?.emailExists ? "SignIn" : "SignUp";
          this.$router.push({
            name,
            query: {
              email,
            },
          });
        })
        .catch((err) => {
          this.showSnackbar(err.response?.data?.errorMessage);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  inject: ["showSnackbar"],
};
</script>
