<template>
  <div class="primary d-flex flex-column justify-end">
    <div class="pa-8 white--text">
      <div class="text-center pb-8">
        <h2 class="font-weight-semibold mb-2">Welcome to Cura!</h2>
        <p class="body-1 mb-6">
          You're a few steps away from having self-care at your fingertips.
        </p>
        <v-btn
          to="/account/setup/basicinfo"
          replace
          large
          block
          elevation="0"
          color="white"
        >
          Get started
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeNewUser",
};
</script>