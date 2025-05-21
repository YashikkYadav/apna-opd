<template class="history-page">
    <v-container style="max-width: 100%;">
      <h2 class="text-center mb-4">Patient Prescription Page</h2>
      <v-row class="justify-end mb-3">
        <v-col cols="auto">
          <v-btn  class="saaro-btn" @click="createNewVisit">Create New Visit</v-btn>
        </v-col>
      </v-row>
  
      <v-card class="patient-card mb-4">
        <v-card-title>
          <!-- <v-avatar class="mr-3">
            <v-img src="https://via.placeholder.com/150" class="rounded-circle"></v-img>
          </v-avatar> -->
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
        <v-col class="v-col-12"><h4 class="section-title prescription-card-heading">Past Prescriptions</h4></v-col>
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
            <v-btn  class="saaro-btn" text @click="closePdfDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Upload Health Record -->
      
      <v-row>
        <v-col class="v-col-9"><h4 class="section-title prescription-card-heading">Health Records</h4></v-col>
        <v-col class="text-center v-col-3">
          <v-btn class="saaro-btn" @click="triggerFileUpload('health')">Upload Health Record</v-btn>
          <input
            ref="healthFileInput"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            class="d-none"
            @change="handleFileUpload('health')"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col v-for="record in healthRecords" :key="record.id" cols="12" md="6">
          <v-card class="health-record-card mb-4">
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
  
      <!-- Upload IPD Record -->
      
      <v-row>
        <v-col class="v-col-9"><h4 class="section-title prescription-card-heading">IPD Records</h4></v-col>
        <v-col class="text-center v-col-3">
          <v-btn  class="saaro-btn" @click="triggerFileUpload('ipd')">Upload IPD Record</v-btn>
          <input
            ref="ipdFileInput"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            class="d-none"
            @change="handleFileUpload('ipd')"
          />
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
    </v-container>
  </template>
  
  <script>
  import { getDateFormate } from '@/lib/utils/utils';
  
  export default {
    data() {
      return {
        patient: {},
        pastPrescriptions: [],
        ipdRecords: [],
        healthRecords: [],
        doctorId: '',
        accessToken: '',
        emailInput: '',
        phoneInput: '',
        pdfDialog: false,
        pdfUrl: '',
      };
    },
    mounted() {
      this.doctorId = localStorage.getItem('doctor_id');
      this.accessToken = localStorage.getItem('access_token');
  
      if (!this.doctorId || !this.accessToken) {
        this.$router.push('/login');
      }
  
      this.fetchPatientDetails();
      this.fetchFiles();
    },
    methods: {
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
          alert('Prescription shared via WhatsApp/SMS!');
        } else if (method === 'Email') {
          alert('Prescription sent via Email!');
        } else if (method === 'Print') {
          alert('Prescription printed!');
        }
        this.closePopup();
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
      fetchPatientDetails() {
        const patientId = this.$route.params.patientId;
  
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/patient/${patientId}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            this.patient = data.patient;
          })
          .catch((error) => {
            console.error("Error fetching patient details:", error);
          });
      },
      createNewVisit() {
        console.log("Creating a new visit...");
        // Implement navigation to new visit creation page or form logic here
      },
      downloadDocument(url) {
        window.open(url, "_blank");
      },
      fetchFiles() {
        const patientId = this.$route.params.patientId;
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/${patientId}/file/health`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            for (let i=0; i<data.files.length; i++) {
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
            for (let i=0; i<data.files.length; i++) {
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
      formatedDate(date) {
        return getDateFormate(date);
      },
    }
  };
  </script>
  
  
  
  <style scoped>
    .v-container {
      padding: 30px;
      background-color: #f2f3f5;
    }
  
    .patient-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .prescription-card {
      background-color: #f0f5fa;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .record-card {
      background-color: #f0f5fa;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .health-record-card {
      background-color: #f0f5fa;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .v-btn {
      border-radius: 24px;
      transition: background-color 0.3s ease;
    }
  
    .v-btn:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  
    h2 {
      font-weight: 700;
      color: #2c3e50;
    }
  
    h4.section-title {
      font-weight: 600;
      color: #34495e;
    }
  
    p {
      color: #4a4a4a;
    }
  
    .v-divider {
      margin: 20px 0;
    }
  
    .d-none {
      display: none;
    }
  </style>