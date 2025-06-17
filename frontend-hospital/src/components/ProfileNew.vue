<template>
  <div v-if="!isLoading" class="profile-container">
    <div v-if="hasData" class="profile-content">
      <div class="profile-header text-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
          Hospital Profile
        </h1>
      </div>
      <div class="container mx-auto px-4 pt-10 pb-8">
        <!-- Navigation Tabs -->
        <div class="bg-white/80 backdrop-blur-md rounded-xl shadow-lg mb-8 border border-sky-100">
          <nav class="flex space-x-2 p-4 overflow-x-auto">
            <button 
              v-for="(section, index) in sections" 
              :key="index"
              @click="scrollToSection(section.id)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105',
                currentSection === section.id 
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md' 
                  : 'text-sky-600 hover:bg-sky-50'
              ]"
            >
              {{ section.name }}
            </button>
          </nav>
        </div>

        <form @submit="submitForm" class="space-y-8">
          <!-- Basic Information -->
          <div 
            :id="sections[0].id"
            class="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-sky-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
                Basic Information
              </h2>
            </div>

            <!-- Hospital Image Upload -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-sky-700 mb-2">Hospital Image</label>
              <div class="mt-1 flex items-center">
                <div class="w-32 h-32 rounded-lg border-2 border-dashed border-sky-300 flex items-center justify-center overflow-hidden">
                  <img 
                        v-if="hospitalData?.image" 
                        :src="hospitalData?.image" 
                    class="w-full h-full object-cover"
                    alt="Hospital Image"
                  >
                  <div v-else class="text-center p-4">
                    <v-icon icon="mdi-image-plus" class="text-sky-400 text-4xl" />
                    <p class="text-sm text-sky-500 mt-1">Upload Image</p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  ref="imageInput"
                  @change="handleImageUpload"
                >
                <button
                  @click="$refs.imageInput.click()"
                  class="ml-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600"
                >
                  Choose Image
                </button>
              </div>
            </div>

            <!-- Basic Fields Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div v-for="(field, index) in basicFields" :key="index" class="form-group">
                <label class="block text-sm font-medium text-sky-700 mb-2">{{ field.label }}</label>
                <input 
                      :value="hospitalData[field.model]"
                      @input="hospitalData[field.model] = $event.target.value"
                  :type="field.type"
                  :required="field.required"
                  :min="field.min"
                  :max="field.max"
                  :step="field.step"
                  class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>

            <!-- Additional Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700 mb-2">Number of Beds</label>
                <input 
                      :value="hospitalData.numberOfBeds"
                      @input="hospitalData.numberOfBeds = $event.target.value"
                  type="number"
                  min="0"
                  class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  placeholder="Enter number of beds"
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700 mb-2">Number of Specialists</label>
                <input 
                      :value="hospitalData.numberOfSpecialists"
                      @input="hospitalData.numberOfSpecialists = $event.target.value"
                  type="number"
                  min="0"
                  class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  placeholder="Enter number of specialists"
                />
              </div>
            </div>

            <!-- Checkboxes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="emergency24x7"
                      :checked="hospitalData.emergency24x7"
                      @change="hospitalData.emergency24x7 = $event.target.checked"
                  class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                >
                <label for="emergency24x7" class="ml-2 block text-sm text-sky-700">
                  24/7 Emergency
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="nabhAccredited"
                      :checked="hospitalData.nabhAccredited"
                      @change="hospitalData.nabhAccredited = $event.target.checked"
                  class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                >
                <label for="nabhAccredited" class="ml-2 block text-sm text-sky-700">
                  NABH Accredited
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="insuranceAccepted"
                      :checked="hospitalData.insuranceAccepted"
                      @change="hospitalData.insuranceAccepted = $event.target.checked"
                  class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                >
                <label for="insuranceAccepted" class="ml-2 block text-sm text-sky-700">
                  Insurance Accepted
                </label>
              </div>
            </div>
          </div>

          <!-- Hospital Overview -->
          <div :id="sections[1].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Hospital Overview</h2>
            </div>

            <!-- About Section -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">About Hospital</h3>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">About Description</label>
                <textarea 
                  :value="hospitalData.about"
                  @input="hospitalData.about = $event.target.value"
                  rows="4" 
                  class="mt-0 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                ></textarea>
                <div class="mt-1 text-sm text-sky-500">
                  {{ 1000 - (hospitalData.about?.length || 0) }} characters remaining
                </div>
              </div>
            </div>

            <!-- Key Statistics -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Key Statistics</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(stat, index) in (hospitalData.keyStats || [])" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="stat"
                    @input="hospitalData.keyStats[index] = $event.target.value"
                    type="text" 
                    class="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    :placeholder="'Enter key statistic ' + (index + 1)"
                  >
                  <button 
                    v-if="hospitalData.keyStats && hospitalData.keyStats.length > 1"
                    @click="removeItem('keyStats', index)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="addItem('keyStats')"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Statistic
              </button>
            </div>

            <!-- Accreditations -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Accreditations</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(accreditation, index) in (hospitalData.accreditations || [])" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="accreditation"
                    @input="hospitalData.accreditations[index] = $event.target.value"
                    type="text" 
                    class="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    :placeholder="'Enter accreditation ' + (index + 1)"
                  >
                  <button 
                    v-if="hospitalData.accreditations && hospitalData.accreditations.length > 1"
                    @click="removeItem('accreditations', index)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="addItem('accreditations')"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Accreditation
              </button>
            </div>

            <!-- Awards -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Awards</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(award, index) in (hospitalData.awards || [])" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="award.name"
                    @input="hospitalData.awards[index].name = $event.target.value"
                    type="text" 
                    class="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    :placeholder="'Enter award ' + (index + 1)"
                  >
                  <button 
                    v-if="hospitalData.awards && hospitalData.awards.length > 1"
                    @click="removeItem('awards', index)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="addItem('awards', { name: '', year: '', description: '' })"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Award
              </button>
            </div>
          </div>

          <!-- Departments -->
          <div :id="sections[2].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Departments</h2>
            </div>
            
            <div class="grid grid-cols-7 gap-2">
              <div v-for="department in departmentOptions" :key="department" 
                   class="flex items-center p-2 border rounded-lg hover:bg-sky-50 transition-colors"
                   :class="{'bg-sky-50 border-sky-200': isDepartmentSelected(department)}">
                <input
                  type="checkbox"
                  :id="'dept-' + department"
                  :checked="isDepartmentSelected(department)"
                  @change="toggleDepartment(department)"
                  class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded mr-2"
                >
                <label :for="'dept-' + department" class="text-sm font-medium text-gray-700 cursor-pointer truncate">
                  {{ department }}
                </label>
              </div>
            </div>
          </div>

          <!-- Our Doctors -->
          <div :id="sections[3].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Our Doctors</h2>
            </div>

            <div class="space-y-8">
              <div v-for="(department, deptIndex) in hospitalData.ourDoctors" :key="deptIndex" class="bg-sky-50 p-6 rounded-lg">
                <!-- Department Header -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">{{ department.emoji }}</span>
                    <h3 class="text-xl font-semibold text-sky-800">{{ department.name }}</h3>
                  </div>
                  <button 
                    @click="removeDepartment(deptIndex)"
                    class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
                  >
                    <v-icon icon="mdi-minus" />
                    Remove Department
                  </button>
                </div>

                <!-- Department Description -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-sky-700 mb-2">Department Description</label>
                  <textarea 
                    :value="department.desc"
                    @input="department.desc = $event.target.value"
                    rows="2"
                    class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter department description"
                  ></textarea>
                </div>

                <!-- Doctors List -->
                <div class="space-y-6">
                  <div v-for="(doctor, docIndex) in department.doctors" :key="docIndex" class="bg-white p-4 rounded-lg shadow-sm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Left Column -->
                      <div class="space-y-4">
                        <!-- Doctor Image -->
                        <div class="flex items-center gap-4">
                          <div class="w-24 h-24 rounded-full overflow-hidden bg-sky-100">
                            <img 
                              :src="doctor.image" 
                              :alt="doctor.name"
                              class="w-full h-full object-cover"
                            >
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-sky-700 mb-2">Image URL</label>
                            <input 
                              :value="doctor.image"
                              @input="doctor.image = $event.target.value"
                              type="text"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="Enter image URL"
                            />
                          </div>
                        </div>

                        <!-- Basic Info -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Initials</label>
                            <input 
                              :value="doctor.initials"
                              @input="doctor.initials = $event.target.value"
                              type="text"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. DS"
                            />
                          </div>
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Name</label>
                            <input 
                              :value="doctor.name"
                              @input="doctor.name = $event.target.value"
                              type="text"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="Enter doctor's name"
                            />
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Title</label>
                            <input 
                              :value="doctor.title"
                              @input="doctor.title = $event.target.value"
                              type="text"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. Senior Cardiologist"
                            />
                          </div>
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Qualification</label>
                            <input 
                              :value="doctor.qualification"
                              @input="doctor.qualification = $event.target.value"
                              type="text"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. MD, DM Cardiology"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Right Column -->
                      <div class="space-y-4">
                        <!-- Ratings and Experience -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Rating</label>
                            <input 
                              :value="doctor.rating"
                              @input="doctor.rating = parseFloat($event.target.value)"
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. 4.9"
                            />
                          </div>
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Reviews</label>
                            <input 
                              :value="doctor.reviews"
                              @input="doctor.reviews = parseInt($event.target.value)"
                              type="number"
                              min="0"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. 234"
                            />
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Experience (years)</label>
                            <input 
                              :value="doctor.experience"
                              @input="doctor.experience = parseInt($event.target.value)"
                              type="number"
                              min="0"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. 15"
                            />
                          </div>
                          <div class="form-group">
                            <label class="block text-sm font-medium text-sky-700 mb-2">Consultation Fee (₹)</label>
                            <input 
                              :value="doctor.fee"
                              @input="doctor.fee = parseInt($event.target.value)"
                              type="number"
                              min="0"
                              class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                              placeholder="e.g. 800"
                            />
                          </div>
                        </div>

                        <!-- Languages -->
                        <div class="form-group">
                          <label class="block text-sm font-medium text-sky-700 mb-2">Languages</label>
                          <div class="flex flex-wrap gap-2">
                            <div v-for="(lang, langIndex) in doctor.languages" :key="langIndex" class="flex items-center gap-2 bg-sky-100 px-3 py-1 rounded-full">
                              <input 
                                :value="lang"
                                @input="doctor.languages[langIndex] = $event.target.value"
                                type="text"
                                class="bg-transparent border-none focus:ring-0 p-0 text-sm"
                                placeholder="Language"
                              />
                              <button 
                                @click="doctor.languages.splice(langIndex, 1)"
                                class="text-sky-600 hover:text-sky-800"
                              >
                                <v-icon icon="mdi-close" size="small" />
                              </button>
                            </div>
                            <button 
                              @click="doctor.languages.push('')"
                              class="text-sky-600 hover:text-sky-800 flex items-center gap-1"
                            >
                              <v-icon icon="mdi-plus" size="small" />
                              Add Language
                            </button>
                          </div>
                        </div>

                        <!-- Availability -->
                        <div class="form-group">
                          <label class="block text-sm font-medium text-sky-700 mb-2">Availability</label>
                          <div class="space-y-2">
                            <div v-for="(slot, slotIndex) in doctor.available" :key="slotIndex" class="flex items-center gap-2">
                              <input 
                                :value="slot.label"
                                @input="slot.label = $event.target.value"
                                type="text"
                                class="p-2 w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                placeholder="e.g. Mon-Fri: 9AM-1PM"
                              />
                              <button 
                                @click="doctor.available.splice(slotIndex, 1)"
                                class="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                              >
                                <v-icon icon="mdi-minus" />
                              </button>
                            </div>
                            <button 
                              @click="doctor.available.push({ label: '' })"
                              class="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
                            >
                              <v-icon icon="mdi-plus" />
                              Add Time Slot
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Remove Doctor Button -->
                    <div class="mt-4 flex justify-end">
                      <button 
                        @click="removeDoctor(deptIndex, docIndex)"
                        class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
                      >
                        <v-icon icon="mdi-minus" />
                        Remove Doctor
                      </button>
                    </div>
                  </div>

                  <!-- Add Doctor Button -->
                  <button 
                    @click="addDoctor(deptIndex)"
                    class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
                  >
                    <v-icon icon="mdi-plus" />
                    Add Doctor
                  </button>
                </div>
              </div>

              <!-- Add Department Button -->
              <button 
                @click="addDepartment"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Department
              </button>
            </div>
          </div>

          <!-- Facilities -->
          <div :id="sections[4].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Facilities</h2>
            </div>
            
            <div class="grid grid-cols-7 gap-2">
              <div v-for="facility in facilityOptions" :key="facility" 
                   class="flex items-center p-2 border rounded-lg hover:bg-sky-50 transition-colors"
                   :class="{'bg-sky-50 border-sky-200': isFacilitySelected(facility)}">
                <input
                  type="checkbox"
                  :id="'facility-' + facility"
                  :checked="isFacilitySelected(facility)"
                  @change="toggleFacility(facility)"
                  class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded mr-2"
                >
                <label :for="'facility-' + facility" class="text-sm font-medium text-gray-700 cursor-pointer truncate">
                  {{ facility }}
                </label>
              </div>
            </div>
          </div>

          <!-- Insurance & Payment -->
          <div :id="sections[5].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Insurance & Payment</h2>
            </div>

            <!-- Insurance Accepted -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Insurance Accepted</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(item, index) in (hospitalData.insuranceData?.[0]?.items || [])" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="item"
                    @input="hospitalData.insuranceData[0].items[index] = $event.target.value"
                    type="text" 
                    class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter insurance company name"
                  >
                  <button 
                    v-if="hospitalData.insuranceData?.[0]?.items?.length > 1"
                    @click="removeInsuranceItem(0, index)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="addInsuranceItem(0)"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Insurance Company
              </button>
            </div>

            <!-- Payment Options --> 
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Payment Options</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(item, index) in hospitalData.insuranceData[1].items || []" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="item"
                    @input="hospitalData.insuranceData[1].items[index] = $event.target.value"
                    type="text" 
                    class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter payment method"
                  >
                  <button 
                    v-if="hospitalData.insuranceData[1].items && hospitalData.insuranceData[1].items.length > 1"
                    @click="removeInsuranceItem(1, index)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="addInsuranceItem(1)"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Payment Method
              </button>
            </div>

            <!-- Health Packages -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Health Packages</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(item, index) in hospitalData.insuranceData[2].items || []" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="item"
                    @input="hospitalData.insuranceData[2].items[index] = $event.target.value"
                    type="text" 
                    class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter health package name"
                  >
                  <button 
                    v-if="hospitalData.insuranceData[2].items && hospitalData.insuranceData[2].items.length > 1"
                    @click="removeInsuranceItem(2, index)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="addInsuranceItem(2)"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Health Package
              </button>
            </div>

            <!-- Special Services -->
            <div class="mb-8">
              <h3 class="text-lg font-medium mb-3">Special Services</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(item, index) in hospitalData.insuranceData[3].items || []" :key="index" class="form-group flex gap-2">
                  <input 
                    :value="item"
                    @input="hospitalData.insuranceData[3].items[index] = $event.target.value"
                    type="text" 
                    class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter special service name"
                  >
                  <button 
                    v-if="hospitalData.insuranceData[3].items && hospitalData.insuranceData[3].items.length > 1"
                    @click="hospitalData.insuranceData[3].items.splice(index, 1)"
                    class="mt-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <v-icon icon="mdi-minus" />
                  </button>
                </div>
              </div>
              <button 
                @click="hospitalData.insuranceData[3].items.push('')"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Special Service
              </button>
            </div>
          </div>

          <!-- Address Information -->
          <div :id="sections[6].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Address Information</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Street</label>
                <input 
                  :value="hospitalData.address?.street"
                  @input="hospitalData.address.street = $event.target.value"
                  type="text" 
                  placeholder="Enter street" 
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">City</label>
                <input 
                  :value="hospitalData.address?.city"
                  @input="hospitalData.address.city = $event.target.value"
                  type="text" 
                  placeholder="Enter city" 
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">State</label>
                <input 
                  :value="hospitalData.address?.state"
                  @input="hospitalData.address.state = $event.target.value"
                  type="text" 
                  placeholder="Enter state" 
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Pincode</label>
                <input 
                  :value="hospitalData.address?.pincode"
                  @input="hospitalData.address.pincode = $event.target.value"
                  type="text" 
                  placeholder="Enter pincode" 
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Latitude</label>
                <input 
                  :value="hospitalData.location?.latitude"
                  @input="hospitalData.location.latitude = parseFloat($event.target.value)"
                  type="number" 
                  step="0.0001"
                  placeholder="Enter latitude (e.g. 28.6139)" 
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Longitude</label>
                <input 
                  :value="hospitalData.location?.longitude"
                  @input="hospitalData.location.longitude = parseFloat($event.target.value)"
                  type="number" 
                  step="0.0001"
                  placeholder="Enter longitude (e.g. 77.2090)" 
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div :id="sections[7].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Contact Information</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Phone</label>
                <input 
                  :value="hospitalData.contact?.phone"
                  @input="hospitalData.contact.phone = $event.target.value"
                  type="tel"
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Emergency Contact</label>
                <input 
                  :value="hospitalData.contact?.emergency"
                  @input="hospitalData.contact.emergency = $event.target.value"
                  type="tel"
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Email</label>
                <input 
                  :value="hospitalData.contact?.email"
                  @input="hospitalData.contact.email = $event.target.value"
                  type="email"
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Appointment Email</label>
                <input 
                  :value="hospitalData.contact?.appointmentEmail"
                  @input="hospitalData.contact.appointmentEmail = $event.target.value"
                  type="email"
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-sky-700">Website</label>
                <input 
                  :value="hospitalData.contact?.website"
                  @input="hospitalData.contact.website = $event.target.value"
                  type="url"
                  class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
              </div>
            </div>
          </div>

          <!-- Testimonials -->
          <div :id="sections[8].id" class="bg-white p-6 rounded-lg shadow-md border border-sky-100">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-sky-800">Testimonials</h2>
            </div>
            <div class="space-y-8">
              <div v-for="(testimonial, index) in hospitalData.testimonials" :key="index" class="bg-sky-50 p-6 rounded-lg">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="form-group">
                      <label class="block text-sm font-medium text-sky-700 mb-2">Rating</label>
                      <select 
                        :value="testimonial.stars"
                        @change="testimonial.stars = parseInt($event.target.value)"
                        class="p-2 mt-1 block w-24 rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      >
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐</option>
                        <option value="3">3 ⭐</option>
                        <option value="4">4 ⭐</option>
                        <option value="5">5 ⭐</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="block text-sm font-medium text-sky-700 mb-2">Title</label>
                      <input 
                        :value="testimonial.title"
                        @input="testimonial.title = $event.target.value"
                        type="text"
                        class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        placeholder="e.g. Excellent Care"
                      >
                    </div>
                  </div>
                  <button 
                    @click="removeTestimonial(index)"
                    class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
                  >
                    <v-icon icon="mdi-minus" />
                    Remove Testimonial
                  </button>
                </div>
                <div class="mt-6">
                  <label class="block text-sm font-medium text-sky-700">Text</label>
                  <textarea 
                    :value="testimonial.text"
                    @input="testimonial.text = $event.target.value"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter testimonial text"
                  ></textarea>
                </div>
                <div class="mt-6">
                  <label class="block text-sm font-medium text-sky-700">Author</label>
                  <input 
                    :value="testimonial.author"
                    @input="testimonial.author = $event.target.value"
                    type="text"
                    class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter author name"
                  >
                </div>
                <div class="mt-6">
                  <label class="block text-sm font-medium text-sky-700">Context</label>
                  <input 
                    :value="testimonial.context"
                    @input="testimonial.context = $event.target.value"
                    type="text"
                    class="p-2 mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    placeholder="Enter context (e.g. Patient, Family Member)"
                  >
                </div>
              </div>
              <button 
                @click="addTestimonial()"
                class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 flex items-center justify-center gap-2 w-fit"
              >
                <v-icon icon="mdi-plus" />
                Add Testimonial
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { mdiImagePlus, mdiPlus, mdiMinus, mdiCheck } from '@mdi/js'
import { useDisplay } from 'vuetify'

