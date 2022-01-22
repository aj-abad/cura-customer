<template>
  <div class="bglight pt-6">
    <div class="d-flex mb-2 justify-center">
      <cura-logo style="width: 48px" aria-label="Cura" />
    </div>
    <div class="text-center">
      <h2 class="font-weight-semibold">Self-care, delivered.</h2>
      <h3 class="mt-n1 font-weight-medium">Welcome to Cura.</h3>
    </div>
    <v-sheet
      elevation="6"
      class="
        white
        position-absolute
        w-100
        bottom
        left
        pa-6
        rounded-xl
        bottom-sheet
      "
    >
      <v-btn elevation="0" block large dark color="#3b5998" class="mb-2">
        <v-icon class="btn-icon"> mdi-facebook </v-icon>
        Continue with Facebook
      </v-btn>
      <v-btn elevation="0" block large color="primary" to="/account/email">
        <v-icon class="btn-icon"> mdi-email </v-icon>
        Continue with email
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
import CuraLogo from "../components/SVG/CuraLogo.vue";
export default {
  components: { CuraLogo },
  name: "Start",
};
</script>

<style lang="stylus" scoped>
.text-center {
  h2, h3 {
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
