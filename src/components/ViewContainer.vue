<template>
  <v-app>
    <v-dialog
      class="loading-dialog"
      persistent
      v-model="loadingDialog"
      width="256px"
      max-width="75vw"
    >
      <v-sheet class="rounded-lg pa-6 d-flex">
        <loader style="width: 32px" class="mr-6" />
        <div
          id="progress-message"
          class="message font-weight-semibold d-flex align-center mt-1"
          style="font-size: 1.05em"
          aria-live="assertive"
        >
          {{ progressMessage }}
        </div>
      </v-sheet>
    </v-dialog>
    <!-- <div id="is-offline" class="py-1 text-center grey darken-3">
      <small class="font-weight-semibold white--text">
        You are currently offline.
      </small>
    </div> -->
    <transition :name="transition">
      <keep-alive :include="cachedComponents">
        <router-view class="page" id="view" />
      </keep-alive>
    </transition>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      min-width="100%"
      class="pa-4"
      @click="snackbar = false"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Loader from "@/components/SVG/Loader";
import routeTransitions from "@/modules/routetransitions";
export default {
  name: "ViewContainer",
  components: { Loader },
  data() {
    return {
      cachedComponents: ["Home", "ShopDetails", "ServiceDetails"],
      transition: "push",
      snackbar: false,
      loadingDialog: false,
      progressMessage: "Loading...",
      snackbarMessage: "",
    };
  },
  watch: {
    $route(to, from) {
      //custom transitions
      const customTransition = routeTransitions.get(`${from.name}-${to.name}`);
      if (customTransition) {
        return (this.transition = customTransition);
      }
      // Default transition
      this.transition = to.meta.depth > from.meta.depth ? "push" : "pop";
    },
  },
  provide() {
    return {
      showSnackbar: (
        msg = navigator.onLine
          ? "Oops, something went wrong on our part."
          : "Cannot connect to Cura."
      ) => {
        this.snackbar = true;
        this.snackbarMessage = msg;
      },
      showProgressDialog: (show = true, msg = "Please wait...") => {
        this.loadingDialog = show;
        this.progressMessage = msg;
        this.$nextTick(() =>
          document.querySelector("#progress-message")?.focus()
        );
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
#view {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.page {
  background: var(--v-background-base);
}

#is-offline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
</style>
