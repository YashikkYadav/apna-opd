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
    :orderData="invoiceData"
    :dialog="invoiceDialog && invoiceType === 'Medical'"
    @close-dialog="invoiceDialog = false"
  />

  <!-- Hospital PDF Modal -->
  <hospital-pdf-model
    :orderData="hospitalInvoiceData"
    :dialog="invoiceDialog && invoiceType === 'Hospital'"
    @close-dialog="invoiceDialog = false"
  />

  <common-model
    :commonModel="isDeleteModalOpen"
    @close-dialog="isDeleteModalOpen = false"
    @actions="onDeleteInvoice"
    title="Delete Invoice"
    description="Are you sure you want to delete invoice?"
  />
</template>

<script>
import CommonModel from "@/components/CommonModel.vue";
import InvoiceAddEditModel from "./components/InvoiceAddEditModel.vue";
import InvoicePdfModel from "./components/InvoicePdfModel.vue";
import HospitalInvoiceModel from "./components/HospitalInvoiceModel.vue";
import HospitalPdfModel from "./components/HospitalPdfModel.vue";

import { checkAuth, getAmountStyle, getStatusStyle } from "@/lib/utils/utils";
import { useProfileStore } from "@/store/ProfileStore";
import { useInvoiceStore } from "@/store/InvoiceStore";
import { useUiStore } from "@/store/UiStore";

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
      invoiceType: "Medical", // Track current invoice type
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
    };
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
    async fetchProfileData() {
      try {
        const res = await useProfileStore().getProfileData();
        const profile = await res?.healthServeProfileData?.healthServeUser;
        this.pharmacyName = profile?.name || "Pharmacy Name";
        console.log(profile?.name)
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
            invoiceType: invoice.invoiceType, // Add invoice type
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
