<template>
  <v-container fluid>
    <v-row class="flex justify-between">
      <v-col cols="8">
        <div class="px-1 mb-5">
          <h1 class="text-h4 font-weight-bold text-blue-grey-darken-3">
            Doctor Appointments Overview
          </h1>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="isDoctorFormOpen" persistent max-width="600px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5">Register New Doctor</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeDoctorDialog"
          ></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="doctorFormRef">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newDoctorData.name"
                    label="Doctor's Name"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Name is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newDoctorData.phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Phone number is required']"
                    required
                    type="tel"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newDoctorData.email"
                    label="Email"
                    variant="outlined"
                    :rules="[
                      (v) => !!v || 'Email is required',
                      (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                    ]"
                    required
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newDoctorData.clinicName"
                    label="Clinic Name"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Clinic name is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newDoctorData.speciality"
                    :items="specialties"
                    label="Speciality"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Speciality is required']"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newDoctorData.rmcNumber"
                    label="RMC Number"
                    variant="outlined"
                    :rules="[(v) => !!v || 'RMC Number is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newDoctorData.address"
                    label="Address"
                    variant="outlined"
                    :rules="[(v) => !!v || 'Address is required']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-grey-darken-1"
            variant="text"
            @click="closeDoctorDialog"
          >
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="submitDoctorForm">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="pa-2 pa-md-4 rounded-xl shadow-xl">
      <v-card-title
        class="d-flex flex-column flex-sm-row align-center pe-2 pb-4"
      >
        <span
          class="text-h6 font-weight-medium text-blue-grey-darken-2 mb-2 mb-sm-0"
        >
          <v-icon start color="primary">mdi-calendar-account</v-icon>
          Professionals Appointments Overview
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="compact"
          label="Search (Name, RMC, Speciality)"
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
        :items="items"
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
        :loading="loading"
        loading-text="Fetching doctor data... Please wait."
        no-data-text="No doctors found matching your criteria."
        item-value="rmcNumber"
      >
        <template v-slot:item.doctorId="{ item }">
          <v-chip
            variant="tonal"
            size="small"
            :color="item.doctorId.speciality ? 'teal' : 'grey'"
          >
            {{ item.doctorId.speciality || "N/A" }}
          </v-chip>
        </template>

        <template v-slot:item.totalAppointments="{ item }">
          <v-chip size="small" color="blue-grey-darken-1" label>
            {{ 0 }}
          </v-chip>
        </template>

        <template v-slot:item.totalRevenue="{ item }">
          <v-chip size="small" color="green-darken-1" label> ₹{{ 0 }} </v-chip>
        </template>

        <template v-slot:item.paymentStatus="{ item }">
          <v-chip
            :color="getPaymentStatusColor(item.doctorId.paymentStatus)"
            size="small"
            label
            class="font-weight-medium"
          >
            <v-icon start size="small">{{
              getPaymentStatusIcon(item.paymentStatus)
            }}</v-icon>
            {{ item.doctorId.paymentStatus || "N/A" }}
          </v-chip>
        </template>

        <template v-slot:item.doctorId.name="{ item }">
          {{ item.doctorId.name }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { useHospitalStore } from "@/store/HospitalStore";
import { ref, onMounted } from "vue";
import { checkAuth } from "@/lib/utils/utils";
import { useRouter } from "vue-router";
import { useUiStore } from "@/store/UiStore";

onMounted(() => {
  const router = useRouter();
  const auth = checkAuth(router);
  if (auth) {
    fetchDoctors();
  }
});

defineOptions({
  name: "DoctorAppointmentsTable", // Renamed component name
});

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Ophthalmologist",
  "Psychiatrist",
  "Endocrinologist",
  "Oncologist",
  "Urologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Rheumatologist",
  "Allergist",
  "Nurse",
];

