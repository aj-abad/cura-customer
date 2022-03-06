<template>
  <div class="pa-6 h-100 w-100">
    <v-bottom-sheet v-model="dialog">
      <birth-date-picker @update="setBirthDate" />
    </v-bottom-sheet>
    <div class="mb-6">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Basic information</h2>
    </div>
    <form @submit.prevent="$emit('forward')">
      <v-text-field
        dense
        rounded
        outlined
        label="First name"
        hide-details="auto"
        :error-messages="nameErrorMessage(userInfo.firstName)"
        class="mb-4"
        v-model="userInfo.firstName"
        id="first-name-input"
        v-focus="320"
      />
      <v-text-field
        dense
        rounded
        outlined
        label="Last name"
        :error-messages="nameErrorMessage(userInfo.lastName)"
        hide-details="auto"
        v-model="userInfo.lastName"
        class="mb-4"
      />
      <v-text-field
        readonly
        dense
        rounded
        outlined
        label="Birth date"
        v-model="formattedDate"
        @focus.prevent="showDialog()"
      />
      <button type="submit" class="d-none"></button>
    </form>
  </div>
</template>

<script>
import BirthDatePicker from "@/components/Account/Setup/BirthDatePicker";
import { validateName } from "cura-validation-utils";
import multiStep from "@/mixins/multistepform";

export default {
  name: "BasicInfo",
  components: {
    BirthDatePicker,
  },
  data() {
    return {
      dialog: false,
      picker: null,
    };
  },
  methods: {
    showDialog() {
      document.activeElement.blur();
      this.$nextTick(() => (this.dialog = true));
    },
    setBirthDate(date) {
      this.userInfo.birthDate = date;
      this.dialog = false;
    },
    nameErrorMessage(name) {
      if (name.length === 0) return null;
      return validateName(name) ? null : "Name has invalid characters.";
    },
  },
  computed: {
    formattedDate() {
      return this.userInfo.birthDate
        ? this.$date(this.userInfo.birthDate).format("MMMM D, YYYY")
        : "";
    },
    canGoForward() {
      //valid first name and birthdate required
      if (!this.userInfo.firstName) return false;
      const { firstName, lastName, birthDate } = this.userInfo;
      return validateName(`${firstName} ${lastName}`) && !!birthDate;
    },
  },
  props: {
    steps: Number,
    currentStep: Number,
  },
  inject: ["userInfo"],
  mixins: [multiStep],
};
</script>