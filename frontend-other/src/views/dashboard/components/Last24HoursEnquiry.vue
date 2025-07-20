<template>
  <v-card class="kpi-card remove-lines">
    <div class="all-details">
      <h2 class="card-title">Enquires Today</h2>
      <div class="d-flex">
        <h1 class="dashboard-title">{{ patientMonthSum }}</h1>
        <p class="tag">+42%</p>
      </div>
    </div>
    <div v-if="patientMonth.length > 0">
      <apexchart
        type="area"
        :options="patientThisMonthOptions"
        :series="patientThisMonthSeries"
      ></apexchart>
    </div>
  </v-card>
</template>

<script>
import {
  checkAuth,
  getLast30DaysDates,
  getLast24Hours,
} from "@/lib/utils/utils";
import { useDashboardStore } from "@/store/DashboardStore";

export default {
  name: "Last30DaysPatient",
  data() {
    return {
      patientMonth: [0],
      patientMonthSum: "",
      patientThisMonthSeries: [
        {
          name: "patient",
          data: this.patientMonth,
        },
      ],
      patientThisMonthOptions: {
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
        labels: {
          formatter: function (value) {
            return new Date(value).toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
            });
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
      this.fetchMonth();
      this.patientThisMonthOptions.xaxis.categories = getLast24Hours();
    }
  },
  methods: {
    async fetchMonth() {
      const res = await useDashboardStore().getLast24HoursEnquiryApiCall();
      if (res) {
        this.patientMonth = [...res.enquiry];
        const sum = res.enquiry?.reduce((acc, val) => acc + val, 0);
        this.patientMonthSum = sum;
      }
    },
  },
  watch: {
    patientMonth: {
      handler(newVal) {
        this.patientThisMonthSeries = [{ name: "patient", data: newVal }];
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>