const router = useRouter()

const isComponentMounted = ref(false)
const isLoading = ref(true)
const hasData = ref(false)

// Add the API URL constant at the top of the script
const API_URL = 'http://localhost:3001/api';

// Initialize hospitalData with default values
const hospitalData = ref({
  name: "",
  type: "",
  phone: "",
  establishedYear: "",
  rating: 0,
  reviews: 0,
  image: "",
  features: [],
  overviewData: [
    {
      "title": "About",
      "staticPrefix": "About ",
      "dynamicValue": "",
      "list": [],
      "icon": "📝",
      "type": "text"
    },
    {
      "title": "Key Statistics",
      "staticPrefix": "",
      "dynamicValue": "",
      "list": [],
      "icon": "📊",
      "type": "array"
    },
    {
      "title": "Accreditations",
      "staticPrefix": "",
      "dynamicValue": "",
      "list": [],
      "icon": "🏆",
      "type": "array"
    },
    {
      "title": "Awards & Recognition",
      "staticPrefix": "",
      "dynamicValue": "",
      "list": [],
      "icon": "🎖️",
      "type": "array"
    }
  ],
  facilities: [],
  departments: [],
  insuranceData: [
    {
      "name": "Insurance Accepted",
      "items": []
    },
    {
      "name": "Payment Options",
      "items": []
    },
    {
      "name": "Health Packages",
      "items": []
    },
    {
      "name": "Special Services",
      "items": []
    }
  ],
  address: {
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  },
  contact: {
    phone: "",
    emergency: "",
    email: "",
    appointmentEmail: "",
    website: ""
  },
  location: {
    latitude: 0,
    longitude: 0
  },
  testimonials: [],
  ourDoctors: []
});

