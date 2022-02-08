<template>
  <div id="app" class="vw-100 vh-100">
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
  components: {
    LogicComponents,
    ViewContainer,
    SplashScreen,
  },
};
</script>