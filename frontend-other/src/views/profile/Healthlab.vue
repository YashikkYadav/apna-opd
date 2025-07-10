<template>
    <form class="healthlab-admin" @submit.prevent="saveData">
        <v-container fluid class="full-screen-container">
            <!-- Manual Save Button -->
            <v-row>
                <v-col cols="12">
                    <v-btn color="primary" large @click="saveData" class="mb-6">
                        <v-icon left>mdi-content-save</v-icon>
                        Save All Changes
                    </v-btn>
                    <v-btn color="red" large @click="testClick" class="mb-6 ml-4">
                        <v-icon left>mdi-alert</v-icon>
                        Test Button
                    </v-btn>
                </v-col>
            </v-row>
            <!-- Status Messages -->
            <v-alert v-if="message" :type="messageType" class="mb-4" closable @click:close="message = ''">
                {{ message }}
            </v-alert>
            <!-- Remove all v-card-title (section headings) and main dashboard heading -->
            <!-- Keep only v-card-text and forms/tables -->
            <!-- Header -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class=" text-white">
                    <v-icon left>mdi-flask</v-icon>
                    HealthLab Admin Dashboard
                </v-card-title>
            </v-card>

            <!-- Basic Lab Information -->
            <v-card class="mb-6 w-100 full-width-card" elevation="2">
                <v-card-title class="bg-blue-lighten-5 section-heading">Basic Lab Information</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="labInfo.name" label="Lab Name" variant="outlined" class="mb-4" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="labInfo.location" label="Location" variant="outlined" class="mb-4" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="labInfo.phone" label="Phone" variant="outlined" class="mb-4" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="labInfo.email" label="Email" variant="outlined" class="mb-4" />
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="labInfo.description" label="Description" rows="3" variant="outlined"
                                class="mb-4" />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Certifications Management -->
            <v-card class="mb-6 w-100 full-width-card" elevation="2">
                <v-card-title class="bg-blue-lighten-5 section-heading">Certifications Management</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6" v-for="(cert, index) in certifications" :key="index">
                            <v-text-field v-model="certifications[index]" :label="`Certification ${index + 1}`"
                                variant="outlined" class="mb-2" />
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary" @click="addCertification">
                                <v-icon left>mdi-plus</v-icon>
                                Add Certification
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Tests Management -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-blue-lighten-5 section-heading">Tests Management</v-card-title>
                <v-card-text>
                    <!-- Add New Test Form -->
                    <v-card variant="outlined" class="mb-6 pa-4">
                        <h3 class="text-h6 mb-4">Add New Test</h3>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.name" label="Test Name" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.icon" label="Icon (emoji)" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.sampleType" label="Sample Type" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.reportTime" label="Report Time" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.originalPrice" label="Original Price (₹)"
                                    variant="outlined" type="number" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.discountedPrice" label="Discounted Price (₹)"
                                    variant="outlined" type="number" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newTest.category" label="Category" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-switch v-model="newTest.homeCollection" label="Home Collection" color="success" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-switch v-model="newTest.popular" label="Popular Test" color="success" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn color="primary" @click="addNewTest" :disabled="!isTestFormValid">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add Test
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-data-table :headers="testHeaders" :items="testsData" class="elevation-1">
                        <template v-slot:top>
                            <v-btn color="primary" @click="addTest" class="mb-4">
                                <v-icon left>mdi-plus</v-icon>
                                Add Test (Legacy)
                            </v-btn>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn color="error" size="small" @click="removeTest(item.index)">
                                Remove
                            </v-btn>
                        </template>
                        <template v-slot:item.homeCollection="{ item }">
                            <v-switch v-model="item.homeCollection" color="success" />
                        </template>
                        <template v-slot:item.popular="{ item }">
                            <v-switch v-model="item.popular" color="success" />
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

            <!-- Packages Management -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-blue-lighten-5 section-heading">Packages Management</v-card-title>
                <v-card-text>
                    <!-- Add New Package Form -->
                    <v-card variant="outlined" class="mb-6 pa-4">
                        <h3 class="text-h6 mb-4">Add New Package</h3>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPackage.name" label="Package Name" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPackage.testsCount" label="Number of Tests" variant="outlined"
                                    type="number" />
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="newPackage.tests" label="Tests (comma separated)" rows="2"
                                    variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPackage.recommendedFor" label="Recommended For"
                                    variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPackage.originalPrice" label="Original Price (₹)"
                                    variant="outlined" type="number" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPackage.discountedPrice" label="Discounted Price (₹)"
                                    variant="outlined" type="number" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPackage.reportTime" label="Report Time" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-switch v-model="newPackage.homeCollection" label="Home Collection" color="success" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-switch v-model="newPackage.popular" label="Popular Package" color="success" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn color="primary" @click="addNewPackage" :disabled="!isPackageFormValid">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add Package
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-row>
                        <v-col cols="12" md="6" v-for="(pkg, index) in packagesData" :key="index">
                            <v-card variant="outlined" class="pa-4">
                                <v-text-field v-model="pkg.name" label="Package Name" variant="outlined" class="mb-2" />
                                <v-text-field v-model.number="pkg.testsCount" label="Number of Tests" type="number"
                                    variant="outlined" class="mb-2" />
                                <v-textarea :value="Array.isArray(pkg.tests) ? pkg.tests.join(', ') : pkg.tests"
                                    label="Tests (comma separated)" rows="2" variant="outlined" class="mb-2"
                                    @input="updatePackageTests(index, $event.target.value)" />
                                <v-text-field v-model="pkg.recommendedFor" label="Recommended For" variant="outlined"
                                    class="mb-2" />
                                <v-text-field v-model.number="pkg.originalPrice" label="Original Price" type="number"
                                    variant="outlined" class="mb-2" />
                                <v-text-field v-model.number="pkg.discountedPrice" label="Discounted Price"
                                    type="number" variant="outlined" class="mb-2" />
                                <v-text-field v-model="pkg.reportTime" label="Report Time" variant="outlined"
                                    class="mb-2" />
                                <v-switch v-model="pkg.homeCollection" label="Home Collection Available" color="success"
                                    class="mb-2" />
                                <v-switch v-model="pkg.popular" label="Popular Package" color="success" class="mb-2" />
                                <v-btn color="error" size="small" @click="removePackage(index)">
                                    Remove
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary" @click="addPackage">
                                <v-icon left>mdi-plus</v-icon>
                                Add Package (Legacy)
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Reviews Management -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-blue-lighten-5 section-heading">Reviews Management</v-card-title>
                <v-card-text>
                    <!-- Add New Review Form -->
                    <v-card variant="outlined" class="mb-6 pa-4">
                        <h3 class="text-h6 mb-4">Add New Review</h3>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newReview.name" label="Customer Name" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newReview.test" label="Test/Package" variant="outlined" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-rating v-model="newReview.rating" label="Rating" class="mb-2" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newReview.date" label="Date" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="newReview.comment" label="Review Comment" rows="3"
                                    variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn color="primary" @click="addNewReview" :disabled="!isReviewFormValid">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add Review
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-row>
                        <v-col cols="12" md="6" v-for="(review, index) in reviewsData" :key="index">
                            <v-card variant="outlined" class="pa-4">
                                <v-text-field v-model="review.name" label="Customer Name" variant="outlined"
                                    class="mb-2" />
                                <v-text-field v-model="review.test" label="Test/Package" variant="outlined"
                                    class="mb-2" />
                                <v-rating v-model="review.rating" label="Rating" class="mb-2" />
                                <v-textarea v-model="review.comment" label="Comment" rows="3" variant="outlined"
                                    class="mb-2" />
                                <v-text-field v-model="review.date" label="Date" variant="outlined" class="mb-2" />
                                <v-btn color="error" size="small" @click="removeReview(index)">
                                    Remove
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary" @click="addReview">
                                <v-icon left>mdi-plus</v-icon>
                                Add Review (Legacy)
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- FAQs Management -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-blue-lighten-5 section-heading">FAQs Management</v-card-title>
                <v-card-text>
                    <!-- Add New FAQ Form -->
                    <v-card variant="outlined" class="mb-6 pa-4">
                        <h3 class="text-h6 mb-4">Add New FAQ</h3>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="newFAQ.question" label="Question" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="newFAQ.answer" label="Answer" rows="3" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn color="primary" @click="addNewFAQ" :disabled="!isFAQFormValid">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add FAQ
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-row>
                        <v-col cols="12" md="6" v-for="(faq, index) in faqData" :key="index">
                            <v-card variant="outlined" class="pa-4">
                                <v-text-field v-model="faq.question" label="Question" variant="outlined" class="mb-2" />
                                <v-textarea v-model="faq.answer" label="Answer" rows="3" variant="outlined"
                                    class="mb-2" />
                                <v-btn color="error" size="small" @click="removeFAQ(index)">
                                    Remove
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-btn color="primary" @click="addFAQ">
                                <v-icon left>mdi-plus</v-icon>
                                Add FAQ (Legacy)
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>

        <!-- Snackbar for notifications -->
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
            {{ snackbar.message }}
        </v-snackbar>

        <v-btn color="primary" type="submit" :loading="saving" size="large" class="submit-btn-bottom-right text-white">
            <v-icon left>mdi-content-save</v-icon>
            Submit
        </v-btn>

        <v-btn color="primary" @click="loadData" :loading="loading" class="mb-4">
            <v-icon left>mdi-refresh</v-icon>
            Reload
        </v-btn>
    </form>
