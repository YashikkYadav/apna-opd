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
                v-model="userName"
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
      password: "",
      userName: "",
      rules: {
        required: (value) => !!value || "This field is required.",
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
        userName: this.userName,
        password: this.password,
      };
      const res = await useAuthStore().LoginApiCall(requestData);
      if (res) {
        localStorage.setItem("admin_id", res?.admin?.id);
        localStorage.setItem("access_token", res?.admin?.accessToken);

        this.$router.push("/doctor");
        useUiStore().openNotificationMessage("You Are Successfully Logged In!");
      }
    },
  },
};
</script>
