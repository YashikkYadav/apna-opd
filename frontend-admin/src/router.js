import { createRouter, createWebHistory } from "vue-router";

import Doctor from "./views/doctor/Doctor.vue";
import Login from "./views/login/Login.vue";
import HealthServe from "./views/healthServe/HealthServe.vue";
import User from "./views/user/User.vue";
import Lead from "./views/lead/lead.vue";

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
    path: "/nursing-staff",
    name: "Nursing Staff",
    component: HealthServe,
    props: {
      type: "nursing_staff",
    },
  },
  {
    path: "/veterinary",
    name: "Veterinary",
    component: HealthServe,
    props: {
      type: "vatenary",
    },
  },
  {
    path: "/laboratory",
    name: "Laboratory",
    component: HealthServe,
    props: {
      type: "laboratory",
    },
  },
  {
    path: "/career",
    name: "Career",
    component: Lead,
    props: {
      type: "career",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Lead,
    props: {
      type: "contact",
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
    redirect: "/doctor",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('admin_id') && !!localStorage.getItem('access_token');

  if (to.path === '/login' && isAuthenticated) {
    return next('/doctors');
  }

  next();
});

export default router;
