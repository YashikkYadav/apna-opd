<template>
  <v-dialog v-model="isDialogOpen" max-width="800px">
    <v-card class="add-patient-popup popup-card">
      <!-- Header -->
      <v-card-title
        class="d-flex justify-space-between align-center popup-title"
      >
        <span v-if="!isShow">
          {{ isEdit ? "Edit Invoice" : "Create Invoice" }}</span
        >
        <span v-else> Invoice</span>
        <v-btn size="24" icon @click="$emit('close-dialog')">
          <v-icon size="24">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Form -->
      <v-card-text class="popup-detail">
        <v-form ref="form" v-model="isValid">
          <!-- Patient Information -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="invoiceData.patientName"
                label="Patient Name"
                :rules="[rules.required]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="invoiceData.patientPhone"
                label="Patient Phone"
                :rules="[rules.phoneNumber]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Payment Status -->
          <v-row>
            <v-col cols="4">
              <v-select
                style="border-radius: 0px"
                v-model="invoiceData.paymentStatus"
                :items="['Billed', 'Unbilled', 'Partially Paid']"
                label="Payment Status"
                variant="outlined"
                :disabled="isShow"
              >
              </v-select>
            </v-col>
            <v-col cols="8" sm="8">
              <v-textarea
                v-model="invoiceData.patientAddress"
                class="mx-2"
                label="Patient Address"
                rows="1"
                variant="outlined"
                :disabled="isShow"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Medicines Table -->
          <v-row>
            <v-col cols="12">
              <v-data-table
                dense
                :items="invoiceData.medicines"
                :headers="medicineHeaders"
                item-value="id"
                class="elevation-1 grey-head add-radius"
                hide-default-footer
              >
                <!-- Table Columns -->
                <template v-slot:[`item.medicineName`]="{ item, index }">
                  <v-combobox
                    class="table-cell py-2 service-down"
                    variant="outlined"
                    v-model="item.medicineName"
                    :items="medicineOptions"
                    item-title="name"
                    item-value="name"
                    dense
                    hide-details
                    @update:modelValue="onMedicineSelect(item, $event)"
                    :key="'medicine-' + index"
                    :disabled="isShow"
                    placeholder="Select or Enter Medicine"
                    clearable
                  ></v-combobox>
                </template>

                <template v-slot:[`item.qty`]="{ item, index }">
                  <v-text-field
                    v-model="item.qty"
                    dense
                    hide-details
                    type="number"
                    class="table-cell"
                    @input="handleInput(item)"
                    :key="'qty-' + index"
                    variant="outlined"
                    :disabled="isShow"
                  ></v-text-field>
                </template>

                <template v-slot:[`item.amount`]="{ item, index }">
                  <v-text-field
                    v-model="item.amount"
                    dense
                    hide-details
                    type="number"
                    class="table-cell"
                    @input="handleInput(item)"
                    :key="'amount-' + index"
                    variant="outlined"
                    :disabled="isShow"
                  ></v-text-field>
                </template>

                <template v-slot:[`item.discount`]="{ item, index }">
                  <v-text-field
                    v-model="item.discount"
                    dense
                    hide-details
                    type="number"
                    class="table-cell"
                    @input="handleInput(item)"
                    :key="'discount-' + index"
                    variant="outlined"
                    :disabled="isShow"
                  ></v-text-field>
                </template>

                <template v-slot:[`item.total`]="{ item }">
                  <span class="table-cell">{{ calculateTotal(item) }}</span>
                </template>
                <template
                  v-if="!isShow"
                  v-slot:[`item.actions`]="{ item, index }"
                >
                  <v-btn
                    icon
                    size="small"
                    @click="removeMedicine(index)"
                    :disabled="invoiceData.medicines.length === 1"
                  >
                    <v-icon color="red" size="20">mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>

          <!-- Discounts and Payment Mode -->
          <v-row class="pt-3">
            <v-col cols="6">
              <v-select
                v-model="invoiceData.paymentMode"
                :items="['Cash', 'Credit Card', 'UPI', 'Online']"
                label="Payment Mode"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-select>
            </v-col>
          </v-row>

          <!-- Summary Section -->
          <v-divider class="my-3"></v-divider>
          <v-row dense>
            <v-col cols="6" class="text-left">
              <div>Total Amount: ₹ {{ calculateGrandTotal() }}</div>
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
      <v-card-actions class="popup-action" v-if="!isShow">
        <v-btn class="saaro-btn" @click="$emit('close-dialog')">Cancel</v-btn>
        <v-btn class="saaro-btn" type="submit" @click="submitInvoice(isEdit)">
          {{ isEdit ? "Add / Edit" : "Create Invoice" }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useInvoiceStore } from "@/store/InvoiceStore";
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";

