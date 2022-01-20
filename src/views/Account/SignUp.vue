<template>
  <div>
    <back-nav />
    <div class="px-6">
      <h2>Get started</h2>
      <h3 class="font-weight-medium grey--text text--darken-2">
        Create a Cura account.
      </h3>
      <form id="signup-form" @submit.prevent="signUp()" class="mt-6">
        <v-text-field
          v-model.trim="email"
          outlined
          rounded
          dense
          label="Email address"
          hide-details
          class="mb-4"
          readonly
          filled
        />
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :aria-label:append="showPassword ? 'Hide password' : 'Show password'"
          outlined
          rounded
          dense
          label="Password"
          hide-details
          class="mb-0"
          id="password-input"
          autocomplete="off"
        />
        <p>
          <small>
            Password strength:
            <span
              class="font-weight-bold"
              :style="`color: ${passwordStrengthMessage.color}`"
              >{{ passwordStrengthMessage.message }}</span
            >
          </small>
        </p>
        <v-btn
          type="submit"
          block
          :class="{ 'pointer-events-none': isLoading }"
          rounded
          color="primary"
          elevation="0"
          class="py-6 mb-4"
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
import focusElement from "@/mixins/focuselement";
const owasp = require("owasp-password-strength-test");
export default {
  name: "SignUp",
  mixins: [focusElement],
  data() {
    return {
      focusElement: "#password-input",
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
        .catch((err) =>
          this.$emit("snackbarmessage", err?.response?.data?.errorMessage)
        )
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
