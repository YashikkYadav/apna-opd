<template>
    <div class="headbar"> 
        <div class="header-bar">
            <v-row justify="end" align="center">
                <v-btn flat icon class="icon-spacing">
                    <v-icon>mdi-bell</v-icon>
                </v-btn>
                
                <!-- Profile Menu -->
                <span class="user-name">Dr. Nitin Negi</span> 
                <v-menu offset-y>
                    <template v-slot:activator="{ props }">
                        <v-btn flat icon v-bind="props" class="icon-spacing">
                            <v-avatar size="32">
                                <img src="../assets/nnnnn.png" alt="Profile" />
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-list>
                      <router-link to="/profile" style="text-decoration: none; color: inherit;">
                        <v-list-item>Profile</v-list-item>
                      </router-link>
                        <v-list-item @click="handleLogout">Logout</v-list-item>
                    </v-list>
                </v-menu>
            </v-row>
        </div>
        <div class="custom-border"></div>
    </div>
  </template>

<script>
import { useUiStore } from '@/store/UiStore';

export default {
  methods: {
    handleLogout() {
      localStorage.removeItem('doctor_id');
      localStorage.removeItem('access_token');

      this.$router.push('/login');
      useUiStore().openNotificationMessage("You Are Successfully Logged Out!");
    },
  },
};
</script>
