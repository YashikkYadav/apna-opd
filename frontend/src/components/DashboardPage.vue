<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="dashboard-title">Dashboard</h1>
      </v-col>
    </v-row>

    <!-- KPI Cards -->
    <v-row>
      <v-col cols="4">
        <v-card class="kpi-card remove-lines">
          <div class="all-details">
            <h2 class="card-title">Patients today</h2>
            <div class="d-flex">
              <h1 class="dashboard-title">{{ patient24hoursSum }}</h1>
              <p class="tag">+49%</p>
            </div>
          </div>
          <div>
            <apexchart type="area" :options="patientTodayOptions" :series="patientTodaySeries"></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="kpi-card remove-lines">
          <div class="all-details">
            <h2 class="card-title">Patients This month</h2>
            <div class="d-flex">
              <h1 class="dashboard-title">{{ patientMonthSum }}</h1>
              <p class="tag">+42%</p>
            </div>
          </div>
          <div v-if="patientMonth.length > 0">
            <apexchart type="area" :options="patientThisMonthOptions" :series="patientThisMonthSeries"></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="kpi-card remove-lines">
          <div class="all-details">
            <h2 class="card-title">Invoices</h2>
            <div class="d-flex">
              <h1 class="dashboard-title">{{ invoice12MonthSum }}</h1>
              <p class="tag">+42%</p>
            </div>
          </div>
          <div>
            <apexchart type="area" :options="invoiceMonthOptions" :series="invoiceMonthSeries"></apexchart>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card class="kpi-card">
          <div class="all-details">
            <h2 class="card-title">Last month / This month</h2>
            <div class="last-this-month-container">
              <div class="last-this-month">
                <h1 class="dashboard-title">4500</h1>
                <p>Last month</p>
              </div>
              <div class="last-this-month">
                <h1 class="dashboard-title">5300</h1>
                <p>This month</p>
              </div>
            </div>
          </div>
          <div>
            <apexchart type="bar" :options="lastMonthThisMonthOptions" :series="lastMonthThisMonthSeries"></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="kpi-card">
          <div class="all-details">
            <h2 class="card-title">Payment amount</h2>
            <div class="d-flex">
              <h1 class="dashboard-title">₹{{ payment12MonthSum }}</h1>
              <p class="tag">+59%</p>
            </div>
          </div>
          <div>
            <apexchart type="area" :options="paymentAmountOptions" :series="paymentAmountSeries"></apexchart>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      patient24hours: [],
      patient24hoursSum: "",
      patientMonth: [],
      patientMonthSum: "",
      invoice12Month: [],
      invoice12MonthSum: "",
      payment12Month: [],
      payment12MonthSum: "",
      patientTodaySeries: [{
        name: 'patient',
        data: this.patient24hours

      }],
      patientTodayOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false // Hides zoom, pan, and other tools
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['#385D7E'],
          width: 3
        },
        colors: ['#385D7E'],
        xaxis: {
          type: 'datetime',
          "categories": [
          ],
          labels: {
            show: false // Hides the x-axis labels
          },
          axisBorder: {
            show: false // Hides the x-axis border
          },
          axisTicks: {
            show: false // Hides the ticks on the x-axis
          },
          tooltip: {
            enabled: false // Hides the y-axis tooltip
          }
        },
        yaxis: {
          labels: {
            show: false // Hides the x-axis labels
          },
          axisBorder: {
            show: false // Hides the x-axis border
          },
          axisTicks: {
            show: false // Hides the ticks on the x-axis
          },
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
      patientThisMonthSeries: [{
        name: 'patient',
        data: this.patientMonth
      }],
      patientThisMonthOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false // Hides zoom, pan, and other tools
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['#385D7E'],
          width: 3
        },
        colors: ['#385D7E'],
        xaxis: {
          type: 'datetime',
          "categories": [],
          labels: {
            show: false // Hides the x-axis labels
          },
          axisBorder: {
            show: false // Hides the x-axis border
          },
          axisTicks: {
            show: false // Hides the ticks on the x-axis
          },
          tooltip: {
            enabled: false // Hides the y-axis tooltip
          }
        },
        yaxis: {
          labels: {
            show: false // Hides the x-axis labels
          },
          axisBorder: {
            show: false // Hides the x-axis border
          },
          axisTicks: {
            show: false // Hides the ticks on the x-axis
          }
        },
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            return `${date.getDate()}/${date.getMonth() + 1}`; // Converts to "day/month" format
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      },
      invoiceMonthSeries: [{
        name: 'invoice',
        data: []
      }],
      invoiceMonthOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false // Hides zoom, pan, and other tools
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['#385D7E'],
          width: 3
        },
        colors: ['#385D7E'],
        xaxis: {
          type: 'datetime',
          "categories": [],
          labels: {
            show: false // Hides the x-axis labels
          },
          axisBorder: {
            show: false // Hides the x-axis border
          },
          axisTicks: {
            show: false // Hides the ticks on the x-axis
          },
          tooltip: {
            enabled: false // Hides the y-axis tooltip
          }
        },
        yaxis: {
          labels: {
            show: false // Hides the x-axis labels
          },
          axisBorder: {
            show: false // Hides the x-axis border
          },
          axisTicks: {
            show: false // Hides the ticks on the x-axis
          }
        },
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            return `${date.getDate()}/${date.getMonth() + 1}`; // Converts to "day/month" format
          }
        },
        tooltip: {
          x: {
            format: 'MM/yy'
          },
        },
      },
      lastMonthThisMonthSeries: [],
      lastMonthThisMonthOptions: {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false // Hides zoom, pan, and other tools
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            borderRadius: 5,
            borderRadiusApplication: 'end'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['transparent'],
          width: 2
        },
        colors: ['#9ca3af', '#385D7E'],
        xaxis: {
          "categories": ["Patients", "Invoices", "Priscriptions", "Appointments"],
        },
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            return `${date.getDate()}/${date.getMonth() + 1}`; // Converts to "day/month" format
          }
        },
        tooltip: {
          x: {
            format: 'MM/yy'
          },
        },
      },
      paymentAmountSeries: [{
        name: 'payment',
        data: []
      }],
      paymentAmountOptions: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false // Hides zoom, pan, and other tools
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['#385D7E'],
          width: 3
        },
        colors: ['#385D7E'],
        xaxis: {
          type: 'datetime',
          "categories": [],
          tooltip: {
            enabled: false // Hides the y-axis tooltip
          }
        },
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            return `${date.getDate()}/${date.getMonth() + 1}`; // Converts to "day/month" format
          }
        },
        tooltip: {
          x: {
            format: 'MM/yy'
          },
        },
      },
      patientsToday: 25,
      revenueToday: 1200,
      appointmentsToday: 8,
      upcomingAppointments: [
        { id: 1, patientName: "John Doe", time: "10:00 AM", type: "Consultation" },
        { id: 2, patientName: "Jane Smith", time: "11:30 AM", type: "Follow-Up" },
        { id: 3, patientName: "David Lee", time: "2:00 PM", type: "Surgery" },
      ],
    };
  },
  mounted() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.accessToken = localStorage.getItem('access_token');

    if (!this.doctorId || !this.accessToken) {
      this.$router.push('/login');
    }

    this.fetch24Hours();
    this.fetchMonth();
    this.fetch12MonthInvoice();
    this.fetch12MonthPayment();
    this.fetchComparisionData();
    this.patientThisMonthOptions.xaxis.categories = this.getLast30DaysDates();
    this.invoiceMonthOptions.xaxis.categories = this.getLast12Months();
    this.paymentAmountOptions.xaxis.categories = this.getLast12Months();
    // this.lastMonthThisMonthOptions.xaxis.categories = this.getLast6Months();
    this.patientTodayOptions.xaxis.categories = this.getLast24Hours();
  },
  methods: {
    fetch24Hours() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/report/patient/24hours`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.patient24hours = [...res.patients];
          const sum = res.patients.reduce((acc, val) => acc + val, 0);
          this.patient24hoursSum = sum;
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    fetchMonth() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/report/patient/30days`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.patientMonth = [...res.patients];
          const sum = res.patients.reduce((acc, val) => acc + val, 0);
          this.patientMonthSum = sum;
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    fetch12MonthInvoice() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/report/invoice/12months`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.invoice12Month = [...res.invoices];
          const sum = res.invoices.reduce((acc, val) => acc + val, 0);
          this.invoice12MonthSum = sum;
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    fetch12MonthPayment() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/report/payment/12months`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.payment12Month = [...res.payments];
          const sum = res.payments.reduce((acc, val) => acc + val, 0);
          this.payment12MonthSum = sum;
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    fetch12MonthPayment() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/report/payment/12months`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.payment12Month = [...res.payments];
          const sum = res.payments.reduce((acc, val) => acc + val, 0);
          this.payment12MonthSum = sum;
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    fetchComparisionData() {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/${this.doctorId}/report/comparison`, {
        method: "GET",
        headers: {
          Authorization: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.lastMonthThisMonthSeries = [
            {
              name: 'last month',
              data: Object.values(res.comparisonData).map(item => item.lastMonth)
            },
            {
              name: 'this month',
              data: Object.values(res.comparisonData).map(item => item.thisMonth)
            }
          ];
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
    },
    getLast30DaysDates() {
      const dates = [];
      const today = new Date();

      for (let i = 29; i >= 0; i--) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i); // Subtract days to get past dates
        dates.push(pastDate.toISOString().split("T")[0] + "T00:00:00.000Z"); // Format for chart
      }

      return dates;
    },
    getLast12Months() {
      const months = [];
      const today = new Date();

      for (let i = 11; i >= 0; i--) {
        const pastDate = new Date(today);
        pastDate.setMonth(today.getMonth() - i); // Move back by i months

        const year = pastDate.getFullYear();
        const month = String(pastDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format

        months.push(`${year}-${month}-01T00:00:00.000Z`); // Standard format
      }

      return months;
    },
    getLast6Months() {
      const months = [];
      const today = new Date();

      for (let i = 5; i >= 0; i--) {
        const pastDate = new Date(today);
        pastDate.setMonth(today.getMonth() - i); // Move back by i months

        const year = pastDate.getFullYear();
        const month = String(pastDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format

        months.push(`${year}-${month}-01T00:00:00.000Z`); // Standard format
      }

      return months;
    },
    getLast24Hours() {
      const hours = [];
      const today = new Date();

      for (let i = 23; i >= 0; i--) {
        const pastDate = new Date(today);
        pastDate.setHours(today.getHours() - i); // Subtract hours
        pastDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0

        hours.push(pastDate.toISOString()); // ISO format
      }

      return hours;
    }


  },
  watch: {
    patient24hours: {
      handler(newVal) {
        this.patientTodaySeries = [{ name: "patient", data: newVal }];
      },
      deep: true, // Ensures Vue detects nested changes
      immediate: true, // Runs on component load
    },
    patientMonth: {
      handler(newVal) {
        this.patientThisMonthSeries = [{ name: "patient", data: newVal }];
      },
      deep: true, // Ensures Vue detects nested changes
      immediate: true, // Runs on component load
    },
    invoice12Month: {
      handler(newVal) {
        this.invoiceMonthSeries = [{ name: "invoice", data: newVal }];
      },
      deep: true, // Ensures Vue detects nested changes
      immediate: true, // Runs on component load
    },
    payment12Month: {
      handler(newVal) {
        this.paymentAmountSeries = [{ name: "payment", data: newVal }];
      },
      deep: true, // Ensures Vue detects nested changes
      immediate: true, // Runs on component load
    },
  }
};
</script>

