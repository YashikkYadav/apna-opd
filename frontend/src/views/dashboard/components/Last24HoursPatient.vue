<template>
  <v-card class="kpi-card remove-lines">
    <div class="all-details">
      <h2 class="card-title">Patients today</h2>
      <div class="d-flex">
        <h1 class="dashboard-title">{{ patient24hoursSum }}</h1>
        <p class="tag">+49%</p>
      </div>
    </div>
    <div>
      <apexchart
        type="area"
        :options="patientTodayOptions"
        :series="patientTodaySeries"
      ></apexchart>
    </div>
  </v-card>
</template>

<script>
import { checkAuth, getLast24Hours } from "@/lib/utils/utils";
import { useDashboardStore } from "@/store/DashboardStore";

export default {
  name: "Last24HoursPatient",
  data() {
    return {
      patient24hours: [],
      patient24hoursSum: "",
      patientTodaySeries: [
        {
          name: "patient",
          data: this.patient24hours,
        },
      ],
      patientTodayOptions: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["#385D7E"],
          width: 3,
        },
        colors: ["#385D7E"],
        xaxis: {
          type: "datetime",
          categories: [],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        tooltip: {
          x: {
            formatter: function (val) {
              return new Date(val).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              });
            },
          },
        },
      },
    };
  },
  mounted() {
    const auth = checkAuth(this.$router);
    if (auth) {
      this.fetch24Hours();
      this.patientTodayOptions.xaxis.categories = getLast24Hours();
    }
  },
  methods: {
    async fetch24Hours() {
      const res = await useDashboardStore().getLast24HoursPatientApiCall();

      if (res) {
        this.patient24hours = res.patients;
        const sum = res?.patients?.reduce((acc, val) => acc + val, 0);
        this.patient24hoursSum = sum;
        this.patientTodaySeries = res.patients;
      }
    },
  },
  watch: {
    patient24hours: {
      handler(newVal) {
        this.patientTodaySeries = [{ name: "patient", data: newVal }];
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
