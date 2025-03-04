<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">Sign in</div>

          </div>

          <form @submit.prevent="handleSubmit">
            <div class="form">
              <v-text-field v-model="email.value" label="Email" :rules="[rules.required, rules.email]"
                variant="outlined" dense class="email-input">
              </v-text-field>

              <v-text-field v-model="password.value" label="Password" :rules="[rules.required]" variant="outlined" dense
                type="password">
              </v-text-field>
            </div>

            <input type="submit" value="Login" class="action" :class="{ 'action-disabled': !loginValid }" />
          </form>
          <div class="subtitle">
            Don't have an account?
            <span class="subtitle-action" @click="signIn = !signIn">
              Create Account
            </span>
          </div>
        </div>

        <div class="register" v-else>
          <div class="top">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">Create an Account</div>
          </div>

          <form>
            <div class="form ragister-form">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.name" label="Name" :rules="[rules.required]" variant="outlined" dense>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.email" label="Email" :rules="[rules.required]" variant="outlined" dense>
                  </v-text-field>
                </v-col>

              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.phoneNumber" label="Phone Number" :rules="[rules.required]"
                    variant="outlined" dense>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.password" label="Password" :rules="[rules.required]" variant="outlined"
                    dense>
                  </v-text-field>
                </v-col>

              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field v-model="form.address" label="address" :rules="[rules.required]" variant="outlined"
                    dense>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.clinicName" label="Clinic Name" variant="outlined" dense>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.rmcNumber" label="RMC Number" :rules="[rules.required]" variant="outlined"
                    dense>
                  </v-text-field>
                </v-col>

              </v-row>
            </div>
          </form>

          <button class="action" @click="onRegister" :class="{ 'action-disabled': !registerValid }">
            Create Account
          </button>
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
export default {
  data() {
    return {
      emailRegex: /^[\w\.-]+@[\w\.-]+\.\w+$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,

      password: {
        value: "",
        error: false
      },

      email: {
        value: "",
        error: false
      },
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
          !value.trim() || /^[\w\.-]+@[\w\.-]+\.\w+$/.test(value.trim()) || "Enter a valid email.",
      },

      signIn: true
    };
  },

  methods: {
    validateEmail(event) {
      if (this.email.value == "") this.email.error = true;
      else this.email.error = false;
    },

    validatePassword(event) {
      if (this.password.value == "") this.password.error = true;
      else this.password.error = false;
    },

    handleSubmit() {
      const requestData = {
        email: this.email.value.trim(),
        password: this.password.value,
      };

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/doctor/access-token`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.isTemplateDetailModalOpen = false;
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem('doctor_id', data.doctor.id);
          localStorage.setItem('access_token', data.doctor.accessToken);

          this.$router.push('/create-rx');
        })
        .catch((error) => {
          console.error("Network Error:", error.message);
        })
    },

    onRegister() {
      if (this.registerValid) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/doctor`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        })
          .then((response) => {
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
              if (contentType && !contentType.includes('application/json')) {
                return response.text().then(text => {
                  this.showSnackbar(text, true);
                  this.isTemplateDetailModalOpen = false;
                  throw new Error(`Error ${response.status}: ${text}`);
                });
              }
            }
            return response.json();
          })
          .then((data) => {
            this.signIn = true;
          })
          .catch((error) => {
            console.error("Network Error:", error.message);
          })
      } else {
        console.error('Please fill all required fields.');
      }

    }
  },

  mounted() {
    const doctorId = localStorage.getItem('doctor_id');
    const accessToken = localStorage.getItem('access_token');

    if (doctorId && accessToken) {
      this.$router.push('/invoice');
    }
  },

  computed: {
    emailValid() {
      return this.emailRegex.test(this.email.value.trim());
    },

    passwordValid() {
      return this.password.value.length > 0;
    },

    loginValid() {
      return this.emailValid && this.passwordValid;
    },

    registerValid() {
      return (
        this.form.name &&
        this.form.email &&
        this.form.password &&
        this.form.phoneNumber &&
        this.form.address &&
        this.form.rmcNumber
      );
    }
  }
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss">
@mixin box {
  // box-shadow: 1px 1px 2px 1px #ccc;
}

@mixin field {
  border: 1px solid #aaa;
  height: 40px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}

.loginBox {
  max-width: 1440px;
  margin: auto auto;
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.loginBox .inner {
  width: 100%;
}


.loginBox .invalid {
  border: 2px solid red !important;

  &::placeholder {
    color: red;
  }
}

.loginBox .errorMessage {
  color: red;
  margin: 10px;
  top: 5px;
}

.w100 {
  width: 100%;
}

.loginBox .logo {
  width: 300px;
  margin-bottom: 20px;
}

.email-input {
  margin-bottom: 20px;
  margin-top: 20px;
}

.loginBox .action {
  height: 56px;
  border-radius: 40px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: #d4ebff;
  margin-top: 20px;
  color: #385D7E;
  font-size: 1.2rem;
  line-height: 1.2rem;
  border: 1px solid #385D7E;
  font-weight: bold;
  @include box;
}

.loginBox .action-disabled {
  color: #eee;
  background: #aaa;
  border: 1px solid #aaa;
  cursor: auto;
}

.loginBox .top {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.loginBox .title {
  width: 100%;
  font-size: 1.8rem;
  margin: 0;
  text-align: center;
  font-weight: 500;
}

.loginBox .subtitle {
  text-align: center;
  margin-top: 20px;

  .subtitle-action {
    color: #385D7E;
    font-weight: bold;
    cursor: pointer;
  }
}

.loginBox .loginBox {
  background: #fff;
  border-radius: 15px;
  max-width: 400px;
  padding: 25px 55px;
  animation: slideInTop 1s;
}

.signIn,
.register {
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  background: #ffffff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  max-width: 500px;
  margin: 0 auto;
  padding: 3rem;
}

.register {
  max-width: 800px;
}

.ragister-form .v-col-sm-4,
.ragister-form .v-col-sm-6,
.ragister-form .v-col-sm-12 {
  padding-bottom: 0;
}

.register .title {
  margin-bottom: 10px;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }

  to {
    opacity: 100;
    transform: translateY(0%);
  }
}

@media screen and (min-width: 440px) {
  .loginBox {
    @include box;
  }
}

@media screen and (max-width: 440px) {
  html {
    background: #fff;
    align-items: start;
    justify-content: start;
  }

  .loginBox {
    padding: 25px 25px;
    max-width: 100vw;
  }
}
</style>