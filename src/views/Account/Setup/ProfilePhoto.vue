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
    <v-dialog v-model="confirmDialog">
      <v-sheet class="rounded-lg text-center pa-4">
        <h3 class="mb-2">Remove profile photo?</h3>
        <p class="mb-4">Proceed without a profile photo?</p>
        <v-btn
          large
          elevation="0"
          @click="skipStep()"
          block
          color="primary"
          class="mb-2"
        >
          Proceed
        </v-btn>
        <v-btn @click="confirmDialog = false" block plain large elevation="0">
          Go back
        </v-btn>
      </v-sheet>
    </v-dialog>
    <v-bottom-sheet v-model="profilePhotoMenu">
      <v-sheet class="rounded-lg bottom-sheet overflow-hidden">
        <v-list dense>
          <v-list-item
            @click="openImageInput()"
            class="d-flex align-center"
            v-ripple="{ class: 'primary--text' }"
          >
            <v-list-item-icon>
              <v-icon color="primary">mdi-camera</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Change profile photo </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="d-flex align-center"
            v-ripple="{ class: 'error--text' }"
            @click="removeProfilePhoto()"
          >
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="error--text">
                Remove profile photo
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
    <div>
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Profile photo</h2>
    </div>
    <div class="profile-photo-btn-container pa-12">
      <div class="h-100 w-100 position-relative">
        <profile-photo-preview :profilePhotoPreview="profilePhotoPreview" />
        <v-btn
          @click="profilePhotoClickHandler()"
          aria-label="Edit profile photo"
          plain
          class="
            rounded-pill
            pa-0
            h-100
            w-100
            position-relative
            overflow-hidden
          "
          :style="`background: rgba(0,0,0, ${
            profilePhotoPreview ? 0.13 : 0.13
          })`"
        >
          <v-icon
            :color="profilePhotoPreview.url ? 'white' : 'black'"
            size="48"
            style="transform: translateX(-2px) translateY(-4px)"
            :style="`opacity: ${profilePhotoPreview.url ? 1 : 0.75}`"
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
      <v-btn
        plain
        elevation="0"
        large
        block
        @click="profilePhotoPreview.url ? openSkipDialog() : skipStep()"
      >
        Maybe later
      </v-btn>
    </div>
  </div>
</template>

<script>
import Croppie from "croppie-constrained";
import ProfilePhotoPreview from "@/components/Account/Setup/ProfilePhotoPreview";
import multiStep from "@/mixins/multistepform";
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
      confirmDialog: false,
      profilePhotoMenu: false,
      animating: false,
      croppie: null,
    };
  },
  computed: {
    profilePhotoPreview() {
      return this.meta.profilePhotoPreview;
    },
    canGoForward() {
      return !!this.profilePhotoPreview.url;
    },
  },
  methods: {
    openSkipDialog() {
      this.confirmDialog = true;
    },
    profilePhotoClickHandler() {
      return this.imageURL
        ? (this.profilePhotoMenu = true)
        : this.openImageInput();
    },
    skipStep() {
      const nextStep = this.$router.options.routes
        .find((route) => route.name === "AccountSetup")
        .children.find((route) => route.meta.step === this.currentStep + 1);
      this.removeProfilePhoto();
      this.$router.push(nextStep);
    },
    removeProfilePhoto() {
      this.profilePhotoMenu = false
      this.imageURL = null;
      this.profilePhotoPreview.url = null;
      URL.revokeObjectURL(this.imageURL);
      URL.revokeObjectURL(this.profilePhotoPreview.url);
      Object.assign(this.userInfo.profilePhoto, {
        url: null,
        bounds: null,
      });
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
      return this.openCroppie();
    },
    destroyCroppie() {
      this.croppie?.destroy();
      this.croppie = null;
      if (this.profilePhotoPreview.url !== this.imageURL)
        URL.revokeObjectURL(this.imageURL);
    },
    openCroppie() {
      this.profilePhotoMenu = false;
      this.destroyCroppie();
      URL.revokeObjectURL(this.imageURL);
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
      URL.revokeObjectURL(this.profilePhotoPreview.url);
      this.profilePhotoPreview.url = this.imageURL;
      this.profilePhotoPreview.bounds = bounds;
      this.closeCroppie();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.dialog || this.profilePhotoMenu) {
      this.dialog = false;
      this.profilePhotoMenu = false;
      return next(false);
    }
    return next(true);
  },
  created() {
    if (!this.userInfo.profilePhoto.url) {
      this.meta.profilePhotoPreview.url = null;
      this.meta.profilePhotoPreview.bounds = null;
    }
  },
  inject: ["userInfo", "meta"],
  mixins: [multiStep],
};
</script>

<style lang="stylus">
.profile-photo-btn-container {
  width: 100% !important;
  aspect-ratio: 1 / 1 !important;
  overflow: hidden;
  max-width: 476px;
  margin: 0 auto;
}
</style>
