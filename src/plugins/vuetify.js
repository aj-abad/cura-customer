import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";
import "@fontsource/nunito-sans/200.css";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import "@fontsource/nunito-sans/900.css";
Vue.use(Vuetify);

const opts = {
  theme: {
    // dark: true,
    options: {
      customProperties: true,
    },
  },
  themes: {
    light: {
      background: "#fff",
      primary: "#0d826e",
      primarylight: "#00a987",
      primarylighter: "#aeddd5",
      secondary: "#f69b7a",
      secondarylight: "#f7eab5",
      error: "#820D21",
      bglight: "#dff2ef",
    },
    dark: {
      background: "#1e1e1e",
    },
  },
};

export default new Vuetify(opts);
