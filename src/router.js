import { createRouter, createWebHistory } from "vue-router";
import LandingPageVue from "./components/LandingPage.vue";
import WorktableVue from "./components/Worktable.vue";
import Home from "./components/Home.vue";
import Consignas from "./components/Consignas.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        { path: "", component: LandingPageVue },
        { path: "/worktable", component: WorktableVue },
        { path: "/consignas", component: Consignas },
      ],
    },
  ],
});

export default router;
