import { createRouter, createWebHistory } from "vue-router";

import Doctor from "./views/doctor/Doctor.vue";
import Login from "./views/login/Login.vue";
import HealthServe from "./views/healthServe/HealthServe.vue";
import User from "./views/user/User.vue";

const routes = [
  {
    path: "/doctor",
    name: "Doctor",
    component: Doctor,
  },
  {
    path: "/ambulance",
    name: "Ambulance",
    component: HealthServe,
    props: {
      type: "ambulance",
    },
  },
  {
    path: "/gym",
    name: "Gym",
    component: HealthServe,
    props: {
      type: "gym",
    },
  },
  {
    path: "/yoga",
    name: "Yoga",
    component: HealthServe,
    props: {
      type: "yoga",
    },
  },
  {
    path: "/nasha_mukti_kendra",
    name: "Nash Mukti Kendra",
    component: HealthServe,
    props: {
      type: "nasha_mukti_kendra",
    },
  },
  {
    path: "/commercial_meditation",
    name: "Commercial Meditaion",
    component: HealthServe,
    props: {
      type: "commercial_meditation",
    },
  },
  {
    path: "/medical_store",
    name: "Medical Store",
    component: HealthServe,
    props: {
      type: "medical_store",
    },
  },
  {
    path: "/nursing_medical_college",
    name: "Nursing Medical College",
    component: HealthServe,
    props: {
      type: "nursing_medical_college",
    },
  },
  {
    path: "/nursing_medical_college",
    name: "Nursing Medical College",
    component: HealthServe,
    props: {
      type: "nursing_medical_college",
    },
  },
  {
    path: "/blood_bank",
    name: "Blood Bank",
    component: HealthServe,
    props: {
      type: "blood_bank",
    },
  },
  {
    path: "/physiotherapist",
    name: "Physiotherapist",
    component: HealthServe,
    props: {
      type: "physiotherapist",
    },
  },
  {
    path: "/blood_donor",
    name: "Blood Donor",
    component: HealthServe,
    props: {
      type: "blood_donor",
    },
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
