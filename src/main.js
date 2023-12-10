import { createApp } from "vue";
// 彈窗提示
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(Toast);
app.mount("#app");
