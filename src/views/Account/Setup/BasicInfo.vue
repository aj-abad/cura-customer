<template>
  <div class="pa-6 h-100 w-100">
    <v-dialog v-model="dialog">
      <birth-date-picker @update="setBirthDate" />
    </v-dialog>
    <div class="mb-6">
      <small class="ml-auto font-weight-semibold grey--text text--darken-2">
        Step {{ currentStep }} of {{ steps }}
      </small>
      <h2>Basic information</h2>
    </div>
    <v-text-field
      dense
      rounded
      outlined
      hide-details
      label="First name"
      class="mb-4"
      v-model.trim="userInfo.firstName"
      id="first-name-input"
    />
    <v-text-field
      dense
      rounded
      outlined
      hide-details
      label="Last name"
      v-model.trim="userInfo.lastName"
      class="mb-4"
    />
    <v-text-field
      readonly
      dense
      rounded
      outlined
      hide-details
      label="Birth date"
      v-model.trim="formattedDate"
      @focus.prevent="showDialog()"
    />
  </div>
</template>

<script>
import focusElementOnMount from "@/mixins/focuselement";
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
      focusElement: "#first-name-input",
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
  },
  computed: {
    formattedDate() {
      return this.userInfo.birthDate
        ? this.$date(this.userInfo.birthDate).format("MMMM D, YYYY")
        : "";
    },
    canGoForward() {
      const { firstName, lastName, birthDate } = this.userInfo;
      return validateName(`${firstName} ${lastName}`) && !!birthDate;
    },
  },
  props: {
    steps: Number,
    currentStep: Number,
  },
  inject: ["userInfo"],
  mixins: [focusElementOnMount, multiStep],
};
</script>