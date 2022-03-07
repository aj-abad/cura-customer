<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <div class="mb-4">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Confirmation</h2>
    </div>
    <v-sheet class="mx-6 pa-6 rounded-lg">
      <div class="profile-photo-btn-container pa-6 mt-n6 mb-n4">
        <div class="h-100 w-100 position-relative">
          <profile-photo-preview v-if="userInfo.profilePhoto.url" :profilePhotoPreview="userInfo.profilePhoto" />
          <!-- TODO add meaningful profile photo placeholder -->
          <div class="h-100 w-100 red" style="border-radius: 1000px" v-else ></div>
        </div>
      </div>
      <div class="text-center">
        <h3>
          {{ userInfo.firstName }} {{userInfo.lastName}}
        </h3>
        <h4 v-if="userInfo.mobile" class="grey--text text--darken-2 font-weight-medium">
          +63{{ userInfo.mobile }}
        </h4>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import ProfilePhotoPreview from "@/components/Account/Setup/ProfilePhotoPreview";
import multiStep from "@/mixins/multistepform";
export default {
  name: "Confirmation",
  components: {
    ProfilePhotoPreview,
  },
  computed:{
    canGoForward(){
      return true;
    }
  },
  props: {
    steps: Number,
    currentStep: Number,
  },
  inject: ["userInfo"],
  mixins: [multiStep],
};
</script>