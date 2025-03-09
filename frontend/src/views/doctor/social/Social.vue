<template>
  <v-container class="social-platforms-container">
    <v-row class="social-platforms-row" justify="space-evenly">
      <!-- Facebook -->
      <v-col cols="12" sm="6" md="4" lg="3" class="card-col">
        <v-card class="platform-card">
          <div class="logo-circle">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook Logo" />
          </div>
          <div class="platform-content">
            <h3 class="platform-title">Facebook</h3>
            <p class="platform-description">
              Manage your Facebook page effortlessly by integrating it with your platform.
            </p>
            <v-btn block class="platform-btn">Manage</v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- Instagram -->
      <v-col cols="12" sm="6" md="4" lg="3" class="card-col">
        <v-card class="platform-card">
          <div class="logo-circle">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram Logo" />
          </div>
          <div class="platform-content">
            <h3 class="platform-title">Instagram</h3>
            <p class="platform-description">
              Integrate Instagram to engage with your followers seamlessly.
            </p>
            <v-btn block class="platform-btn">Manage</v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- WhatsApp -->
      <v-col cols="12" sm="6" md="4" lg="3" class="card-col">
        <v-card class="platform-card">
          <div class="logo-circle">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp Logo" />
          </div>
          <div class="platform-content">
            <h3 class="platform-title">WhatsApp</h3>
            <p class="platform-description">
              Connect with your customers directly on WhatsApp.
            </p>
            <v-btn block class="platform-btn">Manage</v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- Google Business Profile -->
      <v-col cols="12" sm="6" md="4" lg="3" class="card-col align-left">
        <v-card class="platform-card">
          <div class="logo-circle">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google Business Logo" />
          </div>
          <div class="platform-content">
            <h3 class="platform-title">Google Business</h3>
            <p class="platform-description">
              Keep your Google Business profile updated to attract more customers.
            </p>
            <v-btn block class="platform-btn">Manage</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Social",
};
</script>