<template>
  <div class="pa-6">
    <div class="mb-6">
      <div class="d-flex align-center">
        <h2>Basic information</h2>
        <small class="ml-auto font-weight-semibold grey--text text--darken-2">
          Step 1 of 3
        </small>
      </div>
      <h3 class="font-weight-medium grey--text text--darken-2">
        Let's get to know you.
      </h3>
    </div>
    <v-text-field
      dense
      rounded
      outlined
      hide-details
      label="First name"
      class="mb-4"
      v-model.trim="userInfo.firstName"
    />
    <v-text-field
      dense
      rounded
      outlined
      hide-details
      label="Last name"
      v-model.trim="userInfo.lastName"
    />
  </div>
</template>

<script>
export default {
  name: "BasicInfo",
  inject: ["userInfo"],
};
</script>