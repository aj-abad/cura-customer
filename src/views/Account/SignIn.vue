<template>
  <div>
    <back-nav />
    <div class="px-6">
      <h2>Welcome back</h2>
      <h3 class="font-weight-medium grey--text text--darken-2">
        Sign in to your Cura account.
      </h3>
      <form id="signup-form" @submit.prevent="signIn()" class="mt-6">
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
          <!-- TODO implement forgot password -->
          <router-link to="account/resetpassword">
            Lost your password?
          </router-link>
        </p>
        <v-btn
          type="submit"
          block
          :class="{ 'pointer-events-none': isLoading }"
          rounded
          color="primary"
          elevation="0"
          class="py-6 mb-4"
        >
          <v-progress-circular
            indeterminate
            color="white"
            :width="2.5"
            :size="20"
            v-if="isLoading"
          />
          <span v-else>Sign in</span>
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import focusElement from "@/mixins/focuselement";
export default {
  name: "SignUp",
  mixins: [focusElement],
  data() {
    return {
      focusElement: "#password-input",
      email: this.$route.query.email ?? "",
      showPassword: false,
      password: "",
      isLoading: false,
      isDone: false,
    };
  },
  methods: {
    signIn() {
      if (this.isDone || this.isLoading) return null;
      this.isLoading = true;
      const { email, password } = this;

      this.$http
        .post("/auth/signin", { email, password })
        .then((res) => {
          const { token } = res.data?.token;
          console.log(token);
          //TODO successful sign in
        })
        .catch((err) =>
          this.$emit("snackbarmessage", err?.response?.data?.errorMessage)
        )
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
