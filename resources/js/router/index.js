import { createRouter, createWebHistory } from "vue-router"

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
    {
      path: '/',
      name: "home",
      component: HomeView
    },
    {
      path: '/login',
      name: "login",
      component: LoginView
    },
    {
      path: '/admin',
      name: "admin",
      component: AdminView
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
