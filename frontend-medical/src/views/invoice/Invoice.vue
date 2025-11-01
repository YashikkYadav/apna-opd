<template class="create-rx-page invoice-page">
  <v-container fluid>
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search Invoice"
          variant="solo"
          max-width="350"
          rounded="pill"
          class="rounded-xl"
        ></v-text-field>
      </v-col>

      <v-col cols="4" class="text-end mb-2">
        <!-- Updated Create Invoice with dropdown -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn class="saaro-btn" color="#8f6cb4" large v-bind="props">
              Create Invoice
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="createInvoice('Medical')">
              <v-list-item-title>Medical Invoice</v-list-item-title>
            </v-list-item>
            <v-list-item @click="createInvoice('Hospital')">
              <v-list-item-title>Hospital Invoice</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row class="align-center mb-3">
      <!-- Left: Buttons -->
      <v-col cols="12" class="d-flex align-center">
        <v-btn
          text
          color="#ffffff"
          rounded
          class="mr-4 filter-btn"
          :class="{ 'active-btn': activeStatus === 'All' }"
          @click="filterInvoices('All')"
        >
          All <span class="span"> {{ allInvoices.length }} </span>
        </v-btn>
        <v-btn
          text
          color="#ffffff"
          rounded
          class="mr-4 filter-btn"
          :class="{ 'active-btn': activeStatus === 'Billed' }"
          @click="filterInvoices('Billed')"
        >
          Billed <span class="span"> {{ countByStatus("Billed") }} </span>
        </v-btn>
        <v-btn
          text
          color="#ffffff"
          rounded
          class="mr-4 filter-btn"
          :class="{ 'active-btn': activeStatus === 'Unbilled' }"
          @click="filterInvoices('Unbilled')"
        >
          Unbilled <span class="span"> {{ countByStatus("Unbilled") }} </span>
        </v-btn>
        <v-btn
          text
          color="#ffffff"
          rounded
          class="filter-btn"
          :class="{ 'active-btn': activeStatus === 'Partially Paid' }"
          @click="filterInvoices('Partially Paid')"
        >
          Partially Paid
          <span class="span"> {{ countByStatus("Partially Paid") }} </span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-card title="Invoices" flat>
      <v-divider></v-divider>

      <v-data-table
        :headers="headers"
        :items="invoice"
        :search="search"
        class="tablee invoice-table template-table grey-head"
      >
        <template v-if="isLoading" v-slot:body>
          <tr v-for="n in 6" :key="n">
            <td v-for="header in headers" :key="header.key">
              <v-skeleton-loader type="text"></v-skeleton-loader>
            </td>
          </tr>
        </template>
        <template v-slot:[`item.InvoiceID`]="{ item }">
          <span
            class="status-tag"
            :style="{ color: '#56b1f3', cursor: 'pointer' }"
            @click="showInvoice(item.InvoiceID)"
            >#{{ item.InvoiceID }}</span
          >
        </template>
        <template v-slot:[`item.Amount`]="{ item }">
          <span class="status-tag" :style="getAmountStyle(item.Status)"
            >₹{{ item.Amount }}</span
          >
        </template>
        <template v-slot:[`item.Status`]="{ item }">
          <span class="status-tag" :style="getStatusStyle(item.Status)">{{
            item.Status
          }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="icon-btn" icon @click="editInvoice(item)">
            <v-icon color="gray">mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn class="icon-btn" @click="printOrder(item)" icon>
            <v-icon color="gray">mdi-printer-outline</v-icon>
          </v-btn>
          <v-btn class="icon-btn" icon @click="openShareDialog(item)">
            <v-icon color="gray">mdi-share-variant-outline</v-icon>
          </v-btn>
          <v-btn class="icon-btn" icon @click="deleteDialogHandle(item)">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>

  <!-- Medical Invoice Modal -->
  <invoice-add-edit-model
    v-if="invoiceType === 'Medical'"
    :invoicesData="invoiceData"
    :dialog="dialog && invoiceType === 'Medical' ? true : false"
    :isEditModel="isEdit"
    :isShowModel="isShow"
    @close-dialog="dialog = false"
    @fetch-invoices="fetchInvoices"
  />

  <!-- Hospital Invoice Modal -->
  <hospital-invoice-model
    v-if="invoiceType === 'Hospital'"
    :invoicesData="hospitalInvoiceData"
    :dialog="dialog && invoiceType === 'Hospital' ? true : false"
    :isEditModel="isEdit"
    :isShowModel="isShow"
    @close-dialog="dialog = false"
    @fetch-invoices="fetchInvoices"
  />

  <!-- Medical PDF Modal -->
  <invoice-pdf-model
    ref="medicalPdfModel"
    :orderData="invoiceData"
    :dialog="invoiceDialog && invoiceType === 'Medical'"
    @close-dialog="invoiceDialog = false"
  />

  <!-- Hospital PDF Modal -->
  <hospital-pdf-model
    ref="hospitalPdfModel"
    :orderData="hospitalInvoiceData"
    :dialog="invoiceDialog && invoiceType === 'Hospital'"
    @close-dialog="invoiceDialog = false"
  />

  <!-- Hidden PDF Generation Components for Sharing -->
  <div 
    v-show="isGeneratingPDF" 
    style="position: fixed; left: -9999px; top: 0; width: 900px; background: white; z-index: -1;">
    <div v-if="invoiceType === 'Medical'" id="share-medical-pdf" class="invoice-pdf">
      <!-- Medical Invoice Content -->
      <div class="invoice-header">
        <div class="medical-info">
          <h1>{{ invoiceData.medicalName || 'Medical Store' }}</h1>
          <p>Medical Invoice</p>
        </div>
        <div class="invoice-details">
          <p><strong>Invoice #:</strong> {{ invoiceData.invoiceId || 'N/A' }}</p>
          <p><strong>Date:</strong> {{ formatDate(new Date()) }}</p>
        </div>
      </div>
      <hr class="divider">
      <div class="patient-section no-break">
        <h3>Patient Information</h3>
        <div class="patient-details">
          <div class="patient-left">
            <p><strong>Name:</strong> {{ invoiceData.patientName }}</p>
            <p><strong>Phone:</strong> {{ invoiceData.patientPhone }}</p>
          </div>
          <div class="patient-right">
            <p><strong>Payment Status:</strong> {{ invoiceData.paymentStatus }}</p>
            <p><strong>Payment Mode:</strong> {{ invoiceData.paymentMode }}</p>
          </div>
        </div>
        <div class="patient-address">
          <p><strong>Address:</strong> {{ invoiceData.patientAddress }}</p>
        </div>
      </div>
      <div class="medicines-section">
        <h3>Prescribed Medicines</h3>
        <table class="medicines-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Qty</th>
              <th>Rate (₹)</th>
              <th>Discount (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(medicine, index) in invoiceData.medicines" :key="index">
              <td>{{ medicine.medicineName }}</td>
              <td>{{ medicine.quantity }}</td>
              <td>₹{{ medicine.amount }}</td>
              <td>₹{{ medicine.discount || 0 }}</td>
              <td>₹{{ calculateMedicineTotal(medicine) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="total-section no-break">
        <div class="total-details">
          <div class="total-left">
            <p><strong>Payment Mode:</strong> {{ invoiceData.paymentMode }}</p>
          </div>
          <div class="total-right">
            <p><strong>Subtotal:</strong> ₹{{ calculateSubtotal(invoiceData.medicines) }}</p>
            <p><strong>Total Discount:</strong> ₹{{ calculateTotalDiscount(invoiceData.medicines) }}</p>
            <p class="grand-total"><strong>Grand Total: ₹{{ calculateGrandTotal(invoiceData.medicines) }}</strong></p>
          </div>
        </div>
      </div>
      <div class="invoice-footer no-break">
        <p>Thank you for choosing our medical store!</p>
        <p><em>Generated on {{ formatDate(new Date()) }}</em></p>
      </div>
    </div>

    <div v-if="invoiceType === 'Hospital'" id="share-hospital-pdf" class="invoice-pdf">
      <!-- Hospital Invoice Content -->
      <div class="invoice-header">
        <div class="hospital-info">
          <h1>{{ hospitalInvoiceData.hospitalName || "Hospital Name" }}</h1>
          <p><strong>Phone:</strong> {{ hospitalInvoiceData.hospitalPhone || "N/A" }}</p>
          <p><strong>Address:</strong> {{ hospitalInvoiceData.hospitalAddress || "N/A" }}</p>
        </div>
        <div class="invoice-details">
          <p><strong>Registration No.:</strong> {{ hospitalInvoiceData.regNo || "N/A" }}</p>
          <p><strong>Bill No.:</strong> {{ hospitalInvoiceData.billNo || "N/A" }}</p>
          <p><strong>Invoice ID:</strong> {{ hospitalInvoiceData.invoiceId || "N/A" }}</p>
          <p><strong>Date:</strong> {{ formatDate(new Date()) }}</p>
        </div>
      </div>
      <hr class="divider" />
      <div class="patient-section">
        <h3>Patient Information</h3>
        <div class="patient-details">
          <div class="patient-left">
            <p><strong>Name:</strong> {{ hospitalInvoiceData.patientName }}</p>
            <p><strong>Phone:</strong> {{ hospitalInvoiceData.patientPhone }}</p>
            <p><strong>Address:</strong> {{ hospitalInvoiceData.patientAddress }}</p>
          </div>
          <div class="patient-right">
            <p><strong>Age:</strong> {{ hospitalInvoiceData.patientAge }} years</p>
            <p><strong>Gender:</strong> {{ hospitalInvoiceData.patientGender }}</p>
            <p><strong>Payment Status:</strong> {{ hospitalInvoiceData.paymentStatus }}</p>
          </div>
        </div>
      </div>
      <div class="medical-section">
        <h3>Hospital Information</h3>
        <div class="medical-details">
          <div class="medical-left">
            <p><strong>Doctor:</strong> {{ hospitalInvoiceData.doctorName }}</p>
            <p><strong>Department:</strong> {{ hospitalInvoiceData.department }}</p>
            <p><strong>Room Type:</strong> {{ hospitalInvoiceData.roomType }}</p>
          </div>
          <div class="medical-right">
            <p><strong>Room Number:</strong> {{ hospitalInvoiceData.roomNumber }}</p>
            <p><strong>Admission Date:</strong> {{ formatDate(hospitalInvoiceData.admissionDate) }}</p>
            <p><strong>Discharge Date:</strong> {{ formatDate(hospitalInvoiceData.dischargeDate) }}</p>
          </div>
        </div>
      </div>
      <div class="services-section">
        <h3>Hospital Services</h3>
        <table class="services-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Qty</th>
              <th>Rate (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in hospitalInvoiceData.services" :key="index">
              <td>{{ service.serviceName }}</td>
              <td>{{ formatDate(service.serviceDate) }}</td>
              <td>{{ service.quantity }}</td>
              <td>₹{{ service.amount }}</td>
              <td>₹{{ calculateServiceTotal(service) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="total-section">
        <div class="total-details">
          <div class="total-left">
            <p><strong>Payment Mode:</strong> {{ hospitalInvoiceData.paymentMode }}</p>
          </div>
          <div class="total-right">
            <p><strong>Subtotal:</strong> ₹{{ hospitalInvoiceData.totalAmount }}</p>
            <p><strong>Discount:</strong> ₹{{ hospitalInvoiceData.overallDiscount || hospitalInvoiceData.discount }}</p>
            <p class="grand-total"><strong>Grand Total: ₹{{ hospitalInvoiceData.grandTotal }}</strong></p>
          </div>
        </div>
      </div>
      <div class="invoice-footer">
        <p>Thank you for choosing our hospital!</p>
        <p><em>Generated on {{ formatDate(new Date()) }}</em></p>
      </div>
    </div>
  </div>

  <!-- Share Dialog -->
  <v-dialog v-model="shareDialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Share Invoice</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-radio-group v-model="shareOption" class="mt-4">
          <v-radio label="WhatsApp" value="whatsapp"></v-radio>
          <v-radio label="Email" value="email"></v-radio>
          <v-radio label="Both (WhatsApp & Email)" value="both"></v-radio>
        </v-radio-group>

        <!-- WhatsApp Phone Number -->
        <v-text-field
          v-if="shareOption === 'whatsapp' || shareOption === 'both'"
          v-model="shareData.phoneNumber"
          label="WhatsApp Number"
          placeholder="Enter 10-digit phone number"
          variant="outlined"
          :rules="phoneRules"
          :error-messages="phoneError"
          prepend-inner-icon="mdi-phone"
          class="mt-3"
        ></v-text-field>

        <!-- Email Address -->
        <v-text-field
          v-if="shareOption === 'email' || shareOption === 'both'"
          v-model="shareData.email"
          label="Email Address"
          placeholder="Enter email address"
          variant="outlined"
          :rules="emailRules"
          :error-messages="emailError"
          prepend-inner-icon="mdi-email"
          class="mt-3"
        ></v-text-field>

        <!-- Patient Name -->
        <v-text-field
          v-model="shareData.name"
          label="Patient Name"
          placeholder="Enter patient name"
          variant="outlined"
          :rules="nameRules"
          :error-messages="nameError"
          prepend-inner-icon="mdi-account"
          class="mt-3"
        ></v-text-field>

        <!-- Subject (for Email) -->
        <v-text-field
          v-if="shareOption === 'email' || shareOption === 'both'"
          v-model="shareData.subject"
          label="Email Subject"
          placeholder="Enter email subject"
          variant="outlined"
          prepend-inner-icon="mdi-text-subject"
          class="mt-3"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="closeShareDialog">Cancel</v-btn>
        <v-btn
          color="#8f6cb4"
          :loading="isSending"
          :disabled="!isShareFormValid"
          @click="sendInvoice"
          >Send</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <common-model
    :commonModel="isDeleteModalOpen"
    @close-dialog="isDeleteModalOpen = false"
    @actions="onDeleteInvoice"
    title="Delete Invoice"
    description="Are you sure you want to delete invoice?"
  />
</template>

<script>
import html2pdf from "html2pdf.js";
import CommonModel from "@/components/CommonModel.vue";
import InvoiceAddEditModel from "./components/InvoiceAddEditModel.vue";
import InvoicePdfModel from "./components/InvoicePdfModel.vue";
import HospitalInvoiceModel from "./components/HospitalInvoiceModel.vue";
import HospitalPdfModel from "./components/HospitalPdfModel.vue";

import { checkAuth, getAmountStyle, getStatusStyle } from "@/lib/utils/utils";
import { useProfileStore } from "@/store/ProfileStore";
import { useInvoiceStore } from "@/store/InvoiceStore";
import { useUiStore } from "@/store/UiStore";
import axios from "axios";

// Make html2pdf available globally for the component
if (typeof window !== 'undefined') {
  window.html2pdf = html2pdf;
}

export default {
  name: "Invoice",
  components: {
    InvoiceAddEditModel,
    InvoicePdfModel,
    HospitalInvoiceModel,
    HospitalPdfModel,
    CommonModel,
  },
  data() {
    return {
      search: "",
      pharmacyName: "",
      invoiceType: "Medical",
      headers: [
        { align: "start", key: "InvoiceID", title: "Invoice" },
        { key: "Amount", title: "Amount" },
        { key: "Status", title: "Status" },
        { key: "Patient Name", title: "Patient Name" },
        { key: "Date", title: "Date" },
        { key: "Type", title: "Type" },
        { key: "actions", title: "Actions" },
      ],
      invoiceId: "",
      invoice: [],
      allInvoices: [],
      activeStatus: "All",
      dialog: false,
      isEdit: false,
      isShow: false,
      isLoading: true,
      invoiceData: {},
      hospitalInvoiceData: {},
      isDeleteModalOpen: false,
      invoiceDialog: false,
      shareDialog: false,
      shareOption: "whatsapp",
      shareData: {
        phoneNumber: "",
        email: "",
        name: "",
        subject: "Invoice from " + this.pharmacyName,
      },
      currentShareItem: null,
      isSending: false,
      isGeneratingPDF: false,
      phoneError: "",
      emailError: "",
      nameError: "",
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^[0-9]{10}$/.test(v) || "Phone number must be 10 digits",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      nameRules: [(v) => !!v || "Patient name is required"],
    };
  },
  computed: {
    isShareFormValid() {
      const { phoneNumber, email, name } = this.shareData;
      const option = this.shareOption;

      // Name is always required
      if (!name || name.trim() === "") return false;

      // Validate based on selected option
      if (option === "whatsapp") {
        return /^[0-9]{10}$/.test(phoneNumber);
      } else if (option === "email") {
        return /.+@.+\..+/.test(email);
      } else if (option === "both") {
        return /^[0-9]{10}$/.test(phoneNumber) && /.+@.+\..+/.test(email);
      }

      return false;
    },
  },
  async mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      await this.fetchProfileData();
      this.fetchInvoices();
      this.fetchProfileData();
    }
  },
  methods: {
    calculateMedicineTotal(medicine) {
      const qty = parseFloat(medicine.quantity || medicine.qty || 0);
      const amount = parseFloat(medicine.amount || medicine.price || 0);
      const discount = parseFloat(medicine.discount || 0);
      return (qty * amount - discount).toFixed(2);
    },
    calculateSubtotal(medicines) {
      if (!medicines) return '0.00';
      return medicines.reduce((sum, medicine) => {
        const qty = parseFloat(medicine.quantity || medicine.qty || 0);
        const amount = parseFloat(medicine.amount || medicine.price || 0);
        return sum + (qty * amount);
      }, 0).toFixed(2);
    },
    calculateTotalDiscount(medicines) {
      if (!medicines) return '0.00';
      return medicines.reduce((sum, medicine) => {
        return sum + parseFloat(medicine.discount || 0);
      }, 0).toFixed(2);
    },
    calculateGrandTotal(medicines) {
      if (!medicines) return '0.00';
      return medicines.reduce((sum, medicine) => {
        return sum + parseFloat(this.calculateMedicineTotal(medicine));
      }, 0).toFixed(2);
    },
    calculateServiceTotal(service) {
      const qty = service.quantity || service.qty || 1;
      const price = service.amount || service.price || 0;
      return qty * price;
    },
    formatDate(date) {
      if (!date) return 'N/A';
      if (typeof date === 'string') {
        date = new Date(date);
      }
      return date.toLocaleDateString('en-GB');
    },
    async fetchProfileData() {
      try {
        const res = await useProfileStore().getProfileData();
        const profile = await res?.healthServeProfileData?.healthServeUser;
        this.pharmacyName = profile?.name || "Pharmacy Name";
        this.shareData.subject = `Invoice from ${this.pharmacyName}`;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        this.pharmacyName = "Pharmacy Name";
      }
    },
    async fetchInvoices() {
      try {
        const res = await useInvoiceStore().getAllInvoicesApiCall();
        if (res) {
          this.allInvoices = res.invoices;
          this.invoice = res.invoices.map((invoice) => ({
            InvoiceID: invoice.invoiceId,
            Amount: invoice.totalAmount,
            Status: invoice.paymentStatus,
            "Patient Name": invoice.patientName,
            Date: new Date(invoice.createdAt).toLocaleDateString("en-GB"),
            Type: invoice.invoiceType,
            id: invoice._id,
            invoiceType: invoice.invoiceType,
          }));
          this.isLoading = false;
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        this.isLoading = false;
      }
    },
    async onDeleteInvoice() {
      try {
        const res = await useInvoiceStore().deleteInvoiceApiCall(
          this.invoiceId
        );
        this.isDeleteModalOpen = false;
        this.invoiceId = "";
        this.fetchInvoices();
        useUiStore().openNotificationMessage("Invoice Deleted Successfully!");
      } catch (error) {
        console.error("Error deleting invoice:", error);
        this.isDeleteModalOpen = false;
        this.invoiceId = "";
      }
    },
    deleteDialogHandle(item) {
      this.isDeleteModalOpen = true;
      this.invoiceId = item.id;
    },
    openShareDialog(item) {
      this.currentShareItem = item;
      const fullInvoiceData = this.allInvoices.find(
        (invoice) => invoice._id === item.id
      );

      if (fullInvoiceData) {
        this.shareData.name = fullInvoiceData.patientName || "";
        this.shareData.phoneNumber = fullInvoiceData.patientPhone || "";
        this.shareData.email = "";
        this.shareData.subject = `Invoice #${item.InvoiceID} from ${this.pharmacyName}`;
      }

      this.shareDialog = true;
      this.phoneError = "";
      this.emailError = "";
      this.nameError = "";
    },
    closeShareDialog() {
      this.shareDialog = false;
      this.shareOption = "whatsapp";
      this.shareData = {
        phoneNumber: "",
        email: "",
        name: "",
        subject: `Invoice from ${this.pharmacyName}`,
      };
      this.currentShareItem = null;
      this.phoneError = "";
      this.emailError = "";
      this.nameError = "";
    },
    async generateInvoicePDF(item) {
      try {
        const fullInvoiceData = this.allInvoices.find(
          (invoice) => invoice._id === item.id
        );

        if (!fullInvoiceData) {
          throw new Error("Invoice data not found");
        }

        const invoiceType = fullInvoiceData.invoiceType || "Medical";
        this.invoiceType = invoiceType;

        // Prepare invoice data based on type
        if (invoiceType === "Medical") {
          this.invoiceData = {
            ...fullInvoiceData,
            medicines: fullInvoiceData.medicines.map((medicine) => ({
              ...medicine,
              medicineName: medicine.medicineName,
              quantity: medicine.quantity,
              qty: medicine.quantity,
              amount: medicine.amount || medicine.price || 0,
              discount: medicine.discount || 0,
            })),
          };
        } else {
          this.hospitalInvoiceData = {
            ...fullInvoiceData,
            services:
              fullInvoiceData.services?.map((service) => ({
                ...service,
                serviceName: service.serviceName,
                serviceDate: service.serviceDate,
                quantity: service.quantity,
                qty: service.quantity,
                amount: service.amount || service.price || 0,
              })) || [],
          };
        }

        // Show the PDF generation div
        this.isGeneratingPDF = true;

        // Wait for DOM to update
        await this.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 300));

        // Get the PDF element ID based on type
        const elementId = invoiceType === "Medical" 
          ? "share-medical-pdf" 
          : "share-hospital-pdf";
        
        const element = document.getElementById(elementId);

        if (!element) {
          this.isGeneratingPDF = false;
          throw new Error(`PDF element not found: ${elementId}`);
        }

        // Check if html2pdf is available
        if (!window.html2pdf) {
          this.isGeneratingPDF = false;
          throw new Error("html2pdf library not loaded. Please ensure html2pdf is included in your project.");
        }

        const opt = {
          margin: [0.75, 0.75, 0.75, 0.75],
          filename: `invoice-${fullInvoiceData.invoiceId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            height: element.scrollHeight,
            width: element.scrollWidth
          },
          jsPDF: { 
            unit: "in", 
            format: "a4", 
            orientation: "portrait",
            compress: true
          },
          pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after',
            avoid: '.no-break'
          }
        };

        // Generate PDF and get base64
        const pdfDataUri = await window.html2pdf()
          .set(opt)
          .from(element)
          .outputPdf('datauristring');

        // Hide the PDF generation div
        this.isGeneratingPDF = false;

        // Extract base64 from data URI
        const base64 = pdfDataUri.split(',')[1];
        return base64;

      } catch (error) {
        this.isGeneratingPDF = false;
        console.error("Error in generateInvoicePDF:", error);
        throw error;
      }
    },
    async sendInvoice() {
      // Validate form
      if (!this.isShareFormValid) {
        if (this.shareOption === "whatsapp" || this.shareOption === "both") {
          if (!this.shareData.phoneNumber || !/^[0-9]{10}$/.test(this.shareData.phoneNumber)) {
            this.phoneError = "Valid 10-digit phone number is required";
          }
        }
        if (this.shareOption === "email" || this.shareOption === "both") {
          if (!this.shareData.email || !/.+@.+\..+/.test(this.shareData.email)) {
            this.emailError = "Valid email address is required";
          }
        }
        if (!this.shareData.name) {
          this.nameError = "Patient name is required";
        }
        return;
      }

      this.isSending = true;

      try {
        // Generate PDF
        const base64pdf = await this.generateInvoicePDF(this.currentShareItem);

        const payload = {
          base64pdf: base64pdf,
          name: this.shareData.name,
          subject: this.shareData.subject || `Invoice from ${this.pharmacyName}`,
        };

        // Add phone number if WhatsApp or both
        if (this.shareOption === "whatsapp" || this.shareOption === "both") {
          payload.phoneNumber = this.shareData.phoneNumber;
        }

        // Add email if Email or both
        if (this.shareOption === "email" || this.shareOption === "both") {
          payload.email = this.shareData.email;
        }

        // Send to API
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/send-pdf`,
          payload
        );

        if (response.data) {
          useUiStore().openNotificationMessage(
            `Invoice sent successfully via ${
              this.shareOption === "both"
                ? "WhatsApp and Email"
                : this.shareOption === "whatsapp"
                ? "WhatsApp"
                : "Email"
            }!`
          );
          this.closeShareDialog();
        }
      } catch (error) {
        console.error("Error sending invoice:", error);
        useUiStore().openNotificationMessage(
          error.response?.data?.message || "Failed to send invoice. Please try again."
        );
      } finally {
        this.isSending = false;
      }
    },
    createInvoice(type) {
      this.invoiceType = type;

      if (type === "Medical") {
        this.invoiceData = {
          patientName: "",
          patientPhone: "",
          patientAddress: "",
          paymentStatus: null,
          medicines: [
            {
              medicineName: "",
              qty: "",
              amount: "",
              discount: "",
            },
          ],
          paymentMode: null,
          medicalName: this.pharmacyName,
          totalAmount: null,
          invoiceType: "Medical",
        };
      } else if (type === "Hospital") {
        this.hospitalInvoiceData = {
          patientName: "",
          patientPhone: "",
          patientAddress: "",
          patientAge: "",
          patientGender: null,
          hospitalName: "",
          hospitalPhone: "",
          hospitalAddress: "",
          regNo: "",
          billNo: "",
          doctorName: "",
          department: "",
          admissionDate: "",
          dischargeDate: "",
          roomType: null,
          roomNumber: "",
          paymentStatus: null,
          services: [
            {
              serviceName: "",
              serviceDate: "",
              qty: "",
              amount: "",
            },
          ],
          paymentMode: null,
          totalAmount: null,
          discount: null,
          grandTotal: null,
          invoiceType: "Hospital",
        };
      }

      this.dialog = true;
      this.isEdit = false;
      this.isShow = false;
    },
    editInvoice(item) {
      const data = this.allInvoices.filter(
        (invoice) => invoice.invoiceId === item.InvoiceID
      );
      if (data.length > 0) {
        const invoiceType = data[0].invoiceType;
        this.invoiceType = invoiceType;

        if (invoiceType === "Medical") {
          this.invoiceData = {
            id: data[0]._id,
            patientName: data[0].patientName,
            patientPhone: data[0].patientPhone,
            patientAddress: data[0].patientAddress,
            paymentStatus: data[0].paymentStatus,
            paymentMode: data[0].paymentMode,
            medicines: data[0].medicines.map((item) => ({
              medicineName: item.medicineName,
              qty: item.quantity,
              amount: item.amount,
              discount: item.discount,
            })),
            totalAmount: data[0].totalAmount,
            invoiceType: "Medical",
            medicalName: data[0].medicalName,
          };
        } else {
          this.hospitalInvoiceData = {
            id: data[0]._id,
            patientName: data[0].patientName,
            patientPhone: data[0].patientPhone,
            patientAddress: data[0].patientAddress,
            patientAge: data[0].patientAge,
            patientGender: data[0].patientGender,
            hospitalName: data[0].hospitalName,
            hospitalPhone: data[0].hospitalPhone,
            hospitalAddress: data[0].hospitalAddress,
            regNo: data[0].regNo,
            billNo: data[0].billNo,
            doctorName: data[0].doctorName,
            department: data[0].department,
            admissionDate: data[0].admissionDate,
            dischargeDate: data[0].dischargeDate,
            roomType: data[0].roomType,
            roomNumber: data[0].roomNumber,
            paymentStatus: data[0].paymentStatus,
            paymentMode: data[0].paymentMode,
            services:
              data[0].services?.map((item) => ({
                serviceName: item.serviceName,
                serviceDate: item.serviceDate,
                qty: item.quantity,
                amount: item.amount,
              })) || [],
            totalAmount: data[0].totalAmount,
            discount: data[0].overallDiscount,
            grandTotal: data[0].grandTotal,
            invoiceType: "Hospital",
          };
        }

        this.dialog = true;
        this.isEdit = true;
        this.isShow = false;
      }
    },
    showInvoice(id) {
      const data = this.allInvoices.filter(
        (invoice) => invoice.invoiceId === id
      );
      if (data.length > 0) {
        const invoiceType = data[0].invoiceType || "Medical";
        this.invoiceType = invoiceType;

        if (invoiceType === "Medical") {
          this.invoiceData = {
            id: data[0]._id,
            patientName: data[0].patientName,
            patientPhone: data[0].patientPhone,
            patientAddress: data[0].patientAddress,
            paymentStatus: data[0].paymentStatus,
            paymentMode: data[0].paymentMode,
            medicines: data[0].medicines.map((item) => ({
              medicineName: item.medicineName,
              qty: item.quantity,
              amount: item.amount,
              discount: item.discount,
            })),
            totalAmount: data[0].totalAmount,
            invoiceType: "Medical",
          };
        } else {
          this.hospitalInvoiceData = {
            id: data[0]._id,
            hospitalName: data[0].hospitalName,
            hospitalPhone: data[0].hospitalPhone,
            hospitalAddress: data[0].hospitalAddress,
            regNo: data[0].regNo,
            billNo: data[0].billNo,
            patientName: data[0].patientName,
            patientPhone: data[0].patientPhone,
            patientAddress: data[0].patientAddress,
            patientAge: data[0].patientAge,
            patientGender: data[0].patientGender,
            doctorName: data[0].doctorName,
            department: data[0].department,
            admissionDate: data[0].admissionDate,
            dischargeDate: data[0].dischargeDate,
            roomType: data[0].roomType,
            roomNumber: data[0].roomNumber,
            paymentStatus: data[0].paymentStatus,
            paymentMode: data[0].paymentMode,
            services:
              data[0].services?.map((item) => ({
                serviceName: item.serviceName,
                serviceDate: item.serviceDate,
                qty: item.quantity,
                amount: item.amount,
              })) || [],
            totalAmount: data[0].totalAmount,
            discount: data[0].discount,
            grandTotal: data[0].grandTotal,
            invoiceType: "Hospital",
          };
        }

        this.dialog = true;
        this.isShow = true;
      }
    },
    filterInvoices(status) {
      this.activeStatus = status;
      if (status === "All") {
        this.invoice = this.allInvoices.map((invoice) => ({
          InvoiceID: invoice.invoiceId,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.patientName,
          Date: new Date(invoice.createdAt).toLocaleDateString("en-GB"),
          Type: invoice.paymentMode,
          id: invoice._id,
          invoiceType: invoice.invoiceType || "Medical",
        }));
      } else {
        const data = this.allInvoices.filter(
          (invoice) => invoice.paymentStatus === status
        );
        this.invoice = data.map((invoice) => ({
          InvoiceID: invoice.invoiceId,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.patientName,
          Date: new Date(invoice.createdAt).toLocaleDateString("en-GB"),
          Type: invoice.paymentMode,
          id: invoice._id,
          invoiceType: invoice.invoiceType || "Medical",
        }));
      }
    },
    countByStatus(status) {
      return this.allInvoices.filter(
        (invoice) => invoice.paymentStatus === status
      ).length;
    },
    getAmountStyle(status) {
      return getAmountStyle(status);
    },
    getStatusStyle(status) {
      return getStatusStyle(status);
    },
    printOrder(item) {
      console.log("Print order clicked for item:", item);

      const fullInvoiceData = this.allInvoices.find(
        (invoice) => invoice._id === item.id
      );
      console.log(fullInvoiceData);

      if (fullInvoiceData) {
        const invoiceType = fullInvoiceData.invoiceType || "Medical";
        this.invoiceType = invoiceType;

        if (invoiceType === "Medical") {
          this.invoiceData = {
            ...fullInvoiceData,
            medicines: fullInvoiceData.medicines.map((medicine) => ({
              ...medicine,
              price: medicine.amount || medicine.price || 0,
            })),
          };
        } else {
          this.hospitalInvoiceData = {
            ...fullInvoiceData,
            services:
              fullInvoiceData.services?.map((service) => ({
                ...service,
                price: service.amount || service.price || 0,
              })) || [],
          };
        }

        this.invoiceDialog = true;

        this.$nextTick(() => {
          console.log(
            "invoiceDialog state after nextTick:",
            this.invoiceDialog
          );
        });
      } else {
        console.error("Invoice data not found for item:", item);
        if (useUiStore && useUiStore().openNotificationMessage) {
          useUiStore().openNotificationMessage(
            "Error: Invoice data not found!"
          );
        }
      }
    },
  },
};
</script>

<style scoped>
/* PDF Styles for sharing */
.invoice-pdf {
  padding: 20px;
  background: white;
  color: black;
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 900px;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.medical-info h1,
.hospital-info h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

.medical-info p,
.hospital-info p {
  margin: 5px 0;
  font-size: 16px;
  color: #666;
}

.invoice-details {
  text-align: right;
}

.invoice-details p {
  margin: 5px 0;
  font-size: 14px;
}

.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.patient-section,
.medical-section,
.services-section {
  margin: 20px 0;
}

.patient-section h3,
.medical-section h3,
.services-section h3 {
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
  font-size: 18px;
}

.patient-details,
.medical-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.patient-left,
.patient-right,
.medical-left,
.medical-right {
  flex: 1;
}

.patient-left p,
.patient-right p,
.medical-left p,
.medical-right p,
.patient-address p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
}

.medicines-section,
.services-section {
  margin: 30px 0;
}

.medicines-table,
.services-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.medicines-table th,
.medicines-table td,
.services-table th,
.services-table td {
  border: 1px solid #ddd;
  padding: 12px 8px;
  text-align: left;
  font-size: 14px;
}

.medicines-table th,
.services-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

.medicines-table tr:nth-child(even),
.services-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.total-section {
  margin: 30px 0;
  border-top: 2px solid #ddd;
  padding-top: 20px;
}

.total-details {
  display: flex;
  justify-content: space-between;
}

.total-left,
.total-right {
  flex: 1;
}

.total-right {
  text-align: right;
}

.total-right p {
  margin: 8px 0;
  font-size: 16px;
}

.grand-total {
  font-size: 18px !important;
  color: #007bff !important;
  font-weight: bold !important;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 15px !important;
}

.invoice-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.invoice-footer p {
  margin: 5px 0;
  font-size: 14px;
}

.no-break {
  page-break-inside: avoid;
}
</style>