import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import type { Router } from 'vue-router';

import App from './App.vue'
import router from './router'
declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router;
    }
}
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
