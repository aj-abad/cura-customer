<template>
  <v-sheet class="rounded-lg pa-4 text-center">
    <h3 class="mb-2">Verify your mobile number</h3>
    <p class="mb-4">
      To verify your mobile number, we'll send a 5-digit code to
      <strong class="text-no-wrap">+63 {{ mobile }}</strong
      >.
    </p>
    <v-btn large elevation="0" block color="primary" class="mb-2">
      Continue
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: "VerifyMobile",
  props: {
    mobile: String,
  },
  methods: {
    sendVerificationSMS() {
      this.$http.post("/sms/send")
    },
  },
};
</script>