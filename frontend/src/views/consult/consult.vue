<template>
  <v-container fluid class="prescription-page">
    <v-card class="patient-card mb-4">
      <v-card-title>
        <div>
          <h3 class="font-weight-bold">{{ patientData.fullName }}</h3>
          <p>UID: {{ patientData.uid }}</p>
        </div>
      </v-card-title>
      <v-card-text>
        <p v-if="patientData.phoneNumber">Contact: {{ patientData.phoneNumber }}</p>
        <p v-if="patientData.email">Email: {{ patientData.email }}</p>
        <p v-if="patientData.gender">Gender: {{ patientData.gender }}</p>
        <p v-if="patientData.age">Age: {{ patientData.age }}</p>
        <p v-if="patientData.bloodGroup">Blood Group: {{ patientData.bloodGroup }}</p>
        <p v-if="patientData.allergies">Allergies: {{ patientData.allergies }}</p>
        <p v-if="patientData.dateOfBirth">Date of Birth: {{ patientData.dateOfBirth }}</p>
        <p v-if="patientData.tags">Category: {{ patientData.tags }}</p>
        <p v-if="patientData.address">Address: {{ patientData.address }}</p>
      </v-card-text>
    </v-card>
    <div class="d-flex mb-4">
      <v-btn class="saaro-btn" style="width: 100%; margin-left: auto;" text @click="showSettingsForSection = true">Add
        Section</v-btn>
    </div>
    <!-- Vitals Section -->
    <v-card class="section-card vitals">
      <v-toolbar flat style="column-gap: 20px; padding: 0px 20px;">
        <div class="prescription-page-icon">
          <v-icon>mdi-clipboard-pulse-outline</v-icon>
        </div>
        <v-toolbar-title class="ml-3">Vitals</v-toolbar-title>

        <!-- Settings Button -->
        <v-spacer></v-spacer>
        <v-btn icon @click="showSettings = true">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Dynamic Form Grid -->
      <v-container class="max-w-auto">
        <v-row v-for="(row, rowIndex) in chunkArray(dynamicFields, 6)" :key="rowIndex">
          <v-col v-for="(item, index) in row" :key="index" cols="12" md="2">
            <div class="lable-dev">
              <span>{{ item.label }}</span>
            </div>
            <!-- Dynamically Render Text or Date Input -->
            <v-textarea v-if="item.type === 'text'" variant="outlined" v-model="vitals[item.model]"
              :placeholder="item.placeholder" rows="1" auto-grow></v-textarea>
            <v-text-field v-else-if="item.type === 'date'" variant="outlined" v-model="vitals[item.model]"
              type="date"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <!-- Complaints Section -->
    <v-card class="section-card">
      <v-data-table :items="complaintsList" class="elevation-1" disable-sort>
        <template v-slot:top>
          <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
            class="investigation-template">
            <!-- Left side -->
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-clipboard-text-clock</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Complaints</v-toolbar-title>
            </div>

            <!-- Right side -->
            <div class="d-flex">
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Complaints', 1, complaintsList, complaintSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
              <v-menu offset-y class="template" v-if="complaintsTemplate.length > 0">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon v-bind="props" class="icon-spacing">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-progress-upload</v-icon>
                    </div>
                  </v-btn>
                </template>
                <v-list style="width: 100%;">
                  <v-list-item v-for="(template, index) in complaintsTemplate" :key="index"
                    @click="AddComplaintsTemplate(template)">
                    {{ template.name }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }" class="print-table">
          <v-combobox variant="outlined" v-model="item.name" :items="complaintSuggestions" hide-details
            @update:modelValue="handleInputComplaints(item)" @keydown.enter="focusNextInput"
            style="margin-bottom: 10px;"></v-combobox>
        </template>
      </v-data-table>
    </v-card>

    <div class="d-flex align-start">
      <div class="v-col-6 pr-6">
        <!-- History Section -->
        <v-card class="section-card">
          <v-data-table :items="historyList" class="elevation-1" disable-sort>
            <template v-slot:top>
              <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
                class="investigation-template">
                <!-- Left side -->
                <div style="align-items: center;  display: flex;  justify-content: space-between;">
                  <div class="prescription-page-icon">
                    <v-icon>mdi-human-edit</v-icon>
                  </div>
                  <v-toolbar-title class="ml-3">History</v-toolbar-title>
                </div>

                <!-- Right side -->
                <div class="d-flex">
                  <v-btn flat icon class="icon-spacing"
                    @click="AddDropdown('History', 2, historyList, historySuggestions)">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-content-save-check</v-icon>
                    </div>
                  </v-btn>
                  <v-menu offset-y class="template" v-if="historyTemplate.length > 0">
                    <template v-slot:activator="{ props }">
                      <v-btn flat icon v-bind="props" class="icon-spacing">
                        <div class="prescription-page-icon">
                          <v-icon>mdi-progress-upload</v-icon>
                        </div>
                      </v-btn>
                    </template>
                    <v-list style="width: 100%;">
                      <v-list-item v-for="(template, index) in historyTemplate" :key="index"
                        @click="AddHistoryTemplate(template)">
                        {{ template.name }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-toolbar>
            </template>
            <template v-slot:item.name="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.name" :items="historySuggestions" hide-details
                @update:modelValue="handleInputHistory(item)" @keydown.enter="focusNextInput"
                style=" margin-bottom: 10px;"></v-combobox>
            </template>
          </v-data-table>
        </v-card>

        <!-- Previous Surgery Section -->
        <v-card class="section-card">
          <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
            <div class="prescription-page-icon">
              <v-icon>mdi-hospital</v-icon>
            </div>
            <v-toolbar-title class="ml-3">Previous Surgery</v-toolbar-title>
          </v-toolbar>
          <v-combobox class="px-5" variant="outlined" v-model="previousSurgery" @keydown.enter="focusNextInput"
            outlined>
          </v-combobox>
        </v-card>
      </div>

      <div class="v-col-6 pl-6">
        <!-- Drug History Section -->
        <v-card class="section-card fix-box">
          <v-data-table :items="drugHistory" class="elevation-1" disable-sort>
            <template v-slot:top>
              <v-toolbar flat style="padding: 0px 20px; display: flex;">
                <div class="prescription-page-icon">
                  <v-icon>mdi-allergy</v-icon>
                </div>
                <v-toolbar-title class="ml-3">Drug History</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.name="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.name" hide-details @input="handleInputDrugHistory(item)"
                @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
              </v-combobox>
            </template>
            <template v-slot:item.details="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.details" hide-details @input="handleInputDrugHistory(item)"
                @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
              </v-combobox>
            </template>
          </v-data-table>
        </v-card>

        <!-- Drug Allergy Section -->
        <v-card class="section-card fix-box">
          <v-data-table :items="drugAllergy" class="elevation-1" disable-sort>
            <template v-slot:top>
              <v-toolbar flat style="padding: 0px 20px; display: flex;">
                <div class="prescription-page-icon">
                  <v-icon>mdi-allergy</v-icon>
                </div>
                <v-toolbar-title class="ml-3">Drug Allergy</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.name="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.name" hide-details @input="handleInputDrugAllergy(item)"
                @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
              </v-combobox>
            </template>
            <template v-slot:item.details="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.details" hide-details @input="handleInputDrugAllergy(item)"
                @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
              </v-combobox>
            </template>
          </v-data-table>
        </v-card>

        <!-- Antiplatlet/Anticogulant Section -->
        <v-card class="section-card fix-box">
          <v-data-table :items="antiplatlet" class="elevation-1" disable-sort>
            <template v-slot:top>
              <v-toolbar flat style="padding: 0px 20px; display: flex;">
                <div class="prescription-page-icon">
                  <v-icon>mdi-allergy</v-icon>
                </div>
                <v-toolbar-title class="ml-3">Antiplatelet/Anticogulant</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.name="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.name" hide-details @input="handleInputAntiplatlet(item)"
                @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
              </v-combobox>
            </template>
            <template v-slot:item.details="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.details" hide-details @input="handleInputAntiplatlet(item)"
                @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
              </v-combobox>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>

    <!-- Physical Examination Section -->
    <v-card class="section-card">
      <v-data-table :items="physicalExamList" class="elevation-1" disable-sort>
        <template v-slot:top>
          <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
            class="investigation-template">
            <!-- Left side -->
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-clipboard-edit-outline</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Physical Examination</v-toolbar-title>
            </div>

            <!-- Right side -->
            <div class="d-flex">
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Physical Examination', 3, physicalExamList, physicalSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
              <v-menu offset-y class="template" v-if="physicalExaminationTemplate.length > 0">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon v-bind="props" class="icon-spacing">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-progress-upload</v-icon>
                    </div>
                  </v-btn>
                </template>
                <v-list style="width: 100%;">
                  <v-list-item v-for="(template, index) in physicalExaminationTemplate" :key="index"
                    @click="AddPhysicalExaminationTemplate(template)">
                    {{ template.name }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }" class="print-table">
          <v-combobox variant="outlined" v-model="item.name" :items="physicalSuggestions" hide-details
            @update:modelValue="handleInputPhysicalExam(item)" @keydown.enter="focusNextInput"
            style=" margin-bottom: 10px;"></v-combobox>
        </template>
      </v-data-table>
    </v-card>

    <div class="d-flex align-start">
      <!-- Provisional Diagnosis Section -->
      <div class="v-col-6 pr-6">
        <v-card class="section-card provisional-box" style="height: 258px;">
          <v-toolbar class="investigation-template mb-4" flat
            style="padding: 0px 20px; display: flex; justify-content: space-between;">
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-clipboard-list-outline</v-icon>
              </div>
              <v-toolbar-title class="ml-3">
                <span>Provisional Diagnosis </span>
                <span style="font-size: 14px;">(will not be printed)</span>
              </v-toolbar-title>
            </div>
            <div>
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Provisional Diagnosis', 4, provisional, provisionalDiagnosisSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
            </div>
          </v-toolbar>
          <v-combobox variant="outlined" v-model="provisional" outlined class="px-5"
            :items="provisionalDiagnosisSuggestions" @keydown.enter="focusNextInput"></v-combobox>
        </v-card>
      </div>

      <!-- Diagnosis Section -->
      <div class="v-col-6 pl-6">
        <v-card class="section-card fix-box">
          <v-data-table :items="diagnosisList" class="elevation-1" disable-sort>
            <template v-slot:top>
              <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
                class="investigation-template">
                <!-- Left side -->
                <div style="align-items: center;  display: flex;  justify-content: space-between;">

                  <div class="prescription-page-icon">
                    <v-icon>mdi-human-male-board</v-icon>
                  </div>
                  <v-toolbar-title class="ml-3">Diagnosis</v-toolbar-title>
                </div>

                <!-- Right side -->
                <div class="d-flex">
                  <v-btn flat icon class="icon-spacing"
                    @click="AddDropdown('Diagnosis', 5, diagnosisList, diagnosisSuggestions)">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-content-save-check</v-icon>
                    </div>
                  </v-btn>
                  <v-menu offset-y class="template" v-if="diagnosisTemplate.length > 0">
                    <template v-slot:activator="{ props }">
                      <v-btn flat icon v-bind="props" class="icon-spacing">
                        <div class="prescription-page-icon">
                          <v-icon>mdi-progress-upload</v-icon>
                        </div>
                      </v-btn>
                    </template>
                    <v-list style="width: 100%;">
                      <v-list-item v-for="(template, index) in diagnosisTemplate" :key="index"
                        @click="AddDiagnosisTemplate(template)">
                        {{ template.name }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>


              </v-toolbar>
            </template>
            <template v-slot:item.type="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.type" :items="diagnosisSuggestions" hide-details
                @update:modelValue="handleInputDiagnosis(item)" @keydown.enter="focusNextInput"
                style=" margin-bottom: 10px;"></v-combobox>
            </template>
            <template v-slot:item.details="{ item }" class="print-table">
              <v-combobox variant="outlined" v-model="item.details" hide-details @input="handleInputDiagnosis(item)"
                @keydown.enter="focusNextInput" style=" margin-bottom: 10px;"></v-combobox>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>

    <v-card class="section-card v-col-12 fix-box">
      <v-data-table :items="investigationAdviceList" class="elevation-1" disable-sort>
        <template v-slot:top>
          <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
            class="investigation-template">
            <!-- Left side -->
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-clipboard-list-outline</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Investigation Advice</v-toolbar-title>
            </div>

            <!-- Right side -->
            <div class="d-flex">
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Investigation Advice', 6, investigationAdviceList, investigationAdviceSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
              <v-menu offset-y class="template" v-if="investigationAdviceTemplate.length > 0">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon v-bind="props" class="icon-spacing">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-progress-upload</v-icon>
                    </div>
                  </v-btn>
                </template>
                <v-list style="width: 100%;">
                  <v-list-item v-for="(template, index) in investigationAdviceTemplate" :key="index"
                    @click="AddInvestigationTemplate(template)">
                    {{ template.name }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }" class="print-table">
          <v-combobox variant="outlined" v-model="item.name" :items="investigationAdviceSuggestions" hide-details
            @update:modelValue="handleInputInvestigationAdvice(item)" @keydown.enter="focusNextInput"
            style=" margin-bottom: 10px;"></v-combobox>
        </template>
        <template v-slot:item.details="{ item }" class="print-table">
          <v-combobox variant="outlined" v-model="item.details" hide-details
            @input="handleInputInvestigationAdvice(item)" @keydown.enter="focusNextInput"
            style=" margin-bottom: 10px;"></v-combobox>
        </template>
      </v-data-table>
    </v-card>


    <!-- Medications Section -->
    <v-card class="section-card fix-box-1">
      <v-data-table :items="medications" :headers="medicationHeaders" class="elevation-1 medication-table" disable-sort>

        <template v-slot:top>
          <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
            class="investigation-template">
            <!-- Left side -->
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-pill-multiple</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Medications</v-toolbar-title>
            </div>

            <!-- Right side -->
            <div class="d-flex">
              <v-btn flat icon class="icon-spacing" @click="AddMedicineDropdown(medications, medicineSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
              <v-menu offset-y class="template" v-if="medicationsTemplate.length > 0">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon v-bind="props" class="icon-spacing">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-progress-upload</v-icon>
                    </div>
                  </v-btn>
                </template>
                <v-list style="width: 100%;">
                  <v-list-item v-for="(template, index) in medicationsTemplate" :key="index"
                    @click="AddMedicationsTemplate(template)">
                    {{ template.name }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:headers="{ props }">
          <tr>
            <th v-for="header in medicationHeaders" :key="header.text" class="head">
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:item.name="{ item }">
          <v-combobox variant="outlined" v-model="item.name" item-value="name" item-title="name" hide-details
            @update:modelValue="handleInput(item, true)" @keydown.enter="focusNextInput" :items="medicineSuggestions"
            class="print-table mb-2 test-data">
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <template v-slot:title>
                  {{ item.raw.name }}
                </template>
                <template v-slot:subtitle>
                  {{ item.raw.composition || 'No Composition' }}
                </template>
              </v-list-item>
            </template>
          </v-combobox>
          <div style="font-size: 12px; display: flex; align-items: center; margin-bottom: 10px;">
            <!-- Edit Composition -->
            <template v-if="!item.isEditingComposition">
              <v-icon size="15" @click="toggleEditComposition(item)" style="margin-right: 5px; cursor: pointer;"
                v-if="item.composition">
                mdi-pencil
              </v-icon>
              <span>{{ item.composition }}</span>
            </template>

            <!-- Input field for editing Composition -->
            <template v-else>
              <input v-model="item.composition" @blur="toggleEditComposition(item)" type="text"
                style="font-size: 12px; flex: 1; padding: 2px;" />
            </template>
          </div>
        </template>


        <template v-slot:item.dosage="{ item }">
          <v-combobox variant="outlined" v-model="item.dosage" hide-details
            @update:modelValue="handleInput(item, false)" @keydown.enter="focusNextInput" :items="dosageSuggestions"
            class="print-table mb-2" style=""></v-combobox>
        </template>
        <template v-slot:item.frequency="{ item }">
          <v-combobox variant="outlined" v-model="item.frequency" :items="frequencyOptions" hide-details
            @update:modelValue="handleInput(item, false)" @keydown.enter="focusNextInput" class="print-table mb-2"
            style=""></v-combobox>
        </template>
        <template v-slot:item.duration="{ item }">
          <v-combobox variant="outlined" v-model="item.duration" :items="durationSuggestions" hide-details
            @update:modelValue="handleInput(item, false)" @keydown.enter="focusNextInput" class="print-table mb-2"
            style=""></v-combobox>
        </template>
        <template v-slot:item.notes="{ item }">
          <v-combobox variant="outlined" v-model="item.notes" hide-details @input="handleInput(item, false)"
            @keydown.enter="focusNextInput" class="print-table mb-2" style=""></v-combobox>
        </template>
      </v-data-table>
    </v-card>

    <!-- Advice Section -->
    <v-card class="section-card">
      <v-data-table :items="adviceList" class="elevation-1" disable-sort>
        <template v-slot:top>
          <v-toolbar flat style="padding: 0px 20px; display: flex; justify-content: space-between;"
            class="investigation-template">
            <!-- Left side -->
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-clipboard-list-outline</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Advice</v-toolbar-title>
            </div>

            <!-- Right side -->
            <div class="d-flex">
              <v-btn flat icon class="icon-spacing" @click="AddDropdown('Advice', 7, adviceList, adviceSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
              <v-menu offset-y class="template" v-if="adviceTemplate.length > 0">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon v-bind="props" class="icon-spacing">
                    <div class="prescription-page-icon">
                      <v-icon>mdi-progress-upload</v-icon>
                    </div>
                  </v-btn>
                </template>
                <v-list style="width: 100%;">
                  <v-list-item v-for="(template, index) in adviceTemplate" :key="index"
                    @click="AddAdviceTemplate(template)">
                    {{ template.name }}
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }" class="print-table">
          <v-combobox variant="outlined" v-model="item.name" :items="adviceSuggestions" hide-details
            @update:modelValue="handleInputAdvice(item)" @keydown.enter="focusNextInput"
            style=" margin-bottom: 10px;"></v-combobox>
        </template>
      </v-data-table>
    </v-card>

    <!-- Follow Up Section -->
    <v-card class="section-card">
      <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
        <div class="prescription-page-icon">
          <v-icon>mdi-history</v-icon>
        </div>
        <v-toolbar-title class="ml-3">Follow Up</v-toolbar-title>
      </v-toolbar>
      <v-row class="px-5">
        <v-col>
          <div class="lable-dev">
            <span>Days</span>
          </div>
          <v-combobox variant="outlined" v-model="followUpDays" type="number" min="0" @input="calculateFollowUpDate()"
            @keydown.enter="focusNextInput"></v-combobox>
        </v-col>

        <v-col>
          <div class="lable-dev">
            <span>Follow Up Date</span>
          </div>
          <v-combobox variant="outlined" v-model="followUpDate" disabled @keydown.enter="focusNextInput"></v-combobox>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="section-card v-col-12 fix-box">
      <v-data-table :items="implant" class="elevation-1 removable" disable-sort>
        <template v-slot:top>
          <v-toolbar flat style="padding: 0px 20px; display: flex;">
            <div class="prescription-page-icon">
              <v-icon>mdi-history</v-icon>
            </div>
            <v-toolbar-title class="ml-3">Any Implant</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item, index }">
          <div v-if="index === 0" class="lable-dev">
            <span>Name</span>
          </div>
          <v-combobox variant="outlined" v-model="item.name" hide-details @input="handleInputImplant(item)"
            @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
          </v-combobox>
        </template>
        <template v-slot:item.removalDate="{ item, index }">
          <div v-if="index === 0" class="lable-dev">
            <span>Removable Date</span>
          </div>
          <v-combobox variant="outlined" v-model="item.removalDate" hide-details type="date"
            @input="handleInputImplant(item)" @keydown.enter="focusNextInput" style="margin-bottom: 10px;">
          </v-combobox>
        </template>
      </v-data-table>
    </v-card>


    <div class="d-flex align-start">
      <div class="v-col-6 pr-6">
        <!-- Referred To Section -->
        <v-card class="section-card">
          <v-toolbar class="investigation-template mb-4" flat
            style="padding: 0px 20px; display: flex; justify-content: space-between;">
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-doctor</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Referred To</v-toolbar-title>
            </div>
            <div>
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Doctor', 8, referredTo.name, doctorNameSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
            </div>
          </v-toolbar>
          <v-row class="px-5">
            <v-col>
              <div class="lable-dev">
                <span>Doctor Name</span>
              </div>
              <v-combobox variant="outlined" v-model="referredTo.name" hide-details :items="doctorNameSuggestions"
                @keydown.enter="focusNextInput"></v-combobox>
            </v-col>
            <v-col>
              <div class="lable-dev">
                <span>Specialty</span>
              </div>
              <v-combobox variant="outlined" v-model="referredTo.specialty"
                @keydown.enter="focusNextInput"></v-combobox>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div class="v-col-6 pl-6">
        <!-- Referred By Section -->
        <v-card class="section-card">
          <v-toolbar class="investigation-template mb-4" flat
            style="padding: 0px 20px; display: flex; justify-content: space-between;">
            <div style="align-items: center;  display: flex;  justify-content: space-between;">

              <div class="prescription-page-icon">
                <v-icon>mdi-human-male</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Referred By</v-toolbar-title>
            </div>
            <div>
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Doctor', 8, referredBy.name, doctorNameSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
            </div>
          </v-toolbar>
          <v-row class="px-5">
            <v-col>
              <div class="lable-dev">
                <span>Doctor Name</span>
              </div>
              <v-combobox variant="outlined" v-model="referredBy.name" :items="doctorNameSuggestions"
                @keydown.enter="focusNextInput"></v-combobox>
            </v-col>
            <v-col>
              <div class="lable-dev">
                <span>Specialty</span>
              </div>
              <v-combobox variant="outlined" v-model="referredBy.specialty"
                @keydown.enter="focusNextInput"></v-combobox>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>

    <div class="d-flex align-start">
      <!-- Surgery Advised Section -->
      <div class="v-col-6 pr-6">
        <v-card class="section-card">
          <v-toolbar class="investigation-template mb-4" flat
            style="padding: 0px 20px; display: flex; justify-content: space-between;">
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-hospital-box-outline</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Surgery Advised</v-toolbar-title>
            </div>
            <div>
              <v-btn flat icon class="icon-spacing"
                @click="AddDropdown('Surgery Adviced', 9, surgeryAdvised, surgeryAdviceSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
            </div>
          </v-toolbar>
          <v-combobox class="px-5" variant="outlined" v-model="surgeryAdvised" outlined
            :items="surgeryAdviceSuggestions" @keydown.enter="focusNextInput"></v-combobox>
        </v-card>
      </div>
      <!-- Tags Section -->
      <div class="v-col-6 pl-6">
        <v-card class="section-card">
          <v-toolbar class="investigation-template mb-4" flat
            style="padding: 0px 20px; display: flex; justify-content: space-between;">
            <div style="align-items: center;  display: flex;  justify-content: space-between;">
              <div class="prescription-page-icon">
                <v-icon>mdi-tag-multiple</v-icon>
              </div>
              <v-toolbar-title class="ml-3">Category</v-toolbar-title>
            </div>
            <div>
              <v-btn flat icon class="icon-spacing" @click="AddDropdown('Tags', 10, tags, tagsSuggestions)">
                <div class="prescription-page-icon">
                  <v-icon>mdi-content-save-check</v-icon>
                </div>
              </v-btn>
            </div>
          </v-toolbar>
          <v-combobox class="px-5" variant="outlined" v-model="tags" outlined :items="tagsSuggestions"
            @keydown.enter="focusNextInput"></v-combobox>
        </v-card>
      </div>
    </div>
    <div class="v-col-12 pa-0">
      <v-card class="section-card" v-for="(data, rowIndex) in dynamicSection" :key="rowIndex">
        <v-toolbar class="mb-4" flat style="column-gap: 20px; padding: 0px 20px;">
          <div class="prescription-page-icon">
            <v-icon>mdi-tag-multiple</v-icon>
          </div>
          <v-toolbar-title class="ml-3">{{ data.label }}</v-toolbar-title>
        </v-toolbar>
        <div class="px-5">
          <v-textarea v-if="data.type === 'text'" variant="outlined" v-model="additionalSectionsData[data.model]"
            :placeholder="data.placeholder" rows="1" auto-grow></v-textarea>
          <v-text-field v-else-if="data.type === 'date'" variant="outlined" v-model="additionalSectionsData[data.model]"
            type="date"></v-text-field>
        </div>
      </v-card>
    </div>

    <!-- Save Prescription Button -->
    <v-btn class="saaro-btn mb-10" @click="savePrescription">Save</v-btn>
    <v-btn class="saaro-btn mb-10" @click="endConsultation('draft')">Print Prescription</v-btn>
    <v-btn class="saaro-btn mb-10" @click="endConsultation('complete')">End Consultation</v-btn>

    <template>
      <div class="text-center pa-4">
        <v-dialog v-model="dialog" class="height: auto">
          <v-card class="print-popup w-75 max-1400">
            <v-card-title class="headline">Save Prescription</v-card-title>
            <v-card-text class="d-flex pr-0 pb-0 pt-0 pl-16">
              <v-row class="w-75 max-1100">
                <v-col class="v-col-12 m-0" style="height: 60vh;">
                  <div style="border: 1px solid #ccc; height: 100%; overflow: hidden;">
                    <iframe :src="prescriptionUrl" width="100%" height="100%" style="border: none;"></iframe>
                  </div>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col class="v-col-10">
                  <div class="text-center pb-10">
                    <v-text-field variant="outlined" v-model="emailInput" label="Email" outlined></v-text-field>
                    <v-btn class="saaro-btn margin-none" @click="sharePrescription('Email')">Email</v-btn>
                  </div>
                  <div class="text-center">
                    <v-text-field variant="outlined" v-model="phoneInput" label="Phone Number" outlined></v-text-field>
                    <v-btn class="saaro-btn margin-none" @click="sharePrescription('WhatsApp/SMS')">WhatsApp/SMS</v-btn>
                  </div>

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closePopup" class="mr-12 px-15 saaro-btn">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>
    </template>

    <!-- Past Prescriptions Section -->
    <h4 class="section-title mb-5 prescription-card-heading">Past Prescriptions</h4>
    <v-row>
      <v-col v-for="prescription in pastPrescriptions" :key="prescription.id" cols="12" md="6">
        <v-card class="prescription-card mb-4" @click="pdfDialogHandle(prescription)" large>
          <v-card-title>
            <span class="font-weight-bold">Prescription ID: {{ prescription.count }}</span>
          </v-card-title>
          <v-card-text>
            <p><strong>Date:</strong> {{ formatedDate(prescription.date) }}</p>
            <p><strong>Diagnosis:</strong> {{ prescription.diagnosis.join(', ') || 'No Diagnosis Added' }}</p>
            <p><strong>Medicines:</strong> {{ prescription.medicines.join(', ') || 'No Medicines Added' }}</p>
            <p>
              <strong>investigation Advice:</strong>
              {{ prescription.investigationsAdviced.join(', ') || 'No Investigation Advice Added' }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="v-col-9">
        <h4 class="section-title prescription-card-heading">Health Records</h4>
      </v-col>
      <v-col class="text-center v-col-3">
        <v-btn class="saaro-btn" color="#4caf50" @click="triggerFileUpload('health')">Upload Health Record</v-btn>
        <input ref="healthFileInput" type="file" accept=".pdf,.png,.jpg,.jpeg" class="d-none"
          @change="handleFileUpload('health')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="record in healthRecords" :key="record.id" cols="12" md="6">
        <v-card class="health-record-card mb-4">
          <v-card-title>
            <span class="font-weight-bold">Document:</span>
          </v-card-title>
          <v-card-text>
            <iframe :src="record.fileUrl" class="preview-pdf"></iframe>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Upload IPD Record -->
    <v-row>
      <v-col class="v-col-9">
        <h4 class="section-title prescription-card-heading">IPD Records</h4>
      </v-col>
      <v-col class="text-center v-col-3">
        <v-btn class="saaro-btn" color="#4caf50" @click="triggerFileUpload('ipd')">Upload IPD Record</v-btn>
        <input ref="ipdFileInput" type="file" accept=".pdf,.png,.jpg,.jpeg" class="d-none"
          @change="handleFileUpload('ipd')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="record in ipdRecords" :key="record.id" cols="12" md="6">
        <v-card class="record-card mb-4">
          <v-card-title>
            <span class="font-weight-bold">Document:</span>
            <!-- <v-btn color="#ff8c00" @click="downloadDocument(record.fileUrl)" class="ml-auto">Download</v-btn> -->
          </v-card-title>
          <v-card-text>
            <iframe :src="record.fileUrl" class="preview-pdf"></iframe>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Prescription Dialog -->
    <v-dialog v-model="pdfDialog" class="height: auto">
      <v-card class="print-popup w-66">
        <v-card-title class="headline">Past Prescription</v-card-title>
        <v-card-text class="d-flex pr-0">
          <v-row class="w-75">
            <v-col class="v-col-12 m-0" style="height: 80vh;">
              <div style="border: 1px solid #ccc; height: 100%; overflow: hidden;">
                <iframe :src="pdfUrl" width="100%" height="100%" style="border: none;"></iframe>
              </div>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col class="v-col-10">
              <div class="text-center pb-10">
                <v-text-field variant="outlined" v-model="emailInput" label="Email" outlined></v-text-field>
                <v-btn class="saaro-btn" @click="sharePrescription('Email')">Email</v-btn>
              </div>
              <div class="text-center">
                <v-text-field variant="outlined" v-model="phoneInput" label="Phone Number" outlined></v-text-field>
                <v-btn class="saaro-btn" @click="sharePrescription('WhatsApp/SMS')">WhatsApp/SMS</v-btn>
              </div>

            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="close-btn">
          <v-spacer></v-spacer>
          <v-btn class="saaro-btn" text @click="closePdfDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- vital Settings Popup Dialog -->
    <v-dialog v-model="showSettings" max-width="500">
      <v-card class="popup-card">
        <v-card-title class="popup-title">Vitals Settings</v-card-title>

        <v-card-text class="popup-detail">
          <v-text-field variant="outlined" v-model="newField.label" label="Field Name"></v-text-field>
          <v-select variant="outlined" v-model="newField.type" label="Select Input Type"
            :items="['text', 'date']"></v-select>
        </v-card-text>

        <v-card-actions class="popup-action">
          <v-btn class="saaro-btn" text @click="closeModal">Cancel</v-btn>
          <v-btn class="saaro-btn" text @click="addField">Add Field</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- add section Settings Popup Dialog -->
    <v-dialog v-model="showSettingsForSection" max-width="500">
      <v-card class="popup-card">
        <v-card-title class="popup-title">Consult Settings</v-card-title>

        <v-card-text class="popup-detail">
          <v-text-field variant="outlined" v-model="newSection.label" label="Section Name"></v-text-field>
          <v-select variant="outlined" v-model="newSection.type" label="Select Input Type"
            :items="['text', 'date']"></v-select>
          <v-switch label="Is Printable?" color="#385D7E" v-model="newSection.isPrint"></v-switch>
        </v-card-text>

        <v-card-actions class="popup-action">
          <v-btn class="saaro-btn" text @click="showSettingsForSection = false">Cancel</v-btn>
          <v-btn class="saaro-btn" text @click="addSection">Add Section</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getDateFormate } from '@/lib/utils/utils';
import { useSnackbarStore } from '../store/snackbar';
export default {
  data() {
    return {
      showSettings: false,
      showSettingsForSection: false,
      vitals: {
        bp: "",
        pulse: "",
        height: "",
        weight: "",
        temperature: "",
        painScore: "",
      },
      additionalSectionsData: {
      },
      dynamicFields: [
        { label: "BP", model: "bp", type: "text", placeholder: "mm/Hg" },
        { label: "Pulse", model: "pulse", type: "text", placeholder: "bpm" },
        { label: "Height", model: "height", type: "text", placeholder: "cm" },
        { label: "Weight", model: "weight", type: "text", placeholder: "kg" },
        { label: "Temperature", model: "temperature", type: "text", placeholder: "°F" },
        { label: "Pain Score", model: "painScore", type: "text", placeholder: "0" },
      ],
      dynamicSection: [],
      newField: { label: "", type: "text" },
      newSection: { label: "", isPrint: false, type: "text" },
      drugAllergyList: [
        { details: "", reaction: "" }
      ],
      patientData: [],
      dosageSuggestions: ['1-0-0', '1-1-0', '0-1-0', '0-1-1', '0-0-1', '1-0-1', '1-1-1'],
      complaintSuggestions: [],
      historySuggestions: [],
      physicalSuggestions: [],
      diagnosisSuggestions: [],
      provisionalDiagnosisSuggestions: [],
      investigationAdviceSuggestions: [],
      medicineSuggestions: [],
      adviceSuggestions: [],
      doctorNameSuggestions: [],
      surgeryAdviceSuggestions: [],
      tagsSuggestions: [],
      durationSuggestions: [
        "1 day",
        "2 days",
        "3 days",
        "4 days",
        "5 days",
        "6 days",
        "7 days",
        "10 days",
        "14 days",
        "15 days",
        "21 days",
        "30 days",
        "6 weeks",
        "8 weeks",
        "12 weeks",
        "16 weeks",
        "1 month",
        "3 months",
        "6 months",
        "1 year"
      ],
      investigationAdviceTemplate: [],
      complaintsTemplate: [],
      historyTemplate: [],
      physicalExaminationTemplate: [],
      diagnosisTemplate: [],
      medicationsTemplate: [],
      adviceTemplate: [],
      dialog: false,
      prescriptionUrl: '',
      visitNumber: '',
      complaintsList: [{ name: '' }],
      search: "",
      historyList: [{ name: '' }],
      drugAllergy: [{ name: '', details: '' }],
      drugHistory: [{ name: '', details: '' }],
      antiplatlet: [{ name: '', details: '' }],
      previousSurgery: '',
      physicalExamList: [{ name: '' }],
      implantList: [
        { type: "", details: "" }
      ],
      implantTypeOptions: ["Dental", "Orthopedic", "Other"],
      diagnosisList: [{ type: '', details: '' }],
      investigationAdviceList: [{ name: "", details: "" }],
      suggestions: ["Blood Test", "MRI Scan", "CT Scan", "X-Ray"],
      provisional: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', notes: '' }],
      adviceList: [{ name: '' }],
      followUpDays: '',
      followUpDate: '',
      implant: [{ name: '', removalDate: '' }],
      referredTo: { name: '', specialty: '' },
      referredBy: { name: '', specialty: '' },
      surgeryAdvised: '',
      pdfDialog: false,
      pdfUrl: '',
      pastPrescriptions: [],
      tags: '',
      diagnosisHeaders: [
        { text: 'Diagnosis Type', align: 'start', value: 'type' },
        { text: 'Details', align: 'start', value: 'details' },
      ],
      emailInput: '',
      phoneInput: '',
      medicationHeaders: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Dosage', align: 'start', value: 'dosage' },
        { text: 'Frequency', align: 'start', value: 'frequency' },
        { text: 'Duration', align: 'start', value: 'duration' },
        { text: 'Notes', align: 'start', value: 'notes' },
      ],
      diagnosisOptions: ['Primary', 'Secondary', 'Tertiary'],
      frequencyOptions: ['Once a day', 'Twice a day', 'Thrice a day', 'SOS'],
      doctorId: '',
      accessToken: '',
      isDraft: false,
      healthRecords: [],
      ipdRecords: [],
      templates: [],
    };
  },
  mounted() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.accessToken = localStorage.getItem('access_token');

    if (!this.doctorId || !this.accessToken) {
      this.$router.push('/login');
    }

    this.fetchFiles();
    this.fetchDraftPrescription();
    this.fetchPatientDetails();
    this.fetchTemplates();
    this.fetchDropdowns();
    this.fetchMedicines();
    this.fetchPriscriptionSections();
  },
  methods: {
    closeModal() {
      this.showSettings = false;
    },
    addField() {
      if (!this.newField.label) return;

      const requestData = {
        label: this.newField.label,
        fieldType: this.newField.type,
        placeholder: "Enter text",
        sectionType: "vitals",
        printable: true
      }

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/prescription-section`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.showSettings = false;
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((res) => {
          if (res) {
            // this.vitals[newModel] = ""; // Add to vitals object
            this.newField = { label: "", type: "text" }; // Reset field
            this.showSettings = false; // Close popup
            this.fetchPriscriptionSections();
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },

    addSection() {
      if (!this.newSection.label) return;

      const requestData = {
        label: this.newSection.label,
        fieldType: this.newSection.type,
        placeholder: "Enter text",
        sectionType: "consult",
        printable: this.newSection.isPrint
      }

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/prescription-section`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.showSettingsForSection = false;
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((res) => {
          if (res) {
            this.fetchPriscriptionSections();
            this.newSection = { label: "", isPrint: false, type: "text" }; // Reset field
            this.showSettingsForSection = false; // Close popup
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },

    // Helper function to split array into chunks of 6
    chunkArray(array, chunkSize) {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    },
    convertToDirectArray(objArray) {
      return objArray?.map(item => item.name);
    },
    focusNextInput(index, field) {
      const currentInput = document.activeElement;
      const allInputs = Array.from(document.querySelectorAll("input"));
      const validInputs = allInputs.filter(input => {
        const ariaLabel = input.getAttribute("aria-label") || "";
        const inputMode = input.getAttribute("inputmode") || "";
        return inputMode !== "none" && !ariaLabel.toLowerCase().includes("open");
      });

      const currentIndex = validInputs.indexOf(currentInput);

      if (currentIndex !== -1 && currentIndex < validInputs.length - 1) {
        validInputs[currentIndex + 1].focus();
      }
    },
    fetchPriscriptionSections() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/prescription-section`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          res.prescriptionSections.forEach((item) => {
            const exists = this.dynamicFields.some(field => field.label === item.label);
            const existsSection = this.dynamicSection.some(field => field.label === item.label);

            if (!exists && item.sectionType === "vitals") {
              this.dynamicFields.push({
                label: item.label,
                model: item.label,
                type: item.fieldType,
                placeholder: item.fieldType === "text" ? "Enter text" : "",
              })
            } else if (!existsSection && item.sectionType === "consult") {
              this.dynamicSection.push({
                label: item.label,
                model: item.label,
                type: item.fieldType,
                placeholder: item.fieldType === "text" ? "Enter text" : "",
              })
            }
          })
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },
    fetchDropdowns() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/dropdown`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const templates = {};

          res.dropdowns.forEach((item) => {
            const sectionName = item.sectionName
              .toLowerCase()
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                index === 0 ? word.toLowerCase() : word.toUpperCase()
              )

            if (!templates[sectionName]) {
              templates[sectionName] = [];
            }

            templates[sectionName].push({
              name: item.name || "Template First",
            });
          });

          this.complaintSuggestions = this.convertToDirectArray(templates.complaints) || [];
          this.historySuggestions = this.convertToDirectArray(templates.history) || [];
          this.physicalSuggestions = this.convertToDirectArray(templates["physical Examination"]) || [];
          this.diagnosisSuggestions = this.convertToDirectArray(templates.diagnosis) || [];
          this.provisionalDiagnosisSuggestions = this.convertToDirectArray(templates["provisional Diagnosis"]) || [];
          this.investigationAdviceSuggestions = this.convertToDirectArray(templates["investigation Advice"]) || [];
          this.adviceSuggestions = this.convertToDirectArray(templates.advice) || [];
          this.doctorNameSuggestions = this.convertToDirectArray(templates.doctor) || [];
          this.surgeryAdviceSuggestions = this.convertToDirectArray(templates["surgery Adviced"]) || [];
          this.tagsSuggestions = this.convertToDirectArray(templates.tags) || [];
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },
    fetchTemplates() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/template`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const templates = {};

          res.templates.forEach((item) => {
            const sectionName = item.sectionName
              .toLowerCase()
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                index === 0 ? word.toLowerCase() : word.toUpperCase()
              )
              .replace(/\s+/g, "") + "Template";

            if (!templates[sectionName]) {
              templates[sectionName] = [];
            }

            const formattedData = item.data
              .filter((dataItem) => {
                return Object.values(dataItem).some((value) => value && value.trim());
              })
              .map((dataItem) => {
                if (sectionName === "complaintsTemplate") {
                  return { name: dataItem.name || "" };
                } else if (sectionName === "diagnosisTemplate") {
                  return { type: dataItem.name || "", details: dataItem.details || "" };
                } else {
                  return dataItem;
                }
              });

            templates[sectionName].push({
              name: item.name || "Template First",
              data: formattedData,
            });
          });

          this.complaintsTemplate = templates.complaintsTemplate || [];
          this.historyTemplate = templates.historyTemplate || [];
          this.physicalExaminationTemplate = templates.physicalExaminationTemplate || [];
          this.diagnosisTemplate = templates.diagnosisTemplate || [];
          this.medicationsTemplate = templates.medicationsTemplate || [];
          this.adviceTemplate = templates.adviceTemplate || [];
          this.investigationAdviceTemplate = templates.investigationAdviceTemplate || [];
        })
        .catch((error) => {
          console.error("Network Error:", error);
        });
    },
    fetchMedicines() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/medicine`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.medicineSuggestions = res.medicines.map((medicine) => ({
            name: medicine.medicineName,
            composition: medicine.composition,
          }));
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    toggleEditComposition(item) {

      if (item.isEditingComposition) {
        item.isEditingComposition = false;
      } else {
        item.isEditingComposition = true;
      }
    },


    // complaints
    handleInputComplaints(item) {
      if (this.isRowFilledComplaints(item) && !this.hasEmptyRowComplaints()) {
        this.complaintsList.push({ name: "" });
      }
      this.removeEmptyRowsComplaints();
    },
    isRowFilledComplaints(item) {
      return item.name;
    },
    hasEmptyRowComplaints() {
      return this.complaintsList.some(
        (med) => !med.name
      );
    },
    removeEmptyRowsComplaints() {
      this.complaintsList = this.complaintsList.filter((med, index) => {
        return this.isRowFilledComplaints(med) || index === this.complaintsList.length - 1;
      });
    },

    // physicalExam
    handleInputPhysicalExam(item) {
      if (this.isRowFilledPhysicalExam(item) && !this.hasEmptyRowPhysicalExam()) {
        this.physicalExamList.push({ name: "" });
      }
      this.removeEmptyRowsPhysicalExam();
    },
    isRowFilledPhysicalExam(item) {
      return item.name;
    },
    hasEmptyRowPhysicalExam() {
      return this.physicalExamList.some(
        (med) => !med.name
      );
    },
    removeEmptyRowsPhysicalExam() {
      this.physicalExamList = this.physicalExamList.filter((med, index) => {
        return this.isRowFilledPhysicalExam(med) || index === this.physicalExamList.length - 1;
      });
    },

    // advice
    handleInputAdvice(item) {
      if (this.isRowFilledAdvice(item) && !this.hasEmptyRowAdvice()) {
        this.adviceList.push({ name: "" });
      }
      this.removeEmptyRowsAdvice();
    },
    isRowFilledAdvice(item) {
      return item.name;
    },
    hasEmptyRowAdvice() {
      return this.adviceList.some(
        (med) => !med.name
      );
    },
    removeEmptyRowsAdvice() {
      this.adviceList = this.adviceList.filter((med, index) => {
        return this.isRowFilledAdvice(med) || index === this.adviceList.length - 1;
      });
    },

    // history
    handleInputHistory(item) {
      if (this.isRowFilledHistory(item) && !this.hasEmptyRowHistory()) {
        this.historyList.push({ name: "" });
      }
      this.removeEmptyRowsHistory();
    },
    isRowFilledHistory(item) {
      return item.name;
    },
    hasEmptyRowHistory() {
      return this.historyList.some(
        (med) => !med.name
      );
    },
    removeEmptyRowsHistory() {
      this.historyList = this.historyList.filter((med, index) => {
        return this.isRowFilledHistory(med) || index === this.historyList.length - 1;
      });
    },

    handleInput(item, isComposition) {
      if (isComposition) {

        const selectedMedicine = this.medicineSuggestions.find(
          (suggestion) => suggestion.name === item.name.name
        );

        if (selectedMedicine) {
          item.composition = selectedMedicine.composition;
        } else {
          item.composition = "";
        }
      }

      if (this.isRowFilled(item) && !this.hasEmptyRow()) {
        this.medications.push({ name: "", dosage: "", frequency: "", duration: "", notes: "" });
      }
      this.removeEmptyRows();
    },
    isRowFilled(item) {
      return item.name || item.dosage || item.frequency || item.duration || item.notes || item.composition;
    },
    hasEmptyRow() {
      return this.medications.some(
        (med) => !med.name && !med.dosage && !med.frequency && !med.duration && !med.notes && !med.composition
      );
    },
    removeEmptyRows() {
      this.medications = this.medications.filter((med, index) => {
        return this.isRowFilled(med) || index === this.medications.length - 1;
      });
    },

    handleInputImplant(item) {
      if (this.isImplantRowFilled(item) && !this.hasEmptyImplantRow()) {
        this.implant.push({ name: "", removalDate: "" });
      }
      this.removeEmptyImplantRows();
    },
    isImplantRowFilled(item) {
      return item.name || item.removalDate;
    },
    hasEmptyImplantRow() {
      return this.implant.some(
        (impl) => !impl.name && !impl.removalDate
      );
    },
    removeEmptyImplantRows() {
      this.implant = this.implant.filter((impl, index) => {
        return this.isImplantRowFilled(impl) || index === this.implant.length - 1;
      });
    },

    handleInputDrugAllergy(item) {
      if (this.isDrugRowFilled(item) && !this.hasEmptyDrugRow()) {
        this.drugAllergy.push({ name: "", details: "" });
      }
      this.removeEmptyDrugRows();
    },
    isDrugRowFilled(item) {
      return item.name || item.details;
    },
    hasEmptyDrugRow() {
      return this.drugAllergy.some(
        (drug) => !drug.name && !drug.details
      );
    },
    removeEmptyDrugRows() {
      this.drugAllergy = this.drugAllergy.filter((drug, index) => {
        return this.isDrugRowFilled(drug) || index === this.drugAllergy.length - 1;
      });
    },

    handleInputDrugHistory(item) {
      if (this.isDrugHRowFilled(item) && !this.hasEmptyDrugHRow()) {
        this.drugHistory.push({ name: "", details: "" });
      }
      this.removeEmptyDrugHRows();
    },
    isDrugHRowFilled(item) {
      return item.name || item.details;
    },
    hasEmptyDrugHRow() {
      return this.drugHistory.some(
        (drug) => !drug.name && !drug.details
      );
    },
    removeEmptyDrugHRows() {
      this.drugHistory = this.drugHistory.filter((drug, index) => {
        return this.isDrugRowFilled(drug) || index === this.drugHistory.length - 1;
      });
    },

    handleInputAntiplatlet(item) {
      if (this.isAntiplatletFilled(item) && !this.hasEmptyAntiplatletRow()) {
        this.antiplatlet.push({ name: "", details: "" });
      }
      this.removeEmptyAntiplatletRows();
    },
    isAntiplatletFilled(item) {
      return item.name || item.details;
    },
    hasEmptyAntiplatletRow() {
      return this.antiplatlet.some(
        (anti) => !anti.name && !anti.details
      );
    },
    removeEmptyAntiplatletRows() {
      this.antiplatlet = this.antiplatlet.filter((anti, index) => {
        return this.isAntiplatletFilled(anti) || index === this.antiplatlet.length - 1;
      });
    },

    handleInputDiagnosis(item) {
      if (this.isRowFilledDiagnosis(item) && !this.hasEmptyRowDiagnosis()) {
        this.diagnosisList.push({ type: "", details: "" });
      }
      this.removeEmptyRowsDiagnosis();
    },
    isRowFilledDiagnosis(item) {
      return item.type || item.details;
    },
    hasEmptyRowDiagnosis() {
      return this.diagnosisList.some(
        (diag) => !diag.type && !diag.details
      );
    },
    removeEmptyRowsDiagnosis() {
      this.diagnosisList = this.diagnosisList.filter((diag, index) => {
        return this.isRowFilledDiagnosis(diag) || index === this.diagnosisList.length - 1;
      });
    },

    handleInputInvestigationAdvice(item) {
      if (this.isRowFilledInvestigation(item) && !this.hasEmptyRowInvestigation()) {
        this.investigationAdviceList.push({ name: "", details: "" });
      }
      this.removeEmptyRowsInvestigation();
    },
    isRowFilledInvestigation(item) {
      return item.name || item.details;
    },
    hasEmptyRowInvestigation() {
      return this.investigationAdviceList.some(
        (invest) => !invest.name && !invest.details
      );
    },
    removeEmptyRowsInvestigation() {
      this.investigationAdviceList = this.investigationAdviceList.filter((invest, index) => {
        return this.isRowFilledInvestigation(invest) || index === this.investigationAdviceList.length - 1;
      });
    },

    pdfDialogHandle(item) {
      this.pdfUrl = `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${item.id}.pdf`;
      this.pdfDialog = true;
    },
    closePdfDialog() {
      this.pdfUrl = '';
      this.pdfDialog = false;
      window.location.reload();
    },

    AddInvestigationTemplate(templateData) {
      this.investigationAdviceList = this.investigationAdviceList.filter(
        (item) => item.name !== "" || item.details !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.investigationAdviceList.push(item);
      });

      this.investigationAdviceList.push({
        name: "",
        details: "",
      });
    },
    AddComplaintsTemplate(templateData) {
      this.complaintsList = this.complaintsList.filter(
        (item) => item.name !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.complaintsList.push(item);
      });

      this.complaintsList.push({
        name: "",
      });
    },
    AddHistoryTemplate(templateData) {
      this.historyList = this.historyList.filter(
        (item) => item.name !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.historyList.push(item);
      });

      this.historyList.push({
        name: "",
      });
    },
    AddPhysicalExaminationTemplate(templateData) {
      this.physicalExamList = this.physicalExamList.filter(
        (item) => item.name !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.physicalExamList.push(item);
      });

      this.physicalExamList.push({
        name: "",
      });
    },
    AddDiagnosisTemplate(templateData) {
      this.diagnosisList = this.diagnosisList.filter(
        (item) => item.type !== "" || item.details !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.diagnosisList.push(item);
      });

      this.diagnosisList.push({
        type: "",
        details: "",
      });
    },
    AddMedicationsTemplate(templateData) {
      this.medications = this.medications.filter(
        (item) => item.name !== "" || item.dosage !== "" || item.frequency !== "" || item.duration !== "" || item.notes !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.medications.push(item);
      });

      this.medications.push({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: ""
      });
    },
    AddAdviceTemplate(templateData) {
      this.adviceList = this.adviceList.filter(
        (item) => item.name !== ""
      );

      // Add new data
      templateData.data.forEach(item => {
        this.adviceList.push(item);
      });

      this.adviceList.push({
        name: "",
      });
    },
    fetchPatientDetails() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/patient/${this.$route.params.patientId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data: ', data.patient.tags);
          this.emailInput = data.patient.email;
          this.phoneInput = data.patient.phoneNumber;
          this.tags = data.patient.tags;
          this.patientData = data.patient

          console.log('Tags: ', this.tags);
        })
        .catch((error) => {
          console.error("Error fetching prescriptions:", error);
        })
    },
    printPrescription() {
      const iframe = document.createElement('iframe');
      iframe.src = this.pdfUrl;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      };
    },
    fetchPrescriptions() {
      const patientId = this.$route.params.patientId;

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${patientId}/file/prescription`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let counter = data.files.length;
          this.pastPrescriptions = data.files.map((item) => ({
            count: counter--,
            id: item._id,
            history: item.history,
            drugAllergy: item.drugAllergy,
            drugHistory: item.drugHistory,
            antiplatlet: item.antiplatlet,
            previousSurgery: item.previousSurgery,
            implants: item.implant,
            tags: item.tags,
            provisional: item.provisional,
            medicines: item.medications.map((med) => med.name),
            diagnosis: item.diagnosis.map((diag) => diag.type),
            date: new Date(item.createdAt).toLocaleDateString(),
            investigationsAdviced: item?.investigationsAdviced.map((invest) => invest.name),
            pdfUrl: `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${item._id}.pdf`,
          }));

          if (!this.isDraft === true && this.pastPrescriptions.length > 0) {
            const item = this.pastPrescriptions[0];
            const drugList = [];
            for (let i = 0; i < item.drugAllergy.length; i++) {
              drugList.push({
                name: item.drugAllergy[i].name,
                details: item.drugAllergy[i].details,
              });
            }
            drugList.push({
              name: '',
              details: '',
            })
            this.drugAllergy = drugList;

            const drugHList = [];
            for (let i = 0; i < item.drugHistory.length; i++) {
              drugHList.push({
                name: item.drugHistory[i].name,
                details: item.drugHistory[i].details,
              });
            }
            drugHList.push({
              name: '',
              details: '',
            })
            this.drugHistory = drugHList;

            const antiplatlet = [];
            for (let i = 0; i < item.antiplatlet.length; i++) {
              antiplatlet.push({
                name: item.antiplatlet[i].name,
                details: item.antiplatlet[i].details,
              });
            }
            antiplatlet.push({
              name: '',
              details: '',
            })
            this.antiplatlet = antiplatlet;

            const today = new Date();
            const implantList = [];
            for (let i = 0; i < item.implants.length; i++) {
              const removalDate = new Date(item.implants[i].removalDate);
              if (removalDate >= today) {
                implantList.push({
                  name: item.implants[i].name,
                  removalDate: item.implants[i].removalDate,
                });
              }
            }
            implantList.push({
              name: '',
              removalDate: '',
            })
            this.implant = implantList;

            this.tags = item.tags;
            this.provisional = item.provisional;

            const historyList = [];
            for (let i = 0; i < item.history.length; i++) {
              historyList.push({
                name: item.history[i],
              });
            }
            this.historyList = historyList;
          }
        })
        .catch((error) => {
          console.error("Error fetching prescriptions:", error);
        });
    },
    savePrescription() {
      const formattedDiagnosis = this.diagnosisList
        .filter((item) => item.type || item.details)
        .map((item) => ({
          type: item.type || null,
          details: item.details || null,
        }));

      const formattedMedications = this.medications
        .filter((item) => item.name || item.dosage || item.frequency || item.duration || item.notes)
        .map((item) => ({
          name: item.name.name ? item.name.name : item.name,
          dosage: item.dosage || null,
          frequency: item.frequency || null,
          duration: item.duration || null,
          notes: item.notes || null,
          composition: item.composition || null,
        }));

      const formattedImplant = this.implant
        .filter((item) => item.name || item.removalDate)
        .map((item) => ({
          name: item.name || null,
          removalDate: item.removalDate || null,
        }));

      const formattedDrugAllergy = this.drugAllergy
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));
      const formattedDrugHistory = this.drugHistory
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));
      const formattedAntiplatlet = this.antiplatlet
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));

      const formattedInvestigationAdvice = this.investigationAdviceList
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));

      const excludedFields = ["bp", "pulse", "weight", "height", "temperature", "painScore"];

      const formattedAdditionalVitals = Object.entries(this.vitals)
        .filter(([key]) => !excludedFields.includes(key))
        .map(([field, value]) => ({ field, value }));

      const formattedAdditionalSections = Object.entries(this.additionalSectionsData)
        .map(([field, value]) => ({ field, value }));

      const requestData = {
        bloodPressure: this.vitals.bp,
        pulse: this.vitals.pulse,
        weight: this.vitals.weight,
        height: this.vitals.height,
        temperature: this.vitals.temperature,
        painScore: this.vitals.painScore,
        complaints: this.complaintsList.map(item => item.name),
        history: this.historyList.map(item => item.name),
        physicalExamination: this.physicalExamList.map(item => item.name),
        diagnosis: formattedDiagnosis,
        medications: formattedMedications,
        advice: this.adviceList.map(item => item.name),
        followUp: {
          days: this.followUpDays,
          date: this.followUpDate,
        },
        referredTo: {
          name: this.referredTo.name,
          speciality: this.referredTo.specialty,
        },
        referredBy: {
          name: this.referredBy.name,
          speciality: this.referredBy.specialty,
        },
        implant: formattedImplant,
        drugAllergy: formattedDrugAllergy,
        drugHistory: formattedDrugHistory,
        antiplatlet: formattedAntiplatlet,
        previousSurgery: this.previousSurgery,
        surgeryAdvice: this.surgeryAdvised,
        tags: this.tags,
        provisional: this.provisional,
        investigationsAdviced: formattedInvestigationAdvice,
        additionalVitals: formattedAdditionalVitals,
        additionalSections: formattedAdditionalSections,
      }

      const patientId = this.$route.params.patientId;

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/prescription/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.isTemplateDetailModalOpen = false;
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((res) => {
          console.log('Res: ', res);
        })
        .catch((error) => {
          console.error("Network Error:", error);
          alert("Error saving prescription.");
        });
    },
    endConsultation(status) {
      const formattedDiagnosis = this.diagnosisList
        .filter((item) => item.type || item.details)
        .map((item) => ({
          type: item.type || null,
          details: item.details || null,
        }));

      const formattedMedications = this.medications
        .filter((item) => item.name || item.dosage || item.frequency || item.duration || item.notes)
        .map((item) => ({
          name: item.name.name ? item.name.name : item.name,
          dosage: item.dosage || null,
          frequency: item.frequency || null,
          duration: item.duration || null,
          notes: item.notes || null,
          composition: item.composition || null,
        }));

      const formattedImplant = this.implant
        .filter((item) => item.name || item.removalDate)
        .map((item) => ({
          name: item.name || null,
          removalDate: item.removalDate || null,
        }));

      const formattedDrugAllergy = this.drugAllergy
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));
      const formattedDrugHistory = this.drugHistory
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));
      const formattedAntiplatlet = this.antiplatlet
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));

      const formattedInvestigationAdvice = this.investigationAdviceList
        .filter((item) => item.name || item.details)
        .map((item) => ({
          name: item.name || null,
          details: item.details || null,
        }));

      const excludedFields = ["bp", "pulse", "weight", "height", "temperature", "painScore"];

      const formattedAdditionalVitals = Object.entries(this.vitals)
        .filter(([key]) => !excludedFields.includes(key))
        .map(([field, value]) => ({ field, value }));

      const formattedAdditionalSections = Object.entries(this.additionalSectionsData)
        .map(([field, value]) => ({ field, value }));

      const requestData = {
        bloodPressure: this.vitals.bp,
        pulse: this.vitals.pulse,
        weight: this.vitals.weight,
        height: this.vitals.height,
        temperature: this.vitals.temperature,
        painScore: this.vitals.painScore,
        complaints: this.complaintsList.map(item => item.name),
        history: this.historyList.map(item => item.name),
        physicalExamination: this.physicalExamList.map(item => item.name),
        diagnosis: formattedDiagnosis,
        medications: formattedMedications,
        advice: this.adviceList.map(item => item.name),
        followUp: {
          days: this.followUpDays,
          date: this.followUpDate,
        },
        referredTo: {
          name: this.referredTo.name,
          speciality: this.referredTo.specialty,
        },
        referredBy: {
          name: this.referredBy.name,
          speciality: this.referredBy.specialty,
        },
        implant: formattedImplant,
        drugAllergy: formattedDrugAllergy,
        drugHistory: formattedDrugHistory,
        antiplatlet: formattedAntiplatlet,
        previousSurgery: this.previousSurgery,
        surgeryAdvice: this.surgeryAdvised,
        tags: this.tags,
        provisional: this.provisional,
        investigationsAdviced: formattedInvestigationAdvice,
        status: status,
        additionalVitals: formattedAdditionalVitals,
        additionalSections: formattedAdditionalSections,
      }

      const patientId = this.$route.params.patientId;

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/prescription/${patientId}/end-consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            if (contentType && !contentType.includes('application/json')) {
              return response.text().then(text => {
                this.showSnackbar(text, true);
                this.isTemplateDetailModalOpen = false;
                throw new Error(`Error ${response.status}: ${text}`);
              });
            }
          }
          return response.json();
        })
        .then((res) => {
          this.prescriptionUrl = res.pdfPath;
          // this.prescriptionUrl = `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${res.prescription._id}.pdf`;
          this.dialog = true;
        })
        .catch((error) => {
          console.error("Network Error:", error);
          alert("Error saving prescription.");
        });
    },
    fetchDraftPrescription() {
      const patientId = this.$route.params.patientId;
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/prescription/${patientId}/draft`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          const prescriptionData = res.prescription;

          if (prescriptionData !== 'Prescription is not drafted yet.') {
            this.isDraft = true;
          }

          this.vitals.bp = prescriptionData.bloodPressure;
          this.vitals.height = prescriptionData.height;
          this.vitals.weight = prescriptionData.weight;
          this.vitals.pulse = prescriptionData.pulse;
          this.vitals.temperature = prescriptionData.temperature;
          this.vitals.painScore = prescriptionData.painScore

          this.complaintsList = prescriptionData.complaints?.length ? prescriptionData.complaints.map(complaint => ({ name: complaint })) : [{ name: "" }];
          this.historyList = prescriptionData.history?.length ? prescriptionData.history.map(history => ({ name: history })) : [{ name: "" }];
          this.previousSurgery = prescriptionData.previousSurgery;
          this.physicalExamList = prescriptionData.physicalExamination?.length ? prescriptionData.physicalExamination.map(complaint => ({ name: complaint })) : [{ name: "" }];
          this.provisional = prescriptionData.provisional;
          this.investigationAdvice = prescriptionData.investigationsAdviced;
          this.adviceList = prescriptionData.advice?.length ? prescriptionData.advice.map(advice => ({ name: advice })) : [{ name: "" }];
          this.followUpDate = getDateFormate(prescriptionData.followUp?.date);
          this.followUpDays = prescriptionData.followUp?.days;
          this.surgeryAdvised = prescriptionData.surgeryAdvice;
          this.tags = prescriptionData.tags;
          this.referredBy.name = prescriptionData.referredBy?.name;
          this.referredBy.specialty = prescriptionData.referredBy?.speciality;
          this.referredTo.name = prescriptionData.referredTo?.name;
          this.referredTo.specialty = prescriptionData.referredTo?.speciality;

          const diagnosisListRes = [];
          for (let i = 0; i < prescriptionData.diagnosis?.length; i++) {
            diagnosisListRes.push({
              type: prescriptionData.diagnosis[i].type,
              details: prescriptionData.diagnosis[i].details,
            });
          }
          diagnosisListRes.push({
            type: '',
            details: '',
          })
          this.diagnosisList = diagnosisListRes;

          const investigationAdviceList = [];
          for (let i = 0; i < prescriptionData.investigationsAdviced?.length; i++) {
            investigationAdviceList.push({
              name: prescriptionData.investigationsAdviced[i].name,
              details: prescriptionData.investigationsAdviced[i].details,
            });
          }
          investigationAdviceList.push({
            name: '',
            details: '',
          })
          this.investigationAdviceList = investigationAdviceList;

          const implantList = [];
          for (let i = 0; i < prescriptionData.implant?.length; i++) {
            implantList.push({
              name: prescriptionData.implant[i].name,
              removalDate: prescriptionData.implant[i].removalDate,
            });
          }
          implantList.push({
            name: '',
            removalDate: '',
          })
          this.implant = implantList;

          const drugAllergyList = [];
          for (let i = 0; i < prescriptionData.drugAllergy?.length; i++) {
            drugAllergyList.push({
              name: prescriptionData.drugAllergy[i].name,
              details: prescriptionData.drugAllergy[i].details,
            });
          }
          drugAllergyList.push({
            name: '',
            details: '',
          })
          this.drugAllergy = drugAllergyList;

          const drugHistoryList = [];
          for (let i = 0; i < prescriptionData.drugHistory?.length; i++) {
            drugHistoryList.push({
              name: prescriptionData.drugHistory[i].name,
              details: prescriptionData.drugHistory[i].details,
            });
          }
          drugHistoryList.push({
            name: '',
            details: '',
          })
          this.drugHistory = drugHistoryList;

          const antiplatletList = [];
          for (let i = 0; i < prescriptionData.antiplatlet?.length; i++) {
            antiplatletList.push({
              name: prescriptionData.antiplatlet[i].name,
              details: prescriptionData.antiplatlet[i].details,
            });
          }
          antiplatletList.push({
            name: '',
            details: '',
          })
          this.antiplatlet = antiplatletList;

          const medicationListRes = [];
          for (let i = 0; i < prescriptionData.medications?.length; i++) {
            medicationListRes.push({
              name: prescriptionData.medications[i].name,
              dosage: prescriptionData.medications[i].dosage,
              frequency: prescriptionData.medications[i].frequency,
              duration: prescriptionData.medications[i].duration,
              notes: prescriptionData.medications[i].notes,
              composition: prescriptionData.medications[i].composition,
            });
          }
          medicationListRes.push({
            name: '',
            dosage: '',
            frequency: '',
            duration: '',
            notes: '',
            composition: ''
          })
          this.medications = medicationListRes;
          this.fetchPrescriptions();
        })
        .catch((error) => {
          console.error("Network Error:", error);
          this.fetchPrescriptions();
        })
    },
    clearAll() {
      this.visitNumber = '';
      this.vitals = { bp: '', pulse: '', height: '', weight: '', temperature: '', painScore: '' };
      this.complaintsList = [{ name: '' }];
      this.historyList = [{ name: '' }];
      this.physicalExamList = [{ name: '' }];
      this.diagnosisList = [{ type: '', details: '' }];
      this.adviceList = [{ name: '' }];
      this.followUpDays = '';
      this.followUpDate = '';
      this.referredTo = { name: '', specialty: '' };
      this.referredBy = { name: '', specialty: '' };
      this.surgeryAdvised = '';
      this.tags = '';
      this.drugAllergy = [{ name: '', details: '' }];
      this.drugHistory = [{ name: '', details: '' }];
      this.antiplatlet = [{ name: '', details: '' }];
      this.previousSurgery = '';
      this.investigationAdviceList = [{ name: "", details: "" }];
      this.provisional = '';
      this.medications = [{ name: '', dosage: '', frequency: '', duration: '', notes: '', composition: '' }];
      this.implant = [{ name: '', removalDate: '' }];
      this.pdfUrl = '';
    },
    calculateFollowUpDate() {
      if (this.followUpDays === null) {
        this.followUpDate = null;
        return;
      }

      const today = new Date();
      const followUpDate = new Date(today);
      followUpDate.setDate(followUpDate.getDate() + parseInt(this.followUpDays));
      this.followUpDate = getDateFormate(followUpDate)
    },
    openPopup() {
      this.dialog = true;
    },
    closePopup() {
      this.dialog = false;
      window.location.reload();
    },
    sharePrescription(method) {
      if (method === 'WhatsApp/SMS') {
        alert('Prescription shared via WhatsApp/SMS!');
      } else if (method === 'Email') {
        alert('Prescription sent via Email!');
      } else if (method === 'Print') {
        alert('Prescription printed!');
      }
      this.closePopup();
    },
    triggerFileUpload(type) {
      if (type === "health") {
        this.$refs.healthFileInput.click();
      } else if (type === "ipd") {
        this.$refs.ipdFileInput.click();
      }
    },
    handleFileUpload(type) {
      const fileInput =
        type === "health" ? this.$refs.healthFileInput : this.$refs.ipdFileInput;
      const file = fileInput.files[0];

      if (!file) {
        console.log("No file selected");
        return;
      }

      const fileType = file.type.startsWith("image") ? "image" : "pdf";
      const filePreviewUrl = URL.createObjectURL(file);

      const newRecord = {
        id: Date.now(),
        fileName: file.name,
        type: fileType,
        fileUrl: filePreviewUrl,
        date: new Date().toLocaleDateString()
      };

      if (type === "health") {
        this.healthRecords.push(newRecord);
      } else if (type === "ipd") {
        this.ipdRecords.push(newRecord);
      }

      // Upload file to the server
      const patientId = this.$route.params.patientId;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", type);

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${patientId}/file/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`${type} record uploaded successfully:`, data);
        })
        .catch((error) => {
          console.error(`Error uploading ${type} record:`, error);
        });
    },
    fetchFiles() {
      const patientId = this.$route.params.patientId;
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${patientId}/file/health`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.files.length; i++) {
            this.healthRecords.push(data.files[i]);
          }
        })
        .catch((error) => {
          console.error(`Error fetching health records:`, error);
        });

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${patientId}/file/ipd`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.files.length; i++) {
            this.ipdRecords.push(data.files[i]);
          }
        })
        .catch((error) => {
          console.error(`Error fetching IPD records:`, error);
        });

      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${patientId}/file/prescription`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let counter = 1;
          this.pastPrescriptions = data.files.map((item) => ({
            count: counter++,
            id: item._id,
            medicines: item.medications.map((med) => med.name),
            diagnosis: item.diagnosis.map((diag) => diag.type),
            date: new Date(item.createdAt).toLocaleDateString(),
            investigationsAdviced: item?.investigationsAdviced.map((invest) => invest.name),
            pdfUrl: `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescriptions_${item._id}.pdf`,
          }));
        })
        .catch((error) => {
          console.error(`Error fetching prescription records:`, error);
        });
    },
    showSnackbar(message, isError = false) {
      const snackbarStore = useSnackbarStore();
      snackbarStore.showMessage(message, isError);
    },
    formatedDate(date) {
      return getDateFormate(date);
    },
    AddDropdown(sectionName, sectionId, data, dropdownData) {
      console.log("fgdfgdfg", sectionName, data);
      let notAvailableData

      if (typeof data === "string") {
        notAvailableData = dropdownData.includes(data.trim()) ? [] : [data.trim()];
      }else{

        if (sectionName === "Diagnosis") {
          notAvailableData = data
            .map(item => item.type.trim())
            .filter(name => name && !dropdownData.includes(name));
        } else {
          notAvailableData = data
            .map(item => item.name.trim())
            .filter(name => name && !dropdownData.includes(name));
        }
      }


      if (notAvailableData.length > 0) {

        notAvailableData.map((name) => {
          const requestData = {
            sectionId: sectionId,
            sectionName: sectionName,
            name: name
          }
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/dropdown`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.accessToken,
            },
            body: JSON.stringify(requestData),
          })
            .then((response) => {
              return response.json();
            })
            .then((res) => {
              if (res) {
                this.fetchDropdowns();
              }
            })
            .catch((error) => {
              console.error("Network Error:", error);
            });

        })
      }

    },
    AddMedicineDropdown(data, dropdownData) {
      let notAvailableData = data.map(item => (typeof item.name === "string" && item.name.trim())).filter(name => name && !dropdownData.includes(name));

      if (notAvailableData.length > 0) {
        notAvailableData.map((name) => {
          const requestData = {
            composition: "-",
            medicineName: name
          }
          fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/medicine`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.accessToken,
            },
            body: JSON.stringify(requestData),
          })
            .then((response) => {
              return response.json();
            })
            .then((res) => {
              if (res) {
                this.fetchMedicines();
              }
            })
            .catch((error) => {
              console.error("Network Error:", error);
            });

        })
      }
    }
  },
};
</script>


<style scoped>
.prescription-page {
  padding: 20px;
}

.section-card {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
}

.font-weight-bold {
  font-weight: bold;
}

.prescription-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.prescription-card:hover {
  transform: scale(1.05);
}

.v-btn {
  margin-left: 10px;
  color: #385D7E !important;
  background-color: #d4ebff !important;
  border: none;
}

.margin-none {
  margin-left: 0 !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pl-16 {
  padding-left: 16px !important;
}

.pr-6 {
  padding: 0 6px 0 0 !important;
}

.pl-6 {
  padding: 0 0 0 6px !important;
}

.mr-12 {
  margin-right: 12px !important;
}

.px-15 {
  padding: 0 15px !important;
}

.max-1100 {
  max-width: 1100px !important;
}

.max-1400 {
  max-width: 1200px !important;
}

.v-toolbar {
  background-color: #d4ebff !important;
}

.print-popup {
  display: flex;
  margin: 0 auto;
  height: 60% !important;
}

.prescription-card {
  background-color: #d4ebff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.lable-dev {
  padding-bottom: 10px;
}

.lable-dev span {
  color: #747474;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 10px;
}

.test-data {
  margin-bottom: 2px !important;
}

.max-w-auto {
  max-width: 100%;
}
</style>
