import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000'

createApp(App).use(ElementPlus)
createApp(App).mount('#app')

