<template>
    <v-container fluid>
        <v-row>
            <!-- Left Side: Calendar -->
            <v-col cols="8">
                <v-card elevation="3" class="pa-4">
                    <v-sheet class="d-flex" height="54" tile>
                        <v-select v-model="type" :items="types" class="ma-2" label="View Mode" variant="outlined" dense
                            hide-details></v-select>
                        <v-select v-model="weekday" :items="weekdays" class="ma-2" label="Weekdays" item-title="title"
                            item-value="value" variant="outlined" dense hide-details></v-select>
                    </v-sheet>
                    <v-sheet>
                        <v-calendar ref="calendar" v-model="value" :events="events" :view-mode="type"
                            :weekdays="weekday"></v-calendar>
                    </v-sheet>
                </v-card>
            </v-col>

            <!-- Right Side: Today's Schedule -->
            <v-col cols="4">
                <v-card elevation="3" class="pa-4">
                    <v-card-title class="text-h6 font-weight-bold">
                        Today's Schedule
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text>+ Add Appointment</v-btn>
                    </v-card-title>
                    <v-divider class="my-2"></v-divider>
                    <v-list>
                        <v-list-item v-for="(appointment, index) in appointments" :key="index" class="hoverable"
                            @click="viewDetails(appointment)">
                            <v-list-item-content>
                                <v-list-item-title class="font-weight-bold">
                                    {{ appointment.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle>{{ appointment.time }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-icon color="grey">mdi-chevron-right</v-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDate } from "vuetify";

export default {
    name: "Appointments",
    data: () => ({
        type: "week",
        types: ["month", "week", "day"], // View mode options for the calendar
        weekday: [0, 1, 2, 3, 4, 5, 6], // Default weekday setup
        weekdays: [
            { title: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
            { title: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
            { title: "Mon - Fri", value: [1, 2, 3, 4, 5] },
            { title: "Mon, Wed, Fri", value: [1, 3, 5] },
        ],
        value: [new Date()], // Current date focus
        events: [
            {
                title: "Yash Makwana",
                start: new Date("Mon Feb 17 2025 10:00:00 GMT+0530 (India Standard Time)"),
                end: new Date("Mon Feb 17 2025 12:00:00 GMT+0530 (India Standard Time)"),
                color: "blue",
                allDay: false,
            },
            {
                title: "Irfan",
                start: new Date("Mon Feb 16 2025 13:00:00 GMT+0530 (India Standard Time)"),
                end: new Date("Mon Feb 16 2025 18:00:00 GMT+0530 (India Standard Time)"),
                color: "blue",
                allDay: false,
            }
        ], // Placeholder for events on the calendar
        appointments: [
            { name: "Prakhar Verma", time: "10:00 AM", details: "Routine Checkup" },
            { name: "Richa Gupta", time: "1:00 PM", details: "Consultation" },
            { name: "Kunal Chopra", time: "11:00 AM", details: "Follow-Up" },
            { name: "Anmol Dixit", time: "2:00 PM", details: "Surgery Discussion" },
        ],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        titles: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted() {
        const adapter = useDate();
        // this.getEvents({
        //   start: adapter.startOfDay(adapter.startOfMonth(new Date())),
        //   end: adapter.endOfDay(adapter.endOfMonth(new Date())),
        // });
    },
    methods: {
        // Generate random events for the calendar
        getEvents({ start, end }) {
            const events = [];
            const min = start;
            const max = end;
            const days = (max.getTime() - min.getTime()) / 86400000;
            const eventCount = this.rnd(days, days + 20);

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0;
                const firstTimestamp = this.rnd(min.getTime(), max.getTime());
                const first = new Date(firstTimestamp - (firstTimestamp % 900000));
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
                const second = new Date(first.getTime() + secondTimestamp);

                events.push({
                    title: this.titles[this.rnd(0, this.titles.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    allDay: !allDay,
                });
            }

            this.events = events;
            console.log("sdasasdas", this.events, events)
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        },
        viewDetails(appointment) {
            alert('Appointment Details:\n${appointment.name} - ${appointment.details}');
        },
    },
};
</script>