<template>
  <div
    class="profile-photo-preview-container"
    :class="{ 'd-none': !url }"
    style="transform-origin: 0 0"
    :style="profilePhotoPreviewContainer"
    ref="profilePhotoPreviewContainer"
  >
    <img
      class="position-absolute"
      :src="url ?? ''"
      alt="Profile photo preview"
      :style="profilePhotoPreviewStyle"
    />
  </div>
</template>

<script>
export default {
  name: "ProfilePhotoPreview",
  data() {
    return {
      resizeObserver: null,
    };
  },
  props: {
    profilePhotoPreview: Object,
  },
  computed: {
    url() {
      return this.profilePhotoPreview?.url;
    },
    profilePhotoPreviewContainer() {
      if (!this.profilePhotoPreview?.url) return null;
      const { bounds } = this.profilePhotoPreview;
      const [x1, y1, x2, y2] = bounds;
      return {
        width: `${x2 - x1}px`,
        height: `${y2 - y1}px`,
      };
    },
    profilePhotoPreviewStyle() {
      if (!this.profilePhotoPreview?.url) return null;

      const { bounds } = this.profilePhotoPreview;
      return {
        left: `${-bounds[0]}px`,
        top: `${-bounds[1]}px`,
      };
    },
  },
  mounted() {
    this.createResizeObserver();
  },
  methods: {
    createResizeObserver() {
      this.resizeObserver = new ResizeObserver(() => {
        const el = this.$refs.profilePhotoPreviewContainer;
        const { clientWidth: parentWidth } =
          this.$refs.profilePhotoPreviewContainer.parentElement;
        el.style.transform = `scale(${parentWidth / el.clientWidth})`;
      });
      this.resizeObserver.observe(this.$refs.profilePhotoPreviewContainer);
      this.resizeObserver.observe(
        this.$refs.profilePhotoPreviewContainer.parentElement
      );
    },
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius 100%
    box-shadow: 8px 8px 100px inset rgba(0, 0, 0, 0.04), -8px -8px 100px inset rgba(0, 0, 0, 0.04), -8px 8px 100px inset rgba(0, 0, 0, 0.04), 8px -8px 100px inset rgba(0, 0, 0, 0.04);
    z-index 1
  }
}
</style>