<style scoped>
/* Header Styling */
.dashboard-header {
  background: linear-gradient(90deg, #4caf50, #81c784);
  color: white;
  text-align: center;
  border-radius: 12px;
}

.dashboard-title {
  font-size: 30px;
  font-weight: bold;
  color: #1f2937;
  margin-right: 8px;
}

.last-this-month-container {
  display: flex;
  gap: 20px;
  ;
}

.last-this-month {
  display: flex;
  align-items: center;
}


.last-this-month p {
  font-size: 14px;
  color: #6b7280;
}

/* KPI Cards */
.kpi-card {
  border-radius: 12px;
  background-color: #ffffff;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.all-details {
  padding: 20px 20px 0 20px;
}

.card-title {
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 8px;
}

.kpi-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.kpi-value {
  font-size: 32px;
  font-weight: bold;
}

.kpi-label {
  font-size: 14px;
  color: #757575;
}

.tag {
  color: #239f52;
  font-size: 14px;
  border-radius: 50px;
  background-color: #3ec97233;
  padding: 0 10px;
  height: fit-content;
}

/* Graph Section */
.graph-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.graph-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.dummy-graph {
  height: 200px;
  background: #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  font-size: 16px;
}

/* Appointments Section */
.appointments-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.appointments-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
</style>