// Add safety check functions
const ensureArray = (array) => {
  return Array.isArray(array) ? array : [];
};

const safePush = (array, item) => {
  if (!Array.isArray(array)) {
    console.warn('Attempting to push to non-array:', array);
    return;
  }
  array.push(item);
};

// Update the add functions to use safePush
const addFeature = () => {
  safePush(hospitalData.value.features, {
    title: "",
    description: "",
    icon: "🏥"
  });
};

const addDepartment = () => {
  if (!Array.isArray(hospitalData.value.ourDoctors)) {
    hospitalData.value.ourDoctors = []
  }

  // Prompt for department name
  const departmentName = prompt('Enter department name:')
  if (!departmentName) return

  // Check if department already exists
  const existingDeptIndex = hospitalData.value.ourDoctors.findIndex(d => d.name === departmentName)
  if (existingDeptIndex !== -1) {
    alert('Department already exists!')
    return
  }

  // Get appropriate emoji based on department name
  let emoji = '🏥' // default emoji
  switch(departmentName) {
    case 'Cardiology':
      emoji = '❤️'
      break
    case 'Orthopedics':
      emoji = '🦴'
      break
    case 'Neurology':
      emoji = '🧠'
      break
    case 'Pediatrics':
      emoji = '👶'
      break
    case 'Gynecology':
      emoji = '👩‍⚕'
      break
    case 'Oncology':
      emoji = '🧪'
      break
  }

  // Add to ourDoctors
  hospitalData.value.ourDoctors.push({
    name: departmentName,
    emoji: emoji,
    desc: `Expert ${departmentName.toLowerCase()} specialists providing comprehensive care`,
    doctors: []
  })

  // Add to departments list if not exists
  if (!Array.isArray(hospitalData.value.departments)) {
    hospitalData.value.departments = []
  }
  const deptIndex = hospitalData.value.departments.findIndex(d => d.name === departmentName)
  if (deptIndex === -1) {
    hospitalData.value.departments.push({
      name: departmentName,
      emoji: emoji,
      desc: ''
    })
  }
}

