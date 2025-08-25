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
  <v-col cols="12" sm="4">
    <v-select
      v-model="form.gender"
      ref="genderRef"
      :items="['Male', 'Female', 'Other']"
      label="Gender"
      :rules="[rules.required]"
      variant="outlined"
      dense
    />
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

        <v-card class="section-card">
  <v-toolbar
    flat
    class="mb-4"
    style="column-gap: 20px; padding: 0px 20px"
  >
    <v-toolbar-title class="ml-3">Specializations</v-toolbar-title>
  </v-toolbar>

  <div style="padding: 20px">
    <v-select
      v-model="form.specializations"
      :items="specializationsList"
      label="Select Specializations"
      multiple
      chips
      clearable
      variant="outlined"
      dense
    ></v-select>
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
  <v-dialog v-model="mapDialog" max-width="900">
    <v-card>
      <v-card-title>Select Location</v-card-title>
      <v-card-text>
  <!-- Search + Suggestions Wrapper -->
  <div style="position: relative; width: 100%; margin-bottom: 10px;">
  <!-- Search Box -->
  <input
    v-model="query"
    id="pac-input"
    type="text"
    placeholder="Search for a place"
    style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px;"
    @input="debounceAutocomplete($event.target.value)"
  />

  <!-- Suggestions -->
  <div
    id="suggestions"
    v-show="suggestions.length > 0"
    style="position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; background-color: white; border: 1px solid #ccc; border-radius: 8px; max-height: 200px; overflow-y: auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
  >
    <div
      v-for="suggestion in suggestions"
      :key="suggestion.placePrediction.placeId"
      @click="handleSuggestionClick(suggestion)"
      style="padding: 10px; cursor: pointer; border-bottom: 1px solid #eee;"
    >
      {{ suggestion.placePrediction.text.text }}
    </div>
  </div>
</div>

<!-- Map -->
<div id="map" style="height: 400px; width: 100%; border-radius: 8px;"></div>
</v-card-text>


      <v-card-actions>
        <v-spacer />
        <v-btn text @click="mapDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="confirmLocation" :disabled="!selectedLatLng">Confirm</v-btn>
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
        specializations: [],
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
        gender: "",
      },
      mapDialog: false,
      map: null,
      marker: null,
      selectedLatLng: null,
      query: '',
      userLocation: { latitude: 28.6139, longitude: 77.2090 },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      specializationsList: [
        "ICU Care",
        "Elderly Care",
        "Pediatric",
        "Post-operative",
        "COVID Care",
      ],

      itemDialog: false,
      itemType: "",
      newItemText: "",
      signIn: true,
      isShowMessage: false,
      galleryImages: [],
      profileImage: null,
      images: [],
      debounceTimeout: null,
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
  this.selectedLatLng = null;
  this.marker = null;
  this.query = '';
  this.suggestions = [];

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          this.initMap();
        },
        (err) => {
          console.warn("Geolocation failed, using fallback:", err);
          this.userLocation = { latitude: 28.6139, longitude: 77.2090 }; // fallback
          this.initMap();
        }
      );
    } else {
      console.warn("Geolocation not supported, using fallback");
      this.userLocation = { latitude: 28.6139, longitude: 77.2090 };
      this.initMap();
    }
},

