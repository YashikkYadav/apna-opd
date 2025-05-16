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
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.happyClients"
                ref="happyClientsRef"
                type="number"
                label="No of customers"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.experience"
                ref="experienceRef"
                type="number"
                label="Experience"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="form.about"
                ref="aboutRef"
                label="About"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-file-upload
                clearable
                density="compact"
                variant="compact"
                title="Drag and drop profile image"
                show-size
                :model-value="profileImage"
                @update:modelValue="handleProfileChange"
              ></v-file-upload>
            </v-col>
            <v-col cols="12" sm="6">
              <v-file-upload
                clearable
                multiple
                :max="6"
                density="compact"
                variant="compact"
                title="Drag and drop gallery image (max: 6)"
                show-size
                :model-value="galleryImages"
                @update:modelValue="handleGalleryChange"
              ></v-file-upload>
            </v-col>
          </v-row>
          <v-row>
            <div class="image-gallery">
              <div
                v-for="(img, index) in sortedImages"
                :key="index"
                class="image-card"
              >
                <div class="image-container">
                  <img :src="img.url" :alt="img.filename" class="image" />
                  <button class="delete-button" @click="confirmDelete(img)">
                    ✖
                  </button>
                </div>
                <div v-if="img.type === 'profilePhoto'" class="image-type">
                  {{ "Profile" }}
                </div>
                <div v-if="img.type === 'galleryImages'" class="image-type">
                  {{ "Gallery" }}
                </div>
              </div>
            </div>
          </v-row>
        </v-card>
        <v-card class="section-card">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Unavailability Date</v-toolbar-title>
          </v-toolbar>
          <v-row class="about-item">
            <v-col cols="12" sm="4">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.from"
                    label="From date"
                    :readonly="false"
                    variant="outlined"
                    type="date"
                    dense
                    v-bind="attrs"
                    v-on="on"
                  >
                    <!-- <template #prepend>
                          <v-icon>mdi-calendar</v-icon>
                        </template> -->
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="form.from"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.to"
                    label="To date"
                    :readonly="false"
                    variant="outlined"
                    type="date"
                    dense
                    v-bind="attrs"
                    v-on="on"
                  >
                    <!-- <template #prepend>
                          <v-icon>mdi-calendar</v-icon>
                        </template> -->
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="form.to"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="section-card">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Unavailability Delay</v-toolbar-title>
          </v-toolbar>
          <v-row class="about-item">
            <v-col cols="12" sm="4">
              <v-select
                v-model="form.delay"
                label="Delay"
                variant="outlined"
                :items="[
                  { text: '1 hour', value: 1 },
                  { text: '2 hours', value: 2 },
                  { text: '3 hours', value: 3 },
                  { text: '4 hours', value: 4 },
                  { text: '5 hours', value: 5 },
                  { text: '6 hours', value: 6 },
                ]"
                item-title="text"
                item-value="value"
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="section-card">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Location</v-toolbar-title>
          </v-toolbar>
          <v-row
            v-for="(item, index) in form.locations"
            :key="index"
            class="about-item"
          >
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="item.name"
                label="name"
                :rules="index === 0 ? [rules.required] : []"
                variant="outlined"
                dense
                @input="handleLocationHistory(item, index)"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="item.address"
                :rules="index === 0 ? [rules.required] : []"
                label="address"
                variant="outlined"
                dense
                @input="handleLocationHistory(item, index)"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
    <!-- Render dynamic cards for added locations -->
    <v-container
      v-for="(location, index) in form.locations"
      :key="index"
      class="prescription-page py-0"
      style="max-width: 100%"
    >
      <div class="profile" v-if="location.name !== ''">
        <v-card class="section-card">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">{{ location.name }}</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="12" sm="12">
              <div class="day-checkbox">
                <v-checkbox
                  v-model="location.days"
                  label="Monday"
                  value="Monday"
                  :rules="[validateDays]"
                ></v-checkbox>
                <v-checkbox
                  v-model="location.days"
                  label="Tuesday"
                  value="Tuesday"
                  :rules="[validateDays]"
                ></v-checkbox>
                <v-checkbox
                  v-model="location.days"
                  label="Wednesday"
                  value="Wednesday"
                  :rules="[validateDays]"
                ></v-checkbox>
                <v-checkbox
                  v-model="location.days"
                  label="Thursday"
                  value="Thursday"
                  :rules="[validateDays]"
                ></v-checkbox>
                <v-checkbox
                  v-model="location.days"
                  label="Friday"
                  value="Friday"
                  :rules="[validateDays]"
                ></v-checkbox>
                <v-checkbox
                  v-model="location.days"
                  label="Saturday"
                  value="Saturday"
                  :rules="[validateDays]"
                ></v-checkbox>
                <v-checkbox
                  v-model="location.days"
                  label="Sunday"
                  value="Sunday"
                  :rules="[validateDays]"
                ></v-checkbox>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                v-model="location.from"
                label="From"
                variant="outlined"
                :items="time"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="location.to"
                label="To"
                variant="outlined"
                :items="time"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="location.timeslot"
                label="Time slot"
                variant="outlined"
                :rules="[rules.required]"
                :items="[
                  { text: '15 minutes', value: 15 },
                  { text: '30 minutes', value: 30 },
                  { text: '45 minutes', value: 45 },
                  { text: '1 Hour', value: 60 },
                ]"
                item-title="text"
                item-value="value"
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
    <v-container style="max-width: 100%">
      <v-row>
        <v-col cols="12" class="text-end">
          <v-btn
            className="saaro-btn"
            type="submit"
            color="#8f6cb4"
            @click="onSubmit"
            large
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

  <!-- Delete Confirmation Modal -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <p>Are you sure you want to delete this image?</p>
      <div class="modal-actions">
        <button class="btn btn-danger" @click="deleteImage">Yes, Delete</button>
        <button class="btn btn-cancel" @click="cancelDelete">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkAuth } from "@/lib/utils/utils";
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";
import { VFileUpload } from "vuetify/labs/VFileUpload";
export default {
  data() {
    return {
      showModal: false,
      imageToDelete: null,
      images: [],
      profileImage: null,
      galleryImages: [],
      form: {
        introduction: "",
        happyClients: 0,
        experience: 0,
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
  computed: {
    sortedImages() {
      return [...this.images].sort((a, b) => {
        if (a.type === "profilePhoto" && b.type !== "profilePhoto") return -1;
        if (b.type === "profilePhoto" && a.type !== "profilePhoto") return 1;
        return 0;
      });
    },
  },
  methods: {
    confirmDelete(img) {
      this.imageToDelete = img;
      this.showModal = true;
    },
    cancelDelete() {
      this.showModal = false;
      this.imageToDelete = null;
    },
    async deleteImage() {
      if (this.imageToDelete) {
        const res = await useProfileStore().deleteImage(this.imageToDelete);
        this.images = res.images;
        this.cancelDelete();
      }
    },
    handleGalleryChange(newFiles) {
      const combined = [...this.galleryImages, ...newFiles];

      const uniqueFiles = Array.from(
        new Map(combined.map((file) => [file.name, file])).values()
      ).slice(0, 6);

      this.galleryImages = uniqueFiles || [];
    },
    handleProfileChange(newFile) {
      this.profileImage = newFile;
    },
    async fetchProfileData() {
      const res = await useProfileStore().getDoctoreProfileApiCall();

      if (res.doctorProfile !== null) {
        this.images = res.doctorProfile.images;
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
        const formData = new FormData();
        const { delay, from, to, ...restForm } = this.form;
        const data = {
          ...restForm,
          unavailabilityDate: {
            from: this.form.from,
            to: this.form.to,
          },
          availabilityAfter: this.form.delay === null ? 0 : this.form.delay,
        };
        data.locations = data.locations.filter((location) => {
          return location.name;
        });
        if (this.profileImage) {
          formData.append("profilePhoto", this.profileImage);
        }

        this.galleryImages.forEach((file, index) => {
          formData.append("galleryImages", file);
        });
        formData.append("introduction", this.form.introduction);
        formData.append("happyClients", parseInt(this.form.happyClients));
        formData.append("experience", parseInt(this.form.experience));
        formData.append("about", this.form.about);
        formData.append("locations", JSON.stringify(data.locations));
        formData.append(
          "unavailabilityDate",
          JSON.stringify(data.unavailabilityDate)
        );
        formData.append("availabilityAfter", data.availabilityAfter);

        const res = await useProfileStore().addDoctoreProfileApiCall(formData);

        if (res) {
          this.profileImage = null;
          this.galleryImages = [];
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
<style scoped>
.image-gallery {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-inline: 1em;
  margin-top: 2em;
  width: 100%;
  margin-bottom: 2em;
}

.image-card {
  position: relative;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 5px 5px 10px #eee;
  border-radius: 10px 10px;
  padding-bottom: 10px;
  transition-duration: 200ms;
}

:hover.image-card {
  box-shadow: 5px 5px 10px #ddd;
}

.image-container {
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  border-radius: 10px 10px 0px 0px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

.delete-button {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.image-container:hover .delete-button {
  opacity: 1;
}
.image-type {
  text-align: center;
  margin-top: 0.5rem;
  font-weight: bold;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 300px;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.modal-actions button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.btn {
  padding: 0.5rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-weight: 500;
}
.btn-danger {
  background-color: #e53935;
  color: white;
}
.btn-danger:hover {
  background-color: #d32f2f;
  transform: scale(1.03);
}
.btn-danger:active {
  transform: scale(0.98);
  background-color: #b71c1c;
}
.btn-cancel {
  background-color: #f1f1f1;
  color: #333;
}
.btn-cancel:hover {
  background-color: #e0e0e0;
  transform: scale(1.03);
}
.btn-cancel:active {
  transform: scale(0.98);
  background-color: #ccc;
}
</style>
