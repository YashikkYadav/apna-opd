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
          to="/doctor"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-stethoscope"
            title="Doctor"
            value="doctor"
            class="custom-list-item"
          ></v-list-item>
        </router-link>

        <router-link
          to="/enquiry"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-file-document"
            title="Enquiry"
            value="enquiry"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
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
};
</script>
