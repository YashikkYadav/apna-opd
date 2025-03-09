import { createRouter, createWebHistory } from 'vue-router';

// Import the components you want to route to
import DashBoard from './views/doctor/dashboard/DashBoard.vue';
import Invoice from './views/doctor/invoice/Invoice.vue';
import AllPatients from './views/doctor/allPatients/AllPatients.vue';
import CreateRx from './views/doctor/createRx/createRx.vue';
import PatientQueue from './views/doctor/patientQueue/patientQueue.vue';
import Appointments from './views/doctor/appointments/Appointments.vue';
import Messages from './views/doctor/messages/Messages.vue';
import Social from './views/doctor/social/Social.vue';
import Automation from './views/doctor/automation/Automation.vue';
import TemplateLibrary from './views/doctor/templateLibrary/TemplateLibrary.vue';
import MedicineLibrary from './views/doctor/medicineLibrary/MedicineLibrary.vue';
import DropdownLibrary from './views/doctor/dropdownLibrary/DropdownLibrary.vue';
import Profile from './views/doctor/profile/Profile.vue';
import Login from './views/doctor/login/Login.vue';
import ViewHistory from './views/doctor/viewHistory/ViewHistory.vue';
import Consult from './views/doctor/consult/consult.vue';

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

export default router;
