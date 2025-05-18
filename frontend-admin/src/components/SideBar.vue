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

        <router-link to="/doctor" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-stethoscope"
            title="Doctor"
            value="doctor"
            class="custom-list-item"
          ></v-list-item>
        </router-link>

        <router-link
          to="/ambulance"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-ambulance"
            title="Ambulance"
            value="ambulance"
            class="custom-list-item"
          ></v-list-item>
        </router-link>

        <router-link to="/gym" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-dumbbell"
            title="Gym"
            value="gym"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link to="/yoga" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-yoga"
            title="Yoga"
            value="yoga"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/nasha_mukti_kendra"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-hospital"
            title="Nasha Mukti Kendra"
            value="nasha_mukti_kendra"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/commercial_meditation"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-peace"
            title="Meditation"
            value="meditation"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/medical_store"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-pill"
            title="Medical Store"
            value="medical_store"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/nursing_medical_college"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-school"
            title="Nursing Medical College"
            value="nursing_medical_college"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/blood_bank"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-water"
            title="Blood Bank"
            value="blood_bank"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/physiotherapist"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-doctor"
            title="Physiotherapist"
            value="physiotherapist"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link
          to="/blood_donor"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            prepend-icon="mdi-account"
            title="Blood Donor"
            value="blood_donor"
            class="custom-list-item"
          ></v-list-item>
        </router-link>
        <router-link to="/user" style="text-decoration: none; color: inherit">
          <v-list-item
            prepend-icon="mdi-account-tie"
            title="User"
            value="user"
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
