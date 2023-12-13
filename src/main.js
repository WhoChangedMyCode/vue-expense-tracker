import { createApp } from 'vue';
// vue-toastification是一個Vue的Toast通知插件。它可以用來在Vue應用程式中顯示簡短的信息消息。
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';

const app = createApp(App);
// 註冊
app.use(Toast);
app.mount('#app');
