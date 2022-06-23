require('./bootstrap');

import Alpine from 'alpinejs';

import { createApp } from 'vue'
import router from './router'
import store from "./store";

window.Alpine = Alpine;
Alpine.start();

createApp()
.use(router)
.use(store)
.mount('#app')