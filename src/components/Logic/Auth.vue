<template>
  <div style="display: none"></div>
</template>

<script>
export default {
  name: "AuthSetup",
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    if (this.token) this.setAuthHeader();
  },
  watch: {
    token() {
      if (this.token) this.setAuthHeader();
    },
  },
  methods: {
    setAuthHeader() {
      const token = this.token ?? null;
      this.$http.defaults.headers.common["Authorization"] = token;
    },
  },
};
</script>