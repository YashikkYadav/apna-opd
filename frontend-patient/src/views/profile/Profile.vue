<template>
  <v-form @submit.prevent ref="form">
    <v-container class="prescription-page" style="max-width: 100%">
      <div class="profile">
        <v-card class="section-card">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Basic Details</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="form.introduction"
                ref="introductionRef"
                label="Introduction"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-file-upload
                clearable
                density="compact"
                variant="compact"
                title="Drag and drop profile image"
                show-size
              ></v-file-upload>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import { checkAuth } from "@/lib/utils/utils";
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";
import { VFileUpload } from "vuetify/labs/VFileUpload";
export default {
  data() {
    return {
      form: {
        introduction: "",
        happyClients: null,
        experience: null,
        about: "",
        from: "",
        to: "",
        delay: "",
        locations: [
          {
            name: "",
            address: "",
            days: [],
            from: null,
            to: null,
            timeslot: null,
          },
        ],
      },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      signIn: true,
      time: [
        "01:00 AM",
        "02:00 AM",
        "03:00 AM",
        "04:00 AM",
        "05:00 AM",
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM",
        "12:00 AM",
      ],
      isShowMessage: false,
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchProfileData();
    }
  },
  methods: {
    async fetchProfileData() {
      const res = await useProfileStore().getDoctoreProfileApiCall();

      if (res.doctorProfile !== null) {
        this.form = res.doctorProfile;
        this.form.locations = [
          ...this.form.locations,
          {
            name: "",
            address: "",
            days: [],
            from: null,
            to: null,
            timeslot: null,
          },
        ];
        this.form.delay = res.doctorProfile.availabilityAfter;
        this.form.from =
          res.doctorProfile.unavailabilityDate.from.split("T")[0];
        this.form.to = res.doctorProfile.unavailabilityDate.to.split("T")[0];
      }
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const { delay, from, to, ...restForm } = this.form;
        const data = {
          ...restForm,
          unavailabilityDate: {
            from: this.form.from,
            to: this.form.to,
          },
          availabilityAfter: this.form.delay,
        };
        data.happyClients = parseInt(data.happyClients);
        data.experience = parseInt(data.experience);
        data.locations = data.locations.filter((location) => {
          return location.name;
        });

        const res = await useProfileStore().addDoctoreProfileApiCall(data);

        if (res) {
          this.fetchProfileData();
          useUiStore().openNotificationMessage(
            "Profile data updated sucessfully!"
          );
        }
      } else {
        useUiStore().openNotificationMessage(
          "Please fill all required fields.",
          "",
          "error"
        );
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
        (item, index) =>
          item.trim() !== "" || index === this.form.about.length - 1
      );
    },
    handleLocationHistory(item, index) {
      if (this.isLocationRowFilled(item) && !this.hasEmptyLocationRow()) {
        this.form.locations.push({
          name: "",
          address: "",
          days: [],
          from: null,
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
          this.isLocationRowFilled(drug) ||
          index === this.form.locations.length - 1
      );
    },

    validateDays(value) {
      if (!value || value.length === 0) {
        return "";
      }
      return true;
    },
  },
};
</script>
