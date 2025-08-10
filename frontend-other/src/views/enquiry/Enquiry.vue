<template class="create-rx-page invoice-page">
  <v-container fluid>
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search Enquiry" variant="solo"
          max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-card title="Enquiries" flat>
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
          <span v-if="!item.isContacted" class="status-tag" :style="{ color: 'red', cursor: 'pointer' }"
            @click="onClickingRow(item.InvoiceID)">#{{ item.InvoiceID
            }}</span>
          <span v-else class="status-tag" :style="{ color: '#56b1f3', cursor: 'pointer' }"
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
          <v-btn class="icon-btn" icon @click="deleteDialogHandle(item)">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>

  <common-model :commonModel="isDeleteModalOpen" @close-dialog="isDeleteModalOpen = false" @actions="onDeleteInvoice"
    title="Delete Enquiry" description="Are you sure you want to delete enquiry?" />
</template>

<script>
import CommonModel from '@/components/CommonModel.vue';
import { checkAuth, getAmountStyle, getStatusStyle } from '@/lib/utils/utils';
import { useInvoiceStore } from '@/store/InvoiceStore';

export default {
  name: "Enquiry",
  components: {
    CommonModel
  },
  data() {
    return {
      search: "",
      headers: [
        { align: "start", key: "InvoiceID", title: "Enquiry" },
        // { key: "Amount", title: "Title" },
        // { key: "Status", title: "Status" },
        { key: "User Name", title: "User Name" },
        { key: "User Phone", title: "User Phone" },
        { key: "Date", title: "Date" },
        // { key: "Type", title: "Type" },
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
      console.log('Res enquiry: ', res);
      if (res?.enquiries) {
        this.allInvoices = res?.enquiries;
        this.invoice = res?.enquiries?.map((invoice) => ({
          "InvoiceID": invoice._id,
          // Amount: invoice.totalAmount,
          // Status: invoice.paymentStatus,
          "User Name": invoice.name,
          "User Phone": invoice.phone,
          Date: new Date(invoice.createdAt).toLocaleDateString('en-GB'),
          // Type: invoice.paymentMode,
          id: invoice._id,
          isContacted: invoice.isContacted,
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
    async onClickingRow(id) {
      const res = await useInvoiceStore().updateInvoiceApiCall(id)
      this.fetchInvoices();
    },
    deleteDialogHandle(item) {
      this.isDeleteModalOpen = true;
      this.invoiceId = item.id
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
        services: data[0].items?.map((item) => ({
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
