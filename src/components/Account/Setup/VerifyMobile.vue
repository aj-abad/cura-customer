<template>
  <v-sheet class="rounded-lg px-4 py-6 text-center">
    <sms-verify-illustration class="w-100 px-6 mb-4" />
    <h3 class="mb-2">Verify your mobile number</h3>
    <p class="mb-4">
      To verify your mobile number, we'll send a 5-digit code to
      <strong class="text-no-wrap">+63 {{ mobile }}</strong
      >.
    </p>
    <v-btn @click="sendVerificationSMS" large elevation="0" block color="primary">
      <v-progress-circular
        indeterminate
        color="white"
        :width="2.5"
        :size="20"
        v-if="isLoading"
      />
      <span v-else>Continue</span>
    </v-btn>
  </v-sheet>
</template>

<script>
import SmsVerifyIllustration from "@/components/SVG/SmsVerifyIllustration";
export default {
  components: { SmsVerifyIllustration },
  name: "VerifyMobile",
  props: {
    mobile: String,
  },
  data(){
    return {
      isLoading: false
    }
  },
  methods: {
    sendVerificationSMS() {
      if (this.isLoading) return;
      this.isLoading = true;

      this.$http.post("/sms/send")
      .finally(() => this.isLoading = false)
    },
  },
};
</script>