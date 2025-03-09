<template>
  <div class="sidebar">
    <v-navigation-drawer expand-on-hover rail @mouseover="onHover(true)" @mouseleave="onHover(false)">
      <v-list>
        <v-list-item class="logo">
          <v-list-item-content>
            <v-img src="../assets/apna_opd_logo.svg" alt="Logo" style="height: auto;" class="ml-0 logo-image my-5"></v-img>
          </v-list-item-content>
        </v-list-item>

        <!-- <router-link to="/dashboard" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <router-link to="/doctors" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-view-dashboard" title="My Doctors" value="doctors"
            class="custom-list-item"></v-list-item>
        </router-link>

        <!-- <router-link to="/invoices" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-file-document" title="Invoice" value="invoice"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <!-- <router-link to="/patient-queue" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-account-group" title="Patient Queue" value="patientQueue"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <!-- <router-link to="/create-rx" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-prescription" title="Prescription" value="createRx"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <router-link to="/:patientId/prescriptions" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-prescription" title="Prescriptions" value="prescriptions"
            class="custom-list-item"></v-list-item>
        </router-link>

        <!-- <router-link to="/all-patients" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-account-multiple" title="All Patients" value="allPatients"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <!-- <router-link to="/appointments" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-calendar" title="Appointments" value="appointments"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <!-- <v-list-item prepend-icon="mdi-hospital-building" title="IPD" value="ipd"
          class="custom-list-item"></v-list-item> -->

        <router-link to="/messages" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-message" title="Messages" value="messages"
            class="custom-list-item"></v-list-item>
        </router-link>

        <router-link to="/payments" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-google-circles-extended" title="Payments" value="payments"
            class="custom-list-item"></v-list-item>
        </router-link>

        <!-- <router-link to="/automation" style="text-decoration: none; color: inherit;">
          <v-list-item prepend-icon="mdi-source-branch" title="Automation" value="automation"
            class="custom-list-item"></v-list-item>
        </router-link> -->

        <!-- <v-list-item disabled class="more-btn-sidebar">
          <v-list-item-content>
            <v-list-item-title>More</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-list-group value="library" class="sidebar-drawer">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-library" title="Library"></v-list-item>
          </template>
          <router-link to="/template-library" style="text-decoration: none; color: inherit;">
            <v-list-item title="Template" value="template" class="custom-list-item"></v-list-item>
          </router-link>
          <router-link to="/medicine-library" style="text-decoration: none; color: inherit;">
            <v-list-item title="Medicine" value="medicine" class="custom-list-item"></v-list-item>
          </router-link>
          <router-link to="/dropdown-library" style="text-decoration: none; color: inherit;">
            <v-list-item title="Dropdown" value="dropdown" class="custom-list-item"></v-list-item>
          </router-link>
        </v-list-group> -->
        <!-- <v-list-item prepend-icon="mdi-account-multiple" title="User" value="User"
          class="custom-list-item"></v-list-item>
        <v-list-item prepend-icon="mdi-cogs" title="Settings" value="settings" class="custom-list-item"></v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: false,
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    }
  },
  methods: {
    onHover(state) {
      if (!state) {
        const items = document.querySelector(".sidebar-drawer .v-list-group__items");
        const moreItem = document.querySelector(".more-btn-sidebar")

        items.style.display = "none";
        moreItem.style.display = "none";
      } else {
        const items = document.querySelector(".sidebar-drawer .v-list-group__items");
        const moreItem = document.querySelector(".more-btn-sidebar")
        if (this.activeRoute === "/template-library" || this.activeRoute === "/medicine-library" || this.activeRoute === "/dropdown-library") {
          items.style.display = "block";
        }

        moreItem.style.display = "block";
      }
    }
  }
}
</script>
