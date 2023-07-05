import { createRouter, createWebHistory } from "vue-router";

// import TheDefaultLayout from "../components/layout/default-layout/TheDefaultLayout.vue";
// import TheEmptyLayout from "../components/layout/empty-layout/TheEmptyLayout.vue";

import DiscussPage from "../views/discuss/DiscussPage.vue";
import DiscussDetail from "../views/discuss/DiscussDetail.vue";
import EmployeeList from "../views/employee/EmployeeList.vue";
import NotFound from "../views/notfound/NotFound.vue";

const routes = [
  { path: "/", component: DiscussPage, meta: { layout: "default" } },
  { path: "/discuss/:id", component: DiscussDetail, meta: { layout: "default" } },
  {
    path: "/employee",
    name: "employee",
    component: EmployeeList,
    meta: { layout: "default" },
  },
  { path: "/:pathMatch(.*)*", component: NotFound, meta: { layout: "empty" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
