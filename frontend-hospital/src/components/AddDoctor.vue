<template>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <!-- Header -->
        <v-card-title class="text-h5 d-flex justify-space-between align-center">
          <span>Add Patient</span>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Form -->
        <v-card-text>
          <v-form ref="form" v-model="isValid">
            <!-- Mobile Number Section -->
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="form.countryCode"
                  label="Country Code"
                  placeholder="+1"
                  prefix="+"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-earth</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.mobileNumber"
                  label="Primary Phone Number"
                  placeholder="e.g. 7740997399"
                  :rules="[rules.required, rules.phoneNumber]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-cellphone</v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="form.alternateNumber"
              label="Alternate Phone Number (Optional)"
              placeholder="e.g. 9988776655"
              outlined
              dense
            >
              <template #prepend>
                <v-icon>mdi-phone</v-icon>
              </template>
            </v-text-field>
  
            <!-- Name Section -->
            <v-row>
              <v-col cols="4">
                <v-select
                  v-model="form.title"
                  :items="['Mr.', 'Mrs.', 'Dr.']"
                  label="Title"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.name"
                  label="Full Name"
                  placeholder="Full Name"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-account-circle</v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
  
            <!-- Date of Birth and Age -->
            <v-row>
              <v-col cols="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.dateOfBirth"
                      label="Date of Birth"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    >
                      <template #prepend>
                        <v-icon>mdi-calendar</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.dateOfBirth"
                    @update:model-value="updateAge"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.age"
                  label="Age"
                  readonly
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-cake</v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
  
            <!-- Gender -->
            <v-select
              v-model="form.gender"
              :items="['Male', 'Female', 'Other']"
              label="Gender"
              :rules="[rules.required]"
              outlined
              dense
            >
              <template #prepend>
                <v-icon>mdi-gender-male-female</v-icon>
              </template>
            </v-select>
  
            <!-- Email -->
            <v-text-field
              v-model="form.email"
              label="Email Address (Optional)"
              :rules="[rules.email]"
              outlined
              dense
            >
              <template #prepend>
                <v-icon>mdi-email</v-icon>
              </template>
            </v-text-field>
  
            <!-- Address -->
            <v-textarea
              v-model="form.address"
              label="Address"
              outlined
              dense
              rows="3"
              auto-grow
            >
              <template #prepend>
                <v-icon>mdi-map-marker</v-icon>
              </template>
            </v-textarea>
  
            <!-- File Upload -->
            <v-file-input
              v-model="form.photo"
              label="Upload Photo"
              accept="image/*"
              outlined
              dense
            >
              <template #prepend>
                <v-icon>mdi-camera</v-icon>
              </template>
            </v-file-input>
  
            <!-- More Options -->
            <v-btn
              text
              color="primary"
              class="mt-3"
              @click="moreOptions = !moreOptions"
            >
              <v-icon class="mr-1">mdi-dots-horizontal</v-icon>
              More Options
            </v-btn>
            <v-expand-transition>
              <div v-if="moreOptions">
                <v-text-field
                  v-model="form.bloodGroup"
                  label="Blood Group"
                  placeholder="e.g. A+"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-water</v-icon>
                  </template>
                </v-text-field>
                <v-textarea
                  v-model="form.allergies"
                  label="Allergies (Optional)"
                  rows="2"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-alert</v-icon>
                  </template>
                </v-textarea>
              </div>
            </v-expand-transition>
          </v-form>
        </v-card-text>
  
        <!-- Actions -->
        <v-card-actions>
          <v-btn color="primary" @click="submitForm">Submit</v-btn>
          <v-btn color="secondary" @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: true,
        isValid: false,
        menu: false,
        moreOptions: false,
        form: {
          countryCode: "+1",
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
        },
        rules: {
          required: (value) => !!value || "This field is required.",
          phoneNumber: (value) =>
            /^\d{10}$/.test(value) || "Enter a valid 10-digit number.",
          email: (value) =>
            !value || /^\S+@\S+\.\S+$/.test(value) || "Enter a valid email.",
        },
      };
    },
    methods: {
      updateAge(date) {
        if (date) {
          const birthDate = new Date(date);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          this.form.age = age;
        }
      },
      submitForm() {
        if (this.isValid) {
          alert("Form submitted successfully!");
          this.dialog = false;
        } else {
          alert("Please fill in all required fields.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin-top: 16px;
  }
  </style>
  