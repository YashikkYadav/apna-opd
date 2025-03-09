<template>
    <v-container fluid>
        <!-- Page Header -->
        <v-row class="align-center mb-4">
            <v-col cols="8" class="mt-4">
                <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" label="Search templates"
                    variant="solo" max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
            </v-col>

            <v-col cols="4" class="text-end mb-2">
                <v-btn class="saaro-btn" color="#8f6cb4" @click="openModal" large>
                    Create Template
                </v-btn>
            </v-col>
        </v-row>

        <!-- Section-wise Tables -->
        <v-card class="mb-4 template-table" v-for="section in sections" key="section-${section.id}"
            id="`section-${section.id}`">
            <v-card-title>{{ section.name }}</v-card-title>
            <v-data-table :headers="headers" :items="filteredTemplates(section.id)" item-value="id" class="table" dense>


                <template v-slot:headers="{ props }">
                    <tr>
                        <th v-for="header in headers" :key="header.text" :align="header.align"
                            :style="{ textAlign: header.align }">
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
                <template #item.actions="{ item }">
                    <v-btn class="saaro-btn" text small @click="openDetailView(item, 1)">
                        View & Edit
                    </v-btn>
                    <v-btn icon class="delete-btn ml-2" @click="deleteItem(item)">
                        <v-icon color="7A7A7A">mdi-trash-can</v-icon>
                    </v-btn>
                </template>


            </v-data-table>
        </v-card>

        <!-- Create Template Modal -->
        <v-dialog v-model="isModalOpen" max-width="500px">
            <v-card class="popup-card">
                <v-card-title class="popup-title">Create Template</v-card-title>
                <v-card-text class="popup-detail">
                    <v-form ref="form">
                        <v-combobox variant="outlined" v-model="newTemplate.sectionId" :items="sections" item-value="id"
                            item-title="name" label="Section" required hide-details
                            @update:modelValue="updateFieldsBasedOnSection" style="margin-bottom: 30px;"
                            :rules="[rules.required]" return-object="false"></v-combobox>

                        <v-combobox label="Template Name" variant="outlined" v-model="newTemplate.name"
                            :rules="[rules.required]" hide-details></v-combobox>
                    </v-form>
                </v-card-text>
                <v-card-actions class="popup-action">
                    <v-btn class="saaro-btn" text @click="closeModal">Cancel</v-btn>
                    <v-btn class="saaro-btn" text @click="createTemplate">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Detail Modal -->
        <v-dialog v-model="isTemplateDetailModalOpen" max-width="1200px" class="add-details" max-height="500px">
            <v-card class="popup-card">
                <v-card-title class="popup-title">Add Details</v-card-title>
                <v-card-text class="popup-detail">
                    <v-form ref="form">
                        <v-data-table :items="diagnosisList" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat style="padding: 0px 20px; display: flex;">
                                    <v-toolbar-title>{{ this.singleTemplateDetail.name }}</v-toolbar-title>
                                </v-toolbar>
                            </template>
                            <template v-for="field in currentFields" :key="field" v-slot:[`item.${field}`]="{ item }"
                                class="print-table">
                                <v-combobox variant="outlined" v-model="item[field]" hide-details
                                    @input="handleInputDiagnosis(item)" style="margin-bottom: 10px;"></v-combobox>
                            </template>
                        </v-data-table>
                    </v-form>
                </v-card-text>
                <v-card-actions class="popup-action">
                    <v-btn class="saaro-btn" text @click="closeTemplateDetailModal">Cancel</v-btn>
                    <v-btn class="saaro-btn" text @click="createTemplateDetail(this.singleTemplateDetail)">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { useSnackbarStore } from '../store/snackbar';
