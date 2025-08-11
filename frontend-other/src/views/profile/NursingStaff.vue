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
              <v-text-field
                v-model="form.nurseType"
                ref="nurseTypeRef"
                label="Nurse Type"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-text-field>
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
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.rating"
                ref="ratingRef"
                type="number"
                label="Nurse Rating"
                :rules="[rules.required]"
                :min="1"
                :max="5"
                step="0.1"
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
          <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
          >
            {{ snackbar.message }}
            <template #actions>
              <v-btn text @click="snackbar.show = false">Close</v-btn>
            </template>
          </v-snackbar>
          <v-row>
            <div class="image-gallery">
              <div
                v-for="(img, index) in sortedImages"
                :key="index"
                class="image-card"
              >
                <div class="image-container">
                  <img
                    :key="index"
                    :src="getImageUrl(img)"
                    alt="Gallery Image"
                    class="image"
                  />
                  <button class="delete-button" @click="confirmDelete(img)">
                    ✖
                  </button>
                </div>
                <div
                  v-if="img.type === 'profilePhoto_image'"
                  class="image-type"
                >
                  {{ "Profile" }}
                </div>
                <div
                  v-if="img.type === 'galleryImages_image'"
                  class="image-type"
                >
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
            <v-toolbar-title class="ml-3">Address</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.address"
                label="Address"
                :rules="[rules.required]"
                variant="outlined"
                dense
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.locality"
                label="Locality"
                :rules="[rules.required]"
                variant="outlined"
                dense
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.city"
                label="City"
                :rules="[rules.required]"
                variant="outlined"
                dense
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.state"
                label="State"
                :rules="[rules.required]"
                variant="outlined"
                dense
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.pincode"
                label="Pincode"
                :rules="[rules.required]"
                variant="outlined"
                dense
              />
            </v-col>
            <v-col cols="12" class="text-end">
              <v-btn color="primary" @click="openMapDialog">
                Select Location on Map
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- tags -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Happy Clients</v-toolbar-title>
          </v-toolbar>

          <v-text-field
            v-model="form.clients"
            label="No. of Happy Clients"
            dense
            outlined
            hide-details
            class="mb-3 mx-4"
          ></v-text-field>

          <!-- No delete button needed for clients, as it's not an array -->
        </v-card>

        <v-card>
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Working At</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            class="pa-4"
            v-model="form.workingAt"
            label="Hospital"
            type="text"
            placeholder=""
          />
        </v-card>

        <!-- EDUCATION -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Education</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-2" @click="addEducation">+ Add Education</v-btn>
          <div
            v-for="(edu, index) in form.education"
            :key="index"
            class="mb-4"
            style="padding: 20px"
          >
            <div
              class="pa-4"
              style="
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-bottom: 16px;
              "
            >
              <v-text-field
                v-model="edu.degree"
                label="Degree"
                dense
                outlined
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="edu.institution"
                label="Institution"
                dense
                outlined
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="edu.year"
                label="Year"
                dense
                outlined
                class="mb-3"
              ></v-text-field>
              <div class="d-flex justify-end">
                <v-btn icon color="error" @click="removeEducation(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>

        <!-- Avalavility & charges -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Avalavility & Charges</v-toolbar-title>
          </v-toolbar>

          <div
            style="
              border: 1px solid #ddd;
              border-radius: 8px;
              margin-bottom: 16px;
              margin: 16px;
              padding: 16px;
            "
          >
            <v-text-field
              v-model.number="form.perVisitCharges"
              label="Per Visit Charges"
              type="number"
              dense
              outlined
              hide-details
              class="mb-7"
            ></v-text-field>
            <v-text-field
              v-model="form.areaCovered"
              label="Area covered"
              dense
              outlined
              hide-details
              class="mb-7"
            ></v-text-field>
            <v-select
              v-model="form.shiftFlexibility"
              :items="['Yes', 'No']"
              label="Shift Flexibility"
              dense
              outlined
              hide-details
              class="mb-7"
            ></v-select>
            <v-select
              v-model="form.bookingType"
              :items="['Home Visit', 'Hospital Duty', 'Both']"
              label="Booking Type"
              dense
              outlined
              hide-details
              class="mb-7"
            ></v-select>
            <v-row class="mb-7">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.workingHours"
                  label="Working Hours (e.g. 9:00 AM - 6:00 PM)"
                  dense
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.workingDays"
                  :items="[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ]"
                  label="Working Days"
                  multiple
                  dense
                  outlined
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <!-- Remove button not needed for this section -->
          </div>
        </v-card>

        <!-- SERVICE PROVIDED -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Service Provided</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addServices">+ Add Service</v-btn>

          <div
            v-for="(interest, index) in form.services"
            :key="index"
            class="mb-4 px-4"
          >
            <v-text-field
              v-model="form.services[index]"
              label="Service"
              dense
              outlined
              hide-details
            ></v-text-field>
            <div class="d-flex justify-end pa-2">
              <v-btn icon color="error" @click="removeSpecialInterest(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <!-- CERTIFICATIONS -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Certifications</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addCertification"
            >+ Add Certificate</v-btn
          >

          <div
            v-for="(cert, index) in form.certifications"
            :key="index"
            class="mb-4 px-4"
          >
            <v-text-field
              v-model="form.certifications[index]"
              label="Certification"
              dense
              outlined
              hide-details
            ></v-text-field>
            <div class="d-flex justify-end pa-2">
              <v-btn icon color="error" @click="removeCertification(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <!-- LANGUAGES -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Languages Spoken</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addLanguage">+ Add Lang</v-btn>

          <div
            v-for="(lang, index) in form.languages"
            :key="index"
            class="mb-4 px-4"
          >
            <v-text-field
              v-model="form.languages[index]"
              label="Language"
              dense
              outlined
              hide-details
            ></v-text-field>
            <div class="d-flex justify-end pa-2">
              <v-btn icon color="error" @click="removeLanguage(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <v-card class="section-card mt-6">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">FAQs</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-6" @click="addFAQ">+ Add FAQ</v-btn>
          <div
            v-for="(faq, i) in form.faqs"
            :key="i"
            class="mb-6 pa-4"
            style="border: 1px solid #ddd; border-radius: 8px"
          >
            <v-text-field
              v-model="faq.question"
              label="Question"
              dense
              outlined
              hide-details
              class="mb-3"
            />
            <v-textarea
              v-model="faq.answer"
              label="Answer"
              dense
              outlined
              auto-grow
              hide-details
              class="mb-3"
            />
            <div class="d-flex justify-end">
              <v-btn icon color="error" @click="removeFAQ(i)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <!-- Testimonials -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Testimonials</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-2" @click="addTestimonial">+ Add Testimonial</v-btn>
          <div
            v-for="(testimonial, index) in form.testimonials"
            :key="index"
            class="mb-4"
            style="padding: 20px"
          >
            <div
              class="pa-4"
              style="
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-bottom: 16px;
              "
            >
              <v-rating
                v-model="testimonial.rating"
                label="Rating"
                dense
                background-color="grey lighten-2"
                color="primary"
                class="mb-3"
              ></v-rating>

              <v-text-field
                v-model="testimonial.title"
                label="Title"
                dense
                outlined
                hide-details
                class="mb-3"
              ></v-text-field>

              <v-textarea
                v-model="testimonial.text"
                label="Text"
                dense
                outlined
                auto-grow
                hide-details
                class="mb-3"
              ></v-textarea>

              <v-text-field
                v-model="testimonial.author"
                label="Author"
                dense
                outlined
                hide-details
                class="mb-3"
              ></v-text-field>

              <div class="d-flex justify-end">
                <v-btn icon color="error" @click="removeTestimonial(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
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

  <v-dialog v-model="itemDialog" max-width="500">
    <v-card style="padding: 20px">
      <v-card-title class="text-h6">Add New {{ itemType }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="newItemText"
          label="Enter value"
          variant="outlined"
          dense
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="itemDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="addItemFromDialog">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
  <v-dialog v-model="mapDialog" max-width="800">
    <v-card>
      <v-card-title>Select Location</v-card-title>
      <v-card-text>
        <div id="map" style="height: 400px; width: 100%"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="mapDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="confirmLocation">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { checkAuth } from "@/lib/utils/utils";
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";
import { onMounted } from "vue";
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { reactive } from "vue";
const snackbar = reactive({
  show: false,
  message: "",
  color: "warning",
  timeout: 4000,
});
export default {
  data() {
    return {
      showModal: false,
      imageToDelete: null,
      snackbar: {
        show: false,
        message: "",
        color: "warning",
        timeout: 4000,
      },
      form: {
        nurseType: "",
        rating: null,
        experience: null,
        faqs: [],
        about: "",
        workingAt: "",
        address: "",
        locality: "",
        city: "",
        pincode: null,
        clients: "",
        state: "",
        education: [{ degree: "", institution: "", year: "" }],
        services: [],
        certifications: [],
        languages: [],
        testimonials: [],
        googleMapLink: "",
        perVisitCharges: null,
        areaCovered: "",
        shiftFlexibility: "",
        bookingType: "",
        workingHours: "",
        workingDays: [],
      },
      mapDialog: false,
      map: null,
      marker: null,
      selectedLatLng: null,
      rules: {
        required: (value) => !!value || "This field is required.",
      },

      itemDialog: false,
      itemType: "",
      newItemText: "",
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
  computed: {
    sortedImages() {
      if (!Array.isArray(this.images)) return [];
      // Sort: profilePhoto_image first, then galleryImages_image
      return [...this.images].sort((a, b) => {
        if (a.type === "profilePhoto_image" && b.type !== "profilePhoto_image")
          return -1;
        if (b.type === "profilePhoto_image" && a.type !== "profilePhoto_image")
          return 1;
        return 0;
      });
    },
  },
  methods: {
    openMapDialog() {
      this.mapDialog = true;
      this.$nextTick(() => {
        if (!this.map) {
          const mapEl = document.getElementById("map");
          this.map = new google.maps.Map(mapEl, {
            center: { lat: 28.6139, lng: 77.209 }, // default: Delhi
            zoom: 12,
          });

          this.map.addListener("click", (e) => {
            if (this.marker) this.marker.setMap(null);
            this.selectedLatLng = e.latLng;
            this.marker = new google.maps.Marker({
              position: e.latLng,
              map: this.map,
            });
          });
        }
      });
    },
    async confirmLocation() {
      if (!this.selectedLatLng) return;

      const geocoder = new google.maps.Geocoder();
      const { lat, lng } = this.selectedLatLng.toJSON();

      try {
        const response = await geocoder.geocode({ location: { lat, lng } });
        const result = response.results[0];
        this.form.address = result.formatted_address;

        for (const comp of result.address_components) {
          if (comp.types.includes("locality")) this.form.city = comp.long_name;
          if (comp.types.includes("administrative_area_level_1"))
            this.form.state = comp.long_name;
          if (comp.types.includes("postal_code"))
            this.form.pincode = comp.long_name;
        }

        this.form.googleMapLink = `https://maps.google.com/?q=${lat},${lng}`;
      } catch (err) {
        console.error("Geocoding failed", err);
      }

      this.mapDialog = false;
    },
    addItem(field) {
      if (this.form[field].length >= 5) return;
      const newItem = prompt(`Add new item to ${field}`);
      if (newItem) this.form[field].push(newItem);
    },
    removeItem(field, index) {
      this.form[field].splice(index, 1);
    },
    addTestimonial() {
      if (this.form.testimonials.length >= 5) return;
      this.form.testimonials.push({
        rating: 0,
        title: "",
        text: "",
        author: "",
        context: "",
      });
    },
    removeTestimonial(index) {
      this.form.testimonials.splice(index, 1);
    },
    addEducation() {
      this.form.education.push({ degree: "", institution: "", year: "" });
    },
    removeEducation(index) {
      this.form.education.splice(index, 1);
    },
    addFAQ() {
      this.form.faqs.push({ question: "", answer: "" });
    },
    removeFAQ(i) {
      this.form.faqs.splice(i, 1);
    },

    // Special Interests
    addServices() {
      this.form.services.push("");
    },
    removeSpecialInterest(i) {
      this.form.services.splice(i, 1);
    },

    // Certifications
    addCertification() {
      this.form.certifications.push("");
    },
    removeCertification(i) {
      this.form.certifications.splice(i, 1);
    },

    // Languages
    addLanguage() {
      this.form.languages.push("");
    },
    removeLanguage(i) {
      this.form.languages.splice(i, 1);
    },

    getImageUrl(img) {
      if (!img) return "";
      // If img is a string (new upload), return object URL
      if (typeof img === "string") {
        return `http://localhost:3001/public/${img}`;
      }
      // If img has a url property (from backend), use it
      if (img.url) return img.url;
      // If img has a path property, use it
      if (img.path) return `http://localhost:3001/public/${img.path}`;
      // If img is a File object (new upload)
      if (img instanceof File) return URL.createObjectURL(img);
      return "";
    },

    isNotFive(type) {
      return (
        type != "insurance" &&
        type != "payments" &&
        type != "healthPackages" &&
        type != "services"
      );
    },
    openItemDialog(type) {
      if (
        (this.form[type].length >= 5 && this.isNotFive(type)) ||
        this.form[type].length >= 7
      )
        return;
      this.itemType = type;
      this.newItemText = "";
      this.itemDialog = true;
    },
    addItemFromDialog() {
      if (this.newItemText.trim()) {
        this.form[this.itemType].push(this.newItemText.trim());
      }
      this.itemDialog = false;
    },
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
      const oversized = uniqueFiles.find(
        (file) => file.size > 20 * 1024 * 1024
      );
      this.galleryImages = uniqueFiles;
      if (oversized) {
        this.snackbar.message = `"${oversized.name}" exceeds 20MB limit`;
        this.snackbar.color = "warning";
        this.snackbar.show = true;
        this.snackbar.timeout = 4000;
        this.galleryImages = [];
        return;
      }
    },

    handleProfileChange(newFile) {
      this.profileImage = newFile;
    },
    async fetchProfileData() {
      const res = await useProfileStore().getProfileData();
      const profile = res?.healthServeProfileData?.healthServeProfile?.data;
      if (profile) {
        this.images = [
          ...(profile.profilePhoto_image
            ? [{ ...profile.profilePhoto_image, type: "profilePhoto_image" }]
            : []),
          ...(profile.galleryImages || []).map((img) => ({
            ...img,
            type: "galleryImages_image",
          })),
        ];
        const hs = res?.healthServeProfileData?.healthServeUser;
        this.form.nurseType = profile.nurseType || "";
        this.form.rating = profile.rating || "";
        this.form.about = profile.about || "";
        this.form.experience = profile.experience || "";
        this.form.address = hs?.address || "";
        this.form.city = hs?.city || "";
        this.form.locality = hs?.locality || "";
        this.form.state = hs?.state || "";
        this.form.pincode = hs?.pincode || "";
        this.form.education = profile.education || [];
        this.form.services = profile.services || [];
        this.form.certifications = profile.certifications || [];
        this.form.languages = profile.languages || [];
        this.form.testimonials = profile.testimonials || [];
        this.form.faqs = profile.faqs || [];
        this.form.workingDays = profile.workingDays || [];
        this.form.clients = profile.clients || "";
        this.form.workingAt = profile.workingAt || "";
        this.form.perVisitCharges = profile.perVisitCharges || "";
        this.form.areaCovered = profile.areaCovered || "";
        this.form.shiftFlexibility = profile.shiftFlexibility || "";
        this.form.bookingType = profile.bookingType || "";
        this.form.workingHours = profile.workingHours || "";
      }
      console.log(res);
      console.log(profile);
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        // Log every detail of the form object
        console.log("Form details:", this.form);

        const formData = new FormData();
        // Dynamically append all fields in form
        Object.keys(this.form).forEach((key) => {
          let value = this.form[key];
          // If value is array or object, stringify it
          if (
            Array.isArray(value) ||
            (typeof value === "object" && value !== null)
          ) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value == null ? "" : value);
          }
        });
        // Handle profile image and gallery images
        if (this.profileImage) {
          formData.append("profilePhoto_image", this.profileImage);
        }
        this.galleryImages.forEach((file) => {
          formData.append("galleryImages_image", file);
        });
        // Log all FormData entries
        for (let pair of formData.entries()) {
          console.log(pair[0] + ":", pair[1]);
        }
        const res = await useProfileStore().addProfileData(formData);
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
    // ...existing code...

    validateDays(value) {
      if (!value || value.length === 0) {
        return "";
      }
      return true;
    },
  },
};

// Remove invalid onMounted usage (already handled in mounted hook)
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
