<template>
    <v-dialog v-model="isModalOpen" max-width="500px">
        <v-card class="popup-card">
            <v-card-title class="popup-title">{{ titleData }}</v-card-title>
            <v-card-text class="popup-detail">
                {{ descriptionData }}
            </v-card-text>
            <v-card-actions class="popup-action">
                <v-btn class="saaro-btn" text @click="$emit('close-dialog')">Cancel</v-btn>
                <v-btn class="saaro-btn" text @click="$emit('actions')">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "CommonModel",
    props: {
        commonModel: Boolean,
        title: String,
        description: String,
    },
    computed: {
        isModalOpen() {
            return this.commonModel;
        },
        titleData() {
            return this.title
        },
        descriptionData() {
            return this.description
        }
    },
};
</script>