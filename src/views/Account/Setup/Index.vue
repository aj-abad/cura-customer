<template>
  <div class="bglight d-flex flex-column justify-end">
    <div style="height: 96px">
      <progress-indicator />
    </div>
    <v-sheet
      class="rounded-xl bottom-sheet"
      style="height: calc(100vh - 96px); overflow: hidden"
    >
      <router-view class="account-setup-view" />
    </v-sheet>
    <div class="position-absolute w-100 pa-6 bottom left">
      <v-btn color="primary" elevation="0" large block>
        Next <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "@/components/Account/ProgressIndicator";
export default {
  components: { ProgressIndicator },
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
  padding-bottom: 72px !important;
}
</style>