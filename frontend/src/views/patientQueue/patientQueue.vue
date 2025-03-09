<template>
    <v-container fluid>
        <v-row class="align-center mb-4">
            <v-col cols="8" class="mt-4">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search Patient" variant="solo"
                    max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
            </v-col>
        </v-row>

        <!-- Data Table -->
        <v-data-table v-model="selectedPatients" :headers="headers" :items="filteredPatients" :items-per-page="10"
            item-value="id" show-select class="tablee template-table grey-head queue">
            <template v-if="isLoading" v-slot:body>
                <tr v-for="n in 6" :key="n">
                    <td v-for="header in headers" :key="header.key">
                        <v-skeleton-loader type="text"></v-skeleton-loader>
                    </td>
                    <td>
                        <v-skeleton-loader type="text"></v-skeleton-loader>
                    </td>
                </tr>
            </template>
            <template #top>
                <v-toolbar flat>
                    <v-toolbar-title>Patient Queue</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="markCompleted" class="mx-2">
                        Mark Completed
                    </v-btn>
                    <v-btn color="error" @click="markNoShow" class="mx-2">
                        Mark No Show
                    </v-btn>
                </v-toolbar>
            </template>

            <template #item.status="{ item }">
                <v-chip color="orange" dark small>
                    {{ item.status }}
                </v-chip>
            </template>

            <template #item.appointment="{ item }">
                <span>{{ item.appointment }}</span>
            </template>
        </v-data-table>
    </v-container>

    <common-model :commonModel="isCompletedModalOpen" @close-dialog="isCompletedModalOpen = false"
        @actions="completeAppointment" title="Mark Completed"
        description="Are you sure you want to complete this appointment?" />

    <common-model :commonModel="isNoShowModalOpen" @close-dialog="isNoShowModalOpen = false"
        @actions="noShowAppointment" title="Mark No Show"
        description="Are you sure you want to remove this appointment?" />
</template>

<script>
import { checkAuth } from '@/lib/utils/utils';
import { useUiStore } from '@/store/UiStore';
import { useAppointmentStore } from '@/store/AppointmentStore';

export default {
    data() {
        return {
            isCompletedModalOpen: false,
            isNoShowModalOpen: false,
            isLoading: true,
            search: '', // For search functionality
            headers: [
                { text: 'Patient Name', title: "Name", value: 'name', align: 'start' },
                { text: 'Appointment Time & Date', title: "Appointment", value: 'appointment', align: 'center' },
                { text: 'Status', value: 'status', title: "Status", align: 'center' },
            ],
            patients: [],
            selectedPatients: [],
            deletedPatient: null,
        };
    },
    mounted() {
        const auth = checkAuth(this.$router);
        if (auth) {
            this.fetchAppointments();
        }
    },
    computed: {
        filteredPatients() {
            return this.patients.filter((patient) =>
                patient.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        async fetchAppointments() {
            const res = await useAppointmentStore().getAllAppointmentApiCall()

            if (res) {
                this.patients = res.appointments.map((patient) => ({
                    id: patient._id,
                    name: patient.patientId.fullName,
                    appointment: `${new Date(patient.date).toLocaleDateString('en-GB')} ${patient.time}`,
                    status: "Pending"
                }));
                this.isLoading = false
            }
        },
        async completeAppointment() {
            const requestData = {
                ids: this.selectedPatients,
                status: "Completed"
            }

            const res = await useAppointmentStore().UpdateAppointmentStatusApiCall(requestData)

            if (res) {
                this.isCompletedModalOpen = false;
                this.fetchAppointments();
                useUiStore().openNotificationMessage("Appointment Mark As Completed Succesfully!")
            }
        },
        async noShowAppointment() {
            const requestData = {
                ids: this.selectedPatients,
                status: "No Show"
            }

            const res = await useAppointmentStore().UpdateAppointmentStatusApiCall(requestData)

            if (res) {
                this.isNoShowModalOpen = false;
                this.fetchAppointments();
                useUiStore().openNotificationMessage("Appointment Mark As No Show Succesfully!")
            }
        },
        markCompleted() {
            if (this.selectedPatients.length === 0) {
                useUiStore().openNotificationMessage("Please select at least one patient.", "", "error");
                return;
            }
            this.isCompletedModalOpen = true;
        },
        markNoShow() {
            if (this.selectedPatients.length === 0) {
                useUiStore().openNotificationMessage("Please select at least one patient.", "", "error");
                return;
            }
            this.isNoShowModalOpen = true;
        },
    },
};
</script>