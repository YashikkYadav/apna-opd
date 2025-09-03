<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="4">
        <h1 class="dashboard-title">Dashboard</h1>
      </v-col>
      <v-col cols="12">
        <p style="font-weight: bold; text-transform: capitalize; font-size: 20px;">
          Complete your profile with accurate details, qualifications, and
          experience to build trust with patients.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <last-24-hours-enquiry />
      </v-col>
      <v-col cols="6">
        <last-30-days-enquiry />
      </v-col>
      <!-- <v-col cols="4">
        <last-30-days-invoice />
      </v-col> -->
    </v-row>

    <!-- <v-row>
      <v-col cols="6">
        <comparision-data />
      </v-col>
      <v-col cols="6">
        <last-30-days-payment />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import Last24HoursEnquiry from "./components/Last24HoursEnquiry.vue";
import Last30DaysEnquiry from "./components/Last30DaysEnquiry.vue";
import Last30DaysInvoice from "./components/Last30DaysInvoice.vue";
import Last30DaysPayment from "./components/Last30DaysPayment.vue";
import ComparisionData from "./components/ComparisionData.vue";

export default {
  name: "Dashboard",
  components: {
    Last24HoursEnquiry,
    Last30DaysEnquiry,
    Last30DaysInvoice,
    Last30DaysPayment,
    ComparisionData,
  },
};
</script>
