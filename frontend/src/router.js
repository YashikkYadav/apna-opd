import { createRouter, createWebHistory } from 'vue-router';

// Import the components you want to route to
import DashBoard from './views/dashboard/DashBoard.vue';
import Invoice from './views/invoice/Invoice.vue';
import AllPatients from './views/allPatients/AllPatients.vue';
import CreateRx from './views/createRx/createRx.vue';
import PatientQueue from './views/patientQueue/patientQueue.vue';
import Appointments from './views/appointments/Appointments.vue';
import Messages from './views/messages/Messages.vue';
import Social from './views/social/Social.vue';
import Automation from './views/automation/Automation.vue';
import TemplateLibrary from './views/templateLibrary/TemplateLibrary.vue';
import MedicineLibrary from './views/medicineLibrary/MedicineLibrary.vue';
import DropdownLibrary from './views/dropdownLibrary/DropdownLibrary.vue';
import Profile from './views/profile/Profile.vue';
import Login from './views/login/Login.vue';
import ViewHistory from './views/viewHistory/ViewHistory.vue';
import Consult from './views/consult/consult.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoard
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice
  },
  {
    path: '/patient-queue',
    name: 'PatientQueue',
    component: PatientQueue
  },
  {
    path: '/create-rx',
    name: 'CreateRx',
    component: CreateRx
  },
  {
    path:'/:patientId/consult',
    name:'ConsultCard',
    component: Consult
  },
  {
    path: '/all-patients',
    name: 'AllPatients',
    component: AllPatients
  },
  { 
    path:'/:patientId/view-history',
    name:'View History',
    component: ViewHistory
  },

  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: '/messages',
    name:'Messages',
    component: Messages
  },
  {
    path: '/social',
    name:'Social',
    component: Social
  },
  {
    path: '/automation',
    name:'Automation',
    component: Automation
  },
  { 
    path:'/template-library',
    name:'Template',
    component: TemplateLibrary
  },
  { 
    path:'/medicine-library',
    name:'Medicine',
    component: MedicineLibrary
  },
  { 
    path:'/dropdown-library',
    name:'Dropdown',
    component: DropdownLibrary
  },
  { 
    path:'/profile',
    name:'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('doctor_id') && !!localStorage.getItem('access_token');

  if (to.path === '/login' && isAuthenticated) {
    return next('/dashboard');
  }

  next();
});

export default router;
