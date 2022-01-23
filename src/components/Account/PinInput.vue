<template>
  <div class="d-flex justify-space-between pin-numbers">
    <div
      class="w-100 position-relative"
      v-for="(i, j) in digits"
      :key="j"
      :class="{
        'mr-1': i === 1,
        'mx-1': i > 1 && i < digits,
        'ml-1': i === digits,
      }"
    >
      <div
        class="
          position-absolute
          w-100
          h-100
          top
          left
          d-flex
          justify-center
          align-center
          pointer-events-none
        "
        aria-role="presentation"
      >
        <transition name="fade-fast">
          <div class="font-weight-bold" v-if="pinArray[j]">
            {{ pinArray[j] }}
          </div>
        </transition>
      </div>
      <input
        ref="pinInput"
        :aria-label="`PIN digit ${i}`"
        type="number"
        class="pin-input"
        pattern="[0-9]{1}"
        @keydown="keydownHandler($event, j)"
        @input="inputHandler($event, j)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PinInput",
  props: {
    digits: Number,
  },
  data() {
    return {
      pin: "",
      pinArray: Array(this.digits).fill(null),
    };
  },
  computed: {},
  methods: {
    keydownHandler(e, i) {
      if (e.keyCode !== 8) return null;
      e.preventDefault();
      const el = this.$refs.pinInput[i];
      const prev = this.$refs.pinInput[i - 1];
      parseInt(el.value) >= 0 ? (el.value = null) : prev?.focus();
      return this.computePin();
    },
    inputHandler(e, i) {
      const el = this.$refs.pinInput[i];
      const next = this.$refs.pinInput[i + 1];
      const inputVal = parseInt(e.data);

      if (isNaN(inputVal)) {
        el.value = null;
        return e.preventDefault();
      }

      if (el.value >= 0) {
        el.value = inputVal;
        this.computePin();
        return next ? next.focus() : document.activeElement.blur();
      }
    },
    computePin() {
      const pin = this.$refs.pinInput.reduce((acc, el) => {
        return acc + (el.value ? el.value : "");
      }, "");
      this.pin = pin;
      this.getPinArray();
      this.$emit("input", this.pin);
    },
    getPinArray() {
      const pinArray = Array(this.digits).fill(null);
      this.$refs.pinInput.forEach((el, i) => {
        if (el.value) {
          pinArray[i] = el.value;
        }
      });
      this.pinArray = pinArray;
    },
  },
};
</script>

<style lang="stylus" scoped>
.pin-numbers {
  input {
    caret-color: transparent;
    text-align: center;
    font-weight: bold;
    color: transparent;
  }
}

.pin-input {
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  max-width: 100%;
  outline: none !important;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.42);
  height: 40px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

  &:focus {
    border: 2px solid var(--primary);
  }
}
</style>
