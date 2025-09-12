<template class="medicine-orders-page">
  <v-container fluid>
    <!-- Search Bar -->
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search Medicines"
          variant="solo"
          max-width="350"
          rounded="pill"
          class="rounded-xl"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-card>
      <v-card-title>
        Medicines Inventory
        <v-spacer />
        <v-btn class="mt-3" color="primary" @click="addMedicine">
          + Add Medicine
        </v-btn>
      </v-card-title>
      <v-form ref="medicineForm">
        <v-data-table
          :headers="headers"
          :items="filteredMedicines"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:body>
            <tr 
              v-for="(medicine, index) in filteredMedicines" 
              :key="index"
              :class="getStockRowClass(medicine)"
            >
              <td>
                <v-text-field
                  v-model="medicine.name"
                  placeholder="Name"
                  :rules="[rules.required]"
                  dense
                  :error="!medicine.name"
                />
              </td>
              
              <td>
                <p v-if="getStockStatus(medicine.stock)" class="stock-warning">
                  {{ getStockStatus(medicine.stock) }}
                </p>
                <v-text-field
                  v-model="medicine.stock"
                  type="number"
                  placeholder="Stock"
                  :rules="[rules.numberRequired]"
                  dense
                  @wheel.stop.prevent
                  :error="!isValidStock(medicine.stock)"
                />
                
              </td>
              <td>
                <v-text-field
                  v-model="medicine.price"
                  type="number"
                  placeholder="Price"
                  :rules="[rules.numberRequired]"
                  dense
                  @wheel.stop.prevent
                  :error="!medicine.price"
                />
              </td>
              <td>
                <v-btn icon @click="removeMedicine(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-btn
                className="saaro-btn"
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
    </v-card>
  </v-container>
</template>

<script>
import { checkAuth } from "@/lib/utils/utils";
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";

export default {
  name: "MedicineInventory",
  data() {
    return {
      search: "",
      showModal: false,
      imageToDelete: null,
      snackbar: {
        show: false,
        message: "",
        color: "warning",
        timeout: 4000,
      },
      headers: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Stock', key: 'stock', sortable: true },
        { title: 'Price', key: 'price', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
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
        openTime: "",
        closeTime: "",
        tags: [""],
        features: [],
        medicines: [{ name: "", dosage: "", stock: "", price: "" }],
        servicesOffered: [],
        testimonials: [],
        partnerships: [],
        faqs: [],
        googleMapLink: "",
      },
      mapDialog: false,
      map: null,
      marker: null,
      selectedLatLng: null,
      query: "",
      userLocation: { latitude: 28.6139, longitude: 77.209 },
      rules: {
        required: (value) => !!value || "This field is required.",
        numberRequired: (value) =>
          (value !== null && value !== "" && !isNaN(value)) ||
          "This field is required and must be a valid number.",
      },
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
  computed: {
    filteredMedicines() {
      if (!this.search) {
        return this.form.medicines;
      }
      return this.form.medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchProfileData();
    }
  },
  methods: {
    async fetchProfileData() {
      const res = await useProfileStore().getProfileData();
      const profile = res.healthServeProfileData.healthServeProfile;
      const hs = await res?.healthServeProfileData?.healthServeUser;
      
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
        this.form.introduction = profile.introduction || "";
        this.form.about = profile.about || "";
        this.form.experience = profile.experience || "";
        this.form.medicines = profile.medicines?.length
          ? profile.medicines
          : [{ name: "", dosage: "", stock: "", price: "" }];
        this.form.servicesOffered = profile.servicesOffered || [];
        this.form.partnerships = profile.partnerships || [];
        this.form.features = profile.features || [];
        this.form.faqs = profile.faqs || [];
        this.form.openTime = profile.openTime || "";
        this.form.closeTime = profile.closeTime || "";
        this.form.testimonials = profile.testimonials || [];
        this.form.tags = profile.tags || [];
      }
    },

    async onSubmit() {
      // Validate all medicines first
      let isValid = true;
      
      for (let medicine of this.form.medicines) {
        if (!medicine.name || !medicine.price || !this.isValidStock(medicine.stock)) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
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
        formData.append(
          "servicesOffered",
          JSON.stringify(this.form.servicesOffered)
        );
        formData.append("medicines", JSON.stringify(this.form.medicines));
        formData.append("partnerships", JSON.stringify(this.form.partnerships));
        formData.append("features", JSON.stringify(this.form.features));
        formData.append("faqs", JSON.stringify(this.form.faqs));
        formData.append("openTime", this.form.openTime);
        formData.append("closeTime", this.form.closeTime);
        formData.append("testimonials", JSON.stringify(this.form.testimonials));
        formData.append("tags", JSON.stringify(this.form.tags));

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
            "Profile data updated successfully!"
          );
        }
      } else {
        useUiStore().openNotificationMessage(
          "Please fill all required fields (Name, Price, and Stock are required).",
          "",
          "error"
        );
      }
    },

    addMedicine() {
      this.form.medicines.push({ name: "", dosage: "", stock: "", price: "" });
    },

    removeMedicine(index) {
      // Find the actual index in the original array
      const medicine = this.filteredMedicines[index];
      const originalIndex = this.form.medicines.findIndex(m => m === medicine);
      if (originalIndex > -1) {
        this.form.medicines.splice(originalIndex, 1);
      }
    },

    isValidStock(stock) {
      return stock !== null && stock !== "" && !isNaN(stock) && Number(stock) >= 0;
    },

    getStockStatus(stock) {
      if (stock === "" || stock === null || stock === 0 || stock === "0") {
        return "No Stock";
      } else if (Number(stock) < 11 && Number(stock) > 0) {
        return "Low Stock";
      } else if(stock < 0){
        return "Add Stock Orders are in Queue"
      }
      return null;
    },

    getStockRowClass(medicine) {
      const stock = medicine.stock;
      if (stock === "" || stock === null || stock === 0 || stock === "0") {
        return "no-stock-row";
      } else if (Number(stock) < 11 && Number(stock) > 0) {
        return "low-stock-row";
      
      } else if(stock < 0){
        return "minus-stock";
      }
      return "";
    },

    addItemFromDialog() {
      // Implementation for dialog functionality
      this.itemDialog = false;
      this.newItemText = "";
    }
  },
};
</script>

<style scoped>
.low-stock-row {
  background-color: #fff3cd !important;
}

.minus-stock{
  background-color: #500202 !important;
}

.no-stock-row {
  background-color: #f8d7da !important;
}

.stock-warning {
  font-size: 12px;
  color: #dc3545;
  font-weight: bold;
}
</style>