<template>
  <form class="doctor-admin" @submit.prevent="saveData">
    <v-container fluid class="full-screen-container">
      <!-- Status Messages -->
      <v-alert v-if="message" :type="messageType" class="mb-4" closable @click:close="message = ''">
        {{ message }}
      </v-alert>

      <!-- Features Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">Doctor Features</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(feature, index) in features" :key="index">
              <v-card variant="outlined" class="pa-4">
                <div class="d-flex align-center justify-space-between">
                  <v-checkbox v-model="feature.enabled" :label="feature.label" color="success" hide-details />
                  <v-btn color="error" size="small" icon @click="removeFeature(index)" variant="text">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" @click="addFeature">
                <v-icon left>mdi-plus</v-icon>
                Add New Feature
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Conditions Treated Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-green-lighten-5 section-heading">Conditions Treated</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field v-model="newCondition" label="Add Condition" variant="outlined"
                placeholder="e.g., Frozen Shoulder" @keyup.enter="addCondition" />
            </v-col>
            <v-col cols="12" md="4">
              <v-btn color="primary" @click="addCondition" :disabled="!newCondition">
                <v-icon left>mdi-plus</v-icon>
                Add Condition
              </v-btn>
            </v-col>
          </v-row>
          <div class="mt-4">
            <v-chip v-for="(condition, index) in conditions" :key="index" class="ma-2" closable
              @click:close="removeCondition(index)" color="primary" text-color="white">
              {{ condition }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <!-- Therapy Packages Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-red-lighten-5 section-heading">Therapy Packages</v-card-title>
        <v-card-text>
          <!-- Add New Package Form -->
          <v-card variant="outlined" class="mb-6 pa-4">
            <h3 class="text-h6 mb-4">Add New Package</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="newPackage.title" label="Package Title" variant="outlined" required />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model.number="newPackage.price" label="Price (₹)" variant="outlined" type="number"
                  required />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model.number="newPackage.discount" label="Discount (%)" variant="outlined"
                  type="number" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="newPackage.description" label="Description" rows="2" variant="outlined" required />
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" @click="addPackage" :disabled="!isPackageFormValid">
                  <v-icon left>mdi-plus</v-icon>
                  Add Package
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Existing Packages List -->
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(pkg, index) in packages" :key="index">
              <v-card variant="outlined" class="pa-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <h4>{{ pkg.title }}</h4>
                  <v-btn color="error" size="small" icon @click="removePackage(index)" variant="text">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
                <div class="mb-2">
                  <span class="font-weight-bold">₹{{ pkg.price }}</span>
                  <span v-if="pkg.discount" class="ml-2 text-success">({{ pkg.discount }}% OFF)</span>
                </div>
                <p>{{ pkg.description }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Location & Contact Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-cyan-lighten-5 section-heading">Location & Contact</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="location.address" label="Address" variant="outlined" required />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="location.phone" label="Phone" variant="outlined" required />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="location.email" label="Email" variant="outlined" required />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="name" label="Doctor Name" variant="outlined" required />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="specialty" label="Specialty" variant="outlined" required />
            </v-col>
            <v-col cols="12" md="12">
              <v-textarea v-model="description" label="Description" rows="2" variant="outlined" required />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Highlights Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">Doctor Highlights</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" v-for="(highlight, index) in highlights" :key="index">
              <v-card variant="outlined" class="pa-4">
                <v-text-field v-model="highlight.icon" label="Icon (emoji or icon name)" variant="outlined"
                  class="mb-2" />
                <v-text-field v-model="highlight.title" label="Title" variant="outlined" class="mb-2" />
                <v-text-field v-model="highlight.desc" label="Description" variant="outlined" class="mb-2" />
                <v-btn color="error" size="small" @click="removeHighlight(index)">Remove</v-btn>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" @click="addHighlight">
                <v-icon left>mdi-plus</v-icon>
                Add Highlight
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Services Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-blue-lighten-5 section-heading">Doctor Services</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" v-for="(service, index) in services" :key="index">
              <v-card variant="outlined" class="pa-4">
                <v-text-field v-model="service.name" label="Service Name" variant="outlined" class="mb-2" />
                <v-btn color="error" size="small" @click="removeService(index)">Remove</v-btn>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" @click="addService">
                <v-icon left>mdi-plus</v-icon>
                Add Service
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Reviews Section -->
      <v-card class="mb-6 w-100 full-width-card" elevation="2" style="width:100vw">
        <v-card-title class="bg-yellow-lighten-5 section-heading">Patient Reviews</v-card-title>
        <v-card-text>
          <!-- Add New Review Form -->
          <v-card variant="outlined" class="mb-6 pa-4">
            <h3 class="text-h6 mb-4">Add New Review</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="newReview.name" label="Patient Name" variant="outlined" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-rating v-model="newReview.rating" label="Rating" class="mb-2" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="newReview.review" label="Review Text" rows="3" variant="outlined" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="newReview.date" label="Date" variant="outlined" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="primary" @click="addReview" :disabled="!isReviewFormValid" :loading="saving">
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
                  <v-btn color="error" size="small" icon @click="removeReview(index)" variant="text">
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
        <v-card-title class="bg-indigo-lighten-5 section-heading">FAQs</v-card-title>
        <v-card-text>
          <!-- Add New FAQ Form -->
          <v-card variant="outlined" class="mb-6 pa-4">
            <h3 class="text-h6 mb-4">Add New FAQ</h3>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newFAQ.q" label="Question" variant="outlined" required />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="newFAQ.a" label="Answer" rows="3" variant="outlined" required />
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" @click="addFAQ" :disabled="!isFAQFormValid" :loading="saving">
                  <v-icon left>mdi-plus</v-icon>
                  Add FAQ
                </v-btn>
              </v-col>
            </v-row>
          </v-card>

          <!-- Existing FAQs -->
          <v-expansion-panels>
            <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
              <v-expansion-panel-title>
                <div class="d-flex justify-space-between align-center w-100">
                  <span>{{ faq.q }}</span>
                  <v-btn color="error" size="small" icon @click.stop="removeFAQ(index)" variant="text">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-textarea v-model="faq.a" label="Answer" variant="outlined" rows="3" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" large @click="saveData" class="mb-6">
          <v-icon left>mdi-content-save</v-icon>
          Save All Changes
        </v-btn>
        <v-btn color="red" large @click="testClick" class="mb-6 ml-4">
          <v-icon left>mdi-alert</v-icon>
          Test Button
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="loadData" :loading="loading" class="mb-4">
      <v-icon left>mdi-refresh</v-icon>
      Reload
    </v-btn>
  </form>
</template>

<script>
import { useProfileStore } from "@/store/ProfileStore";
export default {
  name: 'DoctorAdmin',
  data() {
    return {
      // Features
      features: [
        { label: 'Home Visit Available', enabled: true },
        { label: 'Clinic Based', enabled: true },
        { label: 'Certified', enabled: true },
        { label: 'Teleconsultation', enabled: false },
        { label: 'Emergency Care', enabled: false }
      ],
      // Conditions Treated
      conditions: [
        'Frozen Shoulder',
        'Stroke Rehab',
        'ACL Post-Surgery',
        'Cervical Pain',
        'Sciatica',
        'Sports Injuries',
        'Ortho Rehab',
        'Neuro Physio'
      ],
      newCondition: '',
      // Therapy Packages
      packages: [],
      newPackage: {
        title: '',
        price: '',
        discount: '',
        description: ''
      },
      // Location & Contact
      location: {
        address: '',
        phone: '',
        email: ''
      },
      // Doctor Info fields
      name: '',
      specialty: '',
      description: '',
      // Reviews
      reviews: [],
      newReview: {
        name: '',
        rating: 5,
        review: '',
        date: ''
      },
      // FAQs
      faqs: [],
      newFAQ: {
        q: '',
        a: ''
      },
      // UI State
      saving: false,
      loading: false,
      message: '',
      messageType: 'success',
      highlights: [],
      services: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async saveData() {
      console.log('saveData called', {
        name: this.name,
        specialty: this.specialty,
        location: this.location,
        description: this.description,
        features: this.features,
        conditions: this.conditions,
        certifications: this.certifications,
        highlights: this.highlights,
        services: this.services,
        packages: this.packages,
        reviews: this.reviews,
        faqs: this.faqs
      });
      this.saving = true
      try {
        const data = {
          doctorInfo: {
            name: this.name,
            specialty: this.specialty,
            location: this.location.address,
            phone: this.location.phone,
            email: this.location.email,
            description: this.description,
            features: this.features,
            conditions: this.conditions.map(c => ({ label: c, icon: '' }))
          },
          certifications: this.certifications,
          highlights: this.highlights,
          services: this.services.map((s, idx) => ({ id: s.id || idx + 1, name: s.name })),
          packages: this.packages.map((pkg, idx) => ({
            id: pkg.id || idx + 1,
            name: pkg.title || pkg.name || '',
            sessions: pkg.sessions || 0,
            price: pkg.price,
            discount: pkg.discount,
            description: pkg.description
          })),
          reviews: this.reviews.map((r, idx) => ({
            id: r.id || idx + 1,
            name: r.name,
            service: r.service || '',
            rating: r.rating,
            comment: r.review || r.comment,
            date: r.date
          })),
          faqs: this.faqs.map(f => ({
            question: f.q || f.question,
            answer: f.a || f.answer
          }))
        };


        const response = await useProfileStore().addProfileData(data);


        if (!response.ok) {
          const err = await response.json()
          this.message = 'Error saving data: ' + (err.error || response.statusText)
          this.messageType = 'error'
          this.saving = false
          return
        }
        this.message = 'Data saved successfully!'
        this.messageType = 'success'
        await this.loadData() // Reload to confirm persistence
      } catch (error) {
        this.message = 'Error saving data: ' + error.message
        this.messageType = 'error'
      } finally {
        this.saving = false
      }
    },
    testClick() {
      alert('Test button works!');
    },
    // Feature Methods
    addFeature() { this.features.push({ label: 'New Feature', enabled: false }) },
    removeFeature(index) { this.features.splice(index, 1) },
    // Condition Methods
    addCondition() {
      if (this.newCondition && !this.conditions.includes(this.newCondition)) {
        this.conditions.push(this.newCondition)
        this.newCondition = ''
        this.showMessage('Condition added!', 'success')
      }
    },
    removeCondition(index) { this.conditions.splice(index, 1) },
    // Package Methods
    addPackage() {
      if (this.newPackage.title && this.newPackage.price) {
        this.packages.push({
          title: this.newPackage.title,
          price: this.newPackage.price,
          discount: this.newPackage.discount,
          description: this.newPackage.description,
          details: [], // Add empty details for compatibility
          benefits: [] // Add empty benefits for compatibility
        });
        this.newPackage = { title: '', price: '', discount: '', description: '' };
        this.showMessage('Package added!', 'success');
      }
    },
    removePackage(index) { this.packages.splice(index, 1) },
    // Review Methods
    addReview() {
      if (this.newReview.name && this.newReview.review && this.newReview.date) {
        this.reviews.push({ ...this.newReview })
        this.newReview = { name: '', rating: 5, review: '', date: '' }
        this.showMessage('Review added!', 'success')
      }
    },
    removeReview(index) { this.reviews.splice(index, 1) },
    // FAQ Methods
    addFAQ() {
      if (this.newFAQ.q && this.newFAQ.a) {
        this.faqs.push({ ...this.newFAQ })
        this.newFAQ = { q: '', a: '' }
        this.showMessage('FAQ added!', 'success')
      }
    },
    removeFAQ(index) { this.faqs.splice(index, 1) },
    // Highlight Methods
    addHighlight() {
      this.highlights.push({ icon: '', title: '', desc: '' });
    },
    removeHighlight(index) {
      this.highlights.splice(index, 1);
    },
    // Service Methods
    addService() {
      this.services.push({ id: this.services.length + 1, name: '' });
    },
    removeService(index) {
      this.services.splice(index, 1);
    },
    // UI
    showMessage(text, type = 'success') {
      this.message = text
      this.messageType = type
    },
    // Load data from API and map to admin fields
    async loadData() {
      this.loading = true
      try {
        // const response = await fetch('http://localhost:3000/api/doctor')
        const response = await useProfileStore().getProfileData();
        console.log("response",response)

        // if (!response.ok) throw new Error('Failed to load data')
        const data = response?.healthServeProfileData?.healthServeProfile
        if (data && data.doctorInfo) {
          this.name = data.doctorInfo.name || ''
          this.specialty = data.doctorInfo.specialty || ''
          this.location.address = data.doctorInfo.location || ''
          this.location.phone = data.doctorInfo.phone || ''
          this.location.email = data.doctorInfo.email || ''
          this.description = data.doctorInfo.description || ''
          this.features = data.doctorInfo.features || []
          this.conditions = (data.doctorInfo.conditions || []).map(c => c.label || c)
        }

        if (data?.certifications) this.certifications = [...data.certifications]
        if (data?.highlights) this.highlights = [...data.highlights]
        if (data?.services) this.services = [...data.services]
        if (data?.packages) this.packages = [...data.packages]
        if (data?.reviews) this.reviews = [...data.reviews]
        if (data?.faqs) this.faqs = [...data.faqs]

      } catch (error) {
        this.message = 'Error loading data: ' + error.message
        this.messageType = 'error'
      } finally {
        this.loading = false
      }
    },
    isPackageFormValid() {
      return this.newPackage.title && this.newPackage.price && this.newPackage.description
    },
    isReviewFormValid() {
      return this.newReview.name && this.newReview.rating && this.newReview.review && this.newReview.date
    },
    isFAQFormValid() {
      return this.newFAQ.q && this.newFAQ.a
    }
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
.bg-green-lighten-5,
.bg-red-lighten-5,
.bg-cyan-lighten-5 {
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

.v-text-field,
.v-textarea,
.v-select,
.v-switch {
  border-radius: 10px !important;
  font-size: 1.08rem !important;
  background: #fff !important;
  margin-bottom: 18px !important;
}

.v-label,
label {
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

.doctor-admin {
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
  background-color: #e3f2fd !important;
  /* matches bg-blue-lighten-5 */
  color: #1976d2 !important;
}
</style>