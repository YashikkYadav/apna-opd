<template>
    <v-container fluid>
        <!-- Page Header -->
        <v-row class="align-center mb-4">
            <v-col cols="8" class="mt-4">
                <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" label="Search dropdown"
                    variant="solo" max-width="350" rounded="pill" class="rounded-xl"></v-text-field>
            </v-col>

            <v-col cols="4" class="text-end mb-2">
                <v-btn class="saaro-btn" color="#8f6cb4" @click="openModal" large>
                    Create Dropdown
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
                    <v-btn class="saaro-btn" text small @click="openDetailView(item)">
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
                <v-card-title class="popup-title">Create Drodown</v-card-title>
                <v-card-text class="popup-detail">
                    <v-form ref="form">
                        <v-combobox variant="outlined" v-model="newTemplate.sectionId" :items="sections" item-value="id"
                            item-title="name" label="Section" required hide-details style="margin-bottom: 30px;"
                            :rules="[rules.required]" return-object="false"></v-combobox>

                        <v-textarea type="textarea" label="Title" variant="outlined" v-model="newTemplate.name"
                            :rules="[rules.required]" hide-details></v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions class="popup-action">
                    <v-btn class="saaro-btn" text @click="closeModal">Cancel</v-btn>
                    <v-btn class="saaro-btn" text @click="createDropdown()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Detail Modal -->
        <v-dialog v-model="isEditDropdownModalOpen" max-width="500px">
            <v-card class="popup-card">
                <v-card-title class="popup-title">Edit Drodown</v-card-title>
                <v-card-text class="popup-detail">
                    <v-form ref="form">
                        <v-textarea label="Title" variant="outlined" v-model="newTemplate.name"
                            :rules="[rules.required]" hide-details></v-textarea>
                    </v-form>
                </v-card-text>
                <v-card-actions class="popup-action">
                    <v-btn class="saaro-btn" text @click="closeTemplateDetailModal">Cancel</v-btn>
                    <v-btn class="saaro-btn" text @click="createDropdownDetail">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
    <common-model :commonModel="isDeleteModalOpen" @close-dialog="isDeleteModalOpen = false" @actions="deleteDropdown"
        title="Delete Dropdown" description="Are you sure you want to delete dropdown?" />
</template>

<script>
import CommonModel from '@/components/CommonModel.vue';
import { checkAuth } from '@/lib/utils/utils';
import { useDropdownStore } from '@/store/DropdownStore';
import { useUiStore } from '@/store/UiStore';

export default {
    name: "DropdownLibrary",
    components: {
        CommonModel
    },
    data() {
        return {
            searchQuery: "",
            dropdownId: "",
            status: 0,
            isModalOpen: false,
            isEditDropdownModalOpen: false,
            isDeleteModalOpen: false,
            singleTemplateDetail: {},
            diagnosisList: [],
            rules: {
                required: (value) => !!value || "Required.",
            },
            templates: [],
            newTemplate: {
                id: null,
                sectionId: null,
                name: null,
            },
            headers: [
                { text: "Title", value: "name" },
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
            this.fetchDropdowns();
            this.fetchSections();
        }
    },
    methods: {
        async fetchDropdowns() {
            const res = await useDropdownStore().getAllDropdownsApiCall()

            if (res) {
                this.templates = res.dropdowns;
            }
        },
        async fetchSections() {
            const res = await useDropdownStore().getAllSectionsApiCall()

            if (res) {
                res.dropdowns.forEach((library) => {
                    this.sections.push({ id: library.id.toString(), name: library.name });
                    this.fieldMappings[library.id] = library.fields;
                });
            }
        },
        async createDropdown() {
            const isValid = await this.$refs.form.validate();

            if (!isValid.valid) {
                useUiStore().openNotificationMessage("Please fill in all required fields correctly!", "", "error");
                return;
            }
            
            const requestData = {
                sectionId: this.newTemplate.sectionId.id,
                sectionName: this.newTemplate.sectionId.name,
                name: this.newTemplate.name
            }

            const res = await useDropdownStore().AddDropdownApiCall(requestData)

            if (res) {
                this.fetchDropdowns();
                this.closeModal();
                useUiStore().openNotificationMessage("Dropdowm Added Successfully!");
            }
        },
        async createDropdownDetail() {
            const requestData = {
                name: this.newTemplate.name
            }

            const res = await useDropdownStore().UpdateDropdownApiCall(this.newTemplate.id, requestData)

            if (res) {
                this.fetchDropdowns();
                this.closeModal();
                this.isEditDropdownModalOpen = false;
                useUiStore().openNotificationMessage("Dropdowm Updated Successfully!");
            }
        },
        async deleteDropdown() {
            const res = await useDropdownStore().DeleteDropdownApiCall(this.dropdownId)

            this.isDeleteModalOpen = false;
            this.dropdownId = ""
            this.fetchDropdowns();
            useUiStore().openNotificationMessage("Dropdown Deleted Successfully!");
        },
        openModal() {
            this.isModalOpen = true;
        },
        openDeleteModel(item) {
            this.isDeleteModalOpen = true
            this.dropdownId = item._id
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetNewTemplate();
        },
        openDetailView(template) {
            this.newTemplate.name = template.name
            this.newTemplate.id = template._id
            this.isEditDropdownModalOpen = true;
        },
        closeTemplateDetailModal() {
            this.isEditDropdownModalOpen = false;
        },
        resetNewTemplate() {
            this.newTemplate = { id: null, sectionId: null, sectionName: "", name: "" };
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