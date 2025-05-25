<template class="create-rx-page">

  <v-container fluid>
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search Invoice" variant="solo"
          max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
      </v-col>

      <v-col cols="4" class="text-end mb-2">
        <v-btn className="saaro-btn" color="#8f6cb4" large @click="createInvoice">
          Create Invoice
        </v-btn>
      </v-col>
    </v-row>


    <!-- Create Invoice Dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="add-patient-popup popup-card">
        <!-- Header -->
        <v-card-title class="d-flex justify-space-between align-center popup-title">
          <span v-if="!isShow"> {{ isEdit ? "Edit Invoice" : "Create Invoice" }}</span>
          <span v-else> Invoice</span>
          <v-btn size="24" icon @click="dialog = false">
            <v-icon size="24">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Form -->
        <v-card-text class="popup-detail">
          <v-form ref="form" v-model="isValid">
            <!-- Patient Information -->
            <v-row>
              <v-col cols="3">
                <v-text-field v-model="invoiceData.uid" label="UID" :rules="[rules.required]" variant="outlined" dense
                  :disabled="isShow">
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="invoiceData.name" label="Name" :rules="[rules.required]" variant="outlined" dense
                  :disabled="isShow">
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="invoiceData.phone" label="Phone" :rules="[rules.phoneNumber]" variant="outlined"
                  dense :disabled="isShow">
                </v-text-field>
              </v-col>
            </v-row>

            <!-- Payment Status -->
            <v-row>
              <v-col cols="6">
                <v-select style="border-radius: 0px;" v-model="invoiceData.paymentStatus"
                  :items="['Billed', 'Unbilled', 'Partially Paid']" label="Payment Status" :rules="[rules.required]"
                  variant="outlined" :disabled="isShow">
                </v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <v-textarea v-model="invoiceData.privateNote" class="mx-2" label="Private Notes" rows="1"
                  variant="outlined" :disabled="isShow"></v-textarea>
              </v-col>
            </v-row>

            <!-- Services Table -->
            <v-row>
              <v-col cols="12">
                <v-data-table dense :items="invoiceData.services" item-value="id" class="elevation-1"
                  hide-default-footer>
                  <!-- Table Columns -->
                  <template v-slot:[`item.service`]="{ item, index }">
                    <v-combobox class="table-cell py-2 service-down" variant="outlined" v-model="item.service" dense
                      hide-details label="Service Type" @input="handleInput(item)" :key="'service-' + index"
                      :items="serviceOptions" :disabled="isShow"></v-combobox>
                  </template>

                  <template v-slot:[`item.qty`]="{ item, index }">
                    <v-text-field v-model="item.qty" dense hide-details type="number" class="table-cell"
                      @input="handleInput(item)" :key="'qty-' + index" variant="outlined"
                      :disabled="isShow"></v-text-field>
                  </template>

                  <template v-slot:[`item.amount`]="{ item, index }">
                    <v-text-field v-model="item.amount" dense hide-details type="number" class="table-cell"
                      @input="handleInput(item)" :key="'amount-' + index" variant="outlined"
                      :disabled="isShow"></v-text-field>
                  </template>

                  <template v-slot:[`item.discount`]="{ item, index }">
                    <v-text-field v-model="item.discount" dense hide-details type="number" class="table-cell"
                      @input="handleInput(item)" :key="'discount-' + index" variant="outlined"
                      :disabled="isShow"></v-text-field>
                  </template>

                  <template v-slot:[`item.total`]="{ item }">
                    <span class="table-cell">{{ calculateTotal(item) }}</span>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>

            <!-- Discounts and Payment Mode -->
            <v-row class="pt-3">
              <v-col cols="6">
                <v-text-field v-model="invoiceData.additionalDiscount" label="Additional Discount" type="number"
                  variant="outlined" dense :disabled="isShow">
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select v-model="invoiceData.paymentMode" :items="['Cash', 'Credit Card', 'UPI', 'Online']"
                  label="Payment Mode" variant="outlined" dense :disabled="isShow">
                </v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <v-textarea v-model="invoiceData.patientNote" label="Patient Note" rows="1" variant="outlined"
                  :disabled="isShow"></v-textarea>
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
          <v-btn class="saaro-btn" @click="dialog = false">Cancel</v-btn>
          <v-btn class="saaro-btn" @click="submitInvoice(isEdit)"> {{ isEdit ? "Edit Invoice" : "Create Invoice"
            }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="align-center mb-3">
      <!-- Left: Buttons -->
      <v-col cols="12" class="d-flex align-center">
        <v-btn text color="#ffffff" rounded class="mr-4 filter-btn" :class="{ 'active-btn': activeStatus === 'All' }"
          @click="filterInvoices('All')">
          All <span class="span"> {{ allInvoices.length }} </span>
        </v-btn>
        <v-btn text color="#ffffff" rounded class="mr-4 filter-btn" :class="{ 'active-btn': activeStatus === 'Billed' }"
          @click="filterInvoices('Billed')">
          Billed <span class="span"> {{ countByStatus('Billed') }} </span>
        </v-btn>
        <v-btn text color="#ffffff" rounded class="mr-4 filter-btn"
          :class="{ 'active-btn': activeStatus === 'Unbilled' }" @click="filterInvoices('Unbilled')">
          Unbilled <span class="span"> {{ countByStatus('Unbilled') }} </span>
        </v-btn>
        <v-btn text color="#ffffff" rounded class="filter-btn"
          :class="{ 'active-btn': activeStatus === 'Partially Paid' }" @click="filterInvoices('Partially Paid')">
          Partially Paid <span class="span"> {{ countByStatus('Partially Paid') }} </span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-card title="Invoices" flat>
      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="invoice" :search="search" class="tablee invoice-table">
        <template v-slot:[`item.InvoiceID`]="{ item }">
          <span class="status-tag" :style="{ color: '#56b1f3', cursor: 'pointer' }"
            @click="showInvoice(item.InvoiceID)">#{{ item.InvoiceID
            }}</span>
        </template>
        <template v-slot:[`item.Amount`]="{ item }">
          <span class="status-tag" :style="getAmountStyle(item.Status)">{{ item.Amount }}</span>
        </template>
        <template v-slot:[`item.Status`]="{ item }">
          <span class="status-tag" :style="getStatusStyle(item.Status)">{{ item.Status }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="icon-btn" icon @click="editInvoice(item)">
            <v-icon color="gray">mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn class="icon-btn" @click="pdfDialogHandle(item)" icon>
            <v-icon color="gray">mdi-printer-outline</v-icon>
          </v-btn>
          <v-btn class="icon-btn" icon @click="isDeleteModalOpen = true">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>

      </v-data-table>
      <template>
        <div class="text-center pa-4">
          <v-dialog v-model="pdfDialog" class="height: auto">
            <v-card class="print-popup w-66  max-1400">
              <v-card-title class="headline">Save Invoice</v-card-title>
              <v-card-text class="d-flex pr-0 pb-0 pt-0 pl-16">
                <v-row class="w-75 max-1100">
                  <v-col class="v-col-12 m-0" style="height: 60vh;">
                    <div style="border: 1px solid #ccc; height: 100%; overflow: hidden;">
                      <iframe :src="pdfUrl" width="100%" height="100%" style="border: none;"></iframe>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col class="v-col-10">
                    <div class="text-center pb-10">
                      <v-text-field variant="outlined" v-model="email" label="Email" outlined></v-text-field>
                      <v-btn class="saaro-btn" @click="sharePrescription('Email')">Email</v-btn>
                    </div>
                    <div class="text-center">
                      <v-text-field variant="outlined" v-model="phoneNumber" label="Phone Number"
                        outlined></v-text-field>
                      <v-btn class="saaro-btn" @click="sharePrescription('WhatsApp/SMS')">WhatsApp/SMS</v-btn>
                    </div>

                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="saaro-btn" text @click="closePdfDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </div>
      </template>
    </v-card>
  </v-container>
  <v-dialog v-model="isDeleteModalOpen" max-width="500px">
    <v-card class="popup-card">
      <v-card-title class="popup-title">Delete Invoice</v-card-title>
      <v-card-text class="popup-detail">
        Are you sure you want to delete this invoice ?
      </v-card-text>
      <v-card-actions class="popup-action">
        <v-btn class="saaro-btn" text @click="isDeleteModalOpen = false">Cancel</v-btn>
        <v-btn class="saaro-btn" text @click="deleteInvoice">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import { useSnackbarStore } from '../store/snackbar';
export default {
  data() {
    return {
      search: "",
      selectedDateRange: "Last 7 Days",
      dateRanges: ["Today", "Last 7 Days", "Last Month", "Custom"],
      headers: [
        { align: "start", key: "InvoiceID", title: "Invoice" },
        { key: "Amount", title: "Amount" },
        { key: "Status", title: "Status" },
        { key: "Patient Name", title: "Patient Name" },
        { key: "Date", title: "Date" },
        { key: "Type", title: "Type" },
        { key: "actions", title: "Actions" },
      ],
      invoice: [],
      allInvoices: [],
      activeStatus: "All",
      dialog: false,
      isEdit: false,
      isShow: false,
      pdfDialog: false,
      pdfUrl: '',
      isValid: false,
      invoiceData: {
        id: "",
        name: "",
        uid: "",
        phone: "",
        paymentStatus: "",
        privateNote: "",
        services: [
          {
            service: "",
            qty: "",
            amount: "",
            discount: "",
          },
        ],
        additionalDiscount: 0,
        paymentMode: "",
        patientNote: "",
      },
      serviceHeaders: [
        { text: "Service", value: "service" },
        { text: "Qty", value: "qty" },
        { text: "Amount", value: "amount" },
        { text: "Discount", value: "discount" },
        { text: "Total", value: "total" },
      ],
      serviceOptions: ['Consultation', 'X-Ray', 'Blood Test', 'CT Scan', 'MRI'],
      rules: {
        required: (value) => !!value || "Required.",
        phoneNumber: (value) =>
          /^\d+$/.test(value) || "Phone number must be numeric.",
      },
      doctorId: '',
      accessToken: '',
      isDeleteModalOpen: false
    };
  },
  methods: {
    getStatusStyle(status) {
      const statusColors = {
        "Billed": { color: "#239f52", backgroundColor: "#3ec97233" },
        "Unbilled": { color: "#e63939", backgroundColor: "#ff565633" },
        "Partially Paid": { color: "#bc9021", backgroundColor: "#f0bb3333" },
        "default": { color: "#000", backgroundColor: "#ddd" }, // Default fallback
      };

      return statusColors[status] || statusColors.default;
    },
    getAmountStyle(status) {
      const statusColors = {
        "Billed": { color: "#34bd68", },
        "Unbilled": { color: "#ff5656" },
        "Partially Paid": { color: "#dfad2b" },
        "default": { color: "#000" }, // Default fallback
      };

      return statusColors[status] || statusColors.default;
    },
    handleInput(item) {
      if (this.isRowFilled(item) && !this.hasEmptyRow()) {
        this.invoiceData.services.push({ service: "", qty: "", amount: "", discount: "", total: "" });
      }
    },
    isRowFilled(item) {
      return item.service || item.qty || item.amount || item.discount;
    },
    hasEmptyRow() {
      return this.invoiceData.services.some(
        (row) => !row.service && !row.qty && !row.amount && !row.discount
      );
    },
    onAddPatient() {
      console.log("Add Patient Clicked");
    },
    viewInvoice(item) {
      console.log("Viewing invoice:", item);
    },
    downloadInvoice(item) {
      console.log("Downloading invoice:", item);
    },
    deleteInvoice(item) {
      console.log("Deleting invoice:", item);
      this.isDeleteModalOpen = false;
    },
    pdfDialogHandle(item) {
      this.pdfUrl = `${import.meta.env.VITE_SERVER_URL}/public/invoices/invoice_${item['InvoiceID']}.pdf`;
      this.pdfDialog = true;
    },
    closePdfDialog() {
      this.pdfUrl = '';
      this.pdfDialog = false;
    },
    calculateTotal(item) {
      const qty = parseFloat(item.qty) || 0;
      const amount = parseFloat(item.amount) || 0;
      const discount = parseFloat(item.discount) || 0;
      return (qty * amount - discount).toFixed(2);
    },
    calculateGrandTotal() {
      return this.invoiceData.services.reduce(
        (sum, item) => sum + parseFloat(this.calculateTotal(item) || 0),
        0
      );
    },
    calculateFinalAmount() {
      return this.calculateGrandTotal() - this.invoiceData.additionalDiscount;
    },
    submitInvoice(isEdit) {
      if (
        !this.invoiceData.name
        || !this.invoiceData.uid
        || !this.invoiceData.phone
        || !this.invoiceData.services.length
      ) {
        return alert('Please enter name, uid, phone and atleast 1 item');
      }

      const requestData = {
        name: this.invoiceData.name,
        uid: this.invoiceData.uid,
        phone: this.invoiceData.phone,
        paymentStatus: this.invoiceData.paymentStatus,
        privateNote: this.invoiceData.privateNote,
        items: this.invoiceData.services.map((service) => ({
          service: service.service,
          amount: parseFloat(service.amount) || 0,
          quantity: parseInt(service.qty) || 0,
          discount: parseFloat(service.discount) || 0,
        })),
        additionalDiscountAmount: parseFloat(this.invoiceData.additionalDiscount) || 0,
        totalAmount: this.calculateFinalAmount(),
        paymentMode: this.invoiceData.paymentMode,
        patientNote: this.invoiceData.patientNote === null ? "" : this.invoiceData.patientNote,
      };


      const doctorId = localStorage.getItem('doctor_id');
      if (!isEdit) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/${doctorId}/invoice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.accessToken,
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
              if (contentType && !contentType.includes('application/json')) {
                return response.text().then(text => {
                  this.showSnackbar(text, true);
                  this.dialog = false;
                  throw new Error(`Error ${response.status}: ${text}`);
                });
              }
            }
            return response.json();
          })
          .then((data) => {
            this.dialog = false;
            this.fetchInvoices();
          })
          .catch((error) => {
            console.error("Network Error:", error.message);
            alert(JSON.stringify(error.message));
          });
      } else {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/${doctorId}/invoice/${this.invoiceData.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.accessToken,
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
              if (contentType && !contentType.includes('application/json')) {
                return response.text().then(text => {
                  this.showSnackbar(text, true);
                  this.dialog = false;
                  throw new Error(`Error ${response.status}: ${text}`);
                });
              }
            }
            return response.json();
          })
          .then((data) => {
            this.dialog = false;
            this.fetchInvoices();
          })
          .catch((error) => {
            console.error("Network Error:", error.message);
            alert(JSON.stringify(error.message));
          });
      }

    },
    fetchInvoices() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/invoice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              console.error("Error fetching patients:", errorData);
              throw new Error("Failed to fetch patients");
            });
          }
          return response.json();
        })
        .then((data) => {
          this.allInvoices = data.invoices;
          this.invoice = data.invoices.map((invoice) => ({
            "InvoiceID": invoice._id,
            Amount: invoice.totalAmount,
            Status: invoice.paymentStatus,
            "Patient Name": invoice.name,
            Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
            Type: invoice.paymentMode,
          }));
        })
        .catch((error) => {
          console.error("Network Error:", error.message);
        });
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
    closePopup() {
      this.dialog = false;
    },
    createInvoice() {
      this.invoiceData = {
        name: "",
        uid: "",
        phone: "",
        paymentStatus: "",
        privateNote: "",
        services: [
          {
            service: "",
            qty: "",
            amount: "",
            discount: "",
          },
        ],
        additionalDiscount: 0,
        paymentMode: "",
        patientNote: "",
      };
      this.dialog = true;
      this.isEdit = false;
      this.isShow = false;

    },
    editInvoice(item) {
      const data = this.allInvoices.filter(invoice => invoice._id === item.InvoiceID)

      this.invoiceData = {
        id: data[0]._id,
        name: data[0].name,
        uid: data[0].uid,
        phone: data[0].phone,
        paymentStatus: data[0].paymentStatus,
        privateNote: data[0].privateNote,
        additionalDiscount: data[0].additionalDiscountAmount,
        paymentMode: data[0].paymentMode,
        patientNote: data[0].patientNote,
        services: data[0].items.map((item) => ({
          service: item.service,
          qty: item.quantity,
          amount: item.amount,
          discount: item.discount,
        }))
      }

      this.dialog = true;
      this.isEdit = true;
      this.isShow = false;
    },
    showInvoice(id) {
      const data = this.allInvoices.filter(invoice => invoice._id === id)

      this.invoiceData = {
        name: data[0].name,
        uid: data[0].uid,
        phone: data[0].phone,
        paymentStatus: data[0].paymentStatus,
        privateNote: data[0].privateNote,
        additionalDiscount: data[0].additionalDiscountAmount,
        paymentMode: data[0].paymentMode,
        patientNote: data[0].patientNote,
        services: data[0].items.map((item) => ({
          service: item.service,
          qty: item.quantity,
          amount: item.amount,
          discount: item.discount,
        }))
      }

      this.dialog = true;
      this.isShow = true;
    },
    filterInvoices(status) {
      this.activeStatus = status;
      if (status === "All") {
        this.invoice = this.allInvoices.map((invoice) => ({
          "InvoiceID": invoice._id,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.name,
          Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
          Type: invoice.paymentMode,
        }));
      } else {
        const data = this.allInvoices.filter(invoice => invoice.paymentStatus === status);
        this.invoice = data.map((invoice) => ({
          "InvoiceID": invoice._id,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.name,
          Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
          Type: invoice.paymentMode,
        }));
      }
    },
    // Function to count invoices by status
    countByStatus(status) {
      return this.allInvoices.filter(invoice => invoice.paymentStatus === status).length;
    },
    showSnackbar(message, isError = false) {
      const snackbarStore = useSnackbarStore();
      snackbarStore.showMessage(message, isError);
    }
  },

  mounted() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.accessToken = localStorage.getItem('access_token');

    if (!this.doctorId || !this.accessToken) {
      this.$router.push('/login');
    }
    this.fetchInvoices();
  },
};
</script>


