import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/sass/custom.scss';
import 'vue3-toastify/dist/index.css'; // スタイルをインポート
import Vue3Toastify from 'vue3-toastify';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(Vue3Toastify, { autoClose: 3000 }).mount('#app');

