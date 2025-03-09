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
                    <v-btn icon class="delete-btn ml-2" @click="openDeleteModel(item)">
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
    <common-model :commonModel="isDeleteModalOpen" @close-dialog="isDeleteModalOpen = false" @actions="deleteTemplate"
        title="Delete Template" description="Are you sure you want to delete template?" />
</template>

<script>
import { checkAuth } from '@/lib/utils/utils';
import { useTemplateStore } from '@/store/TemplateStore';
import { useUiStore } from '@/store/UiStore';
import CommonModel from '@/components/CommonModel.vue';

export default {
    name: "TemplateLibrary",
    components: {
        CommonModel
    },
    data() {
        return {
            searchQuery: "",
            status: 0,
            isModalOpen: false,
            isTemplateDetailModalOpen: false,
            isDeleteModalOpen: false,
            templateId: "",
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
                { name: "", details: "" }
            ],
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
        const auth = checkAuth(this.$router);
        if (auth) {
            this.fetchTemplates();
            this.fetchSections();
        }
    },
    methods: {
        async fetchTemplates() {
            const res = await useTemplateStore().getAllTemplatesApiCall()

            if (res) {
                this.templates = res.templates;
            }
        },
        async fetchSections() {
            const res = await useTemplateStore().getAllSectionsApiCall()

            if (res) {
                res.libraries.forEach((library) => {
                    this.sections.push({ id: library.id.toString(), name: library.name });
                    this.fieldMappings[library.id] = library.fields;
                });
            }
        },
        async createTemplateDetail(template) {
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
                const res = await useTemplateStore().AddTemplateApiCall(requestData)

                if (res) {
                    this.fetchTemplates();
                    useUiStore().openNotificationMessage("Template Added Successfully!");
                }
            } else {
                const res = await useTemplateStore().UpdateTemplateApiCall(template._id, requestData)

                if (res) {
                    this.fetchTemplates();
                    useUiStore().openNotificationMessage("Template Updated Successfully!");
                }
            }
        },
        async deleteTemplate() {
            const res = await useTemplateStore().DeleteTemplateApiCall(this.templateId)

            this.isDeleteModalOpen = false;
            this.invoiceId = ""
            this.fetchTemplates();
            useUiStore().openNotificationMessage("Template Deleted Successfully!");
        },
        openDeleteModel(item) {
            this.isDeleteModalOpen = true
            this.templateId = item._id
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
            }else{
                this.$refs.form.validate();
                useUiStore().openNotificationMessage("Please fill in all required fields correctly!", "", "error");
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
        filteredTemplates(sectionId) {
            return this.templates.filter(
                (template) =>
                    template.sectionId === sectionId &&
                    template.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
};
</script>