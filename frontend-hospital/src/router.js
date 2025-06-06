import { createRouter, createWebHistory } from "vue-router";

// Import the components you want to route to
import Doctors from "./views/allDoctors/AllDoctors.vue";
import Login from "./views/login/Login.vue";
import Appointments from "./views/appointments/Appointments.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
