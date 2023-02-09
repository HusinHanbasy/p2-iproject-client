import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";


import App from './App.vue'
import router from './router'

import './assets/css/style.css'
const pinia = createPinia()
const app = createApp(App)
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(vue3GoogleLogin, {
    clientId: '338073874974-rrups1f7nt5urgppren0eiunnvhlm6hk.apps.googleusercontent.com'
})
app.use(VueAwesomePaginate)
app.use(pinia)
app.use(router)

app.mount('#app')
