<template>
  <v-container fluid>
    <div class="px-1 mb-5">
      <h1 class="text-h4 font-weight-bold text-blue-grey-darken-3">
        Doctors Directory
      </h1>
    </div>
    <v-card class="pa-2 pa-md-4 rounded-xl shadow-xl">
      <v-card-title
        class="d-flex flex-column flex-sm-row align-center pe-2 pb-4"
      >
        <span
          class="text-h6 font-weight-medium text-blue-grey-darken-2 mb-2 mb-sm-0"
        >
          <v-icon start color="primary">mdi-account-group</v-icon>
          Professionals List
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="compact"
          label="Search (Name, RMC, Email, Speciality)"
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
          { value: 7, title: '7' },
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
        <template v-slot:item.speciality="{ item }">
          <v-chip
            variant="tonal"
            size="small"
            :color="item.speciality ? 'teal' : 'grey'"
          >
            {{ item.speciality || "N/A" }}
          </v-chip>
        </template>

        <template v-slot:item.createdAt="{ item }">
          <template v-if="item.createdAt">
            <div class="text-caption">
              <div>{{ formatDate(item.createdAt) }}</div>
              <div class="text-grey-darken-1">
                {{ formatTime(item.createdAt) }}
              </div>
            </div>
          </template>
          <template v-else>
            <v-chip size="small" color="grey-lighten-1">N/A</v-chip>
          </template>
        </template>

        <template v-slot:item.paymentStatus="{ item }">
          <v-chip
            :color="getPaymentStatusColor(item.paymentStatus)"
            size="small"
            label
            class="font-weight-medium"
          >
            <v-icon start size="small">{{
              getPaymentStatusIcon(item.paymentStatus)
            }}</v-icon>
            {{ item.paymentStatus || "N/A" }}
          </v-chip>
        </template>

        <template v-slot:item.phoneNumber="{ item }">
          <a
            :href="`tel:${item.phoneNumber}`"
            class="text-decoration-none text-blue-darken-2"
          >
            <v-icon size="small" class="mr-1">mdi-phone</v-icon>
            {{ item.phoneNumber }}
          </a>
        </template>

        <template v-slot:item.email="{ item }">
          <a
            :href="`mailto:${item.email}`"
            class="text-decoration-none text-blue-darken-2"
          >
            <v-icon size="small" class="mr-1">mdi-email</v-icon>
            {{ item.email }}
          </a>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { useDoctorStore } from "@/store/DoctorStore";
import { ref, onMounted } from "vue";

defineOptions({
  name: "DoctorDataTable",
});

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const items = ref([]);
const loading = ref(true);

const headers = ref([
  {
    title: "Name",
    key: "name",
    sortable: true,
    align: "start",
    cellClass: "font-weight-medium text-subtitle-2",
  },
  { title: "RMC Number", key: "rmcNumber", sortable: true, align: "start" },
  {
    title: "Phone Number",
    key: "phoneNumber",
    sortable: false,
    align: "start",
  },
  { title: "Email", key: "email", sortable: false, align: "start" },
  { title: "Speciality", key: "speciality", sortable: true, align: "center" },
  {
    title: "Payment Status",
    key: "paymentStatus",
    sortable: true,
    align: "center",
  },
  { title: "Created At", key: "createdAt", sortable: true, align: "start" },
]);

const fetchDoctors = async () => {
  loading.value = true;
  const doctorStore = useDoctorStore();
  try {
    const doctorData = await doctorStore.getDoctors();
    items.value = Array.isArray(doctorData?.doctors) ? doctorData.doctors : [];
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    items.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDoctors();
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
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
</style>
