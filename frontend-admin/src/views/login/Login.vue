<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img class="logo" alt="logo" src="../../assets/apna_opd_logo.jpg" />
            <div class="title">Sign in</div>
          </div>
          <v-form ref="loginForm" @submit.prevent="handleSubmit">
            <div class="form">
              <v-text-field
                v-model="phone"
                label="Phone"
                :rules="[rules.required]"
                variant="outlined"
                dense
                class="email-input"
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.required]"
                variant="outlined"
                dense
                type="password"
              >
              </v-text-field>
            </div>
            <input type="submit" value="Login" class="action" />
          </v-form>
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
      dropdownItems: [
        { value: "doctor", label: "Doctor" },
        { value: "ambulance", label: "Ambulance" },
        { value: "gym", label: "Gym" },
        { value: "yoga", label: "Yoga" },
        { value: "nasha_mukti_kendra", label: "Nasha Mukti Kendra" },
        { value: "commercial_meditation", label: "Commercial Meditation" },
        { value: "medical_store", label: "Medical Store" },
        {
          value: "nursing_medical_college",
          label: "Nursing & Medical College",
        },
        { value: "blood_bank", label: "Blood Bank" },
        { value: "physiotherapist", label: "Physiotherapist" },
        { value: "blood_donor", label: "Blood Donor" },
      ],
      password: "",
      email: "",
      phone: "",
      form: {
        name: "",
        password: "",
        phoneNumber: "",
        email: "",
        rmcNumber: "",
        address: "",
        clinicName: "",
      },
      rules: {
        required: (value) => !!value || "This field is required.",
        email: (value) =>
          !value.trim() ||
          /^[\w\.-]+@[\w\.-]+\.\w+$/.test(value.trim()) ||
          "Enter a valid email.",
      },
      signIn: true,
    };
  },
  methods: {
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
      const requestData = {
        phone: this.phone,
        password: this.password,
        type: this.healthServeType,
      };
      const res = await useAuthStore().LoginApiCall(requestData);
      if (res) {
        localStorage.setItem("doctor_id", res?.healthServe?.id);
        localStorage.setItem("access_token", res?.healthServe?.accessToken);

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
