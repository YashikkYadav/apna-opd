<template>
  <v-dialog v-model="localDialog" max-width="800px" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center pa-4">
        <span class="text-h5">Invoice</span>
        <div>
          <v-btn icon @click="printInvoice" class="mr-2">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <div id="invoice-content" class="invoice-container">
          <!-- Invoice Header -->
          <div class="invoice-header text-center pa-6 bg-primary">
            <h1 class="text-white mb-2">{{ orderData?.medicalName }}</h1>
            <h3 class="text-white opacity-90">
              Invoice Number : {{ orderData?.invoiceId }}
            </h3>
          </div>

          <!-- Order & Date Info -->
          <div
            class="invoice-meta d-flex justify-space-between pa-4 bg-grey-lighten-4"
          >
            <div>
              <strong>Invoice Date:</strong>
              {{ formatDate(orderData.createdAt) }}
            </div>
            <div>
              <strong>Status: </strong>
              <span :class="getStatusClass(orderData.paymentStatus)">{{
                orderData.paymentStatus?.toUpperCase()
              }}</span>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="customer-info pa-4">
            <h3 class="mb-3">Patient Information</h3>
            <v-row>
              <v-col cols="12" md="6">
                <div class="info-item">
                  <strong>Name:</strong> {{ orderData?.patientName }}
                </div>
                <div class="info-item">
                  <strong>Phone:</strong> {{ orderData?.patientPhone }}
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="info-item">
                  <strong>Address:</strong>
                  <div class="ml-2">{{ orderData?.patientAddress }}<br /></div>
                </div>
              </v-col>
            </v-row>
          </div>

          <v-divider></v-divider>

          <!-- Medicines Table -->
          <div class="medicines-section pa-4">
            <h3 class="mb-4">Ordered Medicines</h3>
            <v-table class="medicines-table">
              <thead>
                <tr class="bg-grey-lighten-3">
                  <th class="text-left">Medicine Name</th>
                  <th class="text-center">Quantity</th>
                  <th class="text-center">Discount (%)</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in safeOrderData.medicines" :key="index">
                  <td class="medicine-name">{{ item.medicineName || 'N/A' }}</td>
                  <td class="text-center">{{ item.quantity || 0 }}</td>
                  <td class="text-center">{{ item.discount || 0 }}%</td>
                  <td class="text-right">₹{{ formatPrice(item.price || item.amount || 0) }}</td>
                  <td class="text-right">
                    ₹{{ formatPrice(calculateItemTotal(item)) }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <v-divider></v-divider>

          <!-- Billing Summary -->
          <div class="billing-summary pa-4">
            <v-row>
              <v-col
                cols="12"
                md="6"
                class="d-flex align-center justify-center"
              >
                <div class="payment-info">
                  <h3 class="mb-3">Payment Information</h3>
                  <div class="info-item">
                    <strong>Payment Method:</strong>
                    {{ orderData?.paymentMode || orderData?.paymentMethod || "Cash" }}
                  </div>
                  <div class="info-item">
                    <strong>Payment Status:</strong>
                    {{ orderData?.paymentStatus || "Pending" }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="total-section">
                  <div class="total-row d-flex justify-space-between">
                    <span>Subtotal:</span>
                    <span>₹{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="total-row d-flex justify-space-between">
                    <span>GST (18%):</span>
                    <span>₹{{ formatPrice(gstAmount) }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div
                    class="total-row final-total d-flex justify-space-between"
                  >
                    <strong>Total Amount:</strong>
                    <strong>₹{{ formatPrice(totalWithGst) }}</strong>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <!-- Footer -->
          <div class="invoice-footer text-center pa-4 bg-grey-lighten-4">
            <p class="mb-1"><strong>Thank you for choosing us!</strong></p>
            <p class="text-caption">
              For any queries, please contact our support team.
            </p>
            <p class="text-caption">
              Generated on: {{ new Date().toLocaleDateString("en-GB") }}
            </p>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OrderInvoiceModal",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    orderData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["close-dialog"],
  data() {
    return {
      localDialog: false,
    };
  },
  computed: {
    safeOrderData() {
      return {
        ...this.orderData,
        medicines: this.orderData.medicines || []
      };
    },
    subtotal() {
      if (!this.safeOrderData.medicines || this.safeOrderData.medicines.length === 0) {
        return this.orderData.totalAmount || 0;
      }
      
      return this.safeOrderData.medicines.reduce((total, item) => {
        const itemTotal = this.calculateItemTotal(item);
        return total + itemTotal;
      }, 0);
    },
    gstAmount() {
      return (this.subtotal * 0.18);
    },
    totalWithGst() {
      return (this.subtotal + this.gstAmount);
    },
  },
  watch: {
    dialog: {
      handler(newVal) {
        console.log('Dialog prop changed to:', newVal);
        this.localDialog = newVal;
      },
      immediate: true
    },
    localDialog(newVal) {
      console.log('Local dialog changed to:', newVal);
      if (!newVal) {
        this.$emit("close-dialog");
      }
    },
  },
  methods: {
    calculateItemTotal(item) {
      const price = item.price || item.amount || 0;
      const quantity = item.quantity || 0;
      const discount = item.discount || 0;
      
      const baseTotal = price * quantity;
      const discountAmount = baseTotal * (discount / 100);
      return baseTotal - discountAmount;
    },
    formatPrice(price) {
      const numPrice = parseFloat(price) || 0;
      return numPrice.toFixed(2);
    },
    closeDialog() {
      this.localDialog = false;
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      
      try {
        return new Date(dateString).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return "Invalid Date";
      }
    },
    getStatusClass(status) {
      if (!status) return "text-grey";
      
      const statusClasses = {
        pending: "text-orange",
        billed: "text-green",
        unbilled: "text-orange",
        "partially paid": "text-blue",
        paid: "text-green",
        confirmed: "text-blue",
        processing: "text-purple",
        shipped: "text-indigo",
        delivered: "text-green",
        cancelled: "text-red",
      };
      return statusClasses[status.toLowerCase()] || "text-grey";
    },
    printInvoice() {
      const printContent = document.getElementById("invoice-content");
      if (!printContent) {
        console.error('Print content not found');
        return;
      }
      
      const originalContent = document.body.innerHTML;

      // Create print styles
      const printStyles = `
        <style>
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .invoice-container {
              width: 100%;
              max-width: none;
            }
            .invoice-header {
              background-color: #1976d2 !important;
              color: white !important;
            }
            .bg-grey-lighten-4 {
              background-color: #f5f5f5 !important;
            }
            .bg-grey-lighten-3 {
              background-color: #eeeeee !important;
            }
            .medicines-table {
              width: 100%;
              border-collapse: collapse;
            }
            .medicines-table th, .medicines-table td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            .total-section {
              border: 1px solid #ddd;
              padding: 15px;
              margin-top: 10px;
            }
            .final-total {
              font-size: 1.1em;
              font-weight: bold;
            }
            @page {
              margin: 1in;
            }
          }
        </style>
      `;

      document.body.innerHTML = printStyles + printContent.outerHTML;
      
      setTimeout(() => {
        window.print();
        document.body.innerHTML = originalContent;
        
        // Re-initialize Vue after printing
        this.$nextTick(() => {
          location.reload();
        });
      }, 250);
    },
  },
};
</script>

<style scoped>
.invoice-container {
  max-width: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.invoice-header {
  background: linear-gradient(135deg, #1976d2, #1565c0);
}

.info-item {
  margin-bottom: 8px;
  line-height: 1.4;
}

.medicines-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.medicines-table th,
.medicines-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #e0e0e0;
}

.medicines-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.medicine-name {
  font-weight: 500;
  color: #1976d2;
}

.total-section {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.total-row {
  padding: 4px 0;
  font-size: 0.95rem;
}

.final-total {
  font-size: 1.1rem;
  color: #1976d2;
  padding-top: 8px;
}

.payment-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

.invoice-footer {
  background: linear-gradient(135deg, #f5f5f5, #eeeeee);
  color: #666;
}

.text-orange {
  color: #ff9800 !important;
}
.text-blue {
  color: #2196f3 !important;
}
.text-purple {
  color: #9c27b0 !important;
}
.text-indigo {
  color: #3f51b5 !important;
}
.text-green {
  color: #4caf50 !important;
}
.text-red {
  color: #f44336 !important;
}
.text-grey {
  color: #757575 !important;
}
</style>