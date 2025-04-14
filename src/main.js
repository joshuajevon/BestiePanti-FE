import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/authStore";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Register Pinia first
app.use(router);
app.use(MotionPlugin);

const authStore = useAuthStore(); // Then use your store

if (authStore.token) {
  authStore.fetchUser();
}

app.mount("#app");