export default {
  name: "InvoiceAddEditModel",
  props: {
    dialog: Boolean,
    isEditModel: Boolean,
    isShowModel: Boolean,
    invoicesData: Object,
  },
  computed: {
    isDialogOpen() {
      return this.dialog;
    },
    isEdit() {
      return this.isEditModel;
    },
    isShow() {
      return this.isShowModel;
    },
    invoiceData() {
      return this.invoicesData;
    },
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        phoneNumber: (value) =>
          /^\d+$/.test(value) || "Phone number must be numeric.",
      },
      medicineHeaders: [
        { title: "Medicine Name", value: "medicineName", align: "start" },
        { title: "Qty", value: "qty", align: "center" },
        { title: "Amount", value: "amount", align: "center" },
        { title: "Discount", value: "discount", align: "center" },
        { title: "Total", value: "total", align: "center" },
        { title: "Actions", value: "actions", sortable: false, align: "center" },
      ],
      medicineOptions: [], // Will hold the list of medicines from profile
    };
  },
  mounted() {
    this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      try {
        const res = await useProfileStore().getProfileData();
        const profile = res.healthServeProfileData.healthServeProfile;
        
        // Store medicines for dropdown
        this.medicineOptions = profile.medicines?.length
          ? profile.medicines
          : [];
      } catch (error) {
        console.error("Error fetching profile data:", error);
        useUiStore().openNotificationMessage(
          "Failed to load medicines data",
          "",
          "error"
        );
      }
    },
    
    onMedicineSelect(item, value) {
      // Check if it's an object (medicine from dropdown) or string (custom entry)
      const medicineName = typeof value === 'object' ? value?.name : value;
      
      // Find the selected medicine from the options
      const selectedMedicine = this.medicineOptions.find(
        (med) => med.name === medicineName
      );

      if (selectedMedicine) {
        // Auto-fill for medicine from dropdown
        item.medicineName = selectedMedicine.name;
        item.medicineId = selectedMedicine._id;
        item.amount = selectedMedicine.price || 0;
        item.qty = 1;
        item.discount = 0;
      } else {
        // Custom medicine - just set the name
        item.medicineName = medicineName;
        // User needs to fill in other fields manually
        if (!item.discount) {
          item.discount = 0;
        }
      }
      
      // Check if we need to add a new row
      this.handleInput(item);
    },

    async submitInvoice(isEdit) {
      const isValid = await this.$refs.form.validate();

      if (!isValid.valid) {
        useUiStore().openNotificationMessage(
          "Please fill in all required fields correctly!",
          "",
          "error"
        );
        return;
      }

      const requestData = {
        patientName: this.invoiceData.patientName,
        patientPhone: this.invoiceData.patientPhone,
        paymentStatus:
          this.invoiceData.paymentStatus === null
            ? ""
            : this.invoiceData.paymentStatus,
        patientAddress: this.invoiceData.patientAddress,
        medicines: this.invoiceData.medicines
          .filter((service) => service.medicineName) // Only include rows with medicine names
          .map((service) => ({
            medicineName: service.medicineName,
            medicineId: service?.medicineId,
            amount: parseFloat(service.amount) || 0,
            quantity: parseInt(service.qty) || 0,
            discount: parseFloat(service.discount) || 0,
          })),
        totalAmount: this.calculateFinalAmount(),
        paymentMode:
          this.invoiceData.paymentMode === null
            ? ""
            : this.invoiceData.paymentMode,
        medicalName: this.invoiceData.medicalName,
        invoiceType: "Medical",
      };

      if (!isEdit) {
        const res = await useInvoiceStore().addInvoiceApiCall(requestData);
        if (res) {
          this.$emit("close-dialog");
          this.$emit("fetch-invoices");
          useUiStore().openNotificationMessage("Invoice Added Successfully!");
        }
      } else {
        const res = await useInvoiceStore().editInvoiceApiCall(
          this.invoiceData.id,
          requestData
        );
        if (res) {
          this.$emit("close-dialog");
          this.$emit("fetch-invoices");
          useUiStore().openNotificationMessage("Invoice Updated Successfully!");
        }
      }
    },
    
    handleInput(item) {
      if (this.isRowFilled(item) && !this.hasEmptyRow()) {
        this.invoiceData.medicines.push({
          medicineName: "",
          qty: "",
          amount: "",
          discount: "",
          total: "",
        });
      }
    },
    
    isRowFilled(item) {
      return item.medicineName || item.qty || item.amount || item.discount;
    },
    
    hasEmptyRow() {
      return this.invoiceData.medicines.some(
        (row) => !row.medicineName && !row.qty && !row.amount && !row.discount
      );
    },
    
    calculateTotal(item) {
      const qty = parseFloat(item.qty) || 0;
      const amount = parseFloat(item.amount) || 0;
      const discount = parseFloat(item.discount) || 0;
      return (qty * amount - discount).toFixed(2);
    },
    
    calculateGrandTotal() {
      return this.invoiceData.medicines.reduce(
        (sum, item) => sum + parseFloat(this.calculateTotal(item) || 0),
        0
      );
    },
    
    removeMedicine(index) {
      this.invoiceData.medicines.splice(index, 1);
    },
    
    calculateFinalAmount() {
      return this.calculateGrandTotal();
    },
  },
};
</script>

<style scoped>
.table-cell {
  min-width: 100px;
}

.service-down {
  min-width: 200px;
}
</style>