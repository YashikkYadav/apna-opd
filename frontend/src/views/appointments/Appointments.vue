<template>
  <v-container fluid>
    <h1>Appointments</h1>
    <div class="flex flex-col gap-8 py-3 px-5">
      <div v-for="(index, appointment) in appointments" :key="index">
        {{ appointment }}
      </div>
    </div></v-container
  >
</template>

<script setup>
import { useProfileStore } from "@/store/ProfileStore";
import { useUiStore } from "@/store/UiStore";
import { onMounted, ref } from "vue";

const appointments = ref(null);

onMounted(() => {
  fetchAppointments();
});

const fetchAppointments = async () => {
  const doctorStore = useProfileStore();
  const appointmentsData = await doctorStore.getAppointments();
  if (appointmentsData.error) {
    const uiStore = useUiStore();
    uiStore.openNotificationMessage("Error fetching the appointments");
    return;
  }
  appointments.value = appointmentsData.appointments;
};
</script>
