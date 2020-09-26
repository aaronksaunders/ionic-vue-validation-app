import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect:  '/login'
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/home-page-2",
    name: "home2",
    component: () => import("@/views/HomePage2.vue"),
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
