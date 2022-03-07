<template>
  <v-sheet class="rounded-xl bottom-sheet pt-4 bglight overflow-hidden">
    <div class="position-relative px-4 mb-n2 primary--text text--darken-3" style="z-index: 1">
      <h3>Birth date</h3>
    </div>
    <v-date-picker
      full-width
      class="light-title"
      min="1900-01-01"
      :title-date-format="dateFormat"
      :max="maximumDate"
      v-model="date"
      color="primary"
    />
    <div class="pa-4 pb-6 white">
      <v-btn
        block
        large
        elevation="0"
        color="primary"
        @click="$emit('update', date)"
      >
        Confirm
      </v-btn>
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
  methods: {
    dateFormat(date) {
      return this.$date(date).format("MMM D");
    },
  },
};
</script>