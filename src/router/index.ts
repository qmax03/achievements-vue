import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Users from "../views/Users.vue";
import UserDetail from "../views/UserDetail.vue";
import UserTickers from "../views/UserTickers.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Users",
    component: Users,
  },
  {
    path: "/users/:id",
    name: "Users Detail",
    component: () => UserDetail,
  },
  {
    path: "/users/:id/tickers",
    name: "Users Tickers",
    component: () => UserTickers,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
