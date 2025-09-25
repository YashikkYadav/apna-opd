<template>
  <div class="headbar">
    <div class="header-bar">
      <v-row justify="end" align="center">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn flat icon v-bind="props" class="icon-spacing">
              <v-avatar size="32">
                <img src="../assets/user_logo.png" alt="Profile" width="30px" />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <router-link :to="profileLink" style="text-decoration: none; color: inherit">
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
import { useProfileStore } from "@/store/ProfileStore";
import {useInvoiceStore } from "@/store/InvoiceStore";
import { useUiStore } from "@/store/UiStore";

export default {
  data() {
    return {
      userType: null,

    };
  },
  computed: {
    profileLink() {
      console.log("User Type:", this.userType);
      switch (this.userType) {
        case "nursing_staff":
          return "/profile/nursing_staff";
        case "physiotherapist":
          return "/profile/physiotherapist";
        case "laboratory":
          return "/profile/healthlab";
        case "medical_store":
          return "/profile/pharmacy";
        case "blood_bank":
          return "/profile/blood_bank";
        case "vatenary":
          return "/profile/vetenary";
        case "gym":
          return "/profile/gym";
        case "nursing_medical_college":
          return "/profile/nursing_medical_college";
        case "ivf_clinic":
          return "/profile/ivf_clinic";
        case "yoga":
          return "/profile/yoga"
        case "radiologist":
          return "/profile/radiologist"
        case "ambulance":
          return "/profile/ambulance"
        default:
          return "/profile";
      }
    },
  },
  created() {
    // ✅ Fetch user type from localStorage or your Pinia store here
    this.userType = localStorage.getItem('user_type') || "default"; // update according to your structure

    console.log("Fetched User Type:", this.userType);
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("doctor_id");
      localStorage.removeItem("user_type");
      localStorage.removeItem("access_token");
      useProfileStore().reset();
      useInvoiceStore().reset();


      this.$router.push("/login");
      useUiStore().openNotificationMessage("You Are Successfully Logged Out!");
    },
  },
};
</script>
