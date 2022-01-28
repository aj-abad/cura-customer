<template>
  <div class="bglight d-flex flex-column justify-end">
    <div style="height: 96px">
      <!-- TODO add progress indicator -->
    </div>
    <v-sheet
      class="rounded-xl bottom-sheet"
      style="height: calc(100vh - 96px); overflow: hidden"
    >
      <router-view class="account-setup-view" />
    </v-sheet>
    <div class="position-absolute w-100 pa-6 bottom left">
      <v-btn color="primary" elevation="0" large block>
        Next <v-icon right>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
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

<style lang="stylus" scoped>
.account-setup-view {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 64px !important;
}
</style>