<template>
  <div class="pa-6 w-100 h-100 d-flex flex-column">
    <div class="mb-6">
      <div class="d-flex align-center">
        <h2>Mobile number</h2>
        <small class="ml-auto font-weight-semibold grey--text text--darken-2">
          Step {{ currentStep }} of {{ steps }}
        </small>
      </div>
      <h3 class="font-weight-medium grey--text text--darken-2">
        We'll use this to contact you during bookings.
      </h3>
    </div>
    <v-text-field
      dense
      rounded
      outlined
      hide-details
      label="Mobile number"
      class="mb-4"
      v-model.trim="mobile"
      prefix="+63"
      v-mask="'### ### ####'"
    />
    <div class="mt-auto mb-2">
      <v-btn plain elevation="0" large block> Maybe later </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mobile",
  data() {
    return {
      mobile: "",
    };
  },
  props: {
    steps: Number,
    currentStep: Number,
  },
  watch: {
    mobile() {
      return (this.userInfo.mobile = this.mobile.replaceAll(" ", ""));
    },
  },
  inject: ["userInfo"],
};
</script>