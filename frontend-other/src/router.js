import { createRouter, createWebHistory } from 'vue-router';

// Import the components you want to route to
import DashBoard from './views/dashboard/DashBoard.vue';
import Profile from './views/profile/Profile.vue';
import Login from './views/login/Login.vue';
import Enquiry from './views/enquiry/Enquiry.vue';
import Physiotherapist from './views/profile/Physiotherapist.vue'
import BloodBank from './views/profile/BloodBank.vue';
import Veterinary from './views/profile/Veterinary.vue';
import MedicalCollege from './views/profile/MedicalCollege.vue';
import IvfClinic from './views/profile/IvfClinic.vue';
import Gym from './views/profile/Gym.vue';
import NursingStaff from './views/profile/NursingStaff.vue';
import Healthlab from './views/profile/Healthlab.vue'
import Pharmacy from './views/profile/Pharmacy.vue'



const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoard
  },
  {
    path: '/enquiry',
    name: 'Enquiry',
    component: Enquiry
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile
  // },
  {
    path: '/profile/physiotherapist',
    name: 'Physiotherapist',
    component: Physiotherapist

  },
  {
    path: '/profile/nursing_staff',
    name: 'NusrsingStaff',
    component: NursingStaff
  },
  {
    path: '/profile/pharmacy',
    name: 'Pharmacy',
    component: Pharmacy

  },
  {
    path: '/profile/healthlab',
    name: 'Healthlab',
    component: Healthlab

  },
  {
    path: '/profile/blood_bank',
    name: 'BloodBank',
    component: BloodBank
  },
  {
    path: '/profile/gym',
    name: 'gym',
    component: Gym
  },
  {
    path: '/profile/nursing_medical_college',
    name: 'MedicalCollege',
    component: MedicalCollege
  },
  {
    path: '/profile/ivf_clinic',
    name: 'IvfClinic',
    component: IvfClinic
  },
  {
    path: '/profile/vetenary',
    name: 'Vetenary',
    component: Veterinary
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
