<template>
  <v-container style="max-width: 100%;" class="history-page">
    <h2 class="text-center mb-4">Patient Prescription Page</h2>
    <v-row class="justify-end mb-3">
      <v-col cols="auto">
        <v-btn class="saaro-btn" @click="createNewVisit">Create New Visit</v-btn>
      </v-col>
    </v-row>

    <v-card class="patient-card mb-4">
      <v-card-title>
        <div>
          <h3 class="font-weight-bold">{{ patient.fullName }}</h3>
          <p>UID: {{ patient.uid }}</p>
        </div>
      </v-card-title>
      <v-card-text>
        <p v-if="patient.phoneNumber">Contact: {{ patient.phoneNumber }}</p>
        <p v-if="patient.email">Email: {{ patient.email }}</p>
        <p v-if="patient.gender">Gender: {{ patient.gender }}</p>
        <p v-if="patient.age">Age: {{ patient.age }}</p>
        <p v-if="patient.bloodGroup">Blood Group: {{ patient.bloodGroup }}</p>
        <p v-if="patient.allergies">Allergies: {{ patient.allergies }}</p>
        <p v-if="patient.dateOfBirth">Date of Birth: {{ formatedDate(patient.dateOfBirth) }}</p>
        <p v-if="patient.tags">Category: {{ patient.tags }}</p>
        <p v-if="patient.address">Address: {{ patient.address }}</p>
      </v-card-text>
    </v-card>

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

    <v-row>
      <v-col class="v-col-9">
        <h4 class="section-title prescription-card-heading">Health Records</h4>
      </v-col>
      <v-col class="text-center v-col-3">
        <v-btn class="saaro-btn" @click="triggerFileUpload('health')">Upload Health Record</v-btn>
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
  </v-container>
</template>

<script>
import { checkAuth, getDateFormate } from '@/lib/utils/utils';
import { usePatientStore } from '@/store/PatientStore';
import { usePrescriptionStore } from '@/store/PrescriptionStore';
import { useUiStore } from '@/store/UiStore';

export default {
  data() {
    return {
      patient: {},
      pastPrescriptions: [],
      ipdRecords: [],
      healthRecords: [],
      prescriptionRecords: [],
      emailInput: '',
      phoneInput: '',
      pdfDialog: false,
      pdfUrl: '',
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchPatientDetails();
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
        this.patient = res.patient;
      }
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
    triggerFileUpload(type) {
      if (type === "health") {
        this.$refs.healthFileInput.click();
      } else if (type === "ipd") {
        this.$refs.ipdFileInput.click();
      } else if (type === 'prescription') {
        this.$refs.prescriptionFileInput.click();
      }
    },
    pdfDialogHandle(item) {
      this.emailInput = this.patient.email;
      this.phoneInput = this.patient.phoneNumber;
      this.pdfUrl = `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${item.id}.pdf`;
      this.pdfDialog = true;
    },
    closePdfDialog() {
      this.pdfUrl = '';
      this.pdfDialog = false;
    },
    sharePrescription(method) {
      if (method === 'WhatsApp/SMS') {
        useUiStore().openNotificationMessage("Prescription shared via WhatsApp/SMS!");
      } else if (method === 'Email') {
        useUiStore().openNotificationMessage("Prescription sent via Email!");
      } else if (method === 'Print') {
        useUiStore().openNotificationMessage("Prescription printed!");
      }
      this.closePdfDialog();
    },
    async handleFileUpload(type) {
      const fileInput =
        type === "health" ? this.$refs.healthFileInput : type === "ipd" ? this.$refs.ipdFileInput : this.$refs.prescriptionFileInput;
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
    },
    createNewVisit() {
      console.log("Creating a new visit...");
    },
    downloadDocument(url) {
      window.open(url, "_blank");
    },
    formatedDate(date) {
      return getDateFormate(date);
    },
  }
};
</script>