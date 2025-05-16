<template class="create-rx-page">
    <v-container fluid>
        <!-- Search Bar and Add Patient Button -->
        <v-row class="align-center mb-4">
            <v-col cols="8" class="mt-4">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Name,Phone,UID" variant="solo"
                    max-width="350" rounded="pill" class="rounded-xl" @change="filterData"></v-text-field>
            </v-col>

            <v-col cols="4" class="text-end mb-2">
                <v-btn className="saaro-btn" color="#8f6cb4" @click="openDialog" large>
                    Register Patient
                </v-btn>
            </v-col>
        </v-row>

        <!-- Data Table -->
        <v-card title="Patients" flat>
            <v-data-table-server :headers="headers" :items="patients" :search="search" class="table grey-head"
                :page.sync="currentPageNumber" :items-length="totalPatients" :items-per-page="limit"
                @update:page="pageUpdateFunction" :options.sync="options"
                @update:items-per-page="perPageUpdateFunction">
                <template v-if="isLoading" v-slot:body>
                    <tr v-for="n in 6" :key="n">
                        <td v-for="header in headers" :key="header.key">
                            <v-skeleton-loader type="text"></v-skeleton-loader>
                        </td>
                    </tr>
                </template>
                <template v-slot:[`item.Tags`]="{ item }">
                    <v-chip v-if="item.Tags" color="red">
                        {{ item.Tags }}
                    </v-chip>
                </template>

                <template v-slot:[`item.action`]="{ item }">
                    <router-link :to="`/${item.id}/consult`" style="text-decoration: none; color: inherit;">
                        <v-btn className="saaro-btn" color="#8f6cb4" small>
                            Consult
                        </v-btn>
                    </router-link>
                </template>
            </v-data-table-server>
        </v-card>
    </v-container>
    <patient-add-edit-model :dialog="dialog" :isEditModel="false" :patientId="null" @close-dialog="dialog = false"
        @fetch-patients="fetchPatients" />
</template>

<script>
import { debounce } from "lodash";
import { checkAuth } from '@/lib/utils/utils';
import { usePatientStore } from '@/store/PatientStore';
import PatientAddEditModel from '@/components/PatientAddEditModel.vue';

export default {
    name: "CreateRx",
    components: {
        PatientAddEditModel
    },
    data() {
        return {
            search: "",
            dialog: false,
            moreOptions: false,
            isLoading: true,
            patients: [],
            currentPageNumber: 1,
            limit: 25,
            totalPatients: 0,
            options: {
                page: 1,
                itemsPerPage: 25,
            },
            headers: [
                { key: "UID", title: "UID" },
                { key: "Name", title: "Name" },
                { key: "Phone", title: "Phone" },
                { key: "Date", title: "Last Visit" },
                { key: "Tags", title: "Category" },
                { key: "action", title: "Action", sortable: false },
            ],
            debouncedSearch: null
        };
    },
    mounted() {
        const auth = checkAuth(this.$router);
        if (auth) {
            this.fetchPatients();
        }
        this.debouncedSearch = debounce(this.filterData, 500);
    },
    methods: {
        async fetchPatients() {
            const res = await usePatientStore().getAllPatientApiCall(this.currentPageNumber, this.limit, this.search)
            if (res) {
                this.isLoading = false;
                this.patients = res.patient.map((patient) => ({
                    id: patient.patientId?._id,
                    UID: patient.patientId?.uid,
                    Name: patient.patientId?.fullName,
                    Phone: patient.patientId?.phoneNumber,
                    Date: new Date(patient?.updatedAt).toLocaleDateString('en-GB'),
                    Tags: patient.patientId?.tags,
                    Action: "",
                }));

                if (res.pagination) {
                    this.totalPatients = res.pagination.totalPatients || 0;
                }
            }
        },
        openDialog() {
            this.dialog = true;
        },
        pageUpdateFunction(newPageNumber) {
            this.currentPageNumber = newPageNumber;
            this.fetchPatients();
        },
        perPageUpdateFunction(newPageNumber) {
            this.limit = newPageNumber;
            this.fetchPatients();
        },
        filterData() {
            this.currentPageNumber = 1;
            this.fetchPatients();
        }
    },
    watch: {
        search: {
            handler(newVal) {
                this.debouncedSearch();
            },
            immediate: false
        },
        options: {
            handler() {
                this.limit = this.options.itemsPerPage;
                this.currentPageNumber = this.options.page;
                this.fetchPatients();
            },
            deep: true
        }
    }
};
</script>