<template>
  <v-app-bar
    class="mb-4"
    color="transparent"
    elevation="0"
  >
    <v-btn
      @click="$router.go(-1)"
      icon
      v-ripple="{ class: 'primary--text' }"
      aria-label="Go back"
    >
      <v-icon color="primary">
        mdi-arrow-left
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'BackNav'
}
</script>
