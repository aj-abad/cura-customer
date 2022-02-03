<template>
  <v-sheet class="rounded-lg overflow-hidden">
    <v-date-picker :max="maximumDate" v-model="date" />
    <div class="pa-4">
      <v-btn block large elevation="0" color="primary" @click="$emit('update', date)"> Confirm </v-btn>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "BirthDatePicker",
  data() {
    return {
      date: null,
    };
  },
  computed: {
    maximumDate() {
      return this.$date().subtract(18, "years").toISOString().substr(0, 10);
    },
  },
  mounted() {
    this.date = this.maximumDate;
  },
};
</script>