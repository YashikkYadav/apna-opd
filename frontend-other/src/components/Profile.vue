<template>
  <v-form @submit.prevent ref="form">
    <v-container class="prescription-page" style="max-width: 100%;">
      <div class="profile">
        <v-card class="section-card">
          <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
            <v-toolbar-title class="ml-3">Basic Details</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea v-model="form.introduction" ref="introductionRef" label="Introduction"
                :rules="[rules.required]" variant="outlined" dense>
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field v-model="form.happyClients" ref="happyClientsRef" type="number" label="No of customers"
                :rules="[rules.required]" variant="outlined" dense  @wheel.stop.prevent>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="form.experience" ref="experienceRef" type="number" label="Experience"
                :rules="[rules.required]" variant="outlined" dense  @wheel.stop.prevent>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea v-model="form.about" ref="aboutRef" label="About" :rules="[rules.required]" variant="outlined"
                dense>
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-file-upload clearable density="compact" variant="compact" title="Drag and drop profile image" show-size></v-file-upload>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="section-card">
          <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
            <v-toolbar-title class="ml-3">Unavailability Date</v-toolbar-title>
          </v-toolbar>
          <v-row class="about-item">
            <v-col cols="12" sm="4">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template #activator="{ on, attrs }">
                  <v-text-field v-model="form.from" label="From date" :readonly="false" variant="outlined" type="date"
                    dense v-bind="attrs" v-on="on">
                    <!-- <template #prepend>
                        <v-icon>mdi-calendar</v-icon>
                      </template> -->
                  </v-text-field>
                </template>
                <v-date-picker v-model="form.from" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template #activator="{ on, attrs }">
                  <v-text-field v-model="form.to" label="To date" :readonly="false" variant="outlined" type="date" dense
                    v-bind="attrs" v-on="on">
                    <!-- <template #prepend>
                        <v-icon>mdi-calendar</v-icon>
                      </template> -->
                  </v-text-field>
                </template>
                <v-date-picker v-model="form.to" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="section-card">
          <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
            <v-toolbar-title class="ml-3">Unavailability Delay</v-toolbar-title>
          </v-toolbar>
          <v-row class="about-item">
            <v-col cols="12" sm="4">
              <v-select v-model="form.delay" label="Delay" variant="outlined" :items="[
                { text: '1 hour', value: 1 },
                { text: '2 hours', value: 2 },
                { text: '3 hours', value: 3 },
                { text: '4 hours', value: 4 },
                { text: '5 hours', value: 5 },
                { text: '6 hours', value: 6 }
              ]" item-title="text" item-value="value"></v-select>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="section-card">
          <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
            <v-toolbar-title class="ml-3">Location</v-toolbar-title>
          </v-toolbar>
          <v-row v-for="(item, index) in form.locations" :key="index" class="about-item">
            <v-col cols="12" sm="4">
              <v-text-field v-model="item.name" label="name" :rules="index === 0 ? [rules.required] : []"
                variant="outlined" dense @input="handleLocationHistory(item, index)">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field v-model="item.address" :rules="index === 0 ? [rules.required] : []" label="address"
                variant="outlined" dense @input="handleLocationHistory(item, index)">
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
    <!-- Render dynamic cards for added locations -->
    <v-container v-for="(location, index) in form.locations" :key="index" class="prescription-page py-0">
      <div class="profile" v-if="location.name !== ''">
        <v-card class="section-card">
          <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
            <v-toolbar-title class="ml-3">{{ location.name }}</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="12" sm="12">
              <div class="day-checkbox">
                <v-checkbox v-model="location.days" label="Monday" value="Monday" :rules="[validateDays]"></v-checkbox>
                <v-checkbox v-model="location.days" label="Tuesday" value="Tuesday"
                  :rules="[validateDays]"></v-checkbox>
                <v-checkbox v-model="location.days" label="Wednesday" value="Wednesday"
                  :rules="[validateDays]"></v-checkbox>
                <v-checkbox v-model="location.days" label="Thursday" value="Thursday"
                  :rules="[validateDays]"></v-checkbox>
                <v-checkbox v-model="location.days" label="Friday" value="Friday" :rules="[validateDays]"></v-checkbox>
                <v-checkbox v-model="location.days" label="Saturday" value="Saturday"
                  :rules="[validateDays]"></v-checkbox>
                <v-checkbox v-model="location.days" label="Sunday" value="Sunday" :rules="[validateDays]"></v-checkbox>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-select v-model="location.from" label="From" variant="outlined" :items="time"
                :rules="[rules.required]"></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="location.to" label="To" variant="outlined" :items="time"
                :rules="[rules.required]"></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select v-model="location.timeslot" label="Time slot" variant="outlined" :rules="[rules.required]"
                :items="[
                  { text: '15 minutes', value: 15 },
                  { text: '30 minutes', value: 30 },
                  { text: '45 minutes', value: 45 },
                  { text: '1 Hour', value: 60 }
                ]" item-title="text" item-value="value"></v-select>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-end">
          <v-btn className="saaro-btn" type="submit" color="#8f6cb4" @click="onSubmit" large>
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-snackbar v-model="isShowMessage" color="#d4ebff">
    {{ globalMessage }}
  </v-snackbar>
