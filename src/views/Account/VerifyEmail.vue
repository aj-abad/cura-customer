<template>
  <div>
    <v-dialog v-model="dialog">
      <v-sheet class="rounded-lg text-center pa-4">
        <h3 class="mb-2">Cancel account creation?</h3>
        <p class="mb-4">Do you wish to cancel signing up?</p>
        <v-btn
          large
          elevation="0"
          @click="goBack()"
          block
          color="primary"
          class="mb-2"
        >
          Yes, go back
        </v-btn>
        <v-btn @click="dialog = false" block plain large elevation="0">
          No, continue
        </v-btn>
      </v-sheet>
    </v-dialog>
    <v-app-bar class="mb-4" color="transparent" elevation="0">
      <v-btn
        @click="dialog = true"
        icon
        v-ripple="{ class: 'primary--text' }"
        aria-label="Cancel account creation"
      >
        <v-icon color="primary"> mdi-close </v-icon>
      </v-btn>
    </v-app-bar>
    <div class="px-6 pt-2">
      <div class="px-10 mb-6">
        <verify-email-illustration />
      </div>
      <h2 class="text-center">Verify your email</h2>

      <h3 class="text-center mb-0 grey--text font-weight-medium text--darken-2">
        Please enter the code we sent to
      </h3>
      <h3 class="grey--text text-truncate text-center mb-4 text--darken-2">
        <span class="font-weight-semibold"> {{ email }} </span>
      </h3>
      <form class="w-100" @submit.prevent="submitCode()">
        <div class="pin-container w-100">
          <pin-input :digits="codeLength" @input="pinChangeHandler" />
          <v-btn
            id="submit-code"
            :disabled="!pin || pin.length < 5"
            type="submit"
            class="mt-6 mb-4"
            color="primary"
            elevation="0"
            large
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
          <p class="mb-0 text-center">
            <a
              @click.prevent="resendEmail()"
              :class="{ 'grey--text text--darken-2': timerRunning }"
            >
              <span v-if="!timerRunning">Resend code</span>
              <span v-else>
                Resend code in {{ time }} second<span v-if="time !== 1">s</span>
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
      timerDuration:
        parseInt(process.env.VUE_APP_VERIFICATION_CODE_COOLDOWN_MINUTES) * 60,
      codeLength: parseInt(process.env.VUE_APP_VERIFICATION_CODE_LENGTH),
      dialog: false,
      pin: null,
      isLoading: false,
      isLocked: true,
      isResending: false,
      timerWorker: window.timerWorker,
      time: null,
    };
  },
  computed: {
    email() {
      return this.$route.query.email;
    },
    timerRunning() {
      return this.time > 0;
    },
  },
  methods: {
    goBack() {
      this.dialog = false;
      this.isLocked = false;
      this.$router.go(-2);
    },
    resendEmail() {
      if (this.isResending || this.timerRunning) return null;
      this.isResending = true;
      const { email } = this;
      this.$http
        .post("/email/resendverificationmail", { email })
        .then(() => this.startTimer(this.timerDuration))
        .catch((err) => {
          this.showSnackbar(err?.response?.data?.errorMessage);
        })
        .finally(() => (this.isResending = false));
    },
    pinChangeHandler(pin) {
      this.pin = pin;
      if (this.pin.length === this.codeLength)
        document.querySelector("#submit-code")?.focus();
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
          const {token, user} = res.data;
          this.$store.dispatch("setToken", token);
          this.$store.dispatch("updateUser", user);
          this.isLocked = false;
          this.$router.push({
            name: "WelcomeNewUser",
          });
        })
        .catch((err) => {
          this.showSnackbar(err?.response?.data?.errorMessage);
        })
        .finally(() => (this.isLoading = false));
    },
    startTimer(time) {
      this.time = time;
      this.timerWorker.postMessage({
        startTimer: true,
        time,
      });
      this.timerWorker.onmessage = (e) => {
        this.time = e.data;
      };
    },
  },
  mounted() {
    const timerDuration = parseInt(
      this.$route.query.secondsBeforeResend ?? this.timerDuration
    );
    this.startTimer(timerDuration);
  },
  beforeDestroy() {
    //clean up web worker
    this.timerWorker.postMessage({ startTimer: false });
    this.timerWorker = null;
  },
  beforeRouteLeave(to, from, next) {
    if (this.isLocked) {
      this.dialog = true;
      return next(false);
    }
    return next();
  },
  inject: ["showSnackbar"]
};
</script>

<style lang="stylus"></style>
