<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="step1">
          <div class="top">
            <img class="logo" src="../../assets/apna_opd_logo.jpg" />
            <div class="title">Sign In Patient</div>
          </div>

          <v-form ref="loginForm" @submit.prevent="handleStep1">
            <div class="form">
              <v-text-field
                v-model="phone"
                label="Phone"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-text-field>
            </div>

            <input type="submit" value="Continue" class="action" />
          </v-form>
        </div>
        <div class="signIn" v-else>
          <div class="top">
            <img class="logo" src="../../assets/apna_opd_logo.jpg" />
            <div class="title">Sign In Patient</div>
          </div>

          <v-form ref="loginForm" @submit.prevent="handleSubmit">
            <div class="form">
              <v-text-field
                v-model="password"
                label="OTP"
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
      step1: true,
      password: "",
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
    async handleStep1() {
      const isValid = await this.$refs.loginForm.validate();

      if (!isValid.valid) {
        useUiStore().openNotificationMessage(
          "Please fill in all required fields correctly!",
          "",
          "error"
        );
        return;
      }
      this.step1 = false;
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

      const requestData = {
        phoneNumber: this.phone,
        otp: parseInt(this.password),
      };

      const res = await useAuthStore().LoginApiCall(requestData);

      if (res) {
        localStorage.setItem("doctor_id", res.patient.id);
        localStorage.setItem("access_token", res.patient.accessToken);

        this.$router.push("/doctors");
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
