<template>
  <form class="pharmacy-admin" @submit.prevent="saveData">
    <v-container fluid class="full-screen-container">
      <!-- Status Messages -->
      <v-alert
        v-if="message"
        :type="messageType"
        class="mb-4"
        closable
        @click:close="message = ''"
      >
        {{ message }}
      </v-alert>

      <!-- Features Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">
          Pharmacy Features
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(feature, index) in features" :key="index">
              <v-card variant="outlined" class="pa-4">
                <div class="d-flex align-center justify-space-between">
                  <v-checkbox
                    v-model="feature.enabled"
                    :label="feature.label"
                    color="success"
                    hide-details
                    @change="onFeatureToggle(index)"
                  />
                  <v-btn
                    color="error"
                    size="small"
                    icon
                    @click="removeFeature(index)"
                    variant="text"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <div v-if="addingFeature" class="d-flex align-center gap-2">
                <v-text-field
                  v-model="newFeatureLabel"
                  label="Feature Label"
                  variant="outlined"
                  dense
                  autofocus
                  @keyup.enter="confirmAddFeature"
                />
                <v-btn color="primary" @click="confirmAddFeature" :disabled="!newFeatureLabel">
                  <v-icon left>mdi-check</v-icon>
                  Add
                </v-btn>
                <v-btn color="grey" @click="cancelAddFeature">
                  <v-icon left>mdi-close</v-icon>
                  Cancel
                </v-btn>
              </div>
              <v-btn v-else color="primary" @click="startAddFeature">
                <v-icon left>mdi-plus</v-icon>
                Add New Feature
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Medicines Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">
          Medicines
        </v-card-title>
        <v-card-text>
          <!-- Add New Medicine Form -->
          <v-card variant="outlined" class="mb-6 pa-4">
            <h3 class="text-h6 mb-4">Add New Medicine</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newMedicine.name"
                  label="Medicine Name"
                  variant="outlined"
                  placeholder="e.g., Dolo 650mg"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newMedicine.salt"
                  label="Salt/Active Ingredient"
                  variant="outlined"
                  placeholder="e.g., Paracetamol"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newMedicine.manufacturer"
                  label="Manufacturer"
                  variant="outlined"
                  placeholder="e.g., Micro Labs"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newMedicine.packSize"
                  label="Pack Size"
                  variant="outlined"
                  placeholder="e.g., 15 tablets"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="newMedicine.mrp"
                  label="MRP (₹)"
                  variant="outlined"
                  type="number"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="newMedicine.price"
                  label="Selling Price (₹)"
                  variant="outlined"
                  type="number"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="newMedicine.discount"
                  label="Discount (%)"
                  variant="outlined"
                  type="number"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="newMedicine.category"
                  :items="medicineCategories"
                  label="Category"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="newMedicine.inStock"
                  label="In Stock"
                  color="success"
                />
              </v-col>
              <v-col cols="12">
                <v-btn 
                  color="primary" 
                  @click="addMedicine" 
                  :disabled="!isMedicineFormValid"
                  :loading="saving"
                >
                  <v-icon left>mdi-plus</v-icon>
                  Add Medicine
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Existing Medicines List -->
          <v-data-table
            :headers="medicineHeaders"
            :items="medicines"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn color="error" size="small" @click="removeMedicine(item.index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.inStock="{ item }">
              <v-switch v-model="item.inStock" color="success" />
            </template>
            <template v-slot:item.mrp="{ item }">
              ₹{{ item.mrp }}
            </template>
            <template v-slot:item.price="{ item }">
              ₹{{ item.price }}
            </template>
            <template v-slot:item.discount="{ item }">
              {{ item.discount }}%
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <!-- Reviews Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">
          Customer Reviews
        </v-card-title>
        <v-card-text>
          <!-- Add New Review Form -->
          <v-card variant="outlined" class="mb-6 pa-4">
            <h3 class="text-h6 mb-4">Add New Review</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newReview.name"
                  label="Customer Name"
                  variant="outlined"
                  placeholder="e.g., Rajesh Kumar"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-rating
                  v-model="newReview.rating"
                  label="Rating"
                  class="mb-2"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newReview.review"
                  label="Review Text"
                  rows="3"
                  variant="outlined"
                  placeholder="Write the customer review here..."
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newReview.date"
                  label="Date"
                  variant="outlined"
                  placeholder="e.g., 2 days ago"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-btn 
                  color="primary" 
                  @click="addReview" 
                  :disabled="!isReviewFormValid"
                  :loading="saving"
                >
                  <v-icon left>mdi-plus</v-icon>
                  Add Review
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Existing Reviews -->
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(review, index) in reviews" :key="index">
              <v-card variant="outlined" class="pa-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <h4>{{ review.name }}</h4>
                  <v-btn
                    color="error"
                    size="small"
                    icon
                    @click="removeReview(index)"
                    variant="text"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
                <div class="mb-2">
                  <v-rating v-model="review.rating" readonly />
                </div>
                <p>{{ review.review }}</p>
                <small class="text-grey">{{ review.date }}</small>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- FAQs Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">
          FAQs
        </v-card-title>
        <v-card-text>
          <!-- Add New FAQ Form -->
          <v-card variant="outlined" class="mb-6 pa-4">
            <h3 class="text-h6 mb-4">Add New FAQ</h3>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newFAQ.q"
                  label="Question"
                  variant="outlined"
                  placeholder="Enter the question..."
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newFAQ.a"
                  label="Answer"
                  rows="3"
                  variant="outlined"
                  placeholder="Enter the answer..."
                />
              </v-col>
              <v-col cols="12">
                <v-btn 
                  color="primary" 
                  @click="addFAQ" 
                  :disabled="!isFAQFormValid"
                  :loading="saving"
                >
                  <v-icon left>mdi-plus</v-icon>
                  Add FAQ
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Existing FAQs -->
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(faq, index) in faqs"
              :key="index"
            >
              <v-expansion-panel-title>
                <div class="d-flex justify-space-between align-center w-100">
                  <span>{{ faq.q }}</span>
                  <v-btn
                    color="error"
                    size="small"
                    icon
                    @click.stop="removeFAQ(index)"
                    variant="text"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-textarea
                  v-model="faq.a"
                  label="Answer"
                  variant="outlined"
                  rows="3"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-container>
    <v-btn 
      color="primary" 
      type="submit"
      :loading="saving"
      size="large"
      class="submit-btn-bottom-right text-white"
    >
      <v-icon left>mdi-content-save</v-icon>
      Submit
    </v-btn>
  </form>
