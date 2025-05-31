<template>
  <v-container fluid>
    <div class="px-1 mb-5">
      <h1 class="text-h4 font-weight-bold text-blue-grey-darken-3">
        {{ serviceValue + " Directory" }}
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
          label="Search (Name,  Email, Location)"
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
        :no-data-text="`No ${serviceValue} found matching your criteria.`"
        item-value="rmcNumber"
      >
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

        <template v-slot:item.phoneNumber="{ item }">
          <a
            :href="`tel:${item.phoneNumber}`"
            class="text-decoration-none text-blue-darken-2"
          >
            <v-icon size="small" class="mr-1">mdi-phone</v-icon>
            {{ item.phone}}
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

        <template v-slot:item.location="{ item }">
          <template v-if="item.location">
            <div class="text-caption">
              <div class="text-grey-darken-1">
                {{ item.location }}
              </div>
            </div>
          </template>
          <template v-else>
            <v-chip size="small" color="grey-lighten-1">N/A</v-chip>
          </template>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { useHealthServeStore } from "@/store/HealthServeStore";
import { ref, onMounted, computed, defineProps, watch, onUnmounted } from "vue";
import { checkAuth } from "@/lib/utils/utils";
import { useRouter } from "vue-router";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
});

const healthServeTypes = ref([
  {
    ambulance: "Ambulance",
    gym: "Gym",
    yoga: "Yoga",
    nasha_mukti_kendra: "Nasha Mukti Kendra",
    commercial_meditation: "Commercial Meditation",
    medical_store: "Medical Store",
    nursing_medical_college: "Nursing & Medical College",
    blood_bank: "Blood Bank",
    physiotherapist: "Physiotherapist",
    blood_donor: "Blood Donor",
  },
]);

onMounted(() => {
  const router = useRouter();
  fetchHealthServe();
  watch(
    () => props.type,
    async (newType) => {
      if (!newType) {
        router.push("/login");
        return;
      }
  
      const auth = checkAuth(router);
      if (auth) {
        await fetchHealthServe();
      } else {
        console.warn("Authentication failed.");
      }
    },
  );
});



const serviceValue = computed(() => {
  if (
    props.type &&
    healthServeTypes.value.length > 0 &&
    healthServeTypes.value[0].hasOwnProperty(
      props.type.toLowerCase().replace(/ /g, "_")
    )
  ) {
    return healthServeTypes.value[0][
      props.type.toLowerCase().replace(/ /g, "_")
    ];
  }
  return null;
});

defineOptions({
  name: "healthServeDataTable",
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
  {
    title: "Phone Number",
    key: "phoneNumber",
    sortable: false,
    align: "start",
  },
  { title: "Email", key: "email", sortable: false, align: "start" },
  { title: "Location", key: "location", sortable: false, align: "start" },
  { title: "Created At", key: "createdAt", sortable: true, align: "start" },
]);

const fetchHealthServe = async () => {
  loading.value = true;
  const healthServeStore = useHealthServeStore();
  try {
    const healthServeData = await healthServeStore.getHealthServe(props.type);
    items.value = Array.isArray(healthServeData?.healthServe)
      ? healthServeData.healthServe
      : [];

  } catch (error) {
    console.error("Failed to fetch healthServe:", error);
    items.value = [];
  } finally {
    loading.value = false;
  }
};

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

onUnmounted(() => {
  const healthServeStore = useHealthServeStore();
  healthServeStore.$dispose();
});
</script>

<style scoped>
.v-container {
  max-width: 1400px;
}

.v-data-table :deep(tbody tr:hover) {
  background-color: #f5f5f5 !important;
}

.v-data-table :deep(thead th) {
  font-size: 0.875rem !important;
  font-weight: bold !important;
  color: #4d4d4d !important;
  background-color: #d3d3d3 !important;
}

.v-data-table :deep(td) {
  padding: 10px 16px !important;
  font-size: 0.875rem;
}

.v-text-field :deep(.v-field__input) {
  font-size: 0.9rem;
}
.v-text-field :deep(label.v-label) {
  font-size: 0.9rem;
}

.v-chip {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
