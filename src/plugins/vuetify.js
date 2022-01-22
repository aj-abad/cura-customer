import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'
import "@fontsource/nunito-sans";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#0d826e',
        primarylight: '#00a987',
        primarylighter: '#aeddd5',
        secondary: '#f69b7a',
        secondarylight: '#f7eab5',
        error: '#820D21',
        bglight: '#dff2ef'
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        // error: '#b71c1c',
      },
    },
  },
});
