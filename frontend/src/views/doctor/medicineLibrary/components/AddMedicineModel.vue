<template>
    <v-dialog v-model="isModalOpen" max-width="500px">
        <v-card class="popup-card">
            <!-- Header -->
            <v-card-title class="popup-title">
                Add Medicine
            </v-card-title>

            <!-- Form -->
            <v-card-text class="popup-detail">
                <v-form ref="form" v-model="isValid">
                    <v-combobox label="Medicine Name" variant="outlined" v-model="form.medicineName"
                        :rules="[rules.required]" hide-details style="margin-bottom: 30px;"></v-combobox>

                    <v-combobox label="Medicine Composition" variant="outlined" v-model="form.composition"
                        :rules="[rules.required]" hide-details></v-combobox>
                </v-form>
            </v-card-text>

            <!-- Actions -->
            <v-card-actions class="popup-action">
                <v-btn class="saaro-btn" text @click="$emit('close-dialog')">Cancel</v-btn>
                <v-btn class="saaro-btn" @click="submitForm" rounded>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useMedicineStore } from '@/store/MedicineStore';
import { useUiStore } from '@/store/UiStore';

export default {
    name: "AddMedicine",
    props: {
        medicineModel: Boolean,
    },
    computed: {
        isModalOpen() {
            return this.medicineModel;
        },
    },
    data() {
        return {
            isValid: false,

            form: {
                medicineName: null,
                composition: null,
            },
            rules: {
                required: (value) => !!value || "Required.",
            },
        };
    },
    methods: {
        async submitForm() {
            const isValid = await this.$refs.form.validate();

            if (!isValid.valid) {
                useUiStore().openNotificationMessage("Please fill in all required fields correctly!", "", "error");
                return;
            }
            const res = await useMedicineStore().AddMedicineApiCall(this.form)

            if (res) {
                this.$emit('close-dialog');
                this.$emit('actions');
                this.form = { medicineName: "", composition: "" };
                useUiStore().openNotificationMessage("Medicine Added Successfully!");
            }
        },
    },
};
</script>