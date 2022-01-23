<template>
  <div class="pa-6">
    <h2>Basic information</h2>
    <h3 class="font-weight-medium grey--text text--darken-2 mb-6">
      Let's get to know you.
    </h3>
    <v-text-field
      dense
      rounded
      outlined
      hide-details
      label="First name"
      class="mb-2"
    />
    <v-text-field dense rounded outlined hide-details label="Last name" />
  </div>
</template>

<script>
export default {
  name: "BasicInfo",
};
</script>