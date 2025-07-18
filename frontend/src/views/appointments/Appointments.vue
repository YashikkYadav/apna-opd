<template>
  <v-container fluid>
    <h1 class="mb-5">Appointments</h1>
    <v-card class="pa-2 pa-md-4 rounded-xl shadow-xl">
      <v-card-title
        class="d-flex flex-column flex-sm-row align-center pe-2 pb-4"
      >
        <span
          class="text-h6 font-weight-medium text-blue-grey-darken-2 mb-2 mb-sm-0"
        >
          <v-icon start color="primary">mdi-calendar-check</v-icon>
          Upcoming Appointments
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="compact"
          label="Search (Patient Name, Type, Location, Status)"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          rounded="lg"
          flat
          hide-details
          single-line
          clearable
          style="max-width: 400px"
          class="mt-2 mt-sm-0"
        ></v-text-field>
      </v-card-title>

      <v-divider class="mb-1"></v-divider>

      <v-data-table
        :headers="headers"
        :items="appointments"
        :search="search"
        v-model:page="currentPage"
        v-model:items-per-page="itemsPerPage"
        :items-per-page-options="[
          { value: 5, title: '5' },
          { value: 10, title: '10' },
          { value: 15, title: '15' },
          { value: -1, title: 'All' },
        ]"
        hover
        density="comfortable"
        class="elevation-0 rounded-lg"
        loading-text="Fetching appointments data... Please wait."
        no-data-text="No appointments found matching your criteria."
        item-value="_id"
      >
        <template v-slot:item.patientName="{ item }">
          {{ item.patientId.fullName }}
        </template>

        <template v-slot:item.type="{ item }">
          <v-chip
            :color="
              item.type === 'Regular' ? 'blue-lighten-2' : 'purple-lighten-2'
            "
            size="small"
            label
          >
            {{ item.type }}
          </v-chip>
        </template>

        <template v-slot:item.location="{ item }">
          {{ item.location }}
        </template>

        <template v-slot:item.time="{ item }">
          {{ item.time }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="
              item.status === 'Pending' ? 'orange-lighten-2' : 'green-lighten-2'
            "
            size="small"
            label
          >
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";
import { onMounted, ref } from "vue";

const appointments = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(10);

const headers = ref([
  { title: "Patient Name", key: "patientName", sortable: true },
  { title: "Type", key: "type", sortable: true },
  { title: "Location", key: "location", sortable: true },
  { title: "Time", key: "time", sortable: true },
  { title: "Status", key: "status", sortable: true },
]);

onMounted(() => {
  fetchAppointments();
});

const fetchAppointments = async () => {
  const doctorStore = useProfileStore();
  const appointmentsData = await doctorStore.getAppointments();
  console.log(appointments);
  if (appointmentsData.error) {
    const uiStore = useUiStore();
    uiStore.openNotificationMessage("Error fetching the appointments");
    return;
  }
  appointments.value = appointmentsData.appointments;
};
</script>
<style scoped>
.v-data-table :deep(tbody tr:hover) {
  background-color: #f5f5f5 !important;
}

.v-data-table :deep(thead th) {
  font-size: 0.875rem !important;
  font-weight: bold !important;
  color: #4d4d4d !important;
  background-color: #d3d3d3 !important;
}
</style>