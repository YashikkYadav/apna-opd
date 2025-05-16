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
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
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
          <div class="subtitle">
            Don't have an account?
            <span class="subtitle-action" @click="signIn = !signIn">
              Create Account
            </span>
          </div>
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
                  <v-text-field
                    v-model="form.name"
                    label="Name"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  >
                  </v-text-field>
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
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="form.address"
                    label="address"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.clinicName"
                    label="Clinic Name"
                    variant="outlined"
                    dense
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.rmcNumber"
                    label="RMC Number"
                    :rules="[rules.required]"
                    variant="outlined"
                    dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-form>

          <button class="action" @click="onRegister">Create Account</button>
          <div class="subtitle">
            Already have an account?
            <span class="subtitle-action" @click="signIn = !signIn">
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
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";

export default {
  data() {
    return {
      password: "",
      email: "",
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
        email: this.email.trim(),
        password: this.password,
      };

      const res = await useAuthStore().LoginApiCall(requestData);

      if (res) {
        localStorage.setItem("doctor_id", res.doctor.id);
        localStorage.setItem("access_token", res.doctor.accessToken);

        this.$router.push("/create-rx");
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
