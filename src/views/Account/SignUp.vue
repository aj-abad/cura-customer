<template>
  <div>
    <back-nav />
    <div class="px-6">
      <h2>Get started</h2>
      <h3 class="font-weight-medium grey--text text--darken-2">
        Create a Cura account.
      </h3>
      <form id="signup-form" @submit.prevent="signUp()" class="mt-6">
        <v-labeled-text-field
          v-model.trim="email"
          readonly
          filled
          label="Email address"
          class="mb-2"
        />
        <v-labeled-text-field
          type="password"
          v-model.trim="password"
          :showPassword="true"
          v-focus="320"
          label="Password"
        />
        <p>
          <small :aria-label="`Password is ${passwordStrength.message}`" aria-live="polite">
            Password strength:
            <span
              class="font-weight-bold"
              :style="`color: ${passwordStrengthMessage.color}`"
              >{{ passwordStrengthMessage.message }}</span
            >
          </small>
        </p>
        <v-btn
          large
          type="submit"
          block
          :class="{ 'pointer-events-none': isLoading }"
          color="primary"
          elevation="0"
          class="mb-4"
          :disabled="passwordStrength === 0"
        >
          <v-progress-circular
            indeterminate
            color="white"
            :width="2.5"
            :size="20"
            v-if="isLoading"
          />
          <span v-else>Sign up</span>
        </v-btn>
        <small class="grey--text text--darken-2">
          By signing up, you certify that you have read and agreed to our
          <a href="#">Terms of use</a>, <a href="#">Privacy policy</a>, and
          <a href="#">COVID-19 safety guidelines</a>.
        </small>
      </form>
    </div>
  </div>
</template>

<script>
const owasp = require("owasp-password-strength-test");
owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 6,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4,
});
owasp.tests.required = [];
owasp.tests.required.push((password) =>
  password.length < 6 || password.length > 128
    ? "Password must be between 6 and 128 characters"
    : null
);
export default {
  name: "SignUp",
  data() {
    return {
      email: this.$route.query.email ?? "",
      showPassword: true,
      password: "",
      isLoading: false,
      isDone: false,
    };
  },
  computed: {
    passwordTest() {
      return owasp.test(this.password);
    },
    passwordStrength() {
      if (this.password.length >= 128) return -1;
      if (this.passwordTest.requiredTestErrors.length > 0) return 0;
      if (this.passwordTest.strong) return 4;
      return this.passwordTest.optionalTestsPassed;
    },
    passwordStrengthMessage() {
      const messages = ["Too short", "Weak", "Moderate", "Good", "Strong"];
      const colors = ["gray", "#b71c1c", "#E17F40", "#519DE1", "#0d826e"];

      const passwordStrengthMessage = {
        message: messages[this.passwordStrength],
        color: colors[this.passwordStrength],
      };

      if (this.passwordStrength === -1) {
        passwordStrengthMessage.message = "Too long";
        passwordStrengthMessage.color = "#b71c1c";
        return passwordStrengthMessage;
      }

      return passwordStrengthMessage;
    },
  },
  methods: {
    signUp() {
      if (this.isDone || this.isLoading) return null;
      this.isLoading = true;
      const { email, password } = this;

      this.$http
        .post("/auth/signup", { email, password })
        .then((res) => {
          const { secondsBeforeResend } = res.data;
          this.isDone = true;
          this.$router.replace({
            name: "VerifyEmail",
            query: { email, secondsBeforeResend },
          });
        })
        .catch((err) => this.showSnackbar(err?.response?.data?.errorMessage))
        .finally(() => (this.isLoading = false));
    },
  },
  inject: ["showSnackbar"],
};
</script>