</template>

<script>
import { useProfileStore } from "@/store/ProfileStore";

export default {
    name: 'HealthlabAdmin',
    data() {
        return {
            saving: false,
            loading: false,
            snackbar: {
                show: false,
                message: '',
                color: 'success'
            },
            labInfo: {
                name: 'HealthLab Diagnostics',
                location: 'Sector 15, Gurugram, Haryana',
                phone: '+91 98765 43210',
                email: 'info@healthlab.com',
                description: 'Advanced diagnostics with cutting-edge technology • Blood Tests • Imaging • At-home Sample Collection'
            },
            certifications: ['NABL Certified', 'ISO 15189', 'CAP Accredited', 'ICMR Approved'],
            testsData: [
                { id: 1, name: 'Complete Blood Count (CBC)', icon: '🧸', sampleType: 'Blood', reportTime: 'Same Day', originalPrice: 800, discountedPrice: 399, homeCollection: true, category: 'blood', popular: true },
                { id: 2, name: 'Liver Function Test (LFT)', icon: '🫀', sampleType: 'Blood', reportTime: '24 Hours', originalPrice: 1200, discountedPrice: 699, homeCollection: true, category: 'blood' },
                { id: 3, name: 'Thyroid Function Test (TSH, T3, T4)', icon: '🦋', sampleType: 'Blood', reportTime: 'Same Day', originalPrice: 1500, discountedPrice: 899, homeCollection: true, category: 'hormonal' }
            ],
            testHeaders: [
                { text: 'Name', value: 'name' },
                { text: 'Icon', value: 'icon' },
                { text: 'Sample Type', value: 'sampleType' },
                { text: 'Report Time', value: 'reportTime' },
                { text: 'Original Price', value: 'originalPrice' },
                { text: 'Discounted Price', value: 'discountedPrice' },
                { text: 'Home Collection', value: 'homeCollection' },
                { text: 'Category', value: 'category' },
                { text: 'Popular', value: 'popular' },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            packagesData: [
                { id: 1, name: 'Full Body Checkup Basic', testsCount: 58, tests: ['CBC', 'LFT', 'KFT', 'Lipid Profile', 'TSH', 'Blood Sugar', 'Urine R/M', 'ECG'], recommendedFor: 'Adults above 25', originalPrice: 4500, discountedPrice: 1999, reportTime: '24 Hours', homeCollection: true, popular: true },
                { id: 2, name: 'Diabetes Care Package', testsCount: 12, tests: ['HbA1c', 'Fasting Glucose', 'Post Meal Glucose', 'Insulin', 'Microalbumin', 'Creatinine'], recommendedFor: 'Diabetic Patients', originalPrice: 2800, discountedPrice: 1499, reportTime: 'Same Day', homeCollection: true },
                { id: 3, name: 'Heart Health Package', testsCount: 25, tests: ['Lipid Profile', 'CRP', 'Homocysteine', 'Troponin I', 'ECG', 'Echo', 'TMT'], recommendedFor: 'Adults above 40', originalPrice: 5500, discountedPrice: 2999, reportTime: '24 Hours', homeCollection: true }
            ],
            reviewsData: [
                { id: 1, name: 'Priya Sharma', test: 'Full Body Checkup', rating: 5, comment: 'Excellent service! Home collection was punctual and reports were delivered on time. Very professional staff.', date: '2 days ago' },
                { id: 2, name: 'Rajesh Kumar', test: 'Diabetes Package', rating: 5, comment: 'Great experience. The phlebotomist was skilled and the digital reports were very detailed. Highly recommended!', date: '1 week ago' },
                { id: 3, name: 'Anita Gupta', test: 'Thyroid Test', rating: 4, comment: 'Good service overall. Report came within the promised time. Will use again for future tests.', date: '2 weeks ago' }
            ],
            faqData: [
                { question: 'Can I reschedule my sample pickup?', answer: 'Yes, you can reschedule your sample pickup up to 2 hours before the scheduled time by calling our customer service or through WhatsApp.' },
                { question: 'When will I get my report?', answer: 'Report delivery times vary by test type. Most routine tests are delivered same day or within 24 hours. Specialized tests may take 24-48 hours. You\'ll receive reports via WhatsApp and email.' },
                { question: 'How do I pay for the tests?', answer: 'We accept multiple payment methods including cash on delivery, UPI, credit/debit cards, and online banking. Payment can be made during sample collection or online while booking.' },
                { question: 'Are reports shared via WhatsApp/email?', answer: 'Yes, we provide digital reports through both WhatsApp and email. You\'ll receive a secure link to download your reports. Physical copies are available on request.' }
            ],
            newTest: {
                name: '',
                icon: '',
                sampleType: '',
                reportTime: '',
                originalPrice: 0,
                discountedPrice: 0,
                category: '',
                homeCollection: false,
                popular: false
            },
            newPackage: {
                name: '',
                testsCount: 0,
                tests: [],
                recommendedFor: '',
                originalPrice: 0,
                discountedPrice: 0,
                reportTime: '',
                homeCollection: false,
                popular: false
            },
            newReview: {
                name: '',
                test: '',
                rating: 5,
                date: '',
                comment: ''
            },
            newFAQ: {
                question: '',
                answer: ''
            },
            message: '',
            messageType: 'success'
        }
    },
    computed: {
        isTestFormValid() {
            return this.newTest.name.trim() && this.newTest.discountedPrice > 0
        },
        isPackageFormValid() {
            return this.newPackage.name.trim() && this.newPackage.discountedPrice > 0
        },
        isReviewFormValid() {
            return this.newReview.name.trim() && this.newReview.comment.trim() && this.newReview.rating > 0
        },
        isFAQFormValid() {
            return this.newFAQ.question.trim() && this.newFAQ.answer.trim()
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                const response = await useProfileStore().getProfileData();
                console.log("response", response)

                // if (!response.ok) throw new Error('Failed to load data')
                const data = response?.healthServeProfileData?.healthServeProfile;

                if (data) {
                    if (data.labInfo) {
                        this.labInfo = { ...data.labInfo };
                    }
                    if (data.certifications) {
                        this.certifications = [...data.certifications];
                    }
                    if (data.tests) {
                        this.testsData = data.tests.map(t => ({ ...t }));
                    }
                    if (data.packages) {
                        this.packagesData = data.packages.map(pkg => ({
                            ...pkg,
                            tests: Array.isArray(pkg.tests)
                                ? pkg.tests
                                : typeof pkg.tests === 'string'
                                    ? pkg.tests.split(',').map(t => t.trim()).filter(Boolean)
                                    : []
                        }));
                    }
                    if (data.reviews) {
                        this.reviewsData = [...data.reviews];
                    }
                    if (data.faqs) {
                        this.faqData = [...data.faqs];
                    }
                }
            } catch (error) {
                console.error('Error loading data:', error)
                this.message = 'Error loading data: ' + error.message
                this.messageType = 'error'
            } finally {
                this.loading = false
            }
        },
        async saveData() {
            console.log('saveData called', {
                labInfo: this.labInfo,
                certifications: this.certifications,
                testsData: this.testsData,
                packagesData: this.packagesData,
                reviewsData: this.reviewsData,
                faqData: this.faqData
            });
            this.saving = true
            try {
                const data = {
                    labInfo: this.labInfo,
                    certifications: this.certifications,
                    tests: this.testsData,
                    packages: this.packagesData,
                    reviews: this.reviewsData,
                    faqs: this.faqData
                }
                const response = await useProfileStore().addProfileData(data);
                console.log("response", response)

                if (!response?.healthServeProfileData?.ok) {
                    // const err = await response.json()
                    this.message = 'Error saving data: ' + (response?.healthServeProfileData.error)
                    this.messageType = 'error'
                    this.saving = false
                    return
                }
                this.message = 'Data saved successfully!'
                this.messageType = 'success'
                await this.loadData() // Reload to confirm persistence
            } catch (error) {
                console.error('Error saving data:', error)
                this.message = 'Error saving data: ' + error.message
                this.messageType = 'error'
            } finally {
                this.saving = false
            }
        },
        testClick() {
            alert('Test button works!');
        },
        addTest() {
            const newId = Math.max(...this.testsData.map(t => t.id), 0) + 1
            this.testsData.push({
                id: newId,
                name: '',
                icon: '',
                sampleType: '',
                reportTime: '',
                originalPrice: 0,
                discountedPrice: 0,
                homeCollection: false,
                category: '',
                popular: false
            })
        },
        removeTest(index) {
            this.testsData.splice(index, 1)
            this.showSnackbar('Test removed successfully!', 'success')
        },
        addCertification() {
            this.certifications.push('')
        },
        addPackage() {
            const newId = Math.max(...this.packagesData.map(p => p.id), 0) + 1
            this.packagesData.push({
                id: newId,
                name: '',
                testsCount: 0,
                tests: [],
                recommendedFor: '',
                originalPrice: 0,
                discountedPrice: 0,
                reportTime: '',
                homeCollection: false,
                popular: false
            })
        },
        removePackage(index) {
            this.packagesData.splice(index, 1)
            this.showSnackbar('Package removed successfully!', 'success')
        },
        updatePackageTests(index, event) {
            this.packagesData[index].tests = event.split(',').map(t => t.trim()).filter(Boolean)
        },
        addReview() {
            const newId = Math.max(...this.reviewsData.map(r => r.id), 0) + 1
            this.reviewsData.push({
                id: newId,
                name: '',
                test: '',
                rating: 5,
                comment: '',
                date: ''
            })
        },
        removeReview(index) {
            this.reviewsData.splice(index, 1)
            this.showSnackbar('Review removed successfully!', 'success')
        },
        addFAQ() {
            this.faqData.push({ question: '', answer: '' })
        },
        removeFAQ(index) {
            this.faqData.splice(index, 1)
            this.showSnackbar('FAQ removed successfully!', 'success')
        },
        showSnackbar(message, color = 'success') {
            this.snackbar.message = message
            this.snackbar.color = color
            this.snackbar.show = true
        },
        async testAPI() {
            try {
                const response = await fetch('http://localhost:3000/api/healthlab')
                if (!response.ok) throw new Error('Test API request failed')
                const data = await response.json()
                this.showSnackbar(`API test successful! Received ${Object.keys(data).length} data fields`, 'success')
            } catch (error) {
                console.error('Error testing API:', error)
                this.showSnackbar('Error testing API: ' + error.message, 'error')
            }
        },
        async testConnectivity() {
            try {
                const response = await fetch('http://localhost:3000/api/healthlab')
                if (!response.ok) throw new Error('Test connectivity failed')
                this.showSnackbar('Connectivity test successful!', 'success')
            } catch (error) {
                console.error('Error testing connectivity:', error)
                this.showSnackbar('Error testing connectivity: ' + error.message, 'error')
            }
        },
        addNewTest() {
            const newId = Math.max(...this.testsData.map(t => t.id), 0) + 1
            this.testsData.push({
                id: newId,
                name: this.newTest.name,
                icon: this.newTest.icon,
                sampleType: this.newTest.sampleType,
                reportTime: this.newTest.reportTime,
                originalPrice: this.newTest.originalPrice,
                discountedPrice: this.newTest.discountedPrice,
                homeCollection: this.newTest.homeCollection,
                category: this.newTest.category,
                popular: this.newTest.popular
            })
            this.newTest = {
                name: '',
                icon: '',
                sampleType: '',
                reportTime: '',
                originalPrice: 0,
                discountedPrice: 0,
                category: '',
                homeCollection: false,
                popular: false
            }
            this.showSnackbar('Test added successfully!', 'success')
        },
        addNewPackage() {
            const newId = Math.max(...this.packagesData.map(p => p.id), 0) + 1
            this.packagesData.push({
                id: newId,
                name: this.newPackage.name,
                testsCount: this.newPackage.testsCount,
                tests: this.newPackage.tests,
                recommendedFor: this.newPackage.recommendedFor,
                originalPrice: this.newPackage.originalPrice,
                discountedPrice: this.newPackage.discountedPrice,
                reportTime: this.newPackage.reportTime,
                homeCollection: this.newPackage.homeCollection,
                popular: this.newPackage.popular
            })
            this.newPackage = {
                name: '',
                testsCount: 0,
                tests: [],
                recommendedFor: '',
                originalPrice: 0,
                discountedPrice: 0,
                reportTime: '',
                homeCollection: false,
                popular: false
            }
            this.showSnackbar('Package added successfully!', 'success')
        },
        addNewReview() {
            const newId = Math.max(...this.reviewsData.map(r => r.id), 0) + 1
            this.reviewsData.push({
                id: newId,
                name: this.newReview.name,
                test: this.newReview.test,
                rating: this.newReview.rating,
                date: this.newReview.date,
                comment: this.newReview.comment
            })
            this.newReview = {
                name: '',
                test: '',
                rating: 5,
                date: '',
                comment: ''
            }
            this.showSnackbar('Review added successfully!', 'success')
        },
        addNewFAQ() {
            const newId = Math.max(...this.faqData.map(f => f.id), 0) + 1
            this.faqData.push({
                id: newId,
                question: this.newFAQ.question,
                answer: this.newFAQ.answer
            })
            this.newFAQ = {
                question: '',
                answer: ''
            }
            this.showSnackbar('FAQ added successfully!', 'success')
        }
    }
}
</script>

