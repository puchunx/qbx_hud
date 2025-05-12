import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

import "./style.css";
import "./responsive.css";

import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "quasar/dist/quasar.css";

import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Quasar, {});
app.mount("#app");
