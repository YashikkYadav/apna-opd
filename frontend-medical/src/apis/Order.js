import axiosAuthenticator from "@/plugins/axios";

export class AxiosOrder {
    apiClient;
    constructor() {
        this.apiClient = new axiosAuthenticator()
    }

    // Get all medicine orders for a doctor
    OrdersList(doctorId) {
        return this.apiClient.get(`/${doctorId}/orders/`)
    }

    // Add a new medicine order
    OrdersAdd(doctorId, payload) {
        return this.apiClient.post(`/${doctorId}/orders`, payload)
    }

    // Edit an existing order
    OrdersEdit(doctorId, orderId, payload) {
        return this.apiClient.post(`/${doctorId}/orders/${orderId}`, payload)
    }

    // Update (e.g. mark as delivered / change status)
    OrdersUpdate(doctorId, orderId, payload) {
        return this.apiClient.patch(`/${doctorId}/orders/${orderId}`, payload);
    }
    // Delete an order
    OrdersDelete(doctorId, orderId) {
        return this.apiClient.delete(`/${doctorId}/orders/${orderId}`)
    }
}