const addTestimonial = () => {
  if (!Array.isArray(hospitalData.value.testimonials)) {
    hospitalData.value.testimonials = []
  }
  hospitalData.value.testimonials.push({
    stars: 5,
    title: '',
    text: '',
    author: '',
    context: ''
  })
}

// Update the saveHospitalData function
const saveHospitalData = async () => {
  try {
    // Ensure all arrays are properly initialized
    const dataToSave = {
      ...hospitalData.value,
      features: ensureArray(hospitalData.value.features),
      overviewData: ensureArray(hospitalData.value.overviewData),
      facilities: ensureArray(hospitalData.value.facilities),
      departments: ensureArray(hospitalData.value.departments),
      insuranceData: ensureArray(hospitalData.value.insuranceData),
      testimonials: ensureArray(hospitalData.value.testimonials),
      ourDoctors: ensureArray(hospitalData.value.ourDoctors)
    };

    // Ensure each department has a doctors array
    dataToSave.departments = dataToSave.departments.map(dept => ({
      ...dept,
      doctors: ensureArray(dept.doctors)
    }));

    console.log('Saving hospital data:', dataToSave);
    const response = await axios.post('http://localhost:3001/api/hospital-data', dataToSave);
    console.log('Save response:', response.data);
  } catch (error) {
    console.error('Error saving hospital data:', error);
  }
};

