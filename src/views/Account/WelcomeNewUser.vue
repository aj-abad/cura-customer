<template>
  <div class="primary d-flex flex-column justify-end">
    <div class="pa-6 white--text">
      <div class="text-center pb-6">
        <h2 class="font-weight-semibold mb-2">Welcome to Cura!</h2>
        <p class="body-1 mb-6">
          You're only a few steps away from making self-care easier than ever
          before.
        </p>
        <v-btn
          v-ripple="{ class: 'primary--text' }"
          large
          block
          elevation="0"
          color="white"
        >
          Set up account
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