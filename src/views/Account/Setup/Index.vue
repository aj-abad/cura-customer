<template>
  <div class="bglight d-flex flex-column justify-end">
    <div style="height: 96px">
      <!-- TODO add progress indicator -->
    </div>
    <v-sheet class="rounded-xl flex-grow-1">
      <router-view />
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "AccountSetup",
  data() {
    return {
      userInfo: {
        firstName: "",
        lastName: "",
        mobile: "",
        profilePhoto: "",
      },
    };
  },
  provide() {
    return {
      userInfo: this.userInfo,
    };
  },
};
</script>