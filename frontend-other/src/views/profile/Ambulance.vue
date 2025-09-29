<template>
  <v-form @submit.prevent ref="form">
    <v-container class="prescription-page" style="max-width: 100%">
      <div class="profile">
        <!-- Basic Details -->
        <v-card class="section-card pb-4">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">
              <v-icon class="mr-2">mdi-ambulance</v-icon>
              Basic Details
            </v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="form.introduction"
                ref="introductionRef"
                label="Service Introduction"
                placeholder="Tag line or Introduction"
                :rules="[rules.required]"
                variant="outlined"
                dense
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="form.about"
                ref="aboutRef"
                label="About"
                placeholder="Brief about your ambulance service"
                :rules="[rules.required]"
                variant="outlined"
                dense
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.coverageArea"
                label="Coverage Area"
                placeholder="e.g., within city, intercity, state-wide"
                variant="outlined"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          
          <!-- File Uploads -->
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
                title="Drag and drop gallery images (max: 6)"
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
                    alt="Service Image"
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

        <!-- Service Location -->
        <v-card class="section-card">
          <v-toolbar
            class="mb-4"
            flat
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Service Location</v-toolbar-title>
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

        <!-- Ambulances Section -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">
              <v-icon class="mr-2">mdi-car-emergency</v-icon>
              Ambulances
            </v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-4" color="primary" @click="addAmbulance">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Add Ambulance
          </v-btn>
          
          <div
            v-for="(ambulance, index) in form.ambulances"
            :key="index"
            class="ambulance-card mb-4"
          >
            <div class="d-flex justify-between align-center mb-3">
              <h4>Ambulance {{ index + 1 }}</h4>
              <v-btn 
                icon 
                color="error" 
                size="small" 
                @click="removeAmbulance(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.vehicleNumber"
                  label="Vehicle Number"
                  placeholder="License Plate Number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.registrationNo"
                  label="Registration Number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.insuranceNo"
                  label="Insurance Number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.pollutionCertificateNo"
                  label="Pollution Certificate Number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="ambulance.vehicleType"
                  :items="vehicleTypes"
                  label="Vehicle Type"
                  variant="outlined"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.capacity"
                  label="Patient Capacity"
                  type="number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="ambulance.availabilityStatus"
                  :items="availabilityStatuses"
                  label="Availability Status"
                  variant="outlined"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.responseTime"
                  label="Response Time"
                  type="number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Equipment Selection -->
            <v-row>
              <v-col cols="12">
                <h5 class="mb-2">Medical Equipment</h5>
                <div class="equipment-chips">
                  <v-chip
                    v-for="equipment in equipmentOptions"
                    :key="equipment"
                    :class="{ 'selected': ambulance.equipment.includes(equipment) }"
                    @click="toggleEquipment(index, equipment)"
                    class="equipment-chip"
                  >
                    {{ equipment }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>

            <!-- Charges -->
            <v-row class="mt-3">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.charges.perKmRate"
                  label="Per KM Rate (₹)"
                  variant="outlined"
                  dense
                  prefix="₹"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ambulance.charges.waitingCharge"
                  label="Waiting Charge per Hour (₹)"
                  variant="outlined"
                  dense
                  prefix="₹"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-card>

        <!-- Drivers Section -->
        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">
              <v-icon class="mr-2">mdi-account-hard-hat</v-icon>
              Drivers
            </v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-4" color="primary" @click="addDriver">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Add Driver
          </v-btn>
          
          <div
            v-for="(driver, index) in form.drivers"
            :key="index"
            class="driver-card mb-4"
          >
            <div class="d-flex justify-between align-center mb-3">
              <h4>Driver {{ index + 1 }}</h4>
              <v-btn 
                icon 
                color="error" 
                size="small" 
                @click="removeDriver(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="driver.name"
                  label="Driver Name"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="driver.licenseNumber"
                  label="License Number"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="driver.experience"
                  label="Experience (Years)"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Contact Numbers -->
            <v-row>
              <v-col cols="12">
                <h5 class="mb-2">Contact Numbers</h5>
                <div v-for="(contact, contactIndex) in driver.contactNumbers" :key="contactIndex" class="d-flex mb-2">
                  <v-text-field
                    v-model="driver.contactNumbers[contactIndex]"
                    label="Contact Number"
                    variant="outlined"
                    dense
                    class="flex-grow-1 mr-2"
                  ></v-text-field>
                  <v-btn 
                    icon 
                    color="error" 
                    size="small" 
                    @click="removeContactNumber(index, contactIndex)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
                <v-btn 
                  size="small" 
                  color="primary" 
                  @click="addContactNumber(index)"
                  class="mt-2"
                >
                  <v-icon class="mr-1">mdi-plus</v-icon>
                  Add Contact
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>

        <!-- FAQs -->
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
                label="Testimonial Text"
                dense
                outlined
                auto-grow
                hide-details
                class="mb-3"
              ></v-textarea>

              <v-text-field
                v-model="testimonial.author"
                label="Author Name"
                dense
                outlined
                hide-details
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="testimonial.context"
                label="Context"
                placeholder="e.g., Emergency transport, Inter-city transfer"
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
        introduction: "",
        about: "",
        address: "",
        locality: "",
        city: "",
        pincode: "",
        state: "",
        coverageArea: "",
        ambulances: [],
        drivers: [],
        faqs: [],
        testimonials: [],
        googleMapLink: "",
      },
      vehicleTypes: [
        "Basic Life Support",
        "Advanced Life Support", 
        "ICU",
        "Neonatal",
        "Mortuary"
      ],
      availabilityStatuses: [
        "Available",
        "On Duty", 
        "Offline"
      ],
      equipmentOptions: [
        "Oxygen Cylinder",
        "Ventilator",
        "Cardiac Monitor",
        "First Aid Kit",
        "Suction Machine",
        "Stretcher",
        "Paramedic Available"
      ],
      mapDialog: false,
      map: null,
      marker: null,
      selectedLatLng: null,
      query: '',
      suggestions: [],
      userLocation: { latitude: 28.6139, longitude: 77.2090 },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
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
      return [...this.images].sort((a, b) => {
        if (a.type === "profilePhoto_image" && b.type !== "profilePhoto_image") return -1;
        if (b.type === "profilePhoto_image" && a.type !== "profilePhoto_image") return 1;
        return 0;
      });
    },
  },
  methods: {
    // Ambulance methods
    addAmbulance() {
      this.form.ambulances.push({
        vehicleNumber: "",
        registrationNo: "",
        insuranceNo: "",
        pollutionCertificateNo: "",
        vehicleType: "",
        responseTime:"",
        capacity: 1,
        availabilityStatus: "Available",
        equipment: [],
        charges: {
          perKmRate: "",
          waitingCharge: ""
        }
      });
    },
    removeAmbulance(index) {
      this.form.ambulances.splice(index, 1);
    },
    toggleEquipment(ambulanceIndex, equipment) {
      const ambulance = this.form.ambulances[ambulanceIndex];
      const index = ambulance.equipment.indexOf(equipment);
      if (index > -1) {
        ambulance.equipment.splice(index, 1);
      } else {
        ambulance.equipment.push(equipment);
      }
    },

    // Driver methods
    addDriver() {
      this.form.drivers.push({
        name: "",
        contactNumbers: [""],
        licenseNumber: "",
        experience: ""
      });
    },
    removeDriver(index) {
      this.form.drivers.splice(index, 1);
    },
    addContactNumber(driverIndex) {
      this.form.drivers[driverIndex].contactNumbers.push("");
    },
    removeContactNumber(driverIndex, contactIndex) {
      this.form.drivers[driverIndex].contactNumbers.splice(contactIndex, 1);
    },

    // FAQ methods
    addFAQ() {
      this.form.faqs.push({ question: "", answer: "" });
    },
    removeFAQ(i) {
      this.form.faqs.splice(i, 1);
    },

    // Testimonial methods
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

    // Map methods (keeping existing implementation)
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
              this.userLocation = { latitude: 28.6139, longitude: 77.2090 };
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

        new google.maps.Circle({
          map: this.map,
          center: userMarker.getPosition(),
          radius: 50,
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

      try {
        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.PUBLIC_GOOGLE_MAPS_API_KEY,
          },
          body: JSON.stringify({
            input: currentQuery,
            locationBias: {
              circle: {
                center: {
                  latitude: this.userLocation.latitude,
                  longitude: this.userLocation.longitude,
                },
                radius: 50000,
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
        this.suggestions = data.suggestions || [];
        if (suggestionsDiv) suggestionsDiv.style.display = this.suggestions.length ? 'block' : 'none';
      } catch (error) {
        console.error('Fetch error:', error);
      }
    },

    handleSuggestionClick(suggestion) {
      if (!suggestion || !suggestion.placePrediction?.placeId) return;

      const placeId = suggestion.placePrediction.placeId;
      this.query = suggestion.placePrediction.text.text;
      this.fetchPlaceDetails(placeId);
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
            'X-Goog-Api-Key': process.env.PUBLIC_GOOGLE_MAPS_API_KEY,
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

      if (typeof this.selectedLatLng.toJSON === "function") {
        const coords = this.selectedLatLng.toJSON();
        lat = coords.lat;
        lng = coords.lng;
      } 
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

    // Image handling methods
    getImageUrl(img) {
      if (!img) return "";
      if (img instanceof File) {
        return URL.createObjectURL(img);
      }
      if (typeof img === "object" && img.path) {
        return `${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${img.path}`;
      }
      if (typeof img === "string") {
        return `${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${img}`;
      }
      return "";
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
        await useProfileStore().deleteImage(this.imageToDelete);
        this.fetchProfileData()
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
      const profile = res?.healthServeProfileData?.healthServeProfile?.data;
      const hs = await res?.healthServeProfileData?.healthServeUser;
      console.log(hs)
      if (hs) {
        this.form.address = hs?.address || "";
        this.form.city = hs?.city || "";
        this.form.locality = hs?.locality || "";
        this.form.state = hs?.state || "";
        this.form.pincode = hs?.pincode || "";
      }

      if (profile) {
        const images = [];
        if (profile.profileImage) {
          images.push({ path: profile.profileImage, type: "profilePhoto_image" });
        }
        if (Array.isArray(profile.galleryImages)) {
          profile.galleryImages.forEach((img) => {
            images.push({ path: img, type: "galleryImages_image" });
          });
        }
        this.images = images;
        this.form.about = profile.about || "";
        this.form.introduction = profile.introduction || "";
        this.form.coverageArea = profile.coverageArea || "";
        this.form.ambulances = profile.ambulances || [];
        this.form.drivers = profile.drivers || [];
        this.form.testimonials = profile.testimonials || [];
        this.form.faqs = profile.faqs || [];
      }
    },

    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const formData = new FormData();
        formData.append("introduction", this.form.introduction);
        formData.append("about", this.form.about);
        formData.append("address", this.form.address);
        formData.append("locality", this.form.locality);
        formData.append("city", this.form.city);
        formData.append("pincode", this.form.pincode);
        formData.append("state", this.form.state);
        formData.append("coverageArea", this.form.coverageArea);
        formData.append("ambulances", JSON.stringify(this.form.ambulances));
        formData.append("drivers", JSON.stringify(this.form.drivers));
        formData.append("testimonials", JSON.stringify(this.form.testimonials));
        formData.append("faqs", JSON.stringify(this.form.faqs));
        
        if (this.profileImage) {
          formData.append("profilePhoto_image", this.profileImage);
        }

        this.galleryImages.forEach((file, index) => {
          formData.append("galleryImages_image", file);
        });

        const res = await useProfileStore().addProfileData(formData);

        if (res) {
          this.fetchProfileData();
          this.profileImage = null;
          this.galleryImages = [];
          useUiStore().openNotificationMessage(
            "Ambulance profile updated successfully!"
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
  border-radius: 10px;
  padding-bottom: 10px;
  transition-duration: 200ms;
}

.image-card:hover {
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

.ambulance-card, .driver-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  background: #fafafa;
}

.equipment-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.equipment-chip {
  background: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.equipment-chip:hover {
  background: #bbdefb;
}

.equipment-chip.selected {
  background: #1976d2;
  color: white;
  border-color: #0d47a1;
}

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