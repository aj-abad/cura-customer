<template>
  <div class="labeled-text-field-container">
    <div style="height: 24px">
      <label :for="`input-${_uid}`" v-if="label">{{ label }}</label>
    </div>
    <v-text-field
      :value="value"
      outlined
      dense
      :readonly="readonly ?? false"
      :disabled="disabled ?? false"
      :filled="filled ?? false"
      :type="inputType ?? 'text'"
      :id="`input-${_uid}`"
      :append-icon="appendIcon"
      :error-messages="errorMessages ?? []"
      @click:append="appendIconClickHandler"
      hide-details="auto"
      @input="inputHandler"
      @focus="$emit('focus')"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "LabeledTextField",
  props: [
    "label",
    "value",
    "type",
    "readonly",
    "filled",
    "disabled",
    "showPassword",
    "errorMessages"
  ],
  data() {
    return {
      password: !!this.showPassword,
    };
  },
  methods: {
    inputHandler(val) {
      this.$emit("input", val);
    },
    appendIconClickHandler() {
      if (this.type === "password") {
        this.password = !this.password;
      }
    },
  },
  computed: {
    appendIcon() {
      if (this.type === "password")
        return this.password ? "mdi-eye" : "mdi-eye-off";
      return null;
    },
    inputType() {
      if (this.type === "password") return this.password ? "text" : "password";
      return this.type;
    },
  },
};
</script>

<style lang="stylus" scoped>
label {
  transition: color 0.3s, opacity 0.3s, font-size 0.3s, transform 0.3s;
  transform-origin: 0 100%;
  font-weight: 600;
  font-size: 0.87rem;
  opacity: 0.6;
  display: inline-block;
}

.labeled-text-field-container {
  &:focus-within {
    label {
      color: var(--v-primary-base);
      // font-weight: bold;
      transform: scale(1.12);
      opacity: 1;
    }
  }
}
</style>