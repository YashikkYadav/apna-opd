<template>
  <v-container fluid>
    <!-- Search Bar and Add Patient Button -->
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Name,Phone,UID" variant="solo"
          max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
      </v-col>

      <v-col cols="4" class="text-end mb-2">
        <v-btn className="saaro-btn" color="#8f6cb4" @click="openDialog" large>
          Register Patient
        </v-btn>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-card title="Patients" flat>
      <template v-slot:text></template>
      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="patients" :search="search" class="table">
        <template v-slot:[`item.Tags`]="{ item }">
          <v-chip v-if="item.Tags" color="red">
            {{ item.Tags }}
          </v-chip>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="`/${item.id}/view-history`" style="text-decoration: none; color: inherit;">
            <v-btn className="saaro-btn" color="#8f6cb4" small @click="onViewHistory(item.Name)">
              View History
            </v-btn>
          </router-link>
          <v-btn icon class="delete-btn ml-2" @click="onDeletePatient(item.Name)">
            <v-icon color="7A7A7A">mdi-trash-can</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add Patient Dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="add-patient-popup popup-card">
        <!-- Header -->
        <v-card-title class="d-flex justify-space-between align-center popup-title">
          <span>Add Patient</span>
          <v-btn size="24" icon @click="dialog = false">
            <v-icon size="24">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Form -->
        <v-card-text class="popup-detail">
          <v-form ref="form" v-model="isValid">
            <!-- Mobile Number Section -->
            <v-row>
              <v-col cols="3">
                <v-text-field v-model="form.countryCode" label="Country Code" placeholder="1" prefix=""
                  variant="outlined" :rules="[rules.required]" outlined dense>
                </v-text-field>
              </v-col>
              <v-col cols="9">
                <v-text-field v-model="form.mobileNumber" label="Primary Phone Number" placeholder="e.g. 7740997399"
                  variant="outlined" :rules="[rules.required, rules.phoneNumber]" dense>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-12">
            <v-text-field v-model="form.alternateNumber" label="Alternate Phone Number (Optional)"
              placeholder="e.g. 9988776655" variant="outlined" outlined dense>
            </v-text-field>
          </v-col>
            </v-row>
            <!-- Name Section -->
            <v-row>
              <v-col cols="3">
                <v-select v-model="form.title" label="Title" :items="['Mr.', 'Mrs.', 'Dr.']" variant="outlined"
                  placeholder="Title" :rules="[rules.required]" dense>
                </v-select>
              </v-col>
              <v-col cols="9">
                <v-text-field v-model="form.name" label="Full Name" placeholder="Full Name" variant="outlined"
                  :rules="[rules.required]" dense>
                </v-text-field>
              </v-col>
            </v-row>

            <!-- Date of Birth and Age -->
            <v-row>
              <v-col cols="6">
                <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                  <template #activator="{ on, attrs }">
                    <v-text-field v-model="form.dateOfBirth" label="Date of Birth" :readonly="false" variant="outlined" type="date"
                      dense v-bind="attrs" v-on="on">
                      <!-- <template #prepend>
                        <v-icon>mdi-calendar</v-icon>
                      </template> -->
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="form.dateOfBirth" @update:model-value="updateAge"
                    @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model.number="form.age" label="Age" variant="outlined" dense type="number">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <!-- Gender -->
                <v-select v-model="form.gender" :items="['Male', 'Female', 'Other']" label="Gender"
                  :rules="[rules.required]" variant="outlined" dense>
                </v-select>
              </v-col>
              <v-col cols="6">
                <!-- Email -->
                <v-text-field v-model="form.email" label="Email Address (Optional)" :rules="[rules.email]"
                  variant="outlined" dense>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="v-col-12">
                <v-textarea v-model="form.address" label="Address" variant="outlined" dense rows="3" auto-grow>
            </v-textarea>
              </v-col>
            </v-row>



            <!-- Address -->
            

            <!-- File Upload -->


            <!-- More Options -->
            <v-btn text class="my-3 saaro-btn" variant="outlined"
              @click="moreOptions = !moreOptions">
              <v-icon class="mr-1">mdi-dots-horizontal</v-icon>
              More Options
            </v-btn>

            <v-expand-transition>
              <div v-if="moreOptions">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form.bloodGroup" label="Blood Group" placeholder="e.g. A+" variant="outlined"
                      dense>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea v-model="form.allergies" label="Allergies (Optional)" rows="1" variant="outlined" dense>
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form.tags" label="Category" placeholder="Category" variant="outlined" dense>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form.referredBy" label="Referred By" placeholder="Referred By"
                      variant="outlined" dense>
                    </v-text-field>
                  </v-col>
                </v-row>

              </div>
            </v-expand-transition>
          </v-form>
        </v-card-text>

        <!-- Actions -->
        <v-card-actions class="popup-action">
          <v-btn className="saaro-btn" @click="dialog = false">Cancel</v-btn>
          <v-btn className="saaro-btn" @click="submitForm">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      moreOptions: false,
      patients: [],
      headers: [
        { key: "UID", title: "UID" },
        { key: "Name", title: "Name" },
        { key: "Phone", title: "Phone" },
        { key: "Date", title: "Last Visit" },
        { key: "Tags", title: "Tags" },
        { key: "action", title: "Action", sortable: false },
      ],
      form: {
        countryCode: "+91",
        mobileNumber: "",
        alternateNumber: "",
        title: "",
        name: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        email: "",
        address: "",
        photo: null,
        bloodGroup: "",
        allergies: "",
        tags: "",
        referredBy: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        // email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
        phoneNumber: (value) =>
          /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/.test(value) ||
          "Phone number must be valid.",
      },
      isValid: false,
      menu: false,
      doctorId: '',
      accessToken: '',
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        if (
          !this.form.name
          || !this.form.mobileNumber
          || !this.form.gender
        ) {
          alert('Please fill name, number and gender');
          return;
        }

        const requestData = {
          fullName: this.form.name,
          phoneNumber: this.form.mobileNumber,
          alternatePhone: this.form.alternateNumber,
          dateOfBirth: this.form.dateOfBirth,
          age: this.form.age,
          gender: this.form.gender,
          email: this.form.email,
          address: this.form.address,
          bloodGroup: this.form.bloodGroup,
          allergies: this.form.allergies,
          tags: this.form.tags,
          referredBy: this.form.referredBy,
        };

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/patient/${this.doctorId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                console.error("Error:", errorData);
                throw new Error("Failed to fetch");
              });
            }
            return response.json();
          })
          .then((data) => {
            this.fetchPatients();
          })
          .catch((error) => {
            console.error("Network Error:", error.message);
          });
        this.dialog = false;
      }
    },
    updateAge() {
      const birthDate = new Date(this.form.dateOfBirth);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      this.form.age = age;
    },
    onDeletePatient(name) {
      // Handle delete patient
    },
    onViewHistory(name) {
      // Handle view history
    },
    fetchPatients() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/patient/get-all/${this.doctorId}`, {
        method: "GET",
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
          this.patients = data.patient.map((patient) => ({
            id: patient.patientId._id,
            UID: patient.patientId.uid,
            Name: patient.patientId.fullName,
            Phone: patient.patientId.phoneNumber,
            Date: new Date(patient.updatedAt).toLocaleDateString('en-GB'),
            Tags: patient.patientId.tags,
            Action: "", // Customize as needed
          }));
        })
        .catch((error) => {
          console.error("Network Error:", error.message);
        });
    },
  },

  mounted() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.accessToken = localStorage.getItem('access_token');

    if (!this.doctorId || !this.accessToken) {
      this.$router.push('/login');
    }
    this.fetchPatients();
  },
};
</script>


<style scoped>
.v-card {
  border-radius: 20px;
}

::v-deep(.v-data-table thead) {
  background-color: #e0e3e6;
}

::v-deep(.v-data-table) {
  border-radius: 0px;
}

::v-deep(.v-card-text) {
  padding: 0px;
}

::v-deep(.v-field.v-field--appended) {
  --v-field-padding-end: 6px;
  border-radius: 5px;
}

::v-deep(.v-btn.variant-text) {
  background: transparent !important;
  box-shadow: none !important;
}

.delete-btn {
  background: none !important;
  box-shadow: none !important;
}

.delete-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.delete-btn .v-btn__overlay {
  display: none;
}

.v-field .v-field__overlay {
  border-radius: 0px !important;
}

.rounded-xl .v-input__control .v-field {
  border-radius: 20px !important;
}

.more-btn {
  color: #6ec1e4 !important;
}
.icon-btn{
  box-shadow: none;
}
</style>
