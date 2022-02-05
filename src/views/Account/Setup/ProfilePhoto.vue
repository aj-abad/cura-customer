<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <v-dialog ref="dialog" v-model="dialog" max-width="100%" fullscreen>
      <v-app-bar
        class="position-absolute w-100 top left"
        style="z-index: 5"
        color="transparent"
        elevation="0"
      >
        <v-btn @click="dialog = false" icon>
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
        <h3 class="white--text font-weight-semibold">Move and scale</h3>
      </v-app-bar>
      <v-sheet class="h-100 position-relative" style="overflow: hidden">
        <transition name="fade">
          <div
            class="h-100 w-100 position-absolute top left"
            style="background: rgba(127, 127, 127)"
            v-if="animating"
          ></div>
        </transition>

        <div ref="croppieContainer" class="h-100"></div>
        <div
          class="w-100 pa-6 position-absolute bottom left"
          style="z-index: 5"
        >
          <v-btn
            block
            color="white"
            rounded
            elevation="0"
            class="py-6"
            @click="confirmBounds()"
          >
            Confirm
          </v-btn>
        </div>
      </v-sheet>
    </v-dialog>
    <div class="mb-6">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Profile photo</h2>
    </div>
    <div class="profile-photo-btn-container pa-8">
      <v-btn
        @click="openImageInput"
        aria-label="Edit profile photo"
        plain
        class="grey lighten-3 pa-0 h-100 w-100"
      >
        <v-icon size="48" style="opacity: 0.5"> mdi-camera </v-icon>
      </v-btn>
      <input
        @change="setImgFile"
        ref="imgInput"
        type="file"
        accept="image/*"
        class="d-none"
      />
    </div>
    <div class="mt-auto mb-2">
      <v-btn plain elevation="0" large block> Maybe later </v-btn>
    </div>
  </div>
</template>

<script>
import Croppie from "croppie-constrained";

export default {
  name: "ProfilePhoto",
  props: {
    steps: Number,
    currentStep: Number,
  },
  data() {
    return {
      imgFile: null,
      imageURL: null,
      dialog: false,
      animating: false,
      croppie: null,
    };
  },
  methods: {
    openImageInput() {
      this.$refs.imgInput.click();
    },
    setImgFile() {
      const file = this.$refs.imgInput.files[0];
      if (!file) return null;
      this.imgFile = file;
      return this.openCroppie();
    },
    destroyCroppie() {
      this.croppie?.destroy();
      this.croppie = null;
    },
    openCroppie() {
      this.destroyCroppie();
      this.dialog = true;
      this.animating = true;
      this.imageURL = URL.createObjectURL(this.imgFile);
      const viewportSize =
        window.innerWidth > 300 ? 300 : window.innerWidth - 64;
      setTimeout(() => {
        this.animating = false;
        this.croppie = new Croppie(this.$refs.croppieContainer, {
          showZoomer: false,
          maxZoom: 2.0,
          enforceBoundary: true,
          viewport: {
            width: viewportSize,
            height: viewportSize,
            type: "circle",
          },
        });
        this.croppie.bind({
          url: this.imageURL,
          zoom: 0,
        });
      }, 310);
    },
    async confirmBounds() {
      const result = (
        await this.croppie.result({
          type: "points",
        })
      )?.map((x) => parseFloat(x));
      console.log(result);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.dialog) {
      this.dialog = false;
      next(false);
    }
  },
};
</script>

<style lang="stylus" scoped>
.profile-photo-btn-container {
  width: 100% !important;
  aspect-ratio: 1 / 1 !important;
  overflow: hidden;
}
</style>