<template>
    <v-card class="kpi-card">
        <div class="all-details">
            <h2 class="card-title">Payment amount</h2>
            <div class="d-flex">
                <h1 class="dashboard-title">₹{{ payment12MonthSum }}</h1>
                <!-- <p class="tag">+59%</p> -->
            </div>
        </div>
        <div>
            <apexchart type="area" :options="paymentAmountOptions" :series="paymentAmountSeries"></apexchart>
        </div>
    </v-card>
</template>

<script>
import { checkAuth, getLast12Months } from '@/lib/utils/utils';
import { useDashboardStore } from '@/store/DashboardStore';

export default {
    name: "Last30DaysPayment",
    data() {
        return {
            payment12Month: [],
            payment12MonthSum: "",
            paymentAmountSeries: [{
                name: 'payment',
                data: []
            }],
            paymentAmountOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false
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
                        enabled: false
                    }
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
            this.fetch12MonthPayment();
            this.paymentAmountOptions.xaxis.categories = getLast12Months();
        }
    },
    methods: {
        async fetch12MonthPayment() {
            const res = await useDashboardStore().getLast30DaysPaymentApiCall()

            if (res) {
                this.payment12Month = [...res?.payments];
                const sum = res.payments.reduce((acc, val) => acc + val, 0);
                this.payment12MonthSum = sum;
            }
        },
    },
    watch: {
        payment12Month: {
            handler(newVal) {
                this.paymentAmountSeries = [{ name: "payment", data: newVal }];
            },
            deep: true,
            immediate: true,
        },
    }
};
</script>