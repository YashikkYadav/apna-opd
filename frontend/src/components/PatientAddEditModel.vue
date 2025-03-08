<template>
    <v-dialog v-model="isDialogOpen" max-width="800px">
        <v-card class="add-patient-popup popup-card">
            <!-- Header -->
            <v-card-title class="d-flex justify-space-between align-center popup-title">
                <span>Add Patient</span>
                <v-btn size="24" icon @click="$emit('close-dialog')">
                    <v-icon size="24">mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <!-- Form -->
            <v-card-text class="popup-detail">
                <v-form ref="form" v-model="isValid">
                    <!-- Mobile Number Section -->
                    <v-row>
                        <v-col cols="3">
                            <v-text-field v-model="form.countryCode" label="Country Code" placeholder="1" prefix=""
                                variant="outlined" :rules="[rules.required]" outlined dense>
                            </v-text-field>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.mobileNumber" label="Primary Phone Number"
                                placeholder="e.g. 7740997399" variant="outlined"
                                :rules="[rules.required, rules.phoneNumber]" dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="v-col-12">
                            <v-text-field v-model="form.alternateNumber" label="Alternate Phone Number (Optional)"
                                placeholder="e.g. 9988776655" variant="outlined" outlined dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <!-- Name Section -->
                    <v-row>
                        <v-col cols="3">
                            <v-select v-model="form.title" label="Title" :items="['Mr.', 'Mrs.', 'Dr.']"
                                variant="outlined" placeholder="Title" dense>
                            </v-select>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field v-model="form.name" label="Full Name" placeholder="Full Name"
                                variant="outlined" :rules="[rules.required]" dense>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Date of Birth and Age -->
                    <v-row>
                        <v-col cols="6">
                            <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition"
                                offset-y>
                                <template #activator="{ on, attrs }">
                                    <v-text-field v-model="form.dateOfBirth" label="Date of Birth" :readonly="false"
                                        variant="outlined" type="date" dense v-bind="attrs" v-on="on"  @update:modelValue="updateAge">
                                        <!-- <template #prepend>
                          <v-icon>mdi-calendar</v-icon>
                        </template> -->
                                    </v-text-field>
                                </template>
                            </v-menu>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model.number="form.age" label="Age" variant="outlined" dense type="number">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <!-- Gender -->
                            <v-select v-model="form.gender" :items="['Male', 'Female', 'Other']" label="Gender"
                                :rules="[rules.required]" variant="outlined" dense>
                            </v-select>
                        </v-col>
                        <v-col cols="6">
                            <!-- Email -->
                            <v-text-field v-model="form.email" label="Email Address (Optional)" :rules="[rules.email]"
                                variant="outlined" dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="v-col-12">
                            <v-textarea v-model="form.address" label="Address" variant="outlined" dense rows="3"
                                auto-grow>
                            </v-textarea>
                        </v-col>
                    </v-row>

                    <!-- More Options -->
                    <v-btn text class="my-3 saaro-btn" variant="outlined" @click="moreOptions = !moreOptions">
                        <v-icon class="mr-1">mdi-dots-horizontal</v-icon>
                        More Options
                    </v-btn>

                    <v-expand-transition>
                        <div v-if="moreOptions">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="form.bloodGroup" label="Blood Group" placeholder="e.g. A+"
                                        variant="outlined" dense>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-textarea v-model="form.allergies" label="Allergies (Optional)" rows="1"
                                        variant="outlined" dense>
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="form.tags" label="Category" placeholder="Category"
                                        variant="outlined" dense>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="form.referredBy" label="Referred By"
                                        placeholder="Referred By" variant="outlined" dense>
                                    </v-text-field>
                                </v-col>
                            </v-row>

                        </div>
                    </v-expand-transition>
                </v-form>
            </v-card-text>

            <!-- Actions -->
            <v-card-actions class="popup-action">
                <v-btn className="saaro-btn" @click="$emit('close-dialog')">Cancel</v-btn>
                <v-btn className="saaro-btn" @click="submitForm">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { usePatientStore } from '@/store/PatientStore';
