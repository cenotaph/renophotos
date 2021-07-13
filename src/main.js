import { createApp } from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast from "vue-toastification"

import "vue-toastification/dist/index.css"

import App from './App.vue'

createApp(App).use(router).use(VueAxios, axios).use(Toast).mount('#app')
axios.defaults.baseURL = process.env.VUE_APP_API_URL
