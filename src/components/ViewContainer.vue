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
          {{ loadingMessage }}
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
        <router-view
          @snackbarmessage="showSnackbar"
          @showloading="showLoadingDialog"
          @locknavigation="lockNavigationHandler"
          class="page"
          id="view"
        />
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
import routeTransitions from "@/assets/routetransitions";
export default {
  name: "ViewContainer",
  components: { Loader },
  data() {
    return {
      cachedComponents: ["Home", "ShopDetails", "ServiceDetails"],
      transition: "push",
      snackbar: false,
      loadingDialog: false,
      loadingMessage: "Loading...",
      snackbarMessage: "",
      lockNavigation: false,
    };
  },
  computed: {
    userStatus() {
      return this.$store.getters.getAccount?.userStatus;
    },
  },
  methods: {
    showSnackbar(message) {
      this.snackbar = true;
      this.snackbarMessage =
        message ??
        (navigator.onLine
          ? "Oops, something went wrong on our part."
          : "Cannot connect to Cura.");
    },
    showLoadingDialog(status, message) {
      this.lockNavigation = status;
      this.loadingDialog = status;
      if (message) this.loadingMessage = message;
      this.$nextTick(() =>
        document.querySelector("#progress-message")?.focus()
      );
    },
    lockNavigationHandler(lock) {
      this.lockNavigation = lock;
    },
  },
  watch: {
    $route(to, from) {
      // prevent route changes if enabled
      if (this.lockNavigation) {
        this.$router.push(from).catch((err) => err);
        this.lockNavigation = false;
        this.$nextTick(() => (this.lockNavigation = true));
        return null;
      }
      //custom transitions
      const customTransition =
        routeTransitions.get(`${to.name}-${from.name}`) ||
        routeTransitions.get(`${from.name}-${to.name}`);
      if (customTransition) {
        return (this.transition = `${customTransition}-${
          to.meta?.depth > from.meta?.depth ? "push" : "pop"
        }`);
      }

      // Default transition
      this.transition = to.meta.depth > from.meta.depth ? "push" : "pop";
    },
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
  background: white;
}

#is-offline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
</style>
