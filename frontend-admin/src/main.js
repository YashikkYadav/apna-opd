import { createApp } from 'vue';
import App from './App.vue';
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia';

import { registerPlugins } from '@/plugins';
import router from './router';
import vuetify from './plugins/vuetify';

import 'vuetify/styles';
import './app.css'
import './style/index.less'

// Create Vue App Instance
const app = createApp(App);

// Register Plugins and Router
registerPlugins(app);
app.use(router);
// app.use(vuetify);
app.use(VueApexCharts);
app.use(createPinia()); 

// Mount App
app.mount('#app');

console.log('Application is successfully mounted!');
