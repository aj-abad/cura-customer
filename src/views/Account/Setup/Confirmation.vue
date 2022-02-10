<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <div class="mb-n4">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Confirmation</h2>
    </div>
    <div class="profile-photo-btn-container pa-12">
      <div class="h-100 w-100 position-relative">
        <profile-photo-preview :profilePhotoPreview="userInfo.profilePhoto" />
      </div>
    </div>
    <div class="text-center mt-n8">
      <h3>
        {{ userInfo.firstName }} {{userInfo.lastName}}
      </h3>
    </div>
  </div>
</template>

<script>
import ProfilePhotoPreview from "@/components/Account/Setup/ProfilePhotoPreview";
export default {
  name: "Confirmation",
  components: {
    ProfilePhotoPreview,
  },
  props: {
    steps: Number,
    currentStep: Number,
  },
  inject: ["userInfo"],
};
</script>