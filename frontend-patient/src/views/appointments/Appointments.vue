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
        class="elevation-0 rounded-lg bg-[#e0e3e6]"
        loading-text="Fetching appointments data... Please wait."
        no-data-text="No appointments found matching your criteria."
        item-value="_id"
      >
        <template v-slot:item.patientName="{ item }">
          {{ item?.doctorId?.name }}
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

        <template v-slot:item.created="{ item }">
          <v-chip size="small" label>
            {{ formatISODateToLocaleDateTime(item.createdAt) }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            color="red-darken-1"
            variant="text"
            @click="deleteAppointment(item._id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>

  <v-dialog v-model="showDeleteDialog" max-width="400">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 text-red-darken-1">Confirm Deletion</span>
        <v-btn icon variant="text" @click="showDeleteDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="text-medium-emphasis">
        Are you sure you want to delete this appointment? This action cannot be
        undone.
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="blue-grey-lighten-2"
          variant="flat"
          @click="showDeleteDialog = false"
          rounded="lg"
          >Cancel</v-btn
        >
        <v-btn
          color="red-darken-1"
          variant="flat"
          @click="confirmDelete"
          rounded="lg"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";
import { onMounted, ref } from "vue";

const appointments = ref([]);
const showDeleteDialog = ref(false); // Renamed from 'show' for clarity
const appointmentToDelete = ref(null);
const search = ref(""); // Added search ref for the text field

const currentPage = ref(1);
const itemsPerPage = ref(10);

const headers = ref([
  { title: "Patient Name", key: "patientName", sortable: true },
  { title: "Type", key: "type", sortable: true },
  { title: "Location", key: "location", sortable: true },
  { title: "Time", key: "time", sortable: true },
  { title: "Status", key: "status" },
  { title: "Created At", key: "created", sortable: true },
  { title: "Actions", value: "actions", sortable: false },
]);

onMounted(() => {
  fetchAppointments();
});

const fetchAppointments = async () => {
  const doctorStore = useProfileStore();
  const appointmentsData = await doctorStore.getAppointments();
  if (appointmentsData.error) {
    const uiStore = useUiStore();
    uiStore.openNotificationMessage("Error fetching the appointments");
    return;
  }
  appointments.value = appointmentsData.appointments;
};

const deleteAppointment = (id) => {
  appointmentToDelete.value = id;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  appointments.value = appointments.value.filter(
    (appointment) => appointment._id !== appointmentToDelete.value
  );
  const doctorStore = useProfileStore();
  const deletion = await doctorStore.deleteAppointment(
    appointmentToDelete.value
  );
  const uiStore = useUiStore();
  uiStore.openNotificationMessage("Appointment deleted successfully");
  showDeleteDialog.value = false;
  appointmentToDelete.value = null;
};

function formatISODateToLocaleDateTime(isoString) {
  const date = new Date(isoString);
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  return `${formattedDate}, ${formattedTime}`;
}
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