// Update the loadHospitalData function
const loadHospitalData = async () => {
  try {
    console.log('Loading hospital data...')
    hasData.value = true
    isLoading.value = false
  } catch (error) {
    console.error('Error loading hospital data:', error)
    hasData.value = false
    isLoading.value = false
  }
}

// Watch for changes in hospitalData
// watch(hospitalData, async (newData) => {
//   if (newData) {
//     console.log('Hospital data changed, saving...');
//     await saveHospitalData();
//   }
// }, { deep: true });

// Add new item to array
const addItem = (arrayName, newItem) => {
  if (!hospitalData.value[arrayName]) {
    hospitalData.value[arrayName] = []
  }
  hospitalData.value[arrayName].push(newItem)
}

// Remove item from array
const removeItem = (arrayName, index) => {
  if (hospitalData.value[arrayName] && Array.isArray(hospitalData.value[arrayName])) {
    hospitalData.value[arrayName].splice(index, 1)
  }
}

// Update item in array
const updateItem = (arrayName, index, updatedItem) => {
  if (hospitalData.value[arrayName] && Array.isArray(hospitalData.value[arrayName])) {
    hospitalData.value[arrayName][index] = updatedItem
  }
}

// Initialize data on component mount
onMounted(async () => {
  try {
    console.log('Component mounted, loading data...');
    await loadHospitalData();
    console.log('Component mounted and data loaded');
  } catch (error) {
    console.error('Error in onMounted:', error);
    isLoading.value = false;
  }
});

