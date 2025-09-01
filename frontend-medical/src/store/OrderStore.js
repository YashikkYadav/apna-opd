// /store/OrderStore.js
import { defineStore } from 'pinia'
import { AxiosOrder } from '../apis/Order'   // 👈 your Medicine Order API service

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    doctorId: localStorage.getItem('doctor_id') || null,
  }),

  actions: {
    async getAllOrdersApiCall() {
      const OrderService = new AxiosOrder()
      const data = await OrderService.OrdersList(this.doctorId)
      return data
    },

    async addOrderApiCall(payload) {
      const OrderService = new AxiosOrder()
      const data = await OrderService.OrdersAdd(this.doctorId, payload)
      return data
    },

    async editOrderApiCall(orderId, payload) {
      const OrderService = new AxiosOrder()
      const data = await OrderService.OrdersEdit(this.doctorId, orderId, payload)
      return data
    },

    async updateOrderApiCall(orderId, payload) {
      const OrderService = new AxiosOrder();
      console.log(",,,")
      const data = await OrderService.OrdersUpdate(this.doctorId, orderId, payload);
      return data;
    },

    async deleteOrderApiCall(orderId) {
      const OrderService = new AxiosOrder()
      const data = await OrderService.OrdersDelete(this.doctorId, orderId)
      return data
    },
  },
})
