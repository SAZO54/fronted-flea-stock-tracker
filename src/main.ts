import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/sass/custom.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).mount('#app')
