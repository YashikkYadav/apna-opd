<template>
  <div class="sidebar">
    <v-navigation-drawer
      expand-on-hover
      rail
      @mouseover="onHover(true)"
      @mouseleave="onHover(false)"
    >
      <v-list>
        <v-list-item class="logo">
          <v-list-item-content>
            <v-img
              src="../assets/apna_opd_logo.svg"
              alt="Logo"
              style="height: auto"
              class="ml-0 logo-image my-5"
            ></v-img>
          </v-list-item-content>
        </v-list-item>

        <router-link
          to="/doctors"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-account-group"
            title="My Doctors"
            value="doctors"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link to="/appointments" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-invoice-list"
            title="Appointments"
            value="appointments"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  data() {
    return {
      drawer: true,
      rail: false,
      patientId: "",
    };
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    },
  },
  methods: {
    onHover(state) {
      if (!state) {
        const items = document.querySelector(
          ".sidebar-drawer .v-list-group__items"
        );
        const moreItem = document.querySelector(".more-btn-sidebar");

        items.style.display = "none";
        moreItem.style.display = "none";
      } else {
        const items = document.querySelector(
          ".sidebar-drawer .v-list-group__items"
        );
        const moreItem = document.querySelector(".more-btn-sidebar");
        if (
          this.activeRoute === "/template-library" ||
          this.activeRoute === "/medicine-library" ||
          this.activeRoute === "/dropdown-library"
        ) {
          items.style.display = "block";
        }

        moreItem.style.display = "block";
      }
    },
  },
  mounted() {
    this.patientId = localStorage.getItem("doctor_id") || "";
  },
};
</script>
