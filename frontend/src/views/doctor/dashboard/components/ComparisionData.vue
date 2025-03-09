<template>
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
</template>

<script>
import { checkAuth } from '@/lib/utils/utils';
import { useDashboardStore } from '@/store/DashboardStore';

export default {
    name: "ComparisionData",
    data() {
        return {
            patientMonth: [],
            patientMonthSum: "",
            lastMonthThisMonthSeries: [],
            lastMonthThisMonthOptions: {
                chart: {
                    height: 350,
                    type: 'bar',
                    toolbar: {
                        show: false
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
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                    }
                },
                tooltip: {
                    x: {
                        format: 'MM/yyyy'
                    },
                },
            },
        };
    },
    mounted() {
        const auth = checkAuth(this.$router);
        if (auth) {
            this.fetchComparisionData();
        }
    },
    methods: {
        async fetchComparisionData() {
            const res = await useDashboardStore().getComparisionDataApiCall()

            if (res) {
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
            }
        },
    },
};
</script>