<style scoped>
.full-screen-container {
    width: 100vw !important;
    min-height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
}

.full-width-card {
    width: 100vw !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
}

.submit-btn-bottom-right {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 1000;
    margin-bottom: 32px;
    margin-right: 32px;
}

.bg-blue-50,
.bg-green-50,
.bg-orange-50,
.bg-purple-50 {
    border-radius: 14px 14px 0 0 !important;
    padding: 18px 28px !important;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    box-shadow: none;
}

.v-card {
    border-radius: 16px !important;
    box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.07) !important;
    background: #f9fbfd !important;
}

.v-card-text {
    padding: 28px !important;
}

.v-text-field,
.v-textarea,
.v-select,
.v-switch {
    border-radius: 10px !important;
    font-size: 1.08rem !important;
    background: #fff !important;
    margin-bottom: 18px !important;
}

.v-label,
label {
    font-size: 1.08rem !important;
    color: #4a4a4a !important;
    font-weight: 500 !important;
    margin-bottom: 6px !important;
}

.v-btn {
    border-radius: 8px !important;
    font-size: 1.08rem !important;
    padding: 10px 22px !important;
    font-weight: 600 !important;
    letter-spacing: 0.2px;
}

.v-alert {
    border-radius: 10px !important;
    font-size: 1.05rem !important;
    margin-bottom: 18px !important;
}

.v-data-table {
    border-radius: 12px !important;
    background: #fff !important;
}

.v-expansion-panel {
    border-radius: 10px !important;
    margin-bottom: 10px !important;
}

.v-row {
    margin-bottom: 0 !important;
}

.v-col {
    margin-bottom: 0 !important;
}

.healthlab-admin {
    background: #f2f6fa;
    min-height: 100vh;
    padding: 32px 0;
}

h3.text-h6 {
    font-size: 1.18rem !important;
    font-weight: 600 !important;
    color: #1976d2 !important;
    margin-bottom: 18px !important;
}

h4 {
    font-size: 1.08rem !important;
    font-weight: 600 !important;
    color: #222 !important;
}

.text-grey {
    color: #888 !important;
}

.section-heading {
    border-radius: 14px 14px 0 0 !important;
    padding: 18px 28px !important;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    background-color: #e3f2fd !important;
    /* matches bg-blue-lighten-5 */
    color: #1976d2 !important;
}
</style>