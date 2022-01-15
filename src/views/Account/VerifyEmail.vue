<template>
  <div>
    <v-app-bar
      class="rounded-lg"
      color="transparent"
      elevation="0"
    >
      <v-btn
        @click="$router.go(-1)"
        icon
        v-ripple="{ class: 'primary--text' }"
      >
        <v-icon color="primary">
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </v-app-bar>
    <div class="px-6 pt-2">
      <div class="px-10 mb-6">
        <verify-email-illustration />
      </div>
      <h2 class="text-center">
        Verify your email
      </h2>
      <h3 class="text-center mb-8 grey--text font-weight-medium">
        Enter the code we sent to
        <span class="font-weight-semibold">{{ maskedEmail }}</span>.
      </h3>
      <form
        class="w-100"
        @submit.prevent="submitCode()"
      >
        <div class="pin-container w-100">
          <pin-input
            :digits="5"
            @input="pinChangeHandler"
          />
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
import PinInput from '@/components/Account/PinInput'
import VerifyEmailIllustration from '@/components/SVG/VerifyEmailIllustration'
export default {
  name: 'VerifyEmail',
  components: {
    PinInput,
    VerifyEmailIllustration
  },
  mounted () {
    if (!this.timerStarted) this.$store.commit('startTimer', { time: 300 })
  },
  computed: {
    email () {
      return this.$route.query.email
    },
    maskedEmail () {
      const email = this.email.split('@')

      email[0] =
        email[0][0].toString().padEnd(email[0].length - 2, '•') +
        email[0][email[0].length - 1]
      return email.join().replace(',', '@')
    },
    timerStarted () {
      return this.$store.getters.getTimer.timerStarted
    },
    time () {
      return this.$store.getters.getTimer.time
    }
  },
  data () {
    return {
      pin: null,
      isLoading: false,
      isResendLoading: false
    }
  },
  methods: {
    resendEmail () {
      if (this.isResendLoading || this.timerStarted) return null
      this.isResendLoading = true
      this.$http
        .post('/auth/resendverificationmail', `"${this.email}"`)
        .then(() => this.$store.commit('startTimer', { time: 300 }))
        .catch((err) => {
          this.$emit('snackbarmessage', err?.response?.data?.errorMessage)
        })
        .finally(() => (this.isResendLoading = false))
    },
    pinChangeHandler (pin) {
      this.pin = pin
    },
    submitCode () {
      if (this.isLoading) return null
      this.isLoading = true

      this.$http
        .post('auth/verifyemail', {
          code: this.pin,
          email: this.email
        })
        .then((res) => {
          const { token, userId } = res.data
          this.$store.commit('stopTimer')
          this.$store.commit('setAccount', {
            token,
            userId,
            userStatus: 2,
            userType: 1
          })
        })
        .catch((err) => {
          this.$emit('snackbarmessage', err?.response?.data?.errorMessage)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style lang="stylus"></style>
