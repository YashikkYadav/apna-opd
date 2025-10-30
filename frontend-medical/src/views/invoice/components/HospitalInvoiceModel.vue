<template>
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <v-card class="add-patient-popup popup-card">
      <!-- Header -->
      <v-card-title
        class="d-flex justify-space-between align-center popup-title"
      >
        <span v-if="!isShow">
          {{
            isEdit ? "Edit Hospital Invoice" : "Create Hospital Invoice"
          }}</span
        >
        <span v-else> Hospital Invoice</span>
        <v-btn size="24" icon @click="$emit('close-dialog')">
          <v-icon size="24">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Form -->
      <v-card-text class="popup-detail">
        <v-form ref="form" v-model="isValid">
          <!-- Hospital Information -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="invoiceData.hospitalName"
                label="Hospital Name"
                :rules="[rules.required]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="invoiceData.hospitalPhone"
                label="Hospital Phone"
                :rules="[rules.phoneNumber]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="invoiceData.hospitalAddress"
                label="Hospital Address"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Registration and Bill Information -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="invoiceData.regNo"
                label="Registration No."
                :rules="[rules.required]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="invoiceData.billNo"
                label="Bill No."
                :rules="[rules.required]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Patient Information -->
          <v-row>
            <v-col cols="4">
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
            <v-col cols="4">
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
            <v-col cols="2">
              <v-text-field
                v-model="invoiceData.patientAge"
                label="Age"
                type="number"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="invoiceData.patientGender"
                :items="['Male', 'Female', 'Other']"
                label="Gender"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-select>
            </v-col>
          </v-row>

          <!-- Doctor and Department Information -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="invoiceData.doctorName"
                label="Doctor Name"
                :rules="[rules.required]"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="invoicesData.department"
                label="Department"
                variant="outlined"
                dense
                :disabled="isShow"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="invoiceData.paymentStatus"
                :items="['Billed', 'Unbilled', 'Partially Paid']"
                label="Payment Status"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-select>
            </v-col>
          </v-row>

          <!-- Admission Details -->
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="invoiceData.admissionDate"
                label="Admission Date"
                type="date"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="invoiceData.dischargeDate"
                label="Discharge Date"
                type="date"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="invoiceData.roomType"
                :items="['General', 'Semi-Private', 'Private', 'ICU', 'CCU']"
                label="Room Type"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="invoiceData.roomNumber"
                label="Room Number"
                variant="outlined"
                dense
                :disabled="isShow"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Patient Address -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="invoiceData.patientAddress"
                label="Patient Address"
                rows="2"
                variant="outlined"
                :disabled="isShow"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Services Table -->
          <v-row>
            <v-col cols="12">
              <h4 class="mb-3">Hospital Services & Medicines</h4>
              <v-data-table
                dense
                :items="invoiceData.services"
                item-value="id"
                class="elevation-1 grey-head add-radius"
                hide-default-footer
                :headers="serviceHeaders"
              >
                <template v-slot:[`item.serviceName`]="{ item, index }">
                  <v-combobox
                    v-model="item.serviceName"
                    class="table-cell my-3"
                    variant="outlined"
                    :items="medicineOptions"
                    item-title="name"
                    item-value="name"
                    dense
                    hide-details
                    @update:modelValue="onMedicineSelect(item, $event)"
                    :key="'service-' + index"
                    :disabled="isShow"
                    placeholder="Select Medicine or Enter Service"
                    clearable
                  ></v-combobox>
                </template>

                <template v-slot:[`item.serviceDate`]="{ item, index }">
                  <v-text-field
                    v-model="item.serviceDate"
                    dense
                    hide-details
                    type="date"
                    class="table-cell"
                    @input="handleInput(item)"
                    :key="'date-' + index"
                    variant="outlined"
                    :disabled="isShow"
                  ></v-text-field>
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
                    @click="removeService(index)"
                    :disabled="invoiceData.services.length === 1"
                  >
                    <v-icon color="red" size="20">mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>

          <!-- Discount Field -->
          <v-row class="pt-3">
            <v-col cols="4">
              <v-text-field
                v-model.number="invoiceData.discount"
                label="Discount (₹)"
                type="number"
                variant="outlined"
                dense
                :disabled="isShow"
              />
            </v-col>

            <!-- Payment Mode -->
            <v-col cols="4">
              <v-select
                v-model="invoiceData.paymentMode"
                :items="['Cash', 'Credit Card', 'UPI', 'Online', 'Insurance']"
                label="Payment Mode"
                variant="outlined"
                dense
                :disabled="isShow"
              />
            </v-col>
            <v-col cols="4" class="d-flex align-center">
              <v-btn v-if="!isShow" @click="addService" color="primary" small>
                <v-icon left>mdi-plus</v-icon>
                Add Service
              </v-btn>
            </v-col>
          </v-row>

          <!-- Summary Section -->
          <v-divider class="my-3"></v-divider>
          <v-row dense>
            <v-col cols="6" class="text-left">
              <div>Total Amount: ₹ {{ calculateTotalAmount() }}</div>
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
          {{ isEdit ? "Update Invoice" : "Create Hospital Invoice" }}</v-btn
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
  name: "HospitalInvoiceModel",
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
      isValid: false,
      serviceHeaders: [
        { title: "Service/Medicine Name", key: "serviceName", align: "start", width: "35%" },
        { title: "Date", key: "serviceDate", align: "center", width: "22%" },
        { title: "Qty", key: "qty", align: "center", width: "12%" },
        { title: "Rate (₹)", key: "amount", align: "center", width: "16%" },
        { title: "Total (₹)", key: "total", align: "center", width: "10%" },
        { title: "Actions", key: "actions", align: "center", width: "5%", sortable: false },
      ],

      medicineOptions: [], // Will hold the list of medicines from profile

      rules: {
        required: (value) => !!value || "Required.",
        phoneNumber: (value) =>
          /^\d+$/.test(value) || "Phone number must be numeric.",
      },
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
      const serviceName = typeof value === 'object' ? value?.name : value;
      
      // Find the selected medicine from the options
      const selectedMedicine = this.medicineOptions.find(
        (med) => med.name === serviceName
      );

      if (selectedMedicine) {
        // Auto-fill for medicine from dropdown
        item.serviceName = selectedMedicine.name;
        item.amount = selectedMedicine.price || 0;
        item.qty = 1;
        item.serviceDate = this.getTodayDate();
      } else {
        // Custom service/medicine - just set the name
        item.serviceName = serviceName;
        // User needs to fill in other fields manually
        if (!item.serviceDate) {
          item.serviceDate = this.getTodayDate();
        }
      }
      
      // Check if we need to add a new row
      this.handleInput(item);
    },

    getTodayDate() {
      // Get today's date in YYYY-MM-DD format
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
        patientAddress: this.invoiceData.patientAddress,
        patientAge: parseInt(this.invoiceData.patientAge),
        patientGender: this.invoiceData.patientGender,
        hospitalName: this.invoiceData.hospitalName,
        hospitalPhone: this.invoiceData.hospitalPhone,
        hospitalAddress: this.invoiceData.hospitalAddress,
        regNo: this.invoiceData.regNo,
        billNo: this.invoiceData.billNo,
        doctorName: this.invoiceData.doctorName,
        department: this.invoiceData.department,
        admissionDate: this.invoiceData.admissionDate,
        dischargeDate: this.invoiceData.dischargeDate,
        roomType: this.invoiceData.roomType,
        roomNumber: this.invoiceData.roomNumber,
        paymentStatus:
          this.invoiceData.paymentStatus === null
            ? ""
            : this.invoiceData.paymentStatus,
        services: this.invoiceData.services
          .filter((service) => service.serviceName) // Only include rows with service names
          .map((service) => ({
            serviceName: service.serviceName,
            serviceDate: service.serviceDate,
            amount: parseFloat(service.amount) || 0,
            quantity: parseInt(service.qty) || 0,
          })),
        totalAmount: this.calculateTotalAmount(),
        discount: this.invoiceData.discount,
        grandTotal: this.calculateFinalAmount(),
        paymentMode:
          this.invoiceData.paymentMode === null
            ? ""
            : this.invoiceData.paymentMode,
        invoiceType: "Hospital",
      };

      try {
        if (!isEdit) {
          const res = await useInvoiceStore().addInvoiceApiCall(requestData);
          if (res) {
            this.$emit("close-dialog");
            this.$emit("fetch-invoices");
            useUiStore().openNotificationMessage(
              "Hospital Invoice Added Successfully!"
            );
          }
        } else {
          const res = await useInvoiceStore().editInvoiceApiCall(
            this.invoiceData.id,
            requestData
          );
          if (res) {
            this.$emit("close-dialog");
            this.$emit("fetch-invoices");
            useUiStore().openNotificationMessage(
              "Hospital Invoice Updated Successfully!"
            );
          }
        }
      } catch (error) {
        console.error("Error submitting hospital invoice:", error);
        useUiStore().openNotificationMessage(
          "Error submitting invoice!",
          "",
          "error"
        );
      }
    },

    handleInput(item) {
      if (this.isRowFilled(item) && !this.hasEmptyRow()) {
        this.invoiceData.services.push({
          serviceName: "",
          serviceDate: "",
          qty: "",
          amount: "",
          total: "",
        });
      }
    },

    isRowFilled(item) {
      return item.serviceName || item.serviceDate || item.qty || item.amount;
    },

    hasEmptyRow() {
      return this.invoiceData.services.some(
        (row) => !row.serviceName && !row.serviceDate && !row.qty && !row.amount
      );
    },

    addService() {
      this.invoiceData.services.push({
        serviceName: "",
        serviceDate: this.getTodayDate(),
        qty: "",
        amount: "",
        total: "",
      });
    },

    removeService(index) {
      if (this.invoiceData.services.length > 1) {
        this.invoiceData.services.splice(index, 1);
      }
    },

    calculateTotal(item) {
      const qty = parseFloat(item.qty) || 0;
      const amount = parseFloat(item.amount) || 0;
      return (qty * amount).toFixed(2);
    },

    calculateGrandTotal() {
      return this.invoiceData.services.reduce(
        (sum, item) => sum + parseFloat(this.calculateTotal(item) || 0),
        0
      );
    },

    calculateTotalAmount() {
      return this.calculateGrandTotal();
    },

    calculateFinalAmount() {
      const discount = parseFloat(this.invoiceData.discount) || 0;
      const grandTotal = this.calculateGrandTotal();
      // prevent negative values
      return Math.max(grandTotal - discount, 0);
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