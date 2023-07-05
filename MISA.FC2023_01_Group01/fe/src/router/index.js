import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard/Dashboard.vue";
import QAMain from "../views/QAMain/QAMain.vue";

const routes = [
  {
    path: "/",
    redirect: "/qa",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/qa",
    name: "qa",
    component: QAMain,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
