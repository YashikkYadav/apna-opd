<template>
  <div class="headbar">
    <div class="header-bar">
      <v-row justify="space-between" align="center">
        <span class="admin-panel-text">Admin Panel</span>
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn flat icon v-bind="props" class="icon-spacing">
              <v-avatar size="32">
                <img src="../assets/user_logo.png" alt="Profile" width="30px" />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleLogout">Logout</v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </div>
    <div class="custom-border"></div>
  </div>
</template>

<script>
import { useUiStore } from "@/store/UiStore";

export default {
  methods: {
    handleLogout() {
      localStorage.removeItem("admin_id");
      localStorage.removeItem("access_token");
      if (typeof useProfileStore === "function") {
        useProfileStore().reset();
      }

      this.$router.push("/login");
      useUiStore().openNotificationMessage("You Are Successfully Logged Out!");
    },
  },
};
</script>

<style scoped>
.admin-panel-text {
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}
</style>