</template>

<script>
import { useProfileStore } from "@/store/ProfileStore";

export default {
  name: 'PharmacyAdmin',
  data() {
    return {
      // Data
      features: [
        { label: '24x7 Delivery', enabled: true },
        { label: 'Accepts Prescriptions', enabled: true },
        { label: 'Discounts Available', enabled: true },
        { label: 'Home Delivery', enabled: true },
        { label: 'Online Payment', enabled: false },
        { label: 'Emergency Service', enabled: false }
      ],
      medicines: [
        {
          id: 1,
          name: 'Dolo 650mg',
          salt: 'Paracetamol',
          manufacturer: 'Micro Labs',
          mrp: 32,
          price: 28,
          packSize: '15 tablets',
          category: 'Tablet',
          inStock: true,
          discount: 12
        },
        {
          id: 2,
          name: 'Crocin Advance',
          salt: 'Paracetamol',
          manufacturer: 'GSK',
          mrp: 45,
          price: 38,
          packSize: '20 tablets',
          category: 'Tablet',
          inStock: true,
          discount: 15
        }
      ],
      reviews: [
        {
          name: 'Rajesh Kumar',
          rating: 5,
          review: 'Fast delivery and genuine medicines. Highly recommended!',
          date: '2 days ago'
        },
        {
          name: 'Priya Sharma',
          rating: 4,
          review: 'Good discounts available. Staff is very helpful.',
          date: '1 week ago'
        }
      ],
      faqs: [
        {
          q: 'Is prescription required for all medicines?',
          a: 'No, over-the-counter (OTC) medicines don\'t require prescription. However, prescription medicines need a valid prescription from a registered doctor.'
        },
        {
          q: 'How long does delivery take?',
          a: 'We offer same-day delivery within Jaipur city limits. Orders placed before 6 PM are delivered the same day, while orders after 6 PM are delivered the next day.'
        }
      ],
      
      // UI State
      saving: false,
      message: '',
      messageType: 'success',
      
      // Table headers
      medicineHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Salt', value: 'salt' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'MRP', value: 'mrp' },
        { text: 'Price', value: 'price' },
        { text: 'Pack Size', value: 'packSize' },
        { text: 'Category', value: 'category' },
        { text: 'In Stock', value: 'inStock' },
        { text: 'Discount %', value: 'discount' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      // New Medicine Form
      newMedicine: {
        name: '',
        salt: '',
        manufacturer: '',
        packSize: '',
        mrp: '',
        price: '',
        discount: '',
        category: '',
        inStock: true
      },

      // New Review Form
      newReview: {
        name: '',
        rating: 5,
        review: '',
        date: ''
      },

      // New FAQ Form
      newFAQ: {
        q: '',
        a: ''
      },

      // Medicine Categories
      medicineCategories: ['Tablet', 'Capsule', 'Injection', 'Syrup', 'Ointment', 'Cream'],

      addingFeature: false,
      newFeatureLabel: '',
    }
  },
  
  mounted() {
    console.log('PharmacyAdmin mounted')
    this.loadData()
  },
  
  methods: {
    // API Methods
    async saveData(showLoading = true) {
      if (showLoading) {
        this.saving = true
        this.message = ''
      }
      
      try {
        console.log('Saving data...')
        const data = {
          features: this.features,
          medicines: this.medicines,
          reviews: this.reviews,
          faqs: this.faqs
        }
        
        console.log('Data to save:', data)
        const response = await useProfileStore().addProfileData(data);
        
    
         if (!response?.healthServeProfileData?.ok) {
          // const err = await response.json()
          this.message = 'Error saving data: ' + (response?.healthServeProfileData.error )
          this.messageType = 'error'
          this.saving = false
          return
        }
        
        // const result = await response.json()
        // console.log('Save response:', result)
        
        if (showLoading) {
          this.showMessage('Data saved successfully!', 'success')
        }
        await this.loadData()
      } catch (error) {
        console.error('Failed to save data:', error)
        if (showLoading) {
          this.showMessage(`Failed to save data: ${error.message}`, 'error')
        }
      } finally {
        if (showLoading) {
          this.saving = false
        }
      }
    },
    
    // UI Methods
    showMessage(text, type = 'success') {
      this.message = text
      this.messageType = type
    },
    
    // Feature Methods
    startAddFeature() {
      this.addingFeature = true;
      this.newFeatureLabel = '';
    },
    cancelAddFeature() {
      this.addingFeature = false;
      this.newFeatureLabel = '';
    },
    async confirmAddFeature() {
      if (!this.newFeatureLabel) return;
      this.features.push({ label: this.newFeatureLabel, enabled: true });
      this.addingFeature = false;
      this.newFeatureLabel = '';
      await this.saveData(false);
    },
    async onFeatureToggle(index) {
      await this.saveData(false);
    },
    
    async removeFeature(index) {
      this.features.splice(index, 1)
      await this.saveData(false)
    },
    
    // Medicine Methods
    async removeMedicine(index) {
      this.medicines.splice(index, 1)
      await this.saveData(false)
    },
    
    // Review Methods
    async addReview() {
      this.reviews.push({
        name: this.newReview.name,
        rating: this.newReview.rating,
        review: this.newReview.review,
        date: this.newReview.date
      })
      
      // Reset form
      this.newReview = {
        name: '',
        rating: 5,
        review: '',
        date: ''
      }
      
      await this.saveData(false)
      this.showMessage('Review added successfully!', 'success')
    },
    
    async removeReview(index) {
      this.reviews.splice(index, 1)
      await this.saveData(false)
    },
    
    // FAQ Methods
    async addFAQ() {
      this.faqs.push({
        q: this.newFAQ.q,
        a: this.newFAQ.a
      })
      
      // Reset form
      this.newFAQ = {
        q: '',
        a: ''
      }
      
      await this.saveData(false)
      this.showMessage('FAQ added successfully!', 'success')
    },
    
    async removeFAQ(index) {
      this.faqs.splice(index, 1)
      await this.saveData(false)
    },

    apiBaseUrl() {
      return `http://${window.location.hostname}:3000/api/pharmacy`;
    },

    // Form Validation
    isMedicineFormValid() {
      return (
        this.newMedicine.name &&
        this.newMedicine.salt &&
        this.newMedicine.manufacturer &&
        this.newMedicine.packSize &&
        this.newMedicine.mrp &&
        this.newMedicine.price &&
        this.newMedicine.category &&
        this.newMedicine.inStock
      )
    },

    isReviewFormValid() {
      return (
        this.newReview.name &&
        this.newReview.rating &&
        this.newReview.review &&
        this.newReview.date
      )
    },

    isFAQFormValid() {
      return (
        this.newFAQ.q &&
        this.newFAQ.a
      )
    },

    // New Medicine Methods
    async addMedicine() {
      const newId = Math.max(...this.medicines.map(m => m.id), 0) + 1;
      this.medicines.push({
        id: newId,
        name: this.newMedicine.name,
        salt: this.newMedicine.salt,
        manufacturer: this.newMedicine.manufacturer,
        mrp: Number(this.newMedicine.mrp),
        price: Number(this.newMedicine.price),
        packSize: this.newMedicine.packSize,
        category: this.newMedicine.category,
        inStock: this.newMedicine.inStock,
        discount: Number(this.newMedicine.discount) || 0
      });
      
      // Reset form
      this.newMedicine = {
        name: '',
        salt: '',
        manufacturer: '',
        packSize: '',
        mrp: '',
        price: '',
        discount: '',
        category: '',
        inStock: true
      };
      
      await this.saveData(false);
      this.showMessage('Medicine added successfully!', 'success');
    },

    // Private method to load data on mount
    async loadData() {
      try {
        const response = await useProfileStore().getProfileData();
        console.log("response", response);

        const data = response?.healthServeProfileData?.healthServeProfile;

        if (data) {
          if (data.features) this.features = data.features;
          if (data.medicines) this.medicines = data.medicines;
          if (data.reviews) this.reviews = data.reviews;
          if (data.faqs) this.faqs = data.faqs;
        } 
      } catch (error) {
        console.error("Failed to load data:", error);
        this.showMessage(`Failed to load data: ${error.message}`, "error");
      }
    },
  }
}
</script>

<style scoped>
.full-screen-container {
  width: 100vw !important;
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
}
.full-width-card {
  width: 100vw !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.submit-btn-bottom-right {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  margin-bottom: 16px;
  margin-right: 16px;
}
.bg-primary,
.bg-blue-lighten-5,
.bg-red-lighten-5,
.bg-yellow-lighten-5,
.bg-indigo-lighten-5 {
  border-radius: 14px 14px 0 0 !important;
  padding: 18px 28px !important;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: none;
}

.v-card {
  border-radius: 16px !important;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.07) !important;
  background: #f9fbfd !important;
}

.v-card-text {
  padding: 28px !important;
}

.v-text-field, .v-textarea, .v-select, .v-switch {
  border-radius: 10px !important;
  font-size: 1.08rem !important;
  background: #fff !important;
  margin-bottom: 18px !important;
}

.v-label, label {
  font-size: 1.08rem !important;
  color: #4a4a4a !important;
  font-weight: 500 !important;
  margin-bottom: 6px !important;
}

.v-btn {
  border-radius: 8px !important;
  font-size: 1.08rem !important;
  padding: 10px 22px !important;
  font-weight: 600 !important;
  letter-spacing: 0.2px;
}

.v-alert {
  border-radius: 10px !important;
  font-size: 1.05rem !important;
  margin-bottom: 18px !important;
}

.v-data-table {
  border-radius: 12px !important;
  background: #fff !important;
}

.v-expansion-panel {
  border-radius: 10px !important;
  margin-bottom: 10px !important;
}

.v-row {
  margin-bottom: 0 !important;
}

.v-col {
  margin-bottom: 0 !important;
}

.pharmacy-admin {
  background: #f2f6fa;
  min-height: 100vh;
  padding: 32px 0;
}

h3.text-h6 {
  font-size: 1.18rem !important;
  font-weight: 600 !important;
  color: #1976d2 !important;
  margin-bottom: 18px !important;
}

h4 {
  font-size: 1.08rem !important;
  font-weight: 600 !important;
  color: #222 !important;
}

.text-grey {
  color: #888 !important;
}

.section-heading {
  border-radius: 14px 14px 0 0 !important;
  padding: 18px 28px !important;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  background-color: #e3f2fd !important; /* matches bg-blue-lighten-5 */
  color: #1976d2 !important;
}
</style> 