<template>
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <!-- Header -->
        <v-card-title class="text-h5 d-flex justify-space-between align-center">
          <span>Create Invoice</span>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
  
        <!-- Form -->
        <v-card-text>
          <v-form ref="form" v-model="isValid">
            <!-- Patient Information -->
            <v-row dense class="align-center">
              <v-col cols="3">
                <v-text-field
                  v-model="invoiceData.uid"
                  label="UID"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-card-account-details</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="invoiceData.name"
                  label="Name"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-account</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="invoiceData.phone"
                  label="Phone"
                  :rules="[rules.phoneNumber]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-phone</v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
  
            <!-- Payment Status -->
            <v-row dense class="align-center">
              <v-col cols="6">
                <v-select
                  v-model="invoiceData.paymentStatus"
                  :items="['Billed', 'Unbilled', 'Partially Paid']"
                  label="Payment Status"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-cash-multiple</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col
        cols="6"
        sm="6"
      >
        <v-textarea
          class="mx-2"
          label="prepend-icon"
          prepend-icon="mdi-comment"
          rows="1"
        ></v-textarea>
      </v-col>
              <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          class="mx-2"
          label="prepend-icon"
          prepend-icon="mdi-comment"
          rows="1"
        ></v-textarea>
      </v-col>
            </v-row>
  
            <!-- Services Table -->
            <v-row>
              <v-col cols="12">
                <v-data-table
                  dense
                  :headers="headers"
                  :items="invoiceData.services"
                  item-value="id"
                  class="elevation-1"
                  hide-default-footer
                >
                  <!-- Add Another Button -->
                  <template #top>
                    <v-btn
                      text
                      color="primary"
                      @click="addService"
                      class="mb-2"
                    >
                      <v-icon left>mdi-plus</v-icon> Add Another
                    </v-btn>
                  </template>
                  <!-- Table Columns -->
                  <template v-slot:[`item.service`]="{ item }">
                    <v-text-field
                      v-model="item.service"
                      dense
                      outlined
                      hide-details
                      class="table-cell"
                    ></v-text-field>
                  </template>
                  <template v-slot:[`item.qty`]="{ item }">
                    <v-text-field
                      v-model="item.qty"
                      dense
                      outlined
                      hide-details
                      type="number"
                      class="table-cell"
                    ></v-text-field>
                  </template>
                  <template v-slot:[`item.amount`]="{ item }">
                    <v-text-field
                      v-model="item.amount"
                      dense
                      outlined
                      hide-details
                      type="number"
                      class="table-cell"
                    ></v-text-field>
                  </template>
                  <template v-slot:[`item.discount`]="{ item }">
                    <v-text-field
                      v-model="item.discount"
                      dense
                      outlined
                      hide-details
                      type="number"
                      class="table-cell"
                    ></v-text-field>
                  </template>
                  <template v-slot:[`item.total`]="{ item }">
                    <span class="table-cell">{{ calculateTotal(item) }}</span>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
  
            <!-- Discounts and Payment Mode -->
            <v-row dense class="align-center">
              <v-col cols="6">
                <v-text-field
                  v-model="invoiceData.additionalDiscount"
                  label="Additional Discount"
                  type="number"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-tag-minus</v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="invoiceData.paymode"
                  :items="['Cash', 'Credit Card', 'UPI', 'Online']"
                  label="Payment Mode"
                  outlined
                  dense
                >
                  <template #prepend>
                    <v-icon>mdi-credit-card</v-icon>
                  </template>
                </v-select>
              </v-col>
            </v-row>
  
            <!-- Summary Section -->
            <v-divider class="my-3"></v-divider>
            <v-row dense>
              <v-col cols="6" class="text-left">
                <div>Total Amount: ₹ {{ calculateGrandTotal() }}</div>
                <div>Discount Applied: ₹ {{ invoiceData.additionalDiscount }}</div>
              </v-col>
              <v-col cols="6" class="text-right">
                <div class="font-weight-bold text-h6">
                  Grand Total: ₹ {{ calculateFinalAmount() }}
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
  
        <!-- Actions -->
        <v-card-actions class="justify-space-between">
          <v-btn color="secondary" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="submitInvoice">Create Invoice</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: true,
        isValid: false,
        invoiceData: {
          name: "",
          uid: "",
          phone: "",
          paymentStatus: "Unbilled",
          services: [
            { id: 1, service: "Outside Doctor Consultation", qty: 1, amount: 1000, discount: 0 },
          ],
          additionalDiscount: 0,
          paymode: "Cash",
        },
        headers: [
          { text: "Service", value: "service", align: "start" },
          { text: "Qty", value: "qty", align: "center" },
          { text: "Amount (₹)", value: "amount", align: "center" },
          { text: "Discount (₹)", value: "discount", align: "center" },
          { text: "Total (₹)", value: "total", align: "center" },
        ],
        rules: {
          required: (value) => !!value || "This field is required.",
          phoneNumber: (value) =>
            /^\d{10}$/.test(value) || "Enter a valid 10-digit phone number.",
        },
      };
    },
    methods: {
      addService() {
        const newId = this.invoiceData.services.length + 1;
        this.invoiceData.services.push({
          id: newId,
          service: "",
          qty: 1,
          amount: 0,
          discount: 0,
        });
      },
      calculateTotal(item) {
        return (item.qty * item.amount - item.discount).toFixed(2);
      },
      calculateGrandTotal() {
        return this.invoiceData.services
          .reduce(
            (total, item) =>
              total + item.qty * item.amount - item.discount,
            0
          )
          .toFixed(2);
      },
      calculateFinalAmount() {
        return (
          this.calculateGrandTotal() - this.invoiceData.additionalDiscount
        ).toFixed(2);
      },
      submitInvoice() {
        if (this.isValid) {
          alert("Invoice created successfully!");
          this.dialog = false;
        } else {
          alert("Please fill in all required fields.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .table-cell {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-left {
    text-align: left;
  }
  </style>
  