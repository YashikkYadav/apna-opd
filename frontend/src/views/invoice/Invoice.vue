<template class="create-rx-page invoice-page">
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

      <v-data-table :headers="headers" :items="invoice" :search="search"
        class="tablee invoice-table template-table grey-head">
        <template v-if="isLoading" v-slot:body>
          <tr v-for="n in 6" :key="n">
            <td v-for="header in headers" :key="header.key">
              <v-skeleton-loader type="text"></v-skeleton-loader>
            </td>
          </tr>
        </template>
        <template v-slot:[`item.InvoiceID`]="{ item }">
          <span class="status-tag" :style="{ color: '#56b1f3', cursor: 'pointer' }"
            @click="showInvoice(item.InvoiceID)">#{{ item.InvoiceID
            }}</span>
        </template>
        <template v-slot:[`item.Amount`]="{ item }">
          <span class="status-tag" :style="getAmountStyle(item.Status)">₹{{ item.Amount }}</span>
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
          <v-btn class="icon-btn" icon @click="deleteDialogHandle(item)">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <invoice-add-edit-model :invoicesData="invoiceData" :dialog="dialog" :isEditModel="isEdit" :isShowModel="isShow"
    @close-dialog="dialog = false" @fetch-invoices="fetchInvoices" />

  <invoice-pdf-model :pdfUrlData="pdfUrl" :pdfDialogModel="pdfDialog" @close-dialog="pdfDialog = false" />

  <common-model :commonModel="isDeleteModalOpen" @close-dialog="isDeleteModalOpen = false" @actions="onDeleteInvoice"
    title="Delete Invoice" description="Are you sure you want to delete invoice?" />
</template>

<script>
import CommonModel from '@/components/CommonModel.vue';
import InvoiceAddEditModel from './components/InvoiceAddEditModel.vue';
import InvoicePdfModel from './components/InvoicePdfModel.vue';
import { checkAuth, getAmountStyle, getStatusStyle } from '@/lib/utils/utils';
import { useInvoiceStore } from '@/store/InvoiceStore';

export default {
  name: "Invoice",
  components: {
    InvoiceAddEditModel,
    InvoicePdfModel,
    CommonModel
  },
  data() {
    return {
      search: "",
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
      pdfDialog: false,
      pdfUrl: '',
      isLoading: true,
      invoiceData: {},
      isDeleteModalOpen: false
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchInvoices();
    }
  },
  methods: {
    async fetchInvoices() {
      const res = await useInvoiceStore().getAllInvoicesApiCall()
      if (res) {
        this.allInvoices = res.invoices;
        this.invoice = res.invoices.map((invoice) => ({
          "InvoiceID": invoice.invoiceId,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.name,
          Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
          Type: invoice.paymentMode,
          id: invoice._id
        }));
        this.isLoading = false
      }
    },
    async onDeleteInvoice() {
      const res = await useInvoiceStore().deleteInvoiceApiCall(this.invoiceId)

      this.isDeleteModalOpen = false;
      this.invoiceId = ""
      this.fetchInvoices();
      useUiStore().openNotificationMessage("Invoice Deleted Successfully!");
    },
    pdfDialogHandle(item) {
      this.pdfUrl = `${import.meta.env.VITE_SERVER_URL}/public/invoices/invoice_${item.id}.pdf`;
      this.pdfDialog = true;
    },
    deleteDialogHandle(item) {
      this.isDeleteModalOpen = true;
      this.invoiceId = item.id
    },
    createInvoice() {
      this.invoiceData = {
        name: "",
        uid: "",
        phone: "",
        paymentStatus: null,
        privateNote: "",
        services: [
          {
            service: "",
            qty: "",
            amount: "",
            discount: "",
          },
        ],
        additionalDiscount: null,
        paymentMode: null,
        patientNote: "",
      };
      this.dialog = true;
      this.isEdit = false;
      this.isShow = false;

    },
    editInvoice(item) {
      const data = this.allInvoices.filter(invoice => invoice.invoiceId === item.InvoiceID)

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
      const data = this.allInvoices.filter(invoice => invoice.invoiceId === id)

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
          "InvoiceID": invoice.invoiceId,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.name,
          Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
          Type: invoice.paymentMode,
          id: invoice._id
        }));
      } else {
        const data = this.allInvoices.filter(invoice => invoice.paymentStatus === status);
        this.invoice = data.map((invoice) => ({
          "InvoiceID": invoice.invoiceId,
          Amount: invoice.totalAmount,
          Status: invoice.paymentStatus,
          "Patient Name": invoice.name,
          Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
          Type: invoice.paymentMode,
          id: invoice._id
        }));
      }
    },
    countByStatus(status) {
      return this.allInvoices.filter(invoice => invoice.paymentStatus === status).length;
    },
    getAmountStyle(status) {
      return getAmountStyle(status);
    },
    getStatusStyle(status) {
      return getStatusStyle(status);
    },
  },
};
</script>
