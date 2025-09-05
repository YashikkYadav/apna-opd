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
                 @wheel.stop.prevent
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
                 @wheel.stop.prevent
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="form.appointmentFee"
                ref="appointmentFeeRef"
                type="number"
                label="Appointment Fee"
                :rules="[rules.required]"
                variant="outlined"
                dense
                 @wheel.stop.prevent
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

        <v-card class="section-card">
          <v-toolbar
            flat
            class="mb-4"
            style="column-gap: 20px; padding: 0px 20px"
          >
            <v-toolbar-title class="ml-3">Languages</v-toolbar-title>
          </v-toolbar>
          <v-btn class="mb-2" @click="addLanguage">+ Add Language</v-btn>
          <div v-for="(lang, i) in form.languages" :key="i" class="mb-4 px-4">
            <v-row>
              <v-text-field
                v-model="form.languages[i]"
                label="Language"
                dense
                outlined
                hide-details
                class="flex-grow-1 mr-2 pa-4"
              />
              <div class="d-flex justify-end pa-2">
                <v-btn icon color="error" @click="removeLanguage(i)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>
          </div>
        </v-card>

        <!-- CONDITIONS TREATED -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Conditions Treated</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addCondition">+ Add</v-btn>

          <div
            v-for="(cond, index) in form.conditionsTreated"
            :key="index"
            class="mb-4 px-4"
          >
            <v-row>
              <v-text-field
                v-model="form.conditionsTreated[index]"
                label="Condition"
                dense
                outlined
                hide-details
              ></v-text-field>
              <div class="d-flex justify-end pa-2">
                <v-btn icon color="error" @click="removeCondition(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>
          </div>
        </v-card>

        <!--Procedures Offered -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Procedures Offered</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addProcedures">+ Add</v-btn>

          <div
            v-for="(cond, index) in form.proceduresOffered"
            :key="index"
            class="mb-4 px-4"
          >
            <v-row>
              <v-text-field
                v-model="form.proceduresOffered[index]"
                label="Procedure"
                dense
                outlined
                hide-details
              ></v-text-field>
              <div class="d-flex justify-end pa-2">
                <v-btn icon color="error" @click="removeProcedures(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>
          </div>
        </v-card>

        <!-- Memebership and award -->
        <v-card class="section-card">
          <v-toolbar flat class="mb-4" style="padding: 0px 20px">
            <v-toolbar-title>Memeberships & Awards</v-toolbar-title>
          </v-toolbar>

          <v-btn class="mb-2" @click="addMembership">+ Add</v-btn>

          <div
            v-for="(cond, index) in form.membershipAwards"
            :key="index"
            class="mb-4 px-4"
          >
            <v-row>
              <v-text-field
                v-model="form.membershipAwards[index]"
                label="Membership"
                dense
                outlined
                hide-details
              ></v-text-field>
              <div class="d-flex justify-end pa-2">
                <v-btn icon color="error" @click="removeMembership(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>
          </div>
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

        <!-- faqs -->
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
        happyClients: null,
        experience: null,
        about: "",
        from: "",
        to: "",
        delay: "",
        address: "",
        pincode: null,
        city: "",
        locality: "",
        state: "",
        testimonials: [],
        languages: [],
        conditionsTreated: [],
        proceduresOffered: [],
        membershipAwards: [],
        faqs: [],
        googleMapLink: "",
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
      mapDialog: false,
      map: null,
      marker: null,
      selectedLatLng: null,
      query: '',
      userLocation: { latitude: 28.6139, longitude: 77.2090 },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      debounceTimeout: null,
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
    addLanguage() {
      this.form.languages.push("");
    },
    removeLanguage(i) {
      this.form.languages.splice(i, 1);
    },
    addCondition() {
      this.form.conditionsTreated.push("");
    },
    removeCondition(i) {
      this.form.conditionsTreated.splice(i, 1);
    },
    addProcedures() {
      this.form.proceduresOffered.push("");
    },
    removeProcedures(i) {
      this.form.proceduresOffered.splice(i, 1);
    },
    addMembership() {
      this.form.membershipAwards.push("");
    },
    removeMembership(i) {
      this.form.membershipAwards.splice(i, 1);
    },
    addFAQ() {
      this.form.faqs.push({ question: "", answer: "" });
    },
    removeFAQ(i) {
      this.form.faqs.splice(i, 1);
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
      console.log(">>",res)

      if(res.doctorProfile?.doctorUserProfile){
        this.form.address = res.doctorProfile.doctorUserProfile?.address;
        this.form.locality = res.doctorProfile.doctorUserProfile?.locality;
        this.form.state = res.doctorProfile.doctorUserProfile?.state;
        this.form.city = res.doctorProfile.doctorUserProfile?.city;
        this.form.pincode = res.doctorProfile.doctorUserProfile?.pincode;
      }
      
      if (res.doctorProfile.doctorProfile !== null) {
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
        this.form.delay = res.doctorProfile?.availabilityAfter;
        this.form.from = res.doctorProfile.unavailabilityDate?.from
          ? res.doctorProfile.unavailabilityDate.from.split("T")[0]
          : "";
        this.form.to = res.doctorProfile.unavailabilityDate?.to
          ? res.doctorProfile.unavailabilityDate.to.split("T")[0]
          : "";
        
        this.form.testimonials = res.doctorProfile?.testimonials || [];
        this.form.conditionsTreated = res.doctorProfile.conditionsTreated || [];
        this.form.proceduresOffered = res.doctorProfile.proceduresOffered || [];
        this.form.membershipAwards = res.doctorProfile.membershipAwards || [];
        this.form.faqs = res.doctorProfile.faqs || [];
        this.form.languages = res.doctorProfile.languages || [];
      }

      console.log(res);
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
        formData.append("appointmentFee", parseInt(this.form.appointmentFee));
        formData.append("about", this.form.about);
        formData.append("locations", JSON.stringify(data.locations));
        formData.append("address", this.form.address);
        formData.append("locality", this.form.locality);
        formData.append("city", this.form.city);
        formData.append("pincode", this.form.pincode);
        formData.append("state", this.form.state);
        formData.append("testimonials", JSON.stringify(data.testimonials));
        formData.append(
          "conditionsTreated",
          JSON.stringify(this.form.conditionsTreated)
        );
        formData.append(
          "proceduresOffered",
          JSON.stringify(this.form.proceduresOffered)
        );
        formData.append(
          "membershipAwards",
          JSON.stringify(this.form.membershipAwards)
        );
        formData.append("faqs", JSON.stringify(this.form.faqs));
        formData.append("languages", JSON.stringify(this.form.languages));
        formData.append(
          "unavailabilityDate",
          JSON.stringify(data.unavailabilityDate)
        );
        formData.append("availabilityAfter", data.availabilityAfter);
        console.log(formData);
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
