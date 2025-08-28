<template>
  <v-app>
    <template v-if="!isLoginRoute">
      <SideBar />
    </template>
    <v-main>
      <template v-if="!isLoginRoute">
        <HeadBar />
      </template>
      <router-view></router-view>
    </v-main>
  </v-app>
  <base-message />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import SideBar from "./components/SideBar.vue";
import HeadBar from "./components/HeadBar.vue";
import BaseMessage from './components/core/BaseMessage.vue';

export default {
  name: 'App',

  components: {
    BaseMessage: defineAsyncComponent(BaseMessage)
  },

  setup() {
    const route = useRoute();
    const isLoginRoute = computed(() => route.path === '/login');

    return {
      isLoginRoute,
      SideBar,
      HeadBar
    }
  }
}
</script>