const subscriptionTypes = [
  { value: "gold", label: "Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "diamond", label: "Diamond" },
];

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const items = ref([]);
const loading = ref(true);

const isDoctorFormOpen = ref(false);
const doctorFormRef = ref(null);
const newDoctorData = ref({
  name: "",
  phoneNumber: "",
  email: "",
  clinicName: "",
  speciality: "",
  rmcNumber: "",
  address: "",
});

const headers = ref([
  {
    title: "Name",
    key: "doctorId.name",
    sortable: true,
    align: "start",
    cellClass: "font-weight-medium text-subtitle-2",
  },
  {
    title: "RMC Number",
    key: "doctorId.rmcNumber",
    sortable: true,
    align: "start",
  },
  {
    title: "Speciality",
    key: "doctorId.speciality",
    sortable: true,
    align: "center",
  },
  {
    title: "Total Appointments",
    key: "totalAppointments", // New column key
    sortable: true,
    align: "center",
  },
  {
    title: "Total Revenue",
    key: "totalRevenue", // New column key
    sortable: true,
    align: "center",
  },
  {
    title: "Payment Status",
    key: "doctorId.paymentStatus",
    sortable: true,
    align: "center",
  },
]);

const fetchDoctors = async () => {
  loading.value = true;
  const hospitalStore = useHospitalStore();
  try {
    const doctorData = await hospitalStore.getDoctors();
    items.value = Array.isArray(doctorData?.doctors) ? doctorData.doctors : [];
    console.log(items.value[0].doctorId.speciality);
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    items.value = [];
  } finally {
    loading.value = false;
  }
};

const openDoctorDialog = () => {
  isDoctorFormOpen.value = true;
};

const closeDoctorDialog = () => {
  isDoctorFormOpen.value = false;
  // Reset form fields
  newDoctorData.value = {
    name: "",
    phoneNumber: "",
    email: "",
    clinicName: "",
    speciality: "",
    rmcNumber: "",
    address: "",
  };
  if (doctorFormRef.value) {
    doctorFormRef.value.resetValidation();
  }
};

const submitDoctorForm = async () => {
  if (doctorFormRef.value) {
    const { valid } = await doctorFormRef.value.validate();
    if (valid) {
      console.log(
        "New Doctor Data Submitted:",
        JSON.parse(JSON.stringify(newDoctorData.value))
      );
      const newDoctor = JSON.parse(JSON.stringify(newDoctorData.value));
      const hospitalStore = useHospitalStore();
      const newDoctorResult = await hospitalStore.registerDoctor(newDoctor);
      closeDoctorDialog();
      if (newDoctorResult.success) {
        useUiStore().openNotificationMessage("Doctor registered successfully!");
      } else {
        useUiStore().openNotificationMessage(
          "Error occured while registration : "
        );
      }
      closeDoctorDialog();
    } else {
      console.log("Form validation failed.");
    }
  }
};

const getPaymentStatusColor = (status) => {
  if (!status) return "grey";
  status = status.toLowerCase();
  if (status === "paid" || status === "completed") return "green-darken-1";
  if (status === "pending" || status === "processing") return "orange-darken-1";
  if (status === "failed" || status === "cancelled" || status === "unpaid")
    return "red-darken-1";
  return "blue-grey";
};

// Helper function to determine icon for payment status
const getPaymentStatusIcon = (status) => {
  if (!status) return "mdi-help-circle-outline";
  status = status.toLowerCase();
  if (status === "paid" || status === "completed")
    return "mdi-check-circle-outline";
  if (status === "pending" || status === "processing") return "mdi-timer-sand";
  if (status === "failed" || status === "cancelled" || status === "unpaid")
    return "mdi-alert-circle-outline";
  return "mdi-information-outline";
};
</script>

<style scoped>
.v-container {
  max-width: 1400px; /* Or your preferred max width */
}

/* Improve hover effect on rows */
.v-data-table :deep(tbody tr:hover) {
  background-color: #f5f5f5 !important; /* Or your preferred hover color */
}

/* Style for table headers */
.v-data-table :deep(thead th) {
  font-size: 0.875rem !important;
  font-weight: bold !important;
  color: #424242 !important; /* Darker grey for header text */
  background-color: #fafafa !important;
}

/* Consistent padding for cells */
.v-data-table :deep(td) {
  padding: 10px 16px !important;
  font-size: 0.875rem;
}

/* Custom styling for the search bar */
.v-text-field :deep(.v-field__input) {
  font-size: 0.9rem;
}
.v-text-field :deep(label.v-label) {
  font-size: 0.9rem;
}

/* Ensure chips don't grow too large */
.v-chip {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Dialog styling consistency */
.v-dialog .v-card-title {
  padding: 16px 24px;
  font-size: 1.25rem; /* Vuetify default h5 */
}
.v-dialog .v-card-text {
  padding: 0px 24px 20px; /* Adjust padding as needed */
}
.v-dialog .v-card-actions {
  padding: 8px 24px 16px;
}
</style>
