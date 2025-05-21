<template>
    <v-dialog v-model="isDialogOpen" max-width="800px">
        <v-card class="add-patient-popup popup-card">
            <!-- Header -->
            <v-card-title class="d-flex justify-space-between align-center popup-title">
                <span v-if="!isShow"> {{ isEdit ? "Edit Invoice" : "Create Invoice" }}</span>
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
                        <v-col cols="3">
                            <v-text-field v-model="invoiceData.uid" label="UID" :rules="[rules.required]"
                                variant="outlined" dense :disabled="isShow">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="invoiceData.name" label="Name" :rules="[rules.required]"
                                variant="outlined" dense :disabled="isShow">
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field v-model="invoiceData.phone" label="Phone" :rules="[rules.phoneNumber]"
                                variant="outlined" dense :disabled="isShow">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Payment Status -->
                    <v-row>
                        <v-col cols="6">
                            <v-select style="border-radius: 0px;" v-model="invoiceData.paymentStatus"
                                :items="['Billed', 'Unbilled', 'Partially Paid']" label="Payment Status"
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
                            <v-data-table dense :items="invoiceData.services" item-value="id"
                                class="elevation-1 grey-head add-radius" hide-default-footer>
                                <!-- Table Columns -->
                                <template v-slot:[`item.service`]="{ item, index }">
                                    <v-combobox class="table-cell py-2 service-down" variant="outlined"
                                        v-model="item.service" dense hide-details @input="handleInput(item)"
                                        :key="'service-' + index" :items="serviceOptions"
                                        :disabled="isShow"></v-combobox>
                                </template>

                                <template v-slot:[`item.qty`]="{ item, index }">
                                    <v-text-field v-model="item.qty" dense hide-details type="number" class="table-cell"
                                        @input="handleInput(item)" :key="'qty-' + index" variant="outlined"
                                        :disabled="isShow"></v-text-field>
                                </template>

                                <template v-slot:[`item.amount`]="{ item, index }">
                                    <v-text-field v-model="item.amount" dense hide-details type="number"
                                        class="table-cell" @input="handleInput(item)" :key="'amount-' + index"
                                        variant="outlined" :disabled="isShow"></v-text-field>
                                </template>

                                <template v-slot:[`item.discount`]="{ item, index }">
                                    <v-text-field v-model="item.discount" dense hide-details type="number"
                                        class="table-cell" @input="handleInput(item)" :key="'discount-' + index"
                                        variant="outlined" :disabled="isShow"></v-text-field>
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
                            <v-text-field v-model="invoiceData.additionalDiscount" label="Additional Discount"
                                type="number" variant="outlined" dense :disabled="isShow">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select v-model="invoiceData.paymentMode"
                                :items="['Cash', 'Credit Card', 'UPI', 'Online']" label="Payment Mode"
                                variant="outlined" dense :disabled="isShow">
                            </v-select>
                        </v-col>
                        <v-col cols="6" sm="6">
                            <v-textarea v-model="invoiceData.patientNote" label="Patient Note" rows="1"
                                variant="outlined" :disabled="isShow"></v-textarea>
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
                <v-btn class="saaro-btn" type="submit" @click="submitInvoice(isEdit)"> {{ isEdit ? "Add / Edit" :
                    "Create Invoice"
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useInvoiceStore } from '@/store/InvoiceStore';
import { useUiStore } from '@/store/UiStore';

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
        }
    },
    data() {
        return {
            rules: {
                required: (value) => !!value || "Required.",
                phoneNumber: (value) =>
                    /^\d+$/.test(value) || "Phone number must be numeric.",
            },
        };
    },
    methods: {
        async submitInvoice(isEdit) {
            const isValid = await this.$refs.form.validate();

            if (!isValid.valid) {
                useUiStore().openNotificationMessage("Please fill in all required fields correctly!", "", "error");
                return;
            }

            const requestData = {
                name: this.invoiceData.name,
                uid: this.invoiceData.uid,
                phone: this.invoiceData.phone,
                paymentStatus: this.invoiceData.paymentStatus === null ? "" : this.invoiceData.paymentStatus,
                privateNote: this.invoiceData.privateNote,
                items: this.invoiceData.services.map((service) => ({
                    service: service.service,
                    amount: parseFloat(service.amount) || 0,
                    quantity: parseInt(service.qty) || 0,
                    discount: parseFloat(service.discount) || 0,
                })),
                additionalDiscountAmount: parseFloat(this.invoiceData.additionalDiscount) || 0,
                totalAmount: this.calculateFinalAmount(),
                paymentMode: this.invoiceData.paymentMode === null ? "" : this.invoiceData.paymentMode,
                patientNote: this.invoiceData.patientNote === null ? "" : this.invoiceData.patientNote,
            };

            if (!isEdit) {
                const res = await useInvoiceStore().addInvoiceApiCall(requestData)
                if (res) {
                    this.$emit('close-dialog');
                    this.$emit('fetch-invoices');
                    useUiStore().openNotificationMessage("Invoice Added Succesfully!")
                }
            } else {
                const res = await useInvoiceStore().editInvoiceApiCall(this.invoiceData.id, requestData)
                if (res) {
                    this.$emit('close-dialog');
                    this.$emit('fetch-invoices');
                    useUiStore().openNotificationMessage("Invoice Updated Succesfully!")
                }
            }
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
    },
};
</script>