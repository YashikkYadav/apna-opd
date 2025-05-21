<template>
    <v-dialog v-model="pdfDialog" max-width="800px">
        <v-card class="add-patient-popup popup-card">
            <v-card-title class="headline">Print Invoice</v-card-title>
            <v-card-text class="d-flex">
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
                            <v-text-field variant="outlined" v-model="email" label="Email" outlined
                                class="mb-3"></v-text-field>
                            <v-btn class="saaro-btn" @click="sharePrescription('Email')">Email</v-btn>
                        </div>
                        <div class="text-center">
                            <v-text-field variant="outlined" v-model="phoneNumber" label="Phone Number" outlined
                                class="mb-3"></v-text-field>
                            <v-btn class="saaro-btn" @click="sharePrescription('WhatsApp/SMS')">WhatsApp/SMS</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="saaro-btn" text @click="$emit('close-dialog')">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useUiStore } from '@/store/UiStore';

export default {
    name: "InvoicePdfModel",
    props: {
        pdfDialogModel: Boolean,
        pdfUrlData: String,
    },
    computed: {
        pdfDialog() {
            return this.pdfDialogModel;
        },
        pdfUrl() {
            return this.pdfUrlData;
        },
    },
    methods: {
        sharePrescription(method) {
            if (method === 'WhatsApp/SMS') {
                useUiStore().openNotificationMessage("Prescription shared via WhatsApp/SMS!");
            } else if (method === 'Email') {
                useUiStore().openNotificationMessage("Prescription sent via Email!");
            } else if (method === 'Print') {
                useUiStore().openNotificationMessage("Prescription printed!");
            }
            this.$emit('close-dialog');
        },
    },
};
</script>