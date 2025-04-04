import { createRouter, createWebHistory } from 'vue-router';

// Import the components you want to route to
import DashBoard from './views/dashboard/DashBoard.vue';
import Profile from './views/profile/Profile.vue';
import Login from './views/login/Login.vue';
import Enquiry from './views/enquiry/Enquiry.vue';

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
