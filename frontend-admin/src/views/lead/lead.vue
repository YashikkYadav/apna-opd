<template>
  <v-container fluid>
    <div class="px-1 mb-5">
      <h1 class="text-h4 font-weight-bold text-blue-grey-darken-3">
        {{ serviceValue || "Leads" }}
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
          Leads List
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          density="compact"
          label="Search (Name, Email, Description)"
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
        loading-text="Fetching lead data... Please wait."
        :no-data-text="`No ${
          serviceValue || 'Leads'
        } found matching your criteria.`"
        item-value="_id"
      >
        <template v-slot:item.phone="{ item }">
          <a
            :href="`tel:${item.phone}`"
            class="text-decoration-none text-blue-darken-2"
          >
            <v-icon size="small" class="mr-1">mdi-phone</v-icon>
            {{ item.phone }}
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

        <template v-slot:item.description="{ item }">
          <div class="text-caption text-grey-darken-1">
            {{ item.description || "N/A" }}
          </div>
        </template>

        <template v-if="props.type === 'career'" v-slot:item.actions="{ item }">
          <v-btn
            icon
            color="blue-darken-1"
            variant="text"
            @click="showResume(item.resumeUrl)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <v-dialog v-model="showResumeModal" max-width="900px">
    <v-card rounded="lg" class="d-flex flex-column" style="height: 90vh">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6">Resume Viewer</span>
        <!-- Close button to hide the dialog -->
        <v-btn icon variant="text" @click="showResumeModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="flex-grow-1 pa-0" style="height: 90vh">
        <iframe
          v-if="resumeUrl"
          :src="resumeUrl"
          width="100%"
          height="100%"
          frameborder="0"
          title="Resume PDF Viewer"
        >
          Your browser does not support PDFs. Please download the PDF to view
          it.
        </iframe>
        <!-- Fallback message if resumeUrl is not available -->
        <div v-else class="d-flex align-center justify-center fill-height">
          <p class="text-medium-emphasis">No resume to display.</p>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Card Actions Section for the close button -->
      <v-card-actions class="justify-end pa-3">
        <v-btn
          color="blue-grey-lighten-2"
          variant="flat"
          @click="showResumeModal = false"
          rounded="lg"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
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

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const items = ref([]);
const loading = ref(true);
const showResumeModal = ref(false);
const resumeUrl = ref("");

const headers = computed(() => {
  if (props.type === "career") {
    return [
      { title: "Name", key: "name", sortable: true, align: "start" },
      { title: "Email", key: "email", sortable: false, align: "start" },
      { title: "Phone", key: "phone", sortable: false, align: "start" },
      { title: "Role", key: "role", sortable: false, align: "start" },
      {
        title: "Description",
        key: "description",
        sortable: false,
        align: "start",
      },
      {
        title: "View Resume",
        value: "actions",
        sortable: false,
        align: "center",
      },
    ];
  } else {
    return [
      { title: "Name", key: "name", sortable: true, align: "start" },
      { title: "Email", key: "email", sortable: false, align: "start" },
      { title: "Phone", key: "phone", sortable: false, align: "start" },
      {
        title: "Description",
        key: "description",
        sortable: false,
        align: "start",
      },
    ];
  }
});

const fetchHealthServe = async () => {
  loading.value = true;
  const healthServeStore = useHealthServeStore();
  try {
    const data = await healthServeStore.getLead(props.type);
    if (props.type === "contact") {
      items.value = Array.isArray(data?.contactLeads) ? data.contactLeads : [];
    } else {
      items.value = Array.isArray(data?.careerLeads) ? data.careerLeads : [];
    }
  } catch (error) {
    console.error("Error fetching leads:", error);
    items.value = [];
  } finally {
    loading.value = false;
  }
};

const showResume = (url = "") => {
  resumeUrl.value = url;
  showResumeModal.value = !showResumeModal.value;
};

const leadTypes = {
  career: "Career Leads",
  contact: "Contact Leads",
};

const serviceValue = computed(() => leadTypes[props.type] || "Leads");

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
      }
    }
  );
});

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
