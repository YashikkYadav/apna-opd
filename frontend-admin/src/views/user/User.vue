<template>
  <v-container fluid>
    <div class="px-1 mb-5">
      <h1 class="text-h4 font-weight-bold text-blue-grey-darken-3">
        {{ "User Directory" }}
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
          label="Search (Name, Email, Phone)"
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
        <v-btn
          color="primary"
          class="ml-sm-4 mt-2 mt-sm-0"
          @click="openCreateUserModal"
        >
          <v-icon start>mdi-plus</v-icon>
          Create User
        </v-btn>
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
        loading-text="Fetching user data... Please wait."
        :no-data-text="`No User found matching your criteria.`"
        item-value="id"
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
        <template v-slot:item.firstName="{ item }">
          {{ item.firstName + " " + item.lastName }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="ms-2" @click="openDetailsModal(item)">
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showDetailsModal" max-width="600">
      <v-card>
        <v-card-title class="text-h5">
          User Profiles - {{ selectedUser?.firstName }}
          {{ selectedUser?.lastName }}
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="detailsHeaders"
            :items="userDetails"
            :items-per-page-options="[
              { value: 5, title: '5' },
              { value: 10, title: '10' },
              { value: -1, title: 'All' },
            ]"
            class="elevation-0"
          >
            <template v-slot:no-data>
              No profile details available for this user.
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="error" @click="closeDetailsModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showCreateUserModal" max-width="600">
      <v-card>
        <v-card-title class="text-h5">Create New User</v-card-title>
        <v-card-text>
          <v-form ref="createUserForm" @submit.prevent="submitCreateUserForm">
            <v-text-field
              v-model="newUser.firstName"
              label="First Name"
              variant="outlined"
              density="compact"
              class="mb-4"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.lastName"
              label="Last Name"
              variant="outlined"
              density="compact"
              class="mb-4"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.email"
              label="Email"
              type="email"
              variant="outlined"
              density="compact"
              class="mb-4"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.phone"
              label="Phone Number"
              variant="outlined"
              density="compact"
              class="mb-4"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
              variant="outlined"
              density="compact"
              class="mb-4"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="error" @click="closeCreateUserModal">Cancel</v-btn>
          <v-btn color="primary" @click="submitCreateUserForm">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useUserStore } from "@/store/UserStore";
import { ref, onMounted, computed } from "vue";
import { checkAuth } from "@/lib/utils/utils";
import { useRouter } from "vue-router";
import { useUiStore } from "@/store/UiStore";

const userTypes = ref([
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
  const auth = checkAuth(router);
  if (auth) {
    fetchUser();
  }
});

const serviceValue = computed(() => {
  if (
    props.type &&
    userTypes.value.length > 0 &&
    userTypes.value[0].hasOwnProperty(
      props.type.toLowerCase().replace(/ /g, "_")
    )
  ) {
    return userTypes.value[0][props.type.toLowerCase().replace(/ /g, "_")];
  }
  return null;
});

defineOptions({
  name: "userDataTable",
});

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const items = ref([]);
const loading = ref(true);

const headers = ref([
  {
    title: "Name",
    key: "firstName",
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
  { title: "Created At", key: "createdAt", sortable: true, align: "start" },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
]);

const fetchUser = async () => {
  loading.value = true;
  const userStore = useUserStore();
  try {
    const userData = await userStore.getUser();
    items.value = Array.isArray(userData?.user) ? userData.user : [];
  } catch (error) {
    console.error("Failed to fetch user:", error);
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

const showDetailsModal = ref(false);
const selectedUser = ref(null);
const userDetails = ref([]);
const detailsHeaders = ref([
  { title: "Profile Type", key: "type" },
  { title: "Count", key: "count", align: "center" },
]);

const openDetailsModal = (user) => {
  selectedUser.value = user;
  fetchUserDetails();
  showDetailsModal.value = true;
};

const fetchUserDetails = async () => {
  const userStore = useUserStore();
  try {
    const userData = await userStore.getUserDetails(selectedUser.value._id);
    userDetails.value = Array.isArray(userData?.user?.details)
      ? userData.user.details
      : [];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    userDetails.value = [];
  }
};

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedUser.value = null;
  userDetails.value = [];
};

// New state for Create User Modal
const showCreateUserModal = ref(false);
const newUser = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
});
const createUserForm = ref(null); // Ref for the v-form

const openCreateUserModal = () => {
  newUser.value = {
    // Reset form fields when opening
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };
  // Reset validation state of the form
  if (createUserForm.value) {
    createUserForm.value.resetValidation();
  }
  showCreateUserModal.value = true;
};

const closeCreateUserModal = () => {
  showCreateUserModal.value = false;
  if (createUserForm.value) {
    createUserForm.value.reset(); // Reset form fields and validation
  }
};

const submitCreateUserForm = async () => {
  try {
    const payload = {
      firstName: newUser.value.firstName,
      lastName: newUser.value.lastName,
      email: newUser.value.email,
      phone: newUser.value.phone,
      password: newUser.value.password,
    };

    console.log("Sending payload to backend:", payload);
    const userStore = useUserStore();

    const data = await userStore.registerUser(payload);
    
    if (data.User) {
      fetchUser();
      useUiStore().openNotificationMessage("User registered");
    }
    closeCreateUserModal();
  } catch (error) {
    console.error("Error submitting user creation form:", error);
  }
};
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

.v-dialog {
  padding-top: 30px;
}

.v-card {
  padding: 20px;
}

.v-card-title {
  padding-inline: 20px;
}
</style>
