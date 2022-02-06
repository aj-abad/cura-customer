<template>
  <div
    v-if="userInfo.profilePhoto"
    class="profile-photo-preview-container"
    style="transform-origin: 0 0"
    :style="profilePhotoPreviewContainer"
  >
    <img
      class="position-absolute"
      :src="userInfo.profilePhoto.url"
      alt="Profile photo preview"
      :style="profilePhotoPreview"
    />
  </div>
</template>

<script>
export default {
  name: "ProfilePhotoPreview",
  inject: ["userInfo"],
  computed: {
    profilePhotoPreviewContainer() {
      const { bounds } = this.userInfo.profilePhoto;
      const [x1, y1, x2, y2] = bounds;
      return {
        width: `${x2 - x1}px`,
        height: `${y2 - y1}px`,
      };
    },
    profilePhotoPreview() {
      const { bounds } = this.userInfo.profilePhoto;
      return {
        left: `${-bounds[0]}px`,
        top: `${-bounds[1]}px`,
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.profile-photo-preview-container {
  height: 100%;
  overflow: hidden;
  width: @height;
  position: absolute;
  border-radius: 10000px;
  top: 0;
  left: 0;
}
</style>