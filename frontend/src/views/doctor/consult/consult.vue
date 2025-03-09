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
        <p v-if="patientData.dateOfBirth">Date of Birth: {{ formatedDate(patientData.dateOfBirth) }}</p>
        <p v-if="patientData.tags">Category: {{ patientData.tags }}</p>
        <p v-if="patientData.address">Address: {{ patientData.address }}</p>
      </v-card-text>
    </v-card>

    <!-- Upload Prescription Record -->
    <v-row>
      <v-col class="v-col-9">
        <h4 class="section-title prescription-card-heading">Prescriptions</h4>
      </v-col>
      <v-col class="text-center v-col-3">
        <v-btn class="saaro-btn" color="#4caf50" @click="triggerFileUpload('prescription')">Upload Prescription</v-btn>
        <input ref="prescriptionFileInput" type="file" accept=".pdf,.png,.jpg,.jpeg" class="d-none"
          @change="handleFileUpload('prescription')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="record in prescriptionRecords" :key="record.id" cols="12" md="6">
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

    <!-- Upload Health Record -->
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
import { checkAuth, getDateFormate } from '@/lib/utils/utils';
import { usePatientStore } from '@/store/PatientStore';
import { useDropdownStore } from '@/store/DropdownStore';
import { useTemplateStore } from '@/store/TemplateStore';
import { useMedicineStore } from '@/store/MedicineStore';
import { usePrescriptionStore } from '@/store/PrescriptionStore';
import { useUiStore } from '@/store/UiStore';
import { dosageSuggestionsData, durationSuggestionsData, frequencyOptions } from '@/faker/data';
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
      additionalSectionsData: {},
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
      dosageSuggestions: dosageSuggestionsData,
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
      durationSuggestions: durationSuggestionsData,
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
      frequencyOptions: frequencyOptions,
      isDraft: false,
      healthRecords: [],
      ipdRecords: [],
      prescriptionRecords: [],
      templates: [],
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchDraftPrescription();
      this.fetchPatientDetails();
      this.fetchTemplates();
      this.fetchDropdowns();
      this.fetchMedicines();
      this.fetchPriscriptionSections();
      this.fetchHealthFiles();
      this.fetchIpdFiles();
      this.fetchPrescriptionFiles();
    }
  },
  methods: {
    async fetchPatientDetails() {
      const patientId = this.$route.params.patientId;
      const res = await usePatientStore().getPatientDetailsApiCall(patientId)

      if (res) {
        this.emailInput = res.patient.email;
        this.phoneInput = res.patient.phoneNumber;
        this.tags = res.patient.tags;
        this.patientData = res.patient
      }
    },
    async fetchPriscriptionSections() {
      const res = await usePrescriptionStore().getPrescriptionSectionsApiCall()

      if (res) {
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
      }
    },
    async fetchDropdowns() {
      const res = await useDropdownStore().getAllDropdownsApiCall()

      if (res) {
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
      }
    },
    async fetchTemplates() {
      const res = await useTemplateStore().getAllTemplatesApiCall()

      if (res) {
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
      }
    },
    async fetchMedicines() {
      const res = await useMedicineStore().getAllMedicinesApiCall()

      if (res) {
        this.medicineSuggestions = res.medicines.map((medicine) => ({
          name: medicine.medicineName,
          composition: medicine.composition,
        }));
      }
    },
    async fetchDraftPrescription() {
      const patientId = this.$route.params.patientId;
      const res = await usePrescriptionStore().getDraftPrescriptionApiCall(patientId)

      if (res) {
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
      }
    },
    async fetchPrescriptions() {
      // const patientId = this.$route.params.patientId;
      // const res = await usePrescriptionStore().getPrescriptionFileApiCall(patientId)

      // if (res) {
      //   let counter = res.files.length;
      //   this.pastPrescriptions = res.files.map((item) => ({
      //     count: counter--,
      //     id: item._id,
      //     history: item.history,
      //     drugAllergy: item.drugAllergy,
      //     drugHistory: item.drugHistory,
      //     antiplatlet: item.antiplatlet,
      //     previousSurgery: item.previousSurgery,
      //     implants: item.implant,
      //     tags: item.tags,
      //     provisional: item.provisional,
      //     medicines: item.medications.map((med) => med.name),
      //     diagnosis: item.diagnosis.map((diag) => diag.type),
      //     date: new Date(item.createdAt).toLocaleDateString(),
      //     investigationsAdviced: item?.investigationsAdviced.map((invest) => invest.name),
      //     pdfUrl: `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${item._id}.pdf`,
      //   }));

      //   if (!this.isDraft === true && this.pastPrescriptions.length > 0) {
      //     const item = this.pastPrescriptions[0];
      //     const drugList = [];
      //     for (let i = 0; i < item.drugAllergy.length; i++) {
      //       drugList.push({
      //         name: item.drugAllergy[i].name,
      //         details: item.drugAllergy[i].details,
      //       });
      //     }
      //     drugList.push({
      //       name: '',
      //       details: '',
      //     })
      //     this.drugAllergy = drugList;

      //     const drugHList = [];
      //     for (let i = 0; i < item.drugHistory.length; i++) {
      //       drugHList.push({
      //         name: item.drugHistory[i].name,
      //         details: item.drugHistory[i].details,
      //       });
      //     }
      //     drugHList.push({
      //       name: '',
      //       details: '',
      //     })
      //     this.drugHistory = drugHList;

      //     const antiplatlet = [];
      //     for (let i = 0; i < item.antiplatlet.length; i++) {
      //       antiplatlet.push({
      //         name: item.antiplatlet[i].name,
      //         details: item.antiplatlet[i].details,
      //       });
      //     }
      //     antiplatlet.push({
      //       name: '',
      //       details: '',
      //     })
      //     this.antiplatlet = antiplatlet;

      //     const today = new Date();
      //     const implantList = [];
      //     for (let i = 0; i < item.implants.length; i++) {
      //       const removalDate = new Date(item.implants[i].removalDate);
      //       if (removalDate >= today) {
      //         implantList.push({
      //           name: item.implants[i].name,
      //           removalDate: item.implants[i].removalDate,
      //         });
      //       }
      //     }
      //     implantList.push({
      //       name: '',
      //       removalDate: '',
      //     })
      //     this.implant = implantList;

      //     this.tags = item.tags;
      //     this.provisional = item.provisional;

      //     const historyList = [];
      //     for (let i = 0; i < item.history.length; i++) {
      //       historyList.push({
      //         name: item.history[i],
      //       });
      //     }
      //     this.historyList = historyList;
      //   }
      // }
    },
    async fetchHealthFiles() {
      const patientId = this.$route.params.patientId;
      const res = await usePrescriptionStore().getHealthFileApiCall(patientId)

      if (res) {
        for (let i = 0; i < res.files.length; i++) {
          this.healthRecords.push(res.files[i]);
        }
      }
    },
    async fetchIpdFiles() {
      const patientId = this.$route.params.patientId;
      const res = await usePrescriptionStore().getIpdFileApiCall(patientId)

      if (res) {
        for (let i = 0; i < res.files.length; i++) {
          this.ipdRecords.push(res.files[i]);
        }
      }
    },
    async fetchPrescriptionFiles() {
      const patientId = this.$route.params.patientId;
      const res = await usePrescriptionStore().getPrescriptionFileApiCall(patientId)

      if (res) {
        for (let i = 0; i < res.files.length; i++) {
          this.prescriptionRecords.push(res.files[i]);
        }
      }
    },
    async addField() {
      if (!this.newField.label) return;

      const requestData = {
        label: this.newField.label,
        fieldType: this.newField.type,
        placeholder: "Enter text",
        sectionType: "vitals",
        printable: true
      }

      const res = await usePrescriptionStore().addPrescriptionSectionsApiCall(requestData)

      if (res) {
        this.newField = { label: "", type: "text" };
        this.showSettings = false;
        this.fetchPriscriptionSections();
        useUiStore().openNotificationMessage("Vitals Added Successfully!");
      }
    },
    async addSection() {
      if (!this.newSection.label) return;

      const requestData = {
        label: this.newSection.label,
        fieldType: this.newSection.type,
        placeholder: "Enter text",
        sectionType: "consult",
        printable: this.newSection.isPrint
      }

      const res = await usePrescriptionStore().addPrescriptionSectionsApiCall(requestData)

      if (res) {
        this.fetchPriscriptionSections();
        this.newSection = { label: "", isPrint: false, type: "text" };
        this.showSettingsForSection = false;
        useUiStore().openNotificationMessage("Consult Section Added Successfully!");
      }
    },
    async AddDropdown(sectionName, sectionId, data, dropdownData) {
      let notAvailableData

      if (typeof data === "string") {
        notAvailableData = dropdownData.includes(data.trim()) ? [] : [data.trim()];
      } else {

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
        notAvailableData.map(async (name) => {
          const requestData = {
            sectionId: sectionId,
            sectionName: sectionName,
            name: name
          }

          const res = await useDropdownStore().AddDropdownApiCall(requestData)

          if (res) {
            this.fetchDropdowns();
            useUiStore().openNotificationMessage("Dropdown Saved Successfully!");
          }
        })
      }
    },
    async AddMedicineDropdown(data, dropdownData) {
      let notAvailableData = data.map(item => (typeof item.name === "string" && item.name.trim())).filter(name => name && !dropdownData.includes(name));

      if (notAvailableData.length > 0) {
        notAvailableData.map(async (name) => {
          const requestData = {
            composition: "-",
            medicineName: name
          }

          const res = await useMedicineStore().AddMedicineApiCall(requestData)

          if (res) {
            this.fetchMedicines();
            useUiStore().openNotificationMessage("Medicine Saved Successfully!");
          }
        })
      }
    },
    async savePrescription() {
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

      const res = await usePrescriptionStore().savePrescriptionApiCall(patientId, requestData)

      if (res) {
        useUiStore().openNotificationMessage("Prescription Saved Successfully!");
        this.fetchDraftPrescription()
      }
    },
    async endConsultation(status) {
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
      const res = await usePrescriptionStore().endConsultationApiCall(patientId, requestData)

      if (res) {
        this.prescriptionUrl = res.pdfPath;
        this.dialog = true;
        useUiStore().openNotificationMessage("End Consultation Successfully!");
      }
    },
    async handleFileUpload(type) {
      const fileInput =
        type === "health" ? this.$refs.healthFileInput :  type === "ipd" ? this.$refs.ipdFileInput : this.$refs.prescriptionFileInput;
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
      } else if (type === 'prescription') {
        this.prescriptionRecords.push(newRecord);
      }

      // Upload file to the server
      const patientId = this.$route.params.patientId;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", type);

      const res = await usePrescriptionStore().uploadFileApiCall(patientId, formData)

      if (res) {
        useUiStore().openNotificationMessage(`${type} record uploaded successfully!`);
      }
    },
    closeModal() {
      this.showSettings = false;
    },
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
    toggleEditComposition(item) {

      if (item.isEditingComposition) {
        item.isEditingComposition = false;
      } else {
        item.isEditingComposition = true;
      }
    },
    // Add New Feilds
    dynamicHandleInput(item, listKey, keyFields = ["name"], isComposition = false) {
      if (isComposition) {
        const selectedMedicine = this.medicineSuggestions.find(
          (suggestion) => suggestion.name === item.name?.name
        );

        item.composition = selectedMedicine ? selectedMedicine.composition : "";
      }
      if (this.isRowFilledDynamic(item, keyFields) && !this.hasEmptyRowDynamic(this[listKey], keyFields)) {
        this[listKey].push(this.createEmptyRowDynamic(keyFields));
      }
      this.removeEmptyRowsDynamic(listKey, keyFields);
    },

    isRowFilledDynamic(item, keyFields) {
      return keyFields.some(field => item[field]?.trim());
    },

    hasEmptyRowDynamic(list, keyFields) {
      return list.some(row => keyFields.every(field => !row[field]?.trim()));
    },

    removeEmptyRowsDynamic(listKey, keyFields) {
      this[listKey] = this[listKey].filter((row, index) =>
        this.isRowFilledDynamic(row, keyFields) || index === this[listKey].length - 1
      );
    },

    createEmptyRowDynamic(keyFields) {
      return keyFields.reduce((obj, field) => ({ ...obj, [field]: "" }), {});
    },

    // Add Template
    addTemplate(templateData, listKey, emptyItem) {
      this[listKey] = this[listKey].filter(item =>
        Object.values(item).some(value => value !== "")
      );

      this[listKey].push(...templateData.data);
      this[listKey].push(emptyItem);
    },
    pdfDialogHandle(item) {
      this.pdfUrl = `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${item.id}.pdf`;
      this.pdfDialog = true;
    },
    closePdfDialog() {
      this.pdfUrl = '';
      this.pdfDialog = false;
      // window.location.reload();
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
      // window.location.reload();
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
      } else if (type === 'prescription') {
        this.$refs.prescriptionFileInput.click();
      }
    },
    formatedDate(date) {
      return getDateFormate(date);
    },
  },
};
</script>
