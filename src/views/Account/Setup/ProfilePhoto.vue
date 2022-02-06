<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <v-dialog ref="dialog" v-model="dialog" max-width="100%" fullscreen>
      <v-app-bar
        class="position-absolute w-100 top left"
        style="z-index: 5"
        color="transparent"
        elevation="0"
      >
        <v-btn @click="closeCroppie()" icon>
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
    <div>
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Profile photo</h2>
    </div>
    <div class="profile-photo-btn-container pa-12">
      <div class="h-100 w-100 position-relative">
        <profile-photo-preview />
        <v-btn
          @click="openImageInput"
          aria-label="Edit profile photo"
          plain
          class="pa-0 h-100 w-100 position-relative overflow-hidden"
          :style="`background: rgba(0,0,0, ${
            userInfo.profilePhoto ? 0.13 : 0.13
          })`"
        >
          <v-icon
            :color="userInfo.profilePhoto ? 'white' : 'black'"
            size="48"
            style="transform: translateX(-2px) translateY(-4px)"
            :style="`opacity: ${userInfo.profilePhoto ? 1 : 0.75}`"
          >
            mdi-camera-plus
          </v-icon>
        </v-btn>
      </div>
      <input
        @change="setImgFile"
        ref="imgInput"
        type="file"
        accept="image/*"
        class="d-none"
      />
    </div>
    <div class="mt-auto mb-2">
      <v-btn plain elevation="0" large block @click="skipStep()">
        Maybe later
      </v-btn>
    </div>
  </div>
</template>

<script>
import Croppie from "croppie-constrained";
import ProfilePhotoPreview from "@/components/Account/Setup/ProfilePhotoPreview";
export default {
  name: "ProfilePhoto",
  components: {
    ProfilePhotoPreview,
  },
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
    skipStep() {
      const nextStep = this.$router.options.routes
        .find((route) => route.name === "AccountSetup")
        .children.find((route) => route.meta.step === this.currentStep + 1);

      setTimeout(() => (this.userInfo.profilePhoto = null), 320);
      nextStep ? this.$router.push(nextStep) : null;
    },
    openImageInput() {
      this.$refs.imgInput.click();
    },
    setImgFile() {
      if (this.animating) return null;
      const file = this.$refs.imgInput.files[0];
      if (!file) return null;
      if (file.size > 1000 * 5000)
        return this.$parent.$parent.$emit(
          "snackbarMessage",
          "Please pick an image 5MB or smaller."
        );
      this.imgFile = file;
      URL.revokeObjectURL(this.imageURL);
      return this.openCroppie();
    },
    destroyCroppie() {
      this.croppie?.destroy();
      this.croppie = null;
    },
    openCroppie() {
      this.destroyCroppie();
      this.imageURL = URL.createObjectURL(this.imgFile);
      this.$refs.imgInput.value = null;
      this.dialog = true;
      this.animating = true;
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
    closeCroppie() {
      this.dialog = false;
      setTimeout(() => {
        this.destroyCroppie();
      }, 310);
    },
    async confirmBounds() {
      const bounds = (
        await this.croppie.result({
          type: "points",
        })
      ).map((point) => parseFloat(point));
      this.userInfo.profilePhoto = {
        url: this.imageURL,
        bounds,
      };
      this.closeCroppie();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.dialog) {
      this.dialog = false;
      return next(false);
    }
    return next(true);
  },
  inject: ["userInfo"],
};
</script>

<style lang="stylus" scoped>
.profile-photo-btn-container {
  width: 100% !important;
  aspect-ratio: 1 / 1 !important;
  overflow: hidden;
  max-width: 476px;
  margin: 0 auto;
}
</style>