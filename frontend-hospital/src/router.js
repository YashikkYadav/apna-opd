import { createRouter, createWebHistory } from "vue-router";

// Import the components you want to route to
import Doctors from "./views/allDoctors/AllDoctors.vue";
import Login from "./views/login/Login.vue";
import Appointments from "./views/appointments/Appointments.vue";
import Profile from "./views/Profile/Profile.vue";

const routes = [
  {
    path: "/doctors",
    name: "Doctors",
    component: Doctors,
  },
  {
    path: "/appointments",
    name: "Appointemnts",
    component: Appointments,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/doctors",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated =
    !!localStorage.getItem("hospital_id") &&
    !!localStorage.getItem("access_token");

  if (to.path === "/login" && isAuthenticated) {
    return next("/doctors");
  }

  next();
});

export default router;
