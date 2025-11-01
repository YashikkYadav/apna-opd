<template>
  <v-dialog v-model="isDialogOpen" max-width="900px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Medical Invoice PDF</span>
        <v-btn icon @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div id="medical-invoice-pdf" class="invoice-pdf">
          <!-- Header -->
          <div class="invoice-header">
            <div class="medical-info">
              <h1>{{ orderData.medicalName || 'Medical Store' }}</h1>
              <p>Medical Invoice</p>
            </div>
            <div class="invoice-details">
              <p><strong>Invoice #:</strong> {{ orderData.invoiceId || 'N/A' }}</p>
              <p><strong>Date:</strong> {{ formatDate(new Date()) }}</p>
            </div>
          </div>

          <hr class="divider">

          <!-- Patient Information -->
          <div class="patient-section no-break">
            <h3>Patient Information</h3>
            <div class="patient-details">
              <div class="patient-left">
                <p><strong>Name:</strong> {{ orderData.patientName }}</p>
                <p><strong>Phone:</strong> {{ orderData.patientPhone }}</p>
              </div>
              <div class="patient-right">
                <p><strong>Payment Status:</strong> {{ orderData.paymentStatus }}</p>
                <p><strong>Payment Mode:</strong> {{ orderData.paymentMode }}</p>
              </div>
            </div>
            <div class="patient-address">
              <p><strong>Address:</strong> {{ orderData.patientAddress }}</p>
            </div>
          </div>

          <!-- Medicines Table -->
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
                <tr v-for="(medicine, index) in orderData.medicines" :key="index">
                  <td>{{ medicine.medicineName || medicine.name }}</td>
                  <td>{{ medicine.quantity || medicine.qty }}</td>
                  <td>₹{{ medicine.amount || medicine.price }}</td>
                  <td>₹{{ medicine.discount || 0 }}</td>
                  <td>₹{{ calculateMedicineTotal(medicine) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Total Section -->
          <div class="total-section no-break">
            <div class="total-details">
              <div class="total-left">
                <p><strong>Payment Mode:</strong> {{ orderData.paymentMode }}</p>
              </div>
              <div class="total-right">
                <p><strong>Subtotal:</strong> ₹{{ calculateSubtotal() }}</p>
                <p><strong>Total Discount:</strong> ₹{{ calculateTotalDiscount() }}</p>
                <p class="grand-total"><strong>Grand Total: ₹{{ calculateGrandTotal() }}</strong></p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="invoice-footer no-break">
            <p>Thank you for choosing our medical store!</p>
            <p><em>Generated on {{ formatDate(new Date()) }}</em></p>
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
  name: "InvoicePdfModel",
  props: {
    dialog: Boolean,
    orderData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isDialogOpen() {
      return this.dialog;
    }
  },
  methods: {
    calculateMedicineTotal(medicine) {
      const qty = parseFloat(medicine.quantity || medicine.qty || 0);
      const amount = parseFloat(medicine.amount || medicine.price || 0);
      const discount = parseFloat(medicine.discount || 0);
      return (qty * amount - discount).toFixed(2);
    },
    calculateSubtotal() {
      if (!this.orderData.medicines) return '0.00';
      return this.orderData.medicines.reduce((sum, medicine) => {
        const qty = parseFloat(medicine.quantity || medicine.qty || 0);
        const amount = parseFloat(medicine.amount || medicine.price || 0);
        return sum + (qty * amount);
      }, 0).toFixed(2);
    },
    calculateTotalDiscount() {
      if (!this.orderData.medicines) return '0.00';
      return this.orderData.medicines.reduce((sum, medicine) => {
        return sum + parseFloat(medicine.discount || 0);
      }, 0).toFixed(2);
    },
    calculateGrandTotal() {
      if (!this.orderData.medicines) return '0.00';
      return this.orderData.medicines.reduce((sum, medicine) => {
        return sum + parseFloat(this.calculateMedicineTotal(medicine));
      }, 0).toFixed(2);
    },
    formatDate(date) {
      if (!date) return 'N/A';
      if (typeof date === 'string') {
        date = new Date(date);
      }
      return date.toLocaleDateString('en-GB');
    },

    
    downloadPDF() {
      const element = document.getElementById("medical-invoice-pdf");
      const opt = {
        margin: [0.75, 0.75, 0.75, 0.75], // Equal margins: top, right, bottom, left (in inches)
        filename: `medical-invoice-${
          this.orderData.invoiceId || "new"
        }.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
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

      // Use html2pdf if available, otherwise show message
      if (window.html2pdf) {
        window.html2pdf().set(opt).from(element).save();
      } else {
        this.printPDF(); // Fallback to print
      }
    },
    printPDF() {
      const printContents = document.getElementById("medical-invoice-pdf").innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = `
        <html>
          <head>
            <title>Medical Invoice</title>
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
      window.location.reload(); // Reload to restore Vue functionality
    },
  
    getPrintStyles() {
      return `
        @page {
          size: A4;
          margin: 0.75in 0.75in 0.75in 0.75in; /* Equal margins on all sides */
        }
        
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body { 
            font-family: Arial, sans-serif; 
            margin: 0;
            padding: 0;
            color: black;
            background: white;
            line-height: 1.4;
          }
          
          .invoice-pdf {
            width: 100%;
            max-width: none;
            padding: 0;
            margin: 0;
          }
          
          /* Page break controls */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          
          .medical-info h1 {
            margin: 0 0 8px 0;
            color: #333;
            font-size: 24px;
            font-weight: bold;
          }
          
          .medical-info p {
            margin: 3px 0;
            font-size: 13px;
            color: #666;
          }
          
          .invoice-details {
            text-align: right;
          }
          
          .invoice-details p {
            margin: 3px 0;
            font-size: 12px;
          }
          
          .divider {
            border: none;
            border-top: 1px solid #ddd;
            margin: 15px 0;
            page-break-inside: avoid;
          }
          
          .patient-section {
            margin: 15px 0;
            page-break-inside: avoid;
          }
          
          .patient-section h3 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 4px;
            margin: 0 0 12px 0;
            font-size: 16px;
          }
          
          .patient-details {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 10px;
          }
          
          .patient-left, .patient-right {
            flex: 1;
          }
          
          .patient-left p, .patient-right p {
            margin: 6px 0;
            font-size: 12px;
            line-height: 1.3;
          }
          
          .patient-address {
            margin-top: 10px;
          }
          
          .patient-address p {
            margin: 6px 0;
            font-size: 12px;
            line-height: 1.3;
          }
          
          .medicines-section {
            margin: 20px 0;
            page-break-inside: avoid;
          }
          
          .medicines-section h3 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 4px;
            margin: 0 0 12px 0;
            font-size: 16px;
          }
          
          .medicines-table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            page-break-inside: auto;
          }
          
          .medicines-table thead {
            display: table-header-group;
          }
          
          .medicines-table tfoot {
            display: table-footer-group;
          }
          
          .medicines-table th,
          .medicines-table td {
            border: 1px solid #ddd;
            padding: 8px 6px;
            text-align: left;
            font-size: 11px;
            vertical-align: top;
          }
          
          .medicines-table th {
            background-color: #f8f9fa !important;
            font-weight: bold;
            color: #333 !important;
            page-break-after: avoid;
          }
          
          .medicines-table tr {
            page-break-inside: avoid;
          }
          
          .medicines-table tbody tr:nth-child(even) {
            background-color: #f9f9f9 !important;
          }
          
          .total-section {
            margin: 20px 0 0 0;
            border-top: 2px solid #ddd;
            padding-top: 15px;
            page-break-inside: avoid;
          }
          
          .total-details {
            display: flex;
            justify-content: space-between;
            gap: 20px;
          }
          
          .total-left, .total-right {
            flex: 1;
          }
          
          .total-right {
            text-align: right;
          }
          
          .total-right p {
            margin: 6px 0;
            font-size: 14px;
          }
          
          .grand-total {
            font-size: 16px !important;
            color: #007bff !important;
            font-weight: bold !important;
            border-top: 1px solid #ddd;
            padding-top: 8px;
            margin-top: 10px !important;
          }
          
          .invoice-footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            page-break-inside: avoid;
          }
          
          .invoice-footer p {
            margin: 4px 0;
            font-size: 12px;
          }
          
          /* Ensure no content bleeds outside margins */
          * {
            box-sizing: border-box;
          }
          
          /* Handle long content gracefully */
          .medicines-table td {
            word-wrap: break-word;
            overflow-wrap: break-word;
            max-width: 150px;
          }
        }
      `;
    }
  }
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

.medical-info h1 {
  margin: 0;
  color: #333;
  font-size: 28px;
}

.medical-info p {
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

.patient-section {
  margin: 20px 0;
}

.patient-section h3 {
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.patient-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.patient-left, .patient-right {
  width: 45%;
}

.patient-left p, .patient-right p {
  margin: 8px 0;
  font-size: 14px;
}

.patient-address p {
  margin: 8px 0;
  font-size: 14px;
}

.medicines-section {
  margin: 30px 0;
}

.medicines-section h3 {
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.medicines-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.medicines-table th,
.medicines-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  font-size: 14px;
}

.medicines-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}

.medicines-table tr:nth-child(even) {
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
</style>