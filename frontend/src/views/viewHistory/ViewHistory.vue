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
      <v-col class="v-col-12">
        <h4 class="section-title prescription-card-heading">Past Prescriptions</h4>
      </v-col>
      <v-col v-for="prescription in pastPrescriptions" :key="prescription.id" cols="12" md="6">
        <v-card class="prescription-card mb-4" @click="pdfDialogHandle(prescription)">
          <v-card-title>
            <span class="font-weight-bold">Prescription ID: {{ prescription.count }}</span>
          </v-card-title>
          <v-card-text>
            <p><strong>Date:</strong> {{ formatedDate(prescription.date) }}</p>
            <p><strong>Diagnosis:</strong> {{ prescription.diagnosis.join(', ') || 'No Diagnosis Added' }}</p>
            <p><strong>Medicines:</strong> {{ prescription.medicines.join(', ') || 'No Medicines Added' }}</p>
            <p><strong>investigation Advice:</strong> {{ prescription.investigationsAdviced.join(', ') || 'No Investigation Advice Added' }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="pdfDialog" class="height: auto">
      <v-card class="print-popup w-66 d-flex" style="margin: 0 auto;">
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

    <v-row>
      <v-col class="v-col-9">
        <h4 class="section-title prescription-card-heading">IPD Records</h4>
      </v-col>
      <v-col class="text-center v-col-3">
        <v-btn class="saaro-btn" @click="triggerFileUpload('ipd')">Upload IPD Record</v-btn>
        <input ref="ipdFileInput" type="file" accept=".pdf,.png,.jpg,.jpeg" class="d-none"
          @change="handleFileUpload('ipd')" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="record in ipdRecords" :key="record.id" cols="12" md="6">
        <v-card class="record-card mb-4">
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
        let counter = 1;
          this.pastPrescriptions = res.files.map((item) => ({
            count: counter++,
            id: item._id,
            medicines: item.medications.map((med) => med.name),
            diagnosis: item.diagnosis.map((diag) => diag.type),
            date: new Date(item.createdAt).toLocaleDateString(),
            investigationsAdviced: item?.investigationsAdviced.map((invest) => invest.name),
            pdfUrl: `${import.meta.env.VITE_SERVER_URL}/public/prescriptions/prescription_${item._id}.pdf`,
          }));
      }
    },
    triggerFileUpload(type) {
      if (type === "health") {
        this.$refs.healthFileInput.click();
      } else if (type === "ipd") {
        this.$refs.ipdFileInput.click();
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