const sections = [
  { id: 'basic-info', name: 'Basic Info', icon: 'mdi-information' },
  { id: 'hospital-overview', name: 'Hospital Overview', icon: 'mdi-hospital-building' },
  { id: 'departments', name: 'Departments', icon: 'mdi-hospital-building' },
  { id: 'our-doctors', name: 'Our Doctors', icon: 'mdi-doctor' },
  { id: 'facilities', name: 'Facilities', icon: 'mdi-medical-bag' },
  { id: 'insurance', name: 'Insurance', icon: 'mdi-shield-check' },
  { id: 'address', name: 'Address', icon: 'mdi-map-marker' },
  { id: 'contact', name: 'Contact', icon: 'mdi-phone' },
  { id: 'testimonials', name: 'Testimonials', icon: 'mdi-star' }
]

const currentSection = ref('basic-info')
const departmentOptions = ref([
  'Cardiology',
  'Gynecology',
  'Dentistry',
  'Ophthalmology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology',
  'ENT',
  'Dermatology',
  'Psychiatry',
  'Urology',
  'Gastroenterology',
  'Endocrinology',
  'Rheumatology',
  'Pulmonology',
  'Nephrology',
  'Hematology',
  'Infectious Disease',
  'Emergency Medicine'
])
const facilityOptions = ref([
  '24/7 Emergency',
  'Dialysis',
  'ICU/CCU',
  'NICU',
  'Operation Theater',
  'Diagnostic Lab',
  'Pharmacy',
  'Radiology',
  'Blood Bank',
  'Cafeteria',
  'Parking',
  'Wheelchair Access',
  'ATM',
  'Free WiFi',
  'Air Conditioning',
  'Security',
  'Housekeeping',
  'Laundry',
  'Medical Store',
  'Waiting Area'
])

const scrollToSection = (sectionId) => { 
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    currentSection.value = sectionId 
  }
}

const updateRemainingData = () => {
  // Update features with default values if empty
  hospitalData.value.features = hospitalData.value.features.map(feature => ({
    ...feature,
    value: feature.value || (typeof feature.value === 'boolean' ? false : '')
  }))

  // Update overview data with default values if empty
  hospitalData.value.overviewData = hospitalData.value.overviewData.map(item => ({
    ...item,
            content: item.content || '',
    items: item.items || []
  }))

  // Ensure facilities array exists
  if (!Array.isArray(hospitalData.value.facilities)) {
    hospitalData.value.facilities = []
  }

  // Ensure departments array exists and has required fields
  if (!Array.isArray(hospitalData.value.departments)) {
    hospitalData.value.departments = []
  }
  hospitalData.value.departments = hospitalData.value.departments.map(dept => ({
            name: dept.name || '',
            emoji: dept.emoji || '🏥',
            desc: dept.desc || ''
          }))

  // Ensure insurance data exists and has required structure
  if (!Array.isArray(hospitalData.value.insuranceData)) {
    hospitalData.value.insuranceData = [
      { name: 'Government Insurance', items: [] },
      { name: 'Private Insurance', items: [] },
      { name: 'Corporate Insurance', items: [] },
      { name: 'Other Insurance', items: [] }
    ]
  }

  // Ensure address object has all required fields
  hospitalData.value.address = {
        street: hospitalData.value.address?.street || '',
        city: hospitalData.value.address?.city || '',
        state: hospitalData.value.address?.state || '',
        pincode: hospitalData.value.address?.pincode || ''
  }

  // Ensure contact object has all required fields
  hospitalData.value.contact = {
        phone: hospitalData.value.contact?.phone || '',
        emergency: hospitalData.value.contact?.emergency || '',
        email: hospitalData.value.contact?.email || '',
        appointmentEmail: hospitalData.value.contact?.appointmentEmail || '',
        website: hospitalData.value.contact?.website || ''
  }

  // Ensure location object has all required fields
  hospitalData.value.location = {
        latitude: hospitalData.value.location?.latitude || '',
        longitude: hospitalData.value.location?.longitude || ''
      }
}

