<template class="medicine-orders-page">
  <v-container fluid>
    <!-- Search Bar -->
    <v-row class="align-center mb-4">
      <v-col cols="8" class="mt-4">
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search Orders"
          variant="solo"
          max-width="350"
          rounded="pill"
          class="rounded-xl"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-card title="Medicine Orders" flat>
      <v-divider></v-divider>

      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        class="tablee medicine-orders-table grey-head"
      >
        <!-- Skeleton Loader -->
        <template v-if="isLoading" v-slot:body>
          <tr v-for="n in 6" :key="n">
            <td v-for="header in headers" :key="header.key">
              <v-skeleton-loader type="text"></v-skeleton-loader>
            </td>
          </tr>
        </template>

        <!-- OrderID -->
        <template v-slot:[`item.OrderID`]="{ item }">
          <span
            class="status-tag"
            :style="{ color: '#1976d2', cursor: 'pointer' }"
            @click="showOrder(item.OrderID)"
          >
            #{{ item.OrderID }}
          </span>
        </template>

        <!-- Medicines Dropdown / Readonly -->
<template v-slot:[`item.Medicines`]="{ item }">
  <v-menu offset-y max-width="400">
    <template v-slot:activator="{ props, on }">
      <v-btn v-bind="props" v-on="on" text small>
        Medicines
      </v-btn>
    </template>
    <v-list style="max-width:100px; max-height: 300px; overflow-y: auto; white-space: normal;">
      <v-list-item v-for="med in item.Medicines" :key="med._id" class="w-120px">
        <v-list-item-title>{{ med.display }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
        <!-- Amount -->
        <template v-slot:[`item.Amount`]="{ item }">
          <span class="status-tag" :style="getAmountStyle(item.Status)">
            ₹{{ item.Amount }}
          </span>
        </template>

        <!-- Status -->
        <template v-slot:[`item.Status`]="{ item }">
          <span class="status-tag" :style="getStatusStyle(item.Status)">
            {{ item.Status }}
          </span>
        </template>

        <!-- Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="icon-btn" icon @click="deleteDialogHandle(item)">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>

  <!-- Delete Modal -->
  <common-model
    :commonModel="isDeleteModalOpen"
    @close-dialog="isDeleteModalOpen = false"
    @actions="onDeleteOrder"
    title="Delete Order"
    description="Are you sure you want to delete this medicine order?"
  />
</template>

<script>
import CommonModel from '@/components/CommonModel.vue';
import { checkAuth, getAmountStyle, getStatusStyle } from '@/lib/utils/utils';
import { useOrderStore } from '@/store/OrderStore'; // medicine order store

export default {
  name: "MedicineOrders",
  components: { CommonModel },
  data() {
    return {
      search: "",
      headers: [
        { align: "start", key: "OrderID", title: "Order ID" },
        { key: "User Name", title: "User Name" },
        { key: "User Phone", title: "User Phone" },
        { key: "Medicines", title: "Medicines" },
        { key: "Date", title: "Date" },
        { key: "Amount", title: "Amount" },
        { key: "Status", title: "Status" },
        { key: "actions", title: "Actions" },
      ],
      orderId: "",
      orders: [],
      allOrders: [],
      isLoading: true,
      isDeleteModalOpen: false,
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetchOrders();
    }
  },
  methods: {
    async fetchOrders() {
      const res = await useOrderStore().getAllOrdersApiCall();
      if (res?.orders) {
        this.allOrders = res.orders;
        this.orders = res.orders.map((order) => ({
          "OrderID": order._id,
          "User Name": order.customerInfo.name,
          "User Phone": order.customerInfo.phone,
          "Medicines": order.items.map((m) => ({
            ...m,
            display: `${m.name} (${m.dosage}) x${m.quantity}`,
          })),
          Date: new Date(order.createdAt).toLocaleDateString('en-GB'),
          Amount: order.totalAmount,
          Status: order.status,
          id: order._id,
        }));
        this.isLoading = false;
      }
    },
    async onDeleteOrder() {
      await useOrderStore().deleteOrderApiCall(this.orderId);
      this.isDeleteModalOpen = false;
      this.orderId = "";
      this.fetchOrders();
      useUiStore().openNotificationMessage("Order Deleted Successfully!");
    },
    deleteDialogHandle(item) {
      this.isDeleteModalOpen = true;
      this.orderId = item.id;
    },
    showOrder(id) {
      const order = this.allOrders.find((o) => o._id === id);
      console.log("Order details:", order);
      // extend this with modal / drawer to show order detail
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