<style scoped>
.v-card {
  border-radius: 20px;
}

::v-deep(.v-data-table thead) {
  background-color: #e0e3e6;
}

::v-deep(.v-data-table) {
  border-radius: 0px;
}

::v-deep(.v-card-text) {
  padding: 0px;
}

::v-deep(.v-field.v-field--appended) {
  --v-field-padding-end: 6px;
  border-radius: 5px;
}

::v-deep(.v-btn.variant-text) {
  background: transparent !important;
  box-shadow: none !important;
}

.delete-btn {
  background: none !important;
  box-shadow: none !important;
}

.delete-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  /* Optional hover effect */
}

.delete-btn .v-btn__overlay {
  display: none;
}

.v-field .v-field__overlay {
  border-radius: 0px !important;
}

.rounded-xl .v-input__control .v-field {
  border-radius: 20px !important;
}

.more-btn {
  color: #6ec1e4 !important;
}

.icon-btn {
  box-shadow: none;
  font-size: 15px;
}

.service-down {
  width: 300px;
}

.print-popup {
  display: flex;
  margin: 0 auto;
  height: 60% !important;
}

.status-tag {
  border-radius: 9999px;
  padding: 0.195rem 0.625rem;
  font-size: 14px;
  font-weight: 500;
}

.filter-btn {
  text-transform: capitalize;
  color: #6b7280 !important;
  font-weight: 500 !important;

}

.filter-btn .span {
  color: #9ca3af !important;
  margin-left: 8px;
}

.filter-btn:hover {
  color: #385D7E !important;
  background-color: #d4ebff !important;
}

.active-btn {
  color: #385D7E !important;
  background-color: #d4ebff !important;
}

.pl-16{
  padding-left: 16px !important;
}
</style>
