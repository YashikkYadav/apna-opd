<template>
  <v-container fluid>
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search Patient" variant="solo"
          max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
      </v-col>
    </v-row>

    <!-- Undo Button (appears only when a patient is marked as completed) -->
    <v-btn v-if="deletedPatient" color="primary" @click="undoDelete" class="mb-4"
      style="position: absolute; right: 20px; top: 16px; z-index: 10;">
      <v-icon left>mdi-undo</v-icon>Undo
    </v-btn>

    <!-- Data Table -->
    <v-data-table v-model="selectedPatients" :headers="headers" :items="filteredPatients" :items-per-page="10"
      item-value="id" show-select class="tablee que-table">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Patient Queue</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="markCompleted" class="mx-2">
            Mark Completed
          </v-btn>
          <v-btn color="error" @click="markNoShow" class="mx-2">
            Mark No Show
          </v-btn>
        </v-toolbar>
      </template>

      <template #item.status="{ item }">
        <v-chip :color="statusColor(item.status)" dark small>
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.appointment="{ item }">
        <span>{{ item.appointment }}</span>
      </template>
    </v-data-table>
  </v-container>

  <v-dialog v-model="isCompletedModalOpen" max-width="500px">
    <v-card class="popup-card">
      <v-card-title class="popup-title">Mark Completed</v-card-title>
      <v-card-text class="popup-detail">
        Are you sure you want to complete this appointment ?
      </v-card-text>
      <v-card-actions class="popup-action">
        <v-btn class="saaro-btn" text @click="closeModal">Cancel</v-btn>
        <v-btn class="saaro-btn" text @click="completeAppointment">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isNoShowModalOpen" max-width="500px">
    <v-card class="popup-card">
      <v-card-title class="popup-title">Mark No Show</v-card-title>
      <v-card-text class="popup-detail">
        Are you sure you want to remove this appointment ?
      </v-card-text>
      <v-card-actions class="popup-action">
        <v-btn class="saaro-btn" text @click="closeModal">Cancel</v-btn>
        <v-btn class="saaro-btn" text @click="noShowAppointment">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useSnackbarStore } from '../store/snackbar';
export default {
  data() {
    return {
      isCompletedModalOpen: false,
      isNoShowModalOpen: false,
      search: '', // For search functionality
      headers: [

        { text: 'Patient Name', title: "Name", value: 'name', align: 'start' },
        { text: 'Appointment Time & Date', title: "Appointment", value: 'appointment', align: 'center' },
        { text: 'Status', value: 'status', title: "Status", align: 'center' },
      ],
      patients: [],
      selectedPatients: [], // Tracks selected patients
      deletedPatient: null, // Tracks recently deleted patient for undo
    };
  },
  computed: {
    filteredPatients() {
      // Filters patients based on search query
      return this.patients.filter((patient) =>

        patient.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    fetchAppointments() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment/${this.doctorId}/get-upcoming-appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              console.error("Error fetching patients:", errorData);
              throw new Error("Failed to fetch patients");
            });
          }
          return response.json();
        })
        .then((data) => {
          this.patients = data.appointments.map((patient) => ({
            id: patient._id,
            name: patient.patientId.fullName,
            appointment: `${new Date(patient.date).toLocaleDateString('en-GB')} ${patient.time}`,
            status: "Pending"
          }));
        })
        .catch((error) => {
          console.error("Network Error:", error.message);
        });
    },
    markCompleted() {
      if (this.selectedPatients.length === 0) {
        this.showSnackbar("Please select at least one patient.", true);
        return;
      }
      this.isCompletedModalOpen = true;
    },
    markNoShow() {
      if (this.selectedPatients.length === 0) {
        this.showSnackbar("Please select at least one patient.", true);
        return;
      }
      this.isNoShowModalOpen = true;
    },
    reschedule() {
      // Handles rescheduling logic
      alert('Reschedule functionality to be implemented.');
    },
    statusColor(status) {
      // Returns color based on status
      if (status === 'Completed') return 'green';
      if (status === 'No Show') return 'red';
      return 'orange'; // Default for Pending
    },
    closeModal() {
      this.isCompletedModalOpen = false;
      this.isNoShowModalOpen = false;
    },
    completeAppointment() {
      const requestData = {
        ids: this.selectedPatients,
        status: "Completed"
      } 

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment/update-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.isCompletedModalOpen = false;
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((res) => {
          if (res) {
            this.fetchAppointments();
            this.isCompletedModalOpen = false;
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },
    noShowAppointment() {

      const requestData = {
        ids: this.selectedPatients,
        status: "No Show"
      } 

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment/update-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.isNoShowModalOpen = false;

                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((res) => {
          if (res) {
            this.fetchAppointments();
            this.isNoShowModalOpen = false;
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },
    showSnackbar(message, isError = false) {
      const snackbarStore = useSnackbarStore();
      snackbarStore.showMessage(message, isError);
    }
  },
  mounted() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.accessToken = localStorage.getItem('access_token');

    if (!this.doctorId || !this.accessToken) {
      this.$router.push('/login');
    }

    this.fetchAppointments();
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 20px;
}

::v-deep(.v-table__wrapper) {
  border-radius: 0 !important;
}

.v-table {
  border-radius: 20px !important;
}

.v-toolbar {
  background-color: #ffffff;
  border-radius: 20px !important;
}

::v-deep(.v-data-table thead) {
  background-color: #e0e3e6;
}

::v-deep(.v-data-table th) {
  font-weight: bold;
  color: #000;
  font-size: 14px;
  padding: 12px;
}

::v-deep(.v-data-table td) {
  font-size: 14px;
  color: #555;
}

::v-deep(.v-data-table) {
  border-radius: 0px;
}

::v-deep(.v-card-text) {
  padding: 0px;
}

::v-deep(.v-field.v-field--appended) {
  --v-field-padding-end: 6px;
  /* border-radius: 9999px; */
}

.v-btn {
  font-weight: 500;
}

.v-btn:hover {
  background-color: #acacac;
}

.v-btn--icon {
  padding: 0 !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.v-btn--icon .v-icon {
  font-size: 20px;
  color: gray;
  transition: color 0.3s ease;
}

.v-btn--icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.v-btn--icon:hover .v-icon {
  color: rgba(189, 180, 180, 0.791);
}

.v-btn--icon .v-icon.red {
  color: red;
}

/* Spacing between toolbar buttons */
.v-btn.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}
</style>