</template>

<script>
import { VFileUpload } from 'vuetify/labs/VFileUpload'
export default {
  data() {
    return {
      doctorId: '',
      accessToken: '',
      form: {
        introduction: "",
        happyClients: null,
        experience: null,
        about: "",
        from: "",
        to: "",
        delay: "",
        locations: [{
          name: "", address: "", days: [], from: null,
          to: null,
          timeslot: null,
        }],
      },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      signIn: true,
      time: [
        "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM",
        "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
        "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"
      ],
      isShowMessage: false,
      globalMessage: '',
    };
  },

  methods: {
    fetchProfileData() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/patient/doctor-profile`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.doctorProfile !== null) {
            this.form = res.doctorProfile;
            this.form.locations = [...this.form.locations, {
              name: "", address: "", days: [], from: null,
              to: null,
              timeslot: null,
            }]
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        // Filter out empty location objects
        const { delay, from, to, ...restForm } = this.form;
        const data = {
          ...restForm, unavailabilityDate: {
            from: this.form.from,
            to: this.form.to
          },
          availabilityAfter: this.form.delay
        };
        data.happyClients = parseInt(data.happyClients)
        data.experience = parseInt(data.experience)
        data.locations = data.locations.filter(location => {
          return (
            location.name
          );
        });

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/doctor-profile`, {
          method: 'POST',
          headers: {
            Authorization: this.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
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
            if (data) {
              this.isShowMessage = true;
              this.globalMessage = "Profile data updated sucessfully."
              this.fetchProfileData();
            }
          })
          .catch((error) => {
            console.error("Network Error:", error.message);
          })
      } else {
        console.error('Please fill all required fields.');
      }
    },
    handleInputDrugHistory() {
      if (this.isAllRowsFilled() && !this.hasEmptyRow()) {
        this.form.about.push("");
      }
      this.removeEmptyRows();

    },
    isAllRowsFilled() {
      return this.form.about.every((item) => item.trim() !== "");
    },
    hasEmptyRow() {
      return this.form.about.some((item) => item.trim() === "");
    },
    removeEmptyRows() {
      this.form.about = this.form.about.filter(
        (item, index) => item.trim() !== "" || index === this.form.about.length - 1
      );
    },

    handleLocationHistory(item, index) {
      if (this.isLocationRowFilled(item) && !this.hasEmptyLocationRow()) {
        this.form.locations.push({
          name: "", address: "", days: [], from: null,
          to: null,
          timeslot: null,
        });
      }
      this.removeEmptyLocationRows();
    },
    isLocationRowFilled(item) {
      return item.name.trim() || (item.address && item.address.trim());
    },
    hasEmptyLocationRow() {
      return this.form.locations.some(
        (drug) => !(drug.name.trim() || (drug.address && drug.address.trim()))
      );
    },
    removeEmptyLocationRows() {
      this.form.locations = this.form.locations.filter(
        (drug, index) =>
          this.isLocationRowFilled(drug) || index === this.form.locations.length - 1
      );
    },

    validateDays(value) {
      if (!value || value.length === 0) {
        return '';
      }
      return true; // Validation passes if at least one day is selected
    },
  },

  mounted() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.accessToken = localStorage.getItem('access_token');

    this.fetchProfileData();
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style scoped>
.profile .v-card {
  margin-bottom: 20px;
}

.profile .v-row {
  margin: 0;
}

.v-field {
  border-radius: 12px;
}

.day-checkbox {
  display: flex;
  gap: 30px;
}

.v-toolbar {
  background-color: #d4ebff !important;
}

.mdi-checkbox-marked {
  color: #385D7E !important;

}

.prescription-page .mdi-checkbox-marked::before,
.day-checkbox .v-card--variant-elevated {
  color: #385D7E !important;
}

::v-deep(.mdi-checkbox-marked) {
  color: #385D7E !important;

}
</style>