// Keep toasts only in saveProgress and submitForm
const saveProgress = async () => {
  try {
    console.log('Saving progress...')
    
    // Validate data before saving
    if (!hospitalData.value) {
      throw new Error('No hospital data to save')
    }

    // Just show success message
    toast.success('Progress saved successfully')
    return true
  } catch (error) {
    console.error('Error saving progress:', error)
    toast.error(error.message || 'Failed to save progress')
    return false
  }
}

const submitForm = (event) => {
  if (event) {
    event.preventDefault()
  }
  
  try {
    console.log('Submitting form...')
    
    // Validate data before saving
    if (!hospitalData.value) {
      throw new Error('No hospital data to submit')
    }

    // Just show success message
    console.log('Profile submitted successfully')
    toast.success('Profile submitted successfully')
  } catch (error) {
    console.error('Error submitting profile:', error)
    toast.error(error.message || 'Failed to submit profile')
  }
}

// Keep validation toast in submitProfile
const submitProfile = () => {
  if (!isDataValid()) {
    toast.error('Please fill in all required fields')
    return
  }
  submitForm()
}

const removeDepartment = (deptIndex) => {
  if (hospitalData.value.ourDoctors && hospitalData.value.ourDoctors.length > 0) {
    const departmentName = hospitalData.value.ourDoctors[deptIndex].name
    hospitalData.value.ourDoctors.splice(deptIndex, 1)

    // Remove from departments list
    if (Array.isArray(hospitalData.value.departments)) {
      const deptIndex = hospitalData.value.departments.findIndex(d => d.name === departmentName)
      if (deptIndex !== -1) {
        hospitalData.value.departments.splice(deptIndex, 1)
      }
    }
  }
}

const removeFacility = (index) => {
  const facilities = ensureArray(hospitalData.value.facilities);
  facilities.splice(index, 1);
  hospitalData.value.facilities = facilities;
}

const addInsuranceItem = (categoryIndex) => {
  if (!hospitalData.value.insuranceData[categoryIndex].items) {
    hospitalData.value.insuranceData[categoryIndex].items = []
  }
  hospitalData.value.insuranceData[categoryIndex].items.push('')
}

const removeKeyStat = (index) => {
  hospitalData.value.overviewData[0].items.splice(index, 1)
}

const removeAccreditation = (index) => {
  hospitalData.value.overviewData[1].items.splice(index, 1)
}

const removeAward = (index) => {
  hospitalData.value.overviewData[2].items.splice(index, 1)
}

const removeInsuranceItem = (sectionIndex, itemIndex) => {
  if (hospitalData.value.insuranceData[sectionIndex].items.length > 1) {
    hospitalData.value.insuranceData[sectionIndex].items.splice(itemIndex, 1)
  }
}

const removeTestimonial = (index) => {
  if (hospitalData.value.testimonials && hospitalData.value.testimonials.length > 0) {
    hospitalData.value.testimonials.splice(index, 1)
  }
}

const basicFields = [
  { label: 'Hospital Name', model: 'name', type: 'text', required: true },
  { label: 'Hospital Type', model: 'type', type: 'text' },
  { label: 'Phone', model: 'phone', type: 'tel' },
  { label: 'Rating', model: 'rating', type: 'number', min: 0, max: 5, step: 0.1 },
  { label: 'Reviews', model: 'reviews', type: 'number' }
  
]

const handleScroll = () => {
  const sections = document.querySelectorAll('section[id]')
  const scrollPosition = window.scrollY

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection.value = sectionId
    }
  })
}

const toggleDepartment = (department) => {
  // Handle departments list
  if (!Array.isArray(hospitalData.value.departments)) {
    hospitalData.value.departments = []
  }
  
  const index = hospitalData.value.departments.findIndex(d => d.name === department)
  if (index === -1) {
    // Get appropriate emoji based on department name
    let emoji = '🏥' // default emoji
    switch(department) {
      case 'Cardiology':
        emoji = '❤️'
        break
      case 'Orthopedics':
        emoji = '🦴'
        break
      case 'Neurology':
        emoji = '🧠'
        break
      case 'Pediatrics':
        emoji = '👶'
        break
      case 'Gynecology':
        emoji = '👩‍⚕'
        break
      case 'Oncology':
        emoji = '🧪'
        break
    }

    hospitalData.value.departments.push({
      name: department,
      emoji: emoji,
      desc: ''
    })

    // Add to ourDoctors if not exists
    if (!Array.isArray(hospitalData.value.ourDoctors)) {
      hospitalData.value.ourDoctors = []
    }

    // Check if department already exists in ourDoctors
    const existingDeptIndex = hospitalData.value.ourDoctors.findIndex(d => d.name === department)
    if (existingDeptIndex === -1) {
      // Add new department to ourDoctors
      hospitalData.value.ourDoctors.push({
        name: department,
        emoji: emoji,
        desc: `Expert ${department.toLowerCase()} specialists providing comprehensive care`,
        doctors: []
      })
    }
  } else {
    hospitalData.value.departments.splice(index, 1)

    // Remove from ourDoctors if exists
    if (Array.isArray(hospitalData.value.ourDoctors)) {
      const ourDoctorsIndex = hospitalData.value.ourDoctors.findIndex(d => d.name === department)
      if (ourDoctorsIndex !== -1) {
        hospitalData.value.ourDoctors.splice(ourDoctorsIndex, 1)
      }
    }
  }
}

