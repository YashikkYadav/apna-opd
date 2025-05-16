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
    name: "SocialPlatformsPage",
  };
  </script>
  
  <style scoped>
  .social-platforms-container {
    padding: 32px 16px;
  }
  
  .social-platforms-row {
    gap: 24px; /* Consistent spacing between rows */
  }
  
  .card-col {
    padding: 16px; /* Equal spacing around each card */
    display: flex;
    justify-content: center;
  }
  
  .align-left {
    justify-content: flex-start; /* Align the Google Business card to the left */
  }
  
  .platform-card {
    width: 100%; /* Ensures consistent card size */
    max-width: 280px; /* Restricts card width for uniformity */
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .platform-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  .logo-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo-circle img {
    width: 48px;
    height: 48px;
  }
  
  .platform-content {
    margin-top: 8px;
  }
  
  .platform-title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 8px 0;
  }
  
  .platform-description {
    font-size: 14px;
    color: #666666;
    margin: 0 0 16px 0;
  }
  
  .platform-btn {
    background-color: #1976d2;
    color: white;
    font-weight: 600;
    text-transform: capitalize;
    border-radius: 8px;
  }
  
  .platform-btn:hover {
    background-color: #155a9f;
  }
  </style>
  