import { useUiStore } from '@/store/UiStore';

export default {
    name: "PatientAddEditModel",
    data() {
        return {
            moreOptions: false,
            menu: false,
            isValid: false,
            form: {
                countryCode: "+91",
                mobileNumber: "",
                alternateNumber: "",
                title: "",
                name: "",
                dateOfBirth: "",
                age: "",
                gender: "",
                email: "",
                address: "",
                photo: null,
                bloodGroup: "",
                allergies: "",
                tags: "",
                referredBy: "",
            },
            rules: {
                required: (value) => !!value || "Required.",
                phoneNumber: (value) =>
                    /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/.test(value) ||
                    "Phone number must be valid.",
            },
        };
    },
    props: {
        dialog: Boolean,
        patientId: String,
        invoicesData: Object,
        isEditModel: Boolean
    },
    computed: {
        isDialogOpen() {
            return this.dialog;
        },
        isPatientId() {
            return this.patientId;
        },
        invoiceData() {
            return this.invoicesData;
        },
        isEdit() {
            return this.isEditModel;
        }
    },
    watch: {
        dialog(newValue) {
            if (newValue === true && this.isEdit) {
                this.fetchPatientDetails();
            }else{
                this.resetForm();
            }
        },
    },
    methods: {
        async fetchPatientDetails() {
            const res = await usePatientStore().getPatientDetailsApiCall(this.patientId)

            if (res) {
                this.form = {
                    countryCode: "+91",
                    mobileNumber: String(res.patient.phoneNumber),
                    alternateNumber: res.patient.alternatePhoneNumber != null ? String(res.patient.alternatePhoneNumber) : "",
                    name: res.patient.fullName,
                    dateOfBirth: res.patient.dateOfBirth?.split("T")[0],
                    age: res.patient.age,
                    gender: res.patient.gender,
                    email: res.patient.email,
                    address: res.patient.address,
                    bloodGroup: res.patient.bloodGroup,
                    allergies: res.patient.allergies,
                    tags: res.patient.tags,
                    referredBy: res.patient.referredBy,
                };
            }
        },
        async submitForm() {
            const isValid = await this.$refs.form.validate();

            if (!isValid.valid) {
                useUiStore().openNotificationMessage("Please fill in all required fields correctly!", "", "error");
                return;
            }
            const requestData = {
                fullName: this.form.name,
                phoneNumber: this.form.mobileNumber,
                alternatePhoneNumber: this.form.alternateNumber === "" ? null : this.form.alternateNumber,
                dateOfBirth: this.form.dateOfBirth,
                age: this.form.age,
                gender: this.form.gender,
                email: this.form.email,
                address: this.form.address,
                bloodGroup: this.form.bloodGroup,
                allergies: this.form.allergies,
                tags: this.form.tags,
                referredBy: this.form.referredBy,
            };

            if (this.isPatientId) {
                const res = await usePatientStore().updatePatientApiCall(this.patientId, requestData)
                if (res) {
                    this.$emit('close-dialog');
                    this.$emit('fetch-patients');
                    useUiStore().openNotificationMessage("Patient Updated Succesfully!")
                }
            }else{
                const res = await usePatientStore().addPatientApiCall(requestData)
                if (res) {
                    this.$emit('close-dialog');
                    this.$emit('fetch-patients');
                    useUiStore().openNotificationMessage("Patient Added Succesfully!")
                }
            }
        },
        updateAge() {
            const birthDate = new Date(this.form.dateOfBirth);
            const age = new Date().getFullYear() - birthDate.getFullYear();

            this.form.age = age;
        },
        resetForm() {
            this.form = {
                countryCode: "+91",
                mobileNumber: "",
                alternateNumber: "",
                title: "",
                name: "",
                dateOfBirth: "",
                age: "",
                gender: "",
                email: "",
                address: "",
                photo: null,
                bloodGroup: "",
                allergies: "",
                tags: "",
                referredBy: "",
            };
        }
    },
};
</script>