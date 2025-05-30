<template>
  <v-container>
    <!-- Doctor Information Section -->
    <v-card class="doctor-info-card">
      <v-row>
        <v-col cols="12" md="2" class="text-center">
          <v-avatar size="80">
            <img src="https://via.placeholder.com/80" alt="Doctor Avatar" />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="doctor-name">Dr. Rahul Gupta</h3>
          <p>Neurologist • 15 years experience overall</p>
          <p><strong>Mansarovar, Jaipur</strong> • Neurology Clinic</p>
          <p><strong>₹600</strong> Consultation fee at clinic</p>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <p>Available Tomorrow</p>
          <v-btn class="ma-2" color="primary">Book Clinic Visit</v-btn>
          <v-btn class="ma-2" outlined color="purple">Book Video Consult</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Date Selector and Slots -->
    <v-card class="slot-booking-card mt-4">
      <v-row align="center">
        <v-col cols="2" class="text-center">
          <v-icon @click="previousDate">mdi-chevron-left</v-icon>
        </v-col>
        <v-col cols="8" class="text-center">
          <h4>{{ formattedSelectedDate }}</h4>
          <p>{{ availableSlots.length }} Slots Available</p>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-icon @click="nextDate">mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" class="mt-3">
        <v-btn
          v-for="slot in availableSlots"
          :key="slot.time"
          class="ma-2"
          outlined
          color="blue"
          @click="selectSlot(slot.time)"
        >
          {{ slot.time }}
        </v-btn>
      </v-row>
    </v-card>

    <!-- Selected Slot Confirmation -->
    <v-card v-if="selectedSlot" class="selected-slot-card mt-4">
      <v-card-title>Selected Slot</v-card-title>
      <v-card-text>
        You have selected <strong>{{ selectedSlot }}</strong> on
        <strong>{{ formattedSelectedDate }}</strong>.
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="confirmBooking">Confirm Booking</v-btn>
        <v-btn outlined color="red" @click="cancelBooking">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date(),
      slotsPerDay: 12,
      slotDuration: 20, // in minutes
      startTime: "16:00", // 4:00 PM
      selectedSlot: null,
    };
  },
  computed: {
    availableSlots() {
      const slots = [];
      const start = this.startTime.split(":");
      let currentHour = parseInt(start[0]);
      let currentMinute = parseInt(start[1]);

      for (let i = 0; i < this.slotsPerDay; i++) {
        const time = `${currentHour.toString().padStart(2, "0")}:${currentMinute
          .toString()
          .padStart(2, "0")}`;
        slots.push({ time });
        currentMinute += this.slotDuration;
        if (currentMinute >= 60) {
          currentMinute -= 60;
          currentHour++;
        }
      }

      return slots;
    },
    formattedSelectedDate() {
      return this.selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    previousDate() {
      this.selectedDate.setDate(this.selectedDate.getDate() - 1);
      this.selectedSlot = null;
    },
    nextDate() {
      this.selectedDate.setDate(this.selectedDate.getDate() + 1);
      this.selectedSlot = null;
    },
    selectSlot(time) {
      this.selectedSlot = time;
    },
    confirmBooking() {
      alert(
        `Your booking for ${this.selectedSlot} on ${this.formattedSelectedDate} is confirmed.`
      );
      this.selectedSlot = null;
    },
    cancelBooking() {
      this.selectedSlot = null;
    },
  },
};
</script>

<style scoped>
.doctor-info-card {
  padding: 16px;
  background-color: #f9f9f9;
}
.doctor-name {
  margin: 0;
}
.slot-booking-card {
  padding: 16px;
}
.selected-slot-card {
  padding: 16px;
  background-color: #e8f5e9;
}
</style>
