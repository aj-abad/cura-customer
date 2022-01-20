<template>
  <div id="app">
    <splash-screen />
    <view-container />
    <logic-components />
  </div>
</template>

<script>
import LogicComponents from "@/components/Logic/LogicComponents";
import ViewContainer from "@/components/ViewContainer";
import SplashScreen from "@/components/SplashScreen";
export default {
  name: "App",
  created() {
    //TODO remove this
    if (process.env.NODE_ENV === "development") {
      window.vm = this;
    }
    this.$router.replace("/").catch((err) => err);
  },
  components: {
    LogicComponents,
    ViewContainer,
    SplashScreen,
  },
};
</script>

<style lang="stylus">
#app {
  height: 100vh;
  width: 100vw;
}

#offline-overlay {
  position: absolute;
  inset: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 999;
}
</style>