export default {
    data() {
        return {
            searchQuery: "",
            status: 0,
            isModalOpen: false,
            isTemplateDetailModalOpen: false,
            singleTemplateDetail: {},
            diagnosisList: [],
            rules: {
                required: (value) => !!value || "Required.",
            },
            templates: [],
            newTemplate: {
                id: null,
                sectionId: null,
                sectionName: "",
                name: null,
            },
            headers: [
                { text: "Template Name", value: "name" },
                { text: "Actions", value: "actions", sortable: false, align: "end" },
            ],
            sections: [],
            fieldMappings: {},
            currentFields: [
                { name: "", details: "" } // Ensure this contains the fields you need
            ],
            accessToken: '',
        };
    },
    computed: {
        dynamicHeaders() {
            return this.currentFields.map((field) => ({
                text: field.charAt(0).toUpperCase() + field.slice(1),
                value: field,
            }));
        },
    },
    mounted() {
        this.doctorId = localStorage.getItem('doctor_id');
        this.accessToken = localStorage.getItem('access_token');

        if (!this.doctorId || !this.accessToken) {
            this.$router.push('/login');
        }

        this.fetchTemplates();
        this.fetchSections();
    },
    methods: {
        fetchTemplates() {
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/template`, {
                method: "GET",
                headers: {
                    Authorization: this.accessToken,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    this.templates = res.templates;
                })
                .catch((error) => {
                    console.error("Network Error:", error);
                })
        },
        fetchSections() {
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/library`, {
                method: "GET",
                headers: {
                    Authorization: this.accessToken,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    res.libraries.forEach((library) => {
                        this.sections.push({ id: library.id.toString(), name: library.name });
                        this.fieldMappings[library.id] = library.fields;
                    });

                })
                .catch((error) => {
                    console.error("Network Error:", error);
                })
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetNewTemplate();
        },
        openDetailView(template, status) {
            this.singleTemplateDetail = template;
            if (template.data.length > 0) {
                this.diagnosisList = template.data;
            }
            this.currentFields = this.fieldMappings[template.sectionId] || [];
            this.isTemplateDetailModalOpen = true;
            this.status = status;
        },
        closeTemplateDetailModal() {
            this.isTemplateDetailModalOpen = false;
        },
        resetNewTemplate() {
            this.newTemplate = { id: null, sectionId: null, sectionName: "", name: "" };
        },
        createTemplate() {
            if (this.newTemplate.sectionId && this.newTemplate.name) {
                const newTemplate = { ...this.newTemplate, sectionId: this.newTemplate.sectionId.id, id: Date.now(), data: [] };
                this.templates.push(newTemplate);
                this.closeModal();
                this.openDetailView(newTemplate, 0);
            }
        },
        updateFieldsBasedOnSection() {
            this.currentFields = this.fieldMappings[this.newTemplate.sectionId.id] || [];
            this.diagnosisList = this.currentFields.length > 0
                ? [this.currentFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})]
                : [];
        },
        handleInputDiagnosis(item) {
            const isRowFilled = this.currentFields.some((field) => item[field]);
            if (isRowFilled && !this.hasEmptyRowDiagnosis()) {
                const newItem = this.currentFields.reduce((acc, field) => {
                    acc[field] = "";
                    return acc;
                }, {});
                this.diagnosisList.push(newItem);
            }
            this.removeEmptyRowsDiagnosis();
        },
        hasEmptyRowDiagnosis() {
            return this.diagnosisList.some((row) =>
                this.currentFields.every((field) => !row[field])
            );
        },
        removeEmptyRowsDiagnosis() {
            this.diagnosisList = this.diagnosisList.filter((row, index) =>
                this.currentFields.some((field) => row[field]) || index === this.diagnosisList.length - 1
            );
        },
        createTemplateDetail(template) {
            const index = this.templates.findIndex((t) => t.id === template.id);
            if (index !== -1) {
                this.templates[index].data = [...this.diagnosisList];
                this.closeTemplateDetailModal();
            }

            const section = this.sections.find(sec => sec.id === template.sectionId);
            if (section) {
                template.sectionName = section.name;
            }

            const requestData = template
            if (this.status === 0) {

                fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/template`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.accessToken,
                    },
                    body: JSON.stringify(requestData),
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
                        if (res) {
                            this.fetchTemplates();
                        }
                    })
                    .catch((error) => {
                        console.error("Network Error:", error);
                        alert("Error saving template.");
                    });
            } else {
                fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/template/${template._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: this.accessToken,
                    },
                    body: JSON.stringify(requestData),
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
                        if (res) {
                            this.fetchTemplates();
                        }
                    })
                    .catch((error) => {
                        console.error("Network Error:", error);
                        alert("Error saving template.");
                    });
            }
        },
        deleteItem(item) {
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/template/${item._id}`, {
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
                    if (res) {
                        this.fetchTemplates();
                    }
                })
                .catch((error) => {
                    console.error("Network Error:", error);
                    alert("Error while deleting medicine.");
                });
        },
        filteredTemplates(sectionId) {
            return this.templates.filter(
                (template) =>
                    template.sectionId === sectionId &&
                    template.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        showSnackbar(message, isError = false) {
            const snackbarStore = useSnackbarStore();
            snackbarStore.showMessage(message, isError);
        }
    },
};
</script>