import { createRouter, createWebHistory } from 'vue-router';

// Import the components you want to route to
import PatientQueue from './views/patientQueue/patientQueue.vue';
import Messages from './views/messages/Messages.vue';
import Login from './views/login/Login.vue';
import ViewHistory from './views/viewHistory/ViewHistory.vue';
import Consult from './views/consult/consult.vue';
import Appointments from './views/appointments/Appointments.vue';

const routes = [
  {
    path: '/doctors',
    name: 'My Doctors',
    component: PatientQueue
  },
  {
    path:'/:patientId/consult',
    name:'ConsultCard',
    component: Consult
  },
  { 
    path:'/:patientId/prescriptions',
    name:'View History',
    component: ViewHistory
  },
  { 
    path:'/appointment',
    name:'Appointment',
    component: Appointments 
  },
  {
    path: '/messages',
    name:'Messages',
    component: Messages
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
