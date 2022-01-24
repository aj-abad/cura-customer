<template>
  <div>
    <v-dialog v-model="dialog">
      <v-sheet class="rounded-lg text-center pa-4">
        <h3 class="mb-2">Lost your password?</h3>
        <p class="mb-4">
          No worries, we can send a password reset code to your email.
        </p>
        <v-btn
          large
          elevation="0"
          @click="goBack()"
          block
          color="primary"
          class="mb-2"
        >
          Send password reset code
        </v-btn>
        <v-btn @click="dialog = false" block plain large elevation="0">
          Cancel
        </v-btn>
      </v-sheet>
    </v-dialog>
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
          class="mb-2"
          id="password-input"
          autocomplete="off"
        />
        <p>
          <!-- TODO implement forgot password -->
          <a href="#" @click.prevent="dialog = true"> Lost your password? </a>
        </p>
        <v-btn
          type="submit"
          :disabled="password?.length === 0"
          block
          :class="{ 'pointer-events-none': isLoading }"
          large
          color="primary"
          elevation="0"
          class="mb-4"
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
      dialog: false,
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
          const { user, token } = res.data;
          this.$store.dispatch("setToken", token);
          this.$store.dispatch("updateUser", user);
          const { userStatus } = this.$store.getters.getUser;
          const name = userStatus === 1 ? "Home" : "WelcomeNewUser";
          this.$store.commit("socketConnect", token);
          this.$router.push({ name });
        })
        .catch((err) =>
          this.$emit("snackbarmessage", err?.response?.data?.errorMessage)
        )
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