initMap() {
      this.$nextTick(() => {
        setTimeout(() => {
          const mapEl = document.getElementById('map');
          if (!mapEl) {
            console.error('Map element not found');
            return;
          }
          this.map = new google.maps.Map(mapEl, {
            center: { lat: this.userLocation.latitude, lng: this.userLocation.longitude },
            zoom: 12,
          });

          const userMarker = new google.maps.Marker({
          position: { lat: this.userLocation.latitude, lng: this.userLocation.longitude },
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          },
        });

        // Optional accuracy circle
        new google.maps.Circle({
          map: this.map,
          center: userMarker.getPosition(),
          radius: 50, // meters
          fillColor: '#4285F4',
          fillOpacity: 0.2,
          strokeColor: '#4285F4',
          strokeOpacity: 0.4,
        });


          this.map.addListener('bounds_changed', () => {
            const bounds = this.map.getBounds();
            if (bounds) {
              const center = bounds.getCenter();
              this.userLocation = { latitude: center.lat(), longitude: center.lng() };
            }
          });

          this.map.addListener('click', (e) => {
            if (this.marker) this.marker.setMap(null);
            this.selectedLatLng = e.latLng;
            this.marker = new google.maps.Marker({
              position: e.latLng,
              map: this.map,
            });
          });
        }, 100);
      });
    },
    debounceAutocomplete() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => this.performAutocomplete(), 300);
    },
    async performAutocomplete() {
      const currentQuery = this.query.trim();
      this.suggestions = []; 
      const suggestionsDiv = document.getElementById('suggestions');
      if (suggestionsDiv) suggestionsDiv.style.display = 'none';

      if (!currentQuery) {
        return;
      }

      console.log('Performing autocomplete for query:', currentQuery, 'Location:', this.userLocation);
      try {
        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyD6NwRkzn0wT0sxUyy8M0SyydK1bNi-IK8',
          },
          body: JSON.stringify({
            input: currentQuery,
            locationBias: {
              circle: {
                center: {
                  latitude: this.userLocation.latitude,
                  longitude: this.userLocation.longitude,
                },
                radius: 50000, // 50km radius
              },
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Autocomplete error:', errorText, 'Status:', response.status);
          return;
        }

        const data = await response.json();
        console.log('Autocomplete response:', data);
        this.suggestions = data.suggestions || [];
        if (suggestionsDiv) suggestionsDiv.style.display = this.suggestions.length ? 'block' : 'none';
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },
    handleSuggestionClick(suggestion) {
  if (!suggestion || !suggestion.placePrediction?.placeId) return;

  const placeId = suggestion.placePrediction.placeId;

  // Fill search box with the selected suggestion text
  this.query = suggestion.placePrediction.text.text;

  // Fetch details for the selected place
  this.fetchPlaceDetails(placeId);

  // Clear only suggestions dropdown (keep the input)
  this.suggestions = [];
  const suggestionsDiv = document.getElementById('suggestions');
  if (suggestionsDiv) suggestionsDiv.style.display = 'none';
},
    async fetchPlaceDetails(placeId) {
      try {
        const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyD6NwRkzn0wT0sxUyy8M0SyydK1bNi-IK8', // Replace with your key
            'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,userRatingCount,primaryType',
          },
        });

        if (!response.ok) {
          console.error('Place Details error:', await response.text());
          return;
        }

        const place = await response.json();
        if (this.marker) this.marker.setMap(null);
        this.selectedLatLng = { lat: place.location.latitude, lng: place.location.longitude };
        this.marker = new google.maps.Marker({
          map: this.map,
          position: this.selectedLatLng,
        });

        this.map.panTo(this.selectedLatLng);
        this.map.setZoom(15);

        this.map.addListener("click", (e) => {
            if (this.marker) this.marker.setMap(null);
            this.selectedLatLng = e.latLng;
            this.marker = new google.maps.Marker({
              position: e.latLng,
              map: this.map,
            });
          });
      } catch (error) {
        console.error('Place Details fetch error:', error);
      }
    },
    async confirmLocation() {
  if (!this.selectedLatLng) return;

  let lat, lng;

  // Google Maps LatLng object
  if (typeof this.selectedLatLng.toJSON === "function") {
    const coords = this.selectedLatLng.toJSON();
    lat = coords.lat;
    lng = coords.lng;
  } 
  // Plain object (from suggestions)
  else if (
    this.selectedLatLng.lat !== undefined &&
    this.selectedLatLng.lng !== undefined
  ) {
    lat = this.selectedLatLng.lat;
    lng = this.selectedLatLng.lng;
  } 
  else {
    console.error("Invalid selectedLatLng:", this.selectedLatLng);
    return;
  }

  const geocoder = new google.maps.Geocoder();

  try {
    const results = await new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (res, status) => {
        if (status === "OK" && res && res.length > 0) {
          resolve(res);
        } else {
          reject(new Error("Geocoding failed: " + status));
        }
      });
    });

    const result = results[0];
    console.log(result);

    this.form.address = result.formatted_address || "";
    this.form.city = "";
    this.form.state = "";
    this.form.pincode = "";
    this.form.locality = "";

    for (const comp of result.address_components || []) {
      if (comp.types.includes("sublocality_level_1") || comp.types.includes("neighborhood"))
        this.form.locality = comp.long_name;
      if (comp.types.includes("locality")) this.form.city = comp.long_name;
      if (!this.form.city && comp.types.includes("administrative_area_level_2"))
        this.form.city = comp.long_name;
      if (comp.types.includes("administrative_area_level_1")) this.form.state = comp.long_name;
      if (comp.types.includes("postal_code")) this.form.pincode = comp.long_name;
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
      const hs = res?.healthServeProfileData?.healthServeUser;
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
              type: "galleryImages_image",
            }))
          );
        }
        const hs = res?.healthServeProfileData?.healthServeUser;
        
        this.form.nurseType = profile.nurseType || "";
        this.form.gender = profile.gender || "";
        this.form.rating = profile.rating || "";
        this.form.about = profile.about || "";
        this.form.experience = profile.experience || "";
        // this.form.pincode = hs?.pincode || "";
        this.form.education = profile.education || [];
        this.form.specializations=profile.specializations || [];
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
