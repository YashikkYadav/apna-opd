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
            <v-divider></v-divider>

            <v-data-table :headers="headers" :items="medicines" :search="search" class="table">
                <!-- Actions Column -->
                <template v-slot:item.actions="{ item }">
                    <v-icon icon class="delete-btn" @click="deleteItem(item)">
                        <v-icon size="24" color="7A7A7A">mdi-trash-can</v-icon>
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <!-- Add Medicine Popup -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="popup-card">
                <!-- Header -->
                <v-card-title class="popup-title">
                    Add Medicine
                </v-card-title>

                <!-- Form -->
                <v-card-text class="popup-detail">
                    <v-form ref="form" v-model="isValid">
                        <v-combobox label="Medicine Name" variant="outlined" v-model="form.medicineName" :rules="[rules.required]"
                        hide-details style="margin-bottom: 30px;"></v-combobox>

                        <v-combobox label="Medicine Composition" variant="outlined" v-model="form.composition" :rules="[rules.required]"
                        hide-details></v-combobox>
                    </v-form>
                </v-card-text>

                <!-- Actions -->
                <v-card-actions class="popup-action">
                    <v-btn class="saaro-btn" text @click="dialog = false">Cancel</v-btn>
                    <v-btn class="saaro-btn" @click="submitForm" rounded>
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { useUiStore } from '@/store/UiStore';

export default {
    data() {
        return {
            search: "",
            dialog: false,
            isValid: false,
            medicines: [],
            headers: [
                { key: "medicineName", title: "Medicine Name" },
                { key: "composition", title: "Composition" },
                { key: "actions", title: "Actions", sortable: false },
            ],
            form: {
                medicineName: null,
                composition: null,
            },
            rules: {
                required: (value) => !!value || "Required.",
            },
        };
    },
    mounted() {
        this.doctorId = localStorage.getItem('doctor_id');
        this.accessToken = localStorage.getItem('access_token');

        if (!this.doctorId || !this.accessToken) {
            this.$router.push('/login');
        }

        this.fetchMedicines();
    },
    methods: {
        fetchMedicines() {
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/medicine`, {
                method: "GET",
                headers: {
                    Authorization: this.accessToken,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    this.medicines = res.medicines;
                })
                .catch((error) => {
                    console.error("Network Error:", error);
                })
        },
        openDialog() {
            this.dialog = true;
        },
        submitForm() {
            if (this.$refs.form.validate()) {
                fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/medicine`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.accessToken,
                    },
                    body: JSON.stringify(this.form),
                })
                .then((response) => {
                    const contentType = response.headers.get('content-type');
                    if (!response.ok) {
                        if (contentType && !contentType.includes('application/json')) {
                            return response.text().then(text => {
                                this.showSnackbar(text, true);
                                this.isTemplateDetailModalOpen = false;
                                throw new Error(`Error ${response.status}: ${text}`);
                            });
                        }
                    }
                    return response.json();
                })
                    .then((res) => {
                        if(res){
                            this.fetchMedicines();
                            this.dialog = false;
                            this.form = { medicineName: "", composition: "" };
                        }
                    })
                    .catch((error) => {
                        console.error("Network Error:", error);
                        alert("Error while adding medicine.");
                    });

            }
        },
        deleteItem(item) {
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/medicine/${item._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.accessToken,
                    },
                })
                .then((response) => {
                    const contentType = response.headers.get('content-type');
                    if (!response.ok) {
                        if (contentType && !contentType.includes('application/json')) {
                            return response.text().then(text => {
                                this.showSnackbar(text, true);
                                this.isTemplateDetailModalOpen = false;
                                throw new Error(`Error ${response.status}: ${text}`);
                            });
                        }
                    }
                    return response.json();
                })
                    .then((res) => {
                        if(res){
                            this.fetchMedicines();
                        }
                    })
                    .catch((error) => {
                        console.error("Network Error:", error);
                    });
        },
        editItem(item) {
            this.form = { ...item };
            this.dialog = true;
        },
    },
};
</script>

<style scoped>
/* Custom Search Bar */
.custom-search ::v-deep .v-input__control {
    background-color: #f5f5f5;
    border-radius: 30px;
}

/* Card Styling */
.custom-card {
    border-radius: 12px;
    box-shadow: none;
}

/* Table Header */
::v-deep .v-data-table-header {
    background-color: #f5f5f5;
    font-weight: bold;
    color: #555;
}

/* Actions Icon Styling */
.v-icon {
    cursor: pointer;
}
</style>