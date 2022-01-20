<template>
  <div>
    <v-dialog v-model="dialog">
      <v-sheet class="rounded-lg text-center pa-4">
        <h3 class="mb-2">Cancel sign up</h3>
        <p class="mb-4">Do you wish to cancel account creation?</p>
        <v-btn
          rounded
          elevation="0"
          @click="goBack()"
          block
          color="primary"
          class="py-6 mb-2"
        >
          Yes, go back
        </v-btn>
        <v-btn
          @click="dialog = false"
          block
          plain
          rounded
          elevation="0"
          class="py-6"
        >
          No, continue
        </v-btn>
      </v-sheet>
    </v-dialog>
    <v-app-bar class="mb-4" color="transparent" elevation="0">
      <v-btn
        @click="dialog = true"
        icon
        v-ripple="{ class: 'primary--text' }"
        aria-label="Go back"
      >
        <v-icon color="primary"> mdi-close </v-icon>
      </v-btn>
    </v-app-bar>
    <div class="px-6 pt-2">
      <div class="px-10 mb-6">
        <verify-email-illustration />
      </div>
      <h2 class="text-center">Verify your email</h2>
      <h3 class="text-center mb-8 grey--text font-weight-medium">
        Enter the code we sent to
        <span class="font-weight-semibold">{{ email }}</span
        >.
      </h3>
      <form class="w-100" @submit.prevent="submitCode()">
        <div class="pin-container w-100">
          <pin-input :digits="5" @input="pinChangeHandler" />
          <v-btn
            :disabled="!pin || pin.length < 5"
            type="submit"
            form="signup-form"
            ref="submit-btn"
            rounded
            class="py-6 mt-6 mb-4"
            color="primary"
            elevation="0"
            block
            @click="submitCode"
          >
            <v-progress-circular
              indeterminate
              color="white"
              :width="2.5"
              :size="20"
              v-if="isLoading"
            />
            <span v-else>Verify</span>
          </v-btn>
          <p>
            <span class="grey--text">Didn't receive an email?</span>
            <a
              href="#"
              @click="resendEmail()"
              :class="{ 'grey--text': timerStarted }"
            >
              <span v-if="isResendLoading"> Resending... </span>
              <span v-else>
                Resend
                <span v-if="!timerStarted">code</span>
                <span v-else>in {{ time }}s</span>
              </span>
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PinInput from "@/components/Account/PinInput";
import VerifyEmailIllustration from "@/components/SVG/VerifyEmailIllustration";
export default {
  name: "VerifyEmail",
  components: {
    PinInput,
    VerifyEmailIllustration,
  },
  data() {
    return {
      dialog: false,
      pin: null,
      isLoading: false,
      isLocked: true,
      isResendLoading: false,
    };
  },
  computed: {
    email() {
      return this.$route.query.email;
    },
    timerStarted() {
      return false;
    },
  },
  methods: {
    goBack() {
      if (!this.isLocked) return null;
      this.dialog = false;
      this.$emit("locknavigation", false);
      this.isLocked = false;
      this.$router.replace("/account/email");
    },
    resendEmail() {
      if (this.isResendLoading || this.timerStarted) return null;
      this.isResendLoading = true;
      this.$http
        .post("/auth/resendverificationmail", `"${this.email}"`)
        .then(() => this.$store.commit("startTimer", { time: 300 }))
        .catch((err) => {
          this.$emit("snackbarmessage", err?.response?.data?.errorMessage);
        })
        .finally(() => (this.isResendLoading = false));
    },
    pinChangeHandler(pin) {
      this.pin = pin;
    },
    submitCode() {
      if (this.isLoading) return null;
      this.isLoading = true;

      this.$http
        .post("auth/verify", {
          code: this.pin,
          email: this.email,
        })
        .then((res) => {
          res;
          //TODO successful sign up
        })
        .catch((err) => {
          this.$emit("snackbarmessage", err?.response?.data?.errorMessage);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    this.$emit("locknavigation", true);
  },
  watch: {
    $route() {
      if (this.isLocked) this.dialog = true;
    },
  },
};
</script>

<style lang="stylus"></style>
