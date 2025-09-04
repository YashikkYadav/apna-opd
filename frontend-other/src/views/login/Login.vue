<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img class="logo" src="../../assets/apna_opd_logo.jpg" />
            <div class="title">Sign in</div>
          </div>

          <v-form ref="loginForm" @submit.prevent="handleSubmit">
            <div class="form">
              <v-select
                v-model="healthServeType"
                :items="dropdownItems"
                label="Select Option"
                variant="outlined"
                dense
                :rules="[rules.required]"
                item-value="value"
                item-title="label"
              ></v-select>

              <v-text-field
                v-model="identifier"
                label="Phone or Email"
                :rules="[rules.required]"
                variant="outlined"
                dense
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.required]"
                variant="outlined"
                dense
                type="password"
              ></v-text-field>
            </div>

            <input type="submit" value="Login" class="action" />
          </v-form>
        </div>

        <div class="register" v-else>
          <div class="top">
            <img class="logo" src="../../assets/apna_opd_logo.jpg" />
            <div class="title">Create an Account</div>
          </div>

          <v-form ref="form">
            <div class="form ragister-form">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.name" label="Name" :rules="[rules.required]" variant="outlined" dense />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    :rules="[rules.required, rules.email]"
                    variant="outlined"
                    dense
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.phoneNumber"
                    label="Phone Number"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                    type="password"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.address"
                    label="Address"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.clinicName"
                    label="Clinic Name"
                    variant="outlined"
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.rmcNumber"
                    label="RMC Number"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  />
                </v-col>
              </v-row>
            </div>
          </v-form>

          <button class="action" @click="onRegister">Create Account</button>
          <div class="subtitle">
            Already have an account?
            <span class="subtitle-action" @click="signIn = true">
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";
import { useUiStore } from "@/store/UiStore";

export default {
  data() {
    return {
      healthServeType: null,
      identifier: "",
      password: "",
      form: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        rmcNumber: "",
        address: "",
        clinicName: "",
      },
      dropdownItems: [
        { value: "ambulance", label: "Ambulance" },
        { value: "gym", label: "Gym" },
        { value: "yoga", label: "Yoga" },
        { value: "nasha_mukti_kendra", label: "Nasha Mukti Kendra" },
        { value: "commercial_meditation", label: "Commercial Meditation" },
        // { value: "medical_store", label: "Medical Store" },
        { value: "nursing_medical_college", label: "Nursing & Medical College" },
        { value: "blood_bank", label: "Blood Bank" },
        { value: "physiotherapist", label: "Physiotherapist" },
        { value: "blood_donor", label: "Blood Donor" },
        { value: "nursing_staff", label: "Nursing Staff" },
        { value: "vatenary", label: "Vaterinary" },
        { value: "laboratory", label: "Laboratory" },
        { value: "ivf_clinic", label: "IVF Clinic" },
      ],
      rules: {
        required: (value) => !!value || "This field is required.",
        email: (value) =>
          !value || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Enter a valid email.",
      },
      signIn: true,
    };
  },
  methods: {
    isEmail(input) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    },
    isPhone(input) {
      return /^\d{10}$/.test(input); // adjust as needed
    },
    async handleSubmit() {
      const isValid = await this.$refs.loginForm.validate();
      if (!isValid.valid) {
        useUiStore().openNotificationMessage(
          "Please fill in all required fields correctly!",
          "",
          "error"
        );
        return;
      }

      let requestData = {
        password: this.password,
        type: this.healthServeType,
      };

      if (this.isEmail(this.identifier)) {
        requestData.email = this.identifier;
      } else if (this.isPhone(this.identifier)) {
        requestData.phone = this.identifier;
      } else {
        useUiStore().openNotificationMessage(
          "Enter a valid phone number or email!",
          "",
          "error"
        );
        return;
      }

      const res = await useAuthStore().LoginApiCall(requestData);

      if (res) {
        localStorage.setItem("doctor_id", res?.healthServe?.id);
        localStorage.setItem("access_token", res?.healthServe?.accessToken);
        localStorage.setItem("user_type", res?.healthServe?.type);

        this.$router.push("/dashboard");
        useUiStore().openNotificationMessage("You Are Successfully Logged In!");
      }
    },

    async onRegister() {
      const isValid = await this.$refs.form.validate();
      if (!isValid.valid) {
        useUiStore().openNotificationMessage(
          "Please fill in all required fields correctly!",
          "",
          "error"
        );
        return;
      }

      const res = await useAuthStore().RegisterApiCall(this.form);

      if (res) {
        this.signIn = true;
        useUiStore().openNotificationMessage("Doctor Registered Successfully!");
      }
    },
  },
};
</script>