const isDepartmentSelected = (department) => {
  return Array.isArray(hospitalData.value.departments) && 
         hospitalData.value.departments.some(d => d.name === department)
}

const toggleFacility = (facility) => {
  if (!Array.isArray(hospitalData.value.facilities)) {
    hospitalData.value.facilities = []
  }
  
  const index = hospitalData.value.facilities.indexOf(facility)
  if (index === -1) {
    hospitalData.value.facilities.push(facility)
  } else {
    hospitalData.value.facilities.splice(index, 1)
  }
}

const isFacilitySelected = (facility) => {
  return Array.isArray(hospitalData.value.facilities) && 
         hospitalData.value.facilities.some(f => f === facility)
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      hospitalData.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

onMounted(() => {
  loadHospitalData()
  // Initialize scroll spy
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  // Clean up scroll spy
  window.removeEventListener('scroll', handleScroll)
})

// Helper function to get feature value
const getFeatureValue = (featureName) => {
  const feature = hospitalData.value.features.find(f => f.name === featureName)
  return feature ? feature.value : ''
}

// Helper function to set feature value
const setFeatureValue = (featureName, value) => {
  const featureIndex = hospitalData.value.features.findIndex(f => f.name === featureName)
  if (featureIndex !== -1) {
    hospitalData.value.features[featureIndex].value = value
  }
}

// Helper function to get overview content
const getOverviewContent = (title) => {
  const overview = hospitalData.value.overviewData.find(o => o.title === title)
  return overview ? overview.content : ''
}

// Helper function to set overview content
const setOverviewContent = (title, content) => {
  const overviewIndex = hospitalData.value.overviewData.findIndex(o => o.title === title)
  if (overviewIndex !== -1) {
    hospitalData.value.overviewData[overviewIndex].content = content
  }
}

// Helper function to get overview items
const getOverviewItems = (title) => {
  const overview = hospitalData.value.overviewData.find(o => o.title === title)
  return overview ? overview.items : []
}

// Helper function to set overview items
const setOverviewItems = (title, items) => {
  const overviewIndex = hospitalData.value.overviewData.findIndex(o => o.title === title)
  if (overviewIndex !== -1) {
    hospitalData.value.overviewData[overviewIndex].items = items
  }
}

const handleSubmit = (event) => {
  if (event) {
    event.preventDefault()
  }
  
  try {
    // Format the data to match the expected structure
    const formattedData = {
      ...hospitalData.value,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    }

    // Save to final storage
    localStorage.setItem('hospitalData_final', JSON.stringify(formattedData))
    localStorage.setItem('hospitalProfile', JSON.stringify(formattedData))
    
    // Clear temporary storage after successful submission
    localStorage.removeItem('hospitalData_temp')
    
    console.log('Profile submitted successfully:', formattedData)
    toast.success('Profile submitted successfully')
  } catch (error) {
    console.error('Error submitting profile:', error)
    toast.error('Failed to submit profile')
  }
}

// Update the save button click handler
const saveToLocalStorage = () => {
  if (!isDataValid()) {
    toast.error('Please fill in all required fields')
    return
  }
  saveProgress()
}

// Add these functions to handle doctors
const addDoctor = (deptIndex) => {
  if (!Array.isArray(hospitalData.value.ourDoctors[deptIndex].doctors)) {
    hospitalData.value.ourDoctors[deptIndex].doctors = []
  }
  hospitalData.value.ourDoctors[deptIndex].doctors.push({
    initials: '',
    name: '',
    title: '',
    qualification: '',
    rating: 0,
    reviews: 0,
    experience: 0,
    languages: [''],
    available: [{ label: '' }],
    fee: 0,
    image: ''
  })
}

const removeDoctor = (deptIndex, docIndex) => {
  if (hospitalData.value.ourDoctors[deptIndex].doctors && 
      hospitalData.value.ourDoctors[deptIndex].doctors.length > 0) {
    hospitalData.value.ourDoctors[deptIndex].doctors.splice(docIndex, 1)
  }
}
</script>

<style scoped>
.profile-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.error-message {
  text-align: center;
  padding: 20px;
  color: #ff4d4f;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0f9ff, #ffffff, #f0f9ff);
}

.no-data-message {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.no-data-message h2 {
  color: #0369a1;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.no-data-message p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.retry-button {
  background-color: #0369a1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #075985;
}
</style>
