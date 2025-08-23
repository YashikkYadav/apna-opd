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
            <v-col>
              <!-- Licensed By -->

              <v-text-field
                v-model="form.licensedBy"
                label="Licensed By"
                dense
                variant="outlined"
                hide-details
                class="m-2 pa-2"
              />

              <!-- Success Rate -->
              <v-text-field
                v-model="form.successRate"
                label="Success Rate"
                dense
                variant="outlined"
                hide-details
                class="m-2 pa-2"
              />
            </v-col>
            <v-col>
              <!-- Couples Treated -->
              <v-text-field
                v-model="form.couplesTreated"
                label="Couples Treated"
                dense
                variant="outlined"
                hide-details
                class="m-2 pa-2 rounded-2"
              />
              <!-- Specialization -->
              <v-text-field
                v-model="form.specialization"
                label="Specialization"
                dense
                variant="outlined"
                hide-details
                class="m-2 pa-2"
              />
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
                <div v-if="img.type === 'profilePhoto_image'" class="image-type">
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
            flatdiv
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

        <v-card>
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Website</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            class="pa-4"
            v-model="form.website"
            label="Website URL"
            type="url"
            placeholder="https://example.com"
          />
        </v-card>

        <!-- Doctors -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Doctors</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addDoctor">+ Add Doctor</v-btn>

          <div
            v-for="(doctor, index) in form.doctors"
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
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="form.doctors[index].name"
                    label="Doctor Name"
                    dense
                    outlined
                    hide-details
                    class="mb-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="form.doctors[index].specialization"
                    label="Specialization"
                    dense
                    outlined
                    hide-details
                    class="mb-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="form.doctors[index].experience"
                    label="Experience (years)"
                    type="number"
                    dense
                    outlined
                    hide-details
                    class="mb-3"
                  ></v-text-field>
                </v-col>
              </v-row>

              <div class="d-flex justify-end">
                <v-btn icon color="error" @click="removeDoctor(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>

        <!-- tags -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Tags</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addTag">+ Add Tag</v-btn>

          <div
            v-for="(tag, index) in form.tags"
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
                v-model="form.tags[index]"
                label="Tag"
                dense
                outlined
                hide-details
                class="mb-3"
              ></v-text-field>

              <div class="d-flex justify-end">
                <v-btn icon color="error" @click="removeTag(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>

        <!-- Degrees -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Why Choose Us</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-4" @click="addWhyChoose">+ Add Reason</v-btn>
          <div
            v-for="(item, index) in form.whyChoose"
            :key="index"
            class="mb-4 pa-4"
            style="border: 1px solid #ddd; border-radius: 8px"
          >
            <v-text-field
              v-model="item.title"
              label="Title"
              dense
              outlined
              class="mb-3"
            />
            <v-textarea
              v-model="item.description"
              label="Description"
              dense
              outlined
              auto-grow
              class="mb-3"
            />
            <div class="d-flex justify-end">
              <v-btn icon color="error" @click="removeWhyChoose(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Degrees</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-4" @click="addDegree">+ Add Degree</v-btn>
          <div
            v-for="(degree, index) in form.degrees"
            :key="index"
            class="mb-4 pa-4"
            style="border: 1px solid #ddd; border-radius: 8px"
          >
            <v-text-field
              v-model="degree.title"
              label="Degree Name"
              dense
              outlined
              class="mb-3"
            />
            <v-text-field
              v-model="degree.institution"
              label="Institution"
              dense
              outlined
              class="mb-3"
            />
            <div class="d-flex justify-end">
              <v-btn icon color="error" @click="removeDegree(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">FAQs</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-4" @click="addFAQ">+ Add FAQ</v-btn>
          <div
            v-for="(faq, index) in form.faqs"
            :key="index"
            class="mb-4 pa-4"
            style="border: 1px solid #ddd; border-radius: 8px"
          >
            <v-text-field
              v-model="faq.question"
              label="Question"
              dense
              outlined
              class="mb-3"
            />
            <v-textarea
              v-model="faq.answer"
              label="Answer"
              dense
              outlined
              auto-grow
              class="mb-3"
            />
            <div class="d-flex justify-end">
              <v-btn icon color="error" @click="removeFAQ(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Services</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-4" @click="addService">+ Add Service</v-btn>
          <div
            v-for="(service, index) in form.services"
            :key="index"
            class="mb-4 pa-4"
            style="border: 1px solid #ddd; border-radius: 8px"
          >
            <v-text-field
              v-model="service.name"
              label="Service Name"
              dense
              outlined
              class="mb-3"
            />
            <div class="d-flex justify-end">
              <v-btn icon color="error" @click="removeService(index)">
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
        website: "",
        introduction: "",
        experience: null,
        about: "",
        address: "",
        locality: "",
        city: "",
        pincode: null,
        state: "",
        tags: [""],
        licensedBy: "",
        successRate: "",
        specialization: "",
        couplesTreated: "",
        whyChoose: [],
        degrees: [],
        faqs: [],
        services: [],
        testimonials: [],
        doctors: [],
        googleMapLink: "",
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

      return [...this.images].sort((a, b) => {
        if (a.type === "profilePhoto_image" && b.type !== "profilePhoto_image") return -1;
        if (b.type === "profilePhoto_image" && a.type !== "profilePhoto_image") return 1;
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
    addWhyChoose() {
      this.form.whyChoose.push({ title: "", description: "" });
    },
    removeWhyChoose(index) {
      this.form.whyChoose.splice(index, 1);
    },
    addTag() {
      this.form.tags.push("");
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
    addDegree() {
      this.form.degrees.push({ title: "", institution: "" });
    },
    removeDegree(index) {
      this.form.degrees.splice(index, 1);
    },

    addFAQ() {
      this.form.faqs.push({ question: "", answer: "" });
    },
    removeFAQ(index) {
      this.form.faqs.splice(index, 1);
    },

    addService() {
      this.form.services.push({ name: "" });
    },
    removeService(index) {
      this.form.services.splice(index, 1);
    },
    addDoctor() {
      this.form.doctors.push({ name: "", specialization: "", experience: "" });
    },
    removeDoctor(index) {
      this.form.doctors.splice(index, 1);
    },
    getImageUrl(img) {
      if (!img) return "";
      // If img is a string (new upload), use Vite env
      if (typeof img === "string") {
        return `${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${img}`;
      }
      // If img has a path property, use Vite env
      if (img.path)
        return `${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${img.path}`;
      // If img is a File object (new upload)
      if (img instanceof File) return URL.createObjectURL(img);
      return "";
    },
    isNotFive(type) {
      return (
        type != "insurance" &&
        type != "payments" &&
        type != "healthPackages" &&
        type != "specialServices"
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
        this.snackbar = {
          message: `"${oversized.name}" exceeds 20MB limit`,
          color: "warning",
          show: true,
          timeout: 4000,
        };
        this.galleryImages = [];
        return;
      }
    },

    handleProfileChange(newFile) {
      this.profileImage = newFile;
    },
    async fetchProfileData() {
      const res = await useProfileStore().getProfileData();
      const profile = await res.healthServeProfileData.healthServeProfile;
      const hs = await res?.healthServeProfileData?.healthServeUser;
      console.log(res);
      if (hs) {
        this.form.address = hs?.address || "";
        this.form.city = hs?.city || "";
        this.form.locality = hs?.locality || "";
        this.form.state = hs?.state || "";
        this.form.pincode = hs?.pincode || profile?.pincode || "";
      }

      if (profile) {
        // Map images for gallery and profile, matching hospital reference
        this.images = [];
        if (profile.profilePhoto) {
          this.images.push({
            path: profile.profilePhoto,
            type: "profilePhoto_image",
          });
        }
        if (Array.isArray(profile.galleryImages)) {
          this.images = this.images.concat(
            profile.galleryImages.map((img) => ({
              path: img.path || img,
              type: "galleryImages",
            }))
          );
        }
        this.form.website = profile.website || "";
        const hs = profile.healthServeId;
        this.form.website = profile.website || "";
        this.form.introduction = profile.introduction || "";
        this.form.about = profile.about || "";
        this.form.experience = profile.experience || "";
        // this.form.pincode=profile.pincode || "";
        this.form.licensedBy = profile.licensedBy || "";
        this.form.successRate = profile.successRate || "";
        this.form.specialization = profile.specialization || "";
        this.form.couplesTreated = profile.couplesTreated || "";
        this.form.whyChoose = profile.whyChoose || [];
        this.form.degrees = profile.degrees || [];
        this.form.faqs = profile.faqs || [];
        this.form.services =
          profile.services.map((item) => ({ name: item })) || [];
        this.form.testimonials = profile.testimonials || [];
        this.form.doctors = profile.doctors || [];
        this.form.tags = profile.tags || [];
      }
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const formData = new FormData();
        formData.append("website", this.form.website);
        formData.append("about", this.form.about);
        formData.append("experience", this.form.experience);
        formData.append("introduction", this.form.introduction);
        formData.append("address", this.form.address);
        formData.append("locality", this.form.locality);
        formData.append("city", this.form.city);
        formData.append("pincode", this.form.pincode);
        formData.append("state", this.form.state);
        formData.append("licensedBy", this.form.licensedBy);
        formData.append("successRate", this.form.successRate);
        formData.append("specialization", this.form.specialization);
        formData.append("couplesTreated", this.form.couplesTreated);

        formData.append("whyChoose", JSON.stringify(this.form.whyChoose));
        formData.append("degrees", JSON.stringify(this.form.degrees));
        formData.append("faqs", JSON.stringify(this.form.faqs));
        formData.append("services", JSON.stringify(this.form.services));
        formData.append("testimonials", JSON.stringify(this.form.testimonials));
        formData.append("doctors", JSON.stringify(this.form.doctors));
        formData.append("tags", JSON.stringify(this.form.tags));

        if (this.profileImage) {
          formData.append("profilePhoto_image", this.profileImage);
        }

        this.galleryImages.forEach((file, index) => {
          formData.append("galleryImages_image", file);
        });
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

onMounted(() => {
  this.fetchProfileData();
});
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
