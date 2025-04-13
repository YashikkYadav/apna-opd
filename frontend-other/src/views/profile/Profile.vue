<template>
  <v-form @submit.prevent ref="form">
    <v-container class="prescription-page" style="max-width: 100%">
      <div class="profile">
        <v-card class="section-card pb-4">
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
                v-for="(img, index) in images"
                :key="index"
                class="image-card"
              >
                <div class="image-container">
                  <img :src="img.url" :alt="img.filename" class="image" />
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
        experience: null,
        about: "",
      },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      signIn: true,
      isShowMessage: false,
      galleryImages: [],
      profileImage: null,
      images: [],
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchProfileData();
    }
  },
  methods: {
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
      const res = await useProfileStore().getHealthServeApiCall();
      this.images = res.healthServeProfile.images;
      if (res.healthServeProfile !== null) {
        this.form.introduction = res.healthServeProfile.introduction;
        this.form.about = res.healthServeProfile.about;
        this.form.experience = res.healthServeProfile.experience;
      }
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const formData = new FormData();

        formData.append("about", this.form.about);
        formData.append("experience", this.form.experience);
        formData.append("introduction", this.form.introduction);

        if (this.profileImage) {
          formData.append("profilePhoto", this.profileImage);
        }

        this.galleryImages.forEach((file, index) => {
          formData.append("galleryImages", file);
        });

        const res = await useProfileStore().addHealthServeProfileApiCall(
          formData
        );

        if (res) {
          this.fetchProfileData();
          this.profileImage = null;
          this.galleryImages = [];
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
</style>
