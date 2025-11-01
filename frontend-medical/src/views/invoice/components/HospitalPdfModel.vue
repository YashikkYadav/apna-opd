<template>
  <v-dialog v-model="isDialogOpen" max-width="900px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Hospital Invoice </span>
        <v-btn icon @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div id="hospital-invoice-pdf" class="invoice-pdf">
          <!-- Header -->
          <div class="invoice-header">
            <div class="hospital-info">
              <h1>{{ orderData.hospitalName || "Hospital Name" }}</h1>
              <p>
                <strong>Phone:</strong> {{ orderData.hospitalPhone || "N/A" }}
              </p>
              <p>
                <strong>Address:</strong>
                {{ orderData.hospitalAddress || "N/A" }}
              </p>
            </div>
            <div class="invoice-details">
              <p>
                <strong>Registration No.:</strong>
                {{ orderData.regNo || "N/A" }}
              </p>
              <p><strong>Bill No.:</strong> {{ orderData.billNo || "N/A" }}</p>
              <p>
                <strong>Invoice ID:</strong> {{ orderData.invoiceId || "N/A" }}
              </p>
              <p><strong>Date:</strong> {{ formatDate(new Date()) }}</p>
            </div>
          </div>

          <hr class="divider" />

          <!-- Patient Information -->
          <div class="patient-section">
            <h3>Patient Information</h3>
            <div class="patient-details">
              <div class="patient-left">
                <p><strong>Name:</strong> {{ orderData.patientName }}</p>
                <p><strong>Phone:</strong> {{ orderData.patientPhone }}</p>
                <p><strong>Address:</strong> {{ orderData.patientAddress }}</p>
              </div>
              <div class="patient-right">
                <p><strong>Age:</strong> {{ orderData.patientAge }} years</p>
                <p><strong>Gender:</strong> {{ orderData.patientGender }}</p>
                <p>
                  <strong>Payment Status:</strong> {{ orderData.paymentStatus }}
                </p>
              </div>
            </div>
          </div>

          <!-- Medical Information -->
          <div class="medical-section">
            <h3>Hospital Information</h3>
            <div class="medical-details">
              <div class="medical-left">
                <p><strong>Doctor:</strong> {{ orderData.doctorName }}</p>
                <p><strong>Department:</strong> {{ orderData.department }}</p>
                <p><strong>Room Type:</strong> {{ orderData.roomType }}</p>
              </div>
              <div class="medical-right">
                <p><strong>Room Number:</strong> {{ orderData.roomNumber }}</p>
                <p>
                  <strong>Admission Date:</strong>
                  {{ formatDate(orderData.admissionDate) }}
                </p>
                <p>
                  <strong>Discharge Date:</strong>
                  {{ formatDate(orderData.dischargeDate) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Services Table -->
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
                <tr v-for="(service, index) in orderData.services" :key="index">
                  <td>{{ service.serviceName || service.name }}</td>
                  <td>{{ formatDate(service.serviceDate) }}</td>
                  <td>{{ service.quantity || service.qty }}</td>
                  <td>₹{{ service.amount || service.price }}</td>
                  <td>₹{{ calculateServiceTotal(service) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Total Section -->
          <div class="total-section">
            <div class="total-details">
              <div class="total-left">
                <p>
                  <strong>Payment Mode:</strong> {{ orderData.paymentMode }}
                </p>
              </div>
              <div class="total-right">
                <p><strong>Subtotal:</strong> ₹{{ orderData.totalAmount }}</p>
                <p><strong>Discount:</strong> ₹{{ orderData.overallDiscount }}</p>
                <p class="grand-total">
                  <strong>Grand Total: ₹{{ orderData.grandTotal }}</strong>
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="invoice-footer">
            <p>Thank you for choosing our hospital!</p>
            <p>
              <em>Generated on {{ formatDate(new Date()) }}</em>
            </p>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="downloadPDF">
          <v-icon left>mdi-download</v-icon>
          Download PDF
        </v-btn>
        <v-btn color="secondary" @click="printPDF">
          <v-icon left>mdi-printer</v-icon>
          Print
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HospitalPdfModel",
  props: {
    dialog: Boolean,
    orderData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isDialogOpen: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit("update:dialog", value); // sync with parent
      },
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "N/A";
      if (typeof date === "string") {
        date = new Date(date);
      }
      return date.toLocaleDateString("en-GB");
    },
    calculateServiceTotal(service) {
      const qty = service.quantity || service.qty || 1;
      const price = service.amount || service.price || 0;
      return qty * price;
    },

    
    downloadPDF() {
      const element = document.getElementById("hospital-invoice-pdf");
      const opt = {
        margin: 0.5,
        filename: `hospital-invoice-${
          this.orderData.billNo || this.orderData.invoiceId || "new"
        }.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      // Use html2pdf if available, otherwise show message
      if (window.html2pdf) {
        window.html2pdf().set(opt).from(element).save();
      } else {
        this.printPDF(); // Fallback to print
      }
    },
    printPDF() {
      const printContents = document.getElementById(
        "hospital-invoice-pdf"
      ).innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = `
        <html>
          <head>
            <title>Hospital Invoice</title>
            <style>
              ${this.getPrintStyles()}
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `;

      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); //
    },
    getPrintStyles() {
      return `
        @page {
          size: A4;
          margin: 0.75in 0.75in 0.75in 0.75in; /* Equal margins on all sides */
        }
          
        @media print {
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            color: black;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            margin-top:24px;
          }
          .hospital-info h1 {
            margin: 0;
            color: #333;
            font-size: 28px;
          }
          .hospital-info p {
            margin: 5px 0;
            font-size: 16px;
            color: #666;
          }
          .invoice-details p {
            margin: 5px 0;
            font-size: 14px;
          }
          .divider {
            border: 1px solid #ddd;
            margin: 20px 0;
          }
          .patient-section, .medical-section {
            margin: 20px 0;
          }
          .patient-section h3, .medical-section h3 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .patient-details, .medical-details {
            display: flex;
            justify-content: space-between;
          }
          .patient-left, .patient-right, .medical-left, .medical-right {
            width: 45%;
          }
          .patient-left p, .patient-right p, .medical-left p, .medical-right p {
            margin: 8px 0;
            font-size: 14px;
          }
          .services-section {
            margin: 30px 0;
          }
          .services-section h3 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .services-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          .services-table th,
          .services-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          .services-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #333;
          }
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
          .total-left, .total-right {
            width: 45%;
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
        }
      `;
    },
  },
};
</script>

<style scoped>
.invoice-pdf {
  padding: 20px;
  background: white;
  color: black;
  font-family: Arial, sans-serif;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.hospital-info h1 {
  margin: 0;
  color: #333;
  font-size: 28px;
}

.hospital-info p {
  margin: 5px 0;
  font-size: 16px;
  color: #666;
}

.invoice-details p {
  margin: 5px 0;
  font-size: 14px;
}

.divider {
  border: 1px solid #ddd;
  margin: 20px 0;
}

.patient-section,
.medical-section {
  margin: 20px 0;
}

.patient-section h3,
.medical-section h3 {
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.patient-details,
.medical-details {
  display: flex;
  justify-content: space-between;
}

.patient-left,
.patient-right,
.medical-left,
.medical-right {
  width: 45%;
}

.patient-left p,
.patient-right p,
.medical-left p,
.medical-right p {
  margin: 8px 0;
  font-size: 14px;
}

.services-section {
  margin: 30px 0;
}

.services-section h3 {
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.services-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.services-table th,
.services-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 12px;
}

.services-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

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
  width: 45%;
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
</style>
