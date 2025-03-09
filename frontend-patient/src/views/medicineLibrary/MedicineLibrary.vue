<template>
    <v-container fluid>
        <!-- Header Section -->
        <v-row class="align-center mb-4">
            <v-col cols="8" class="mt-4">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search Medicine" variant="solo"
                    max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
            </v-col>

            <v-col cols="4" class="text-end mb-2">
                <v-btn className="saaro-btn" color="#8f6cb4" @click="openDialog" large>
                    Add Medicine
                </v-btn>
            </v-col>
        </v-row>

        <!-- Medicine Table -->
        <v-card title="Medicine Library" flat class="template-table mb-4">
            <v-data-table :headers="headers" :items="medicines" :search="search" class="table">
                <template v-if="isLoading" v-slot:body>
                    <tr v-for="n in 6" :key="n">
                        <td v-for="header in headers" :key="header.key">
                            <v-skeleton-loader type="text"></v-skeleton-loader>
                        </td>
                    </tr>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon icon class="delete-btn" @click="openDeleteModel(item)">
                        <v-icon size="24" color="7A7A7A">mdi-trash-can</v-icon>
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
    <common-model :commonModel="isDeleteModalOpen" @close-dialog="isDeleteModalOpen = false" @actions="deleteMedicine"
        title="Delete Medicine" description="Are you sure you want to delete medicine?" />
    <add-medicine-model :medicineModel="dialog" @close-dialog="dialog = false" @actions="fetchMedicines" />
</template>

<script>
import { checkAuth } from '@/lib/utils/utils';
import { useMedicineStore } from '@/store/MedicineStore';
import { useUiStore } from '@/store/UiStore';
import CommonModel from '@/components/CommonModel.vue';
import AddMedicineModel from './components/AddMedicineModel.vue';

export default {
    name: "MedicineLibraryModel",
    components: {
        CommonModel,
        AddMedicineModel
    },
    data() {
        return {
            search: "",
            medicineId: "",
            dialog: false,
            isDeleteModalOpen: false,
            isLoading: true,
            medicines: [],
            headers: [
                { key: "medicineName", title: "Medicine Name" },
                { key: "composition", title: "Composition" },
                { key: "actions", title: "Actions", sortable: false },
            ],
        };
    },
    mounted() {
        const auth = checkAuth(this.$router);
        if (auth) {
            this.fetchMedicines();
        }
    },
    methods: {
        async fetchMedicines() {
            const res = await useMedicineStore().getAllMedicinesApiCall()

            if (res) {
                this.medicines = res.medicines;
                this.isLoading = false;
            }
        },
        async deleteMedicine() {
            const res = await useMedicineStore().DeleteMedicineApiCall(this.medicineId)

            this.isDeleteModalOpen = false;
            this.medicineId = ""
            this.fetchMedicines();
            useUiStore().openNotificationMessage("Medicine Deleted Successfully!");
        },
        openDialog() {
            this.dialog = true;
        },
        openDeleteModel(item) {
            this.isDeleteModalOpen = true
            this.medicineId = item._id
        },
    },
};
</script>