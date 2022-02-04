<template>
  <div style="display: none">
     <v-dialog v-model="dialog" persistent>
      <v-sheet class="rounded-lg pa-4">
        <h3 class="mb-2 primary--text text--darken-2">Session expired</h3>
        <p class="mb-4">Your session is expired. Please sign in again.</p>
        <v-btn
          @click="signOut()"
          large
          elevation="0"
          block
          color="primary"
          class="mb-2"
        >
          Okay
        </v-btn>
      </v-sheet>
    </v-dialog>
    <!-- This component manages auth -->
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },

  },
  created() {
    if (!this.token)
      return null;
    //TODO check if token is expired
    this.$http.get("/")
    this.setAuthHeader();

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
    signOut(){
      //TODO implement sign out
      this.dialog = false
    }
  },
};
</script>