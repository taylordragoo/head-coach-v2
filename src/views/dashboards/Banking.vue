<script setup>
import { onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();

const showMetricButton = (i) => {
    const button = document.querySelectorAll('.metric-button')[i];

    button.classList.remove('hidden');
    button.classList.add('fadeindown');
};

const hideMetricButton = (i) => {
    const button = document.querySelectorAll('.metric-button')[i];

    button.classList.add('hidden');
};
const menu = ref(null);

const toggle = (event) => {
    menu.value.toggle(event);
};

const metrics = ref([
    {
        title: 'Main Account',
        profit: '+8%',
        description: 'vs last week',
        image: 'banking-1',
    },
    {
        title: 'Investment Account',
        profit: '+8%',
        description: 'vs last week',
        image: 'banking-2',
    },
    {
        title: 'Expenses Account',
        profit: '+8%',
        description: 'vs last week',
        image: 'banking-3',
    },
]);
const transactions = ref([
    {
        title: 'Apple iCloud Subscription',
        date: '12 Aug, 19:18',
        badge: 'Entertainment',
        received: false,
        amount: '-$25.00',
        icon: 'pi pi-apple',
    },
    {
        title: 'Car Insurance',
        date: '11 Aug, 15:50',
        badge: 'Personal',
        received: false,
        amount: '-$350.00',
        icon: 'pi pi-car',
    },
    {
        title: 'Money Transfer',
        date: '11 Aug, 07:02',
        badge: 'Transfer',
        received: true,
        amount: '+$900.00',
        icon: 'pi pi-money-bill',
    },
    {
        title: 'Credit Card Payment',
        date: '9 Aug, 21:33',
        badge: 'Personal',
        received: false,
        amount: '-$3558.70',
        icon: 'pi pi-credit-card',
    },
    {
        title: 'Divident Payment',
        date: '8 Aug, 17:51',
        badge: 'Investment',
        received: true,
        amount: '+$105.90',
        icon: 'pi pi-microsoft',
    },
]);
const expenses = ref([
    {
        image: 'banking-4',
        title: 'Food',
        value: '79',
        amount: '$702.00',
        background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)',
    },
    {
        image: 'banking-5',
        title: 'Electronics',
        value: '62',
        amount: '$421.60',
        background: 'linear-gradient(-120deg, rgba(77, 182, 172, 1), rgba(77, 182, 172, 0.3) 70%)',
    },
    {
        image: 'banking-6',
        title: 'Utilities',
        value: '45',
        amount: '$388.51',
        background: 'linear-gradient(-120deg, rgba(250, 183, 16, 1), rgba(250, 183, 16, 0.3) 70%)',
    },
    {
        image: 'banking-7',
        title: 'Clothing',
        value: '41',
        amount: '$295.72',
        background: 'linear-gradient(-120deg, rgba(250, 183, 16, 1), rgba(250, 183, 16, 0.3) 70%)',
    },
    {
        image: 'banking-8',
        title: 'Travel',
        value: '35',
        amount: '$170.05',
        background: 'linear-gradient(-120deg, rgba(198, 55, 55, 1), rgba(198, 55, 55, 0.3) 70%)',
    },
    {
        image: 'banking-9',
        title: 'Subscriptions',
        value: '23',
        amount: '$96.80',
        background: 'linear-gradient(-120deg, rgba(198, 55, 55, 1), rgba(198, 55, 55, 0.3) 70%)',
    },
]);

const items = ref([
    {
        label: 'View Details',
    },
    {
        label: 'Print Receipt',
    },
    {
        label: 'Hide',
    },
]);

const barData = ref(null);
const barOptions = ref(null);

onMounted(() => {
    initChart();
});
watch(layoutConfig.colorScheme, () => {
    initChart();
});

const initChart = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    barData.value = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                barThickness: 12,
                borderRadius: 12,
                data: [65, 59, 80, 81, 56, 55, 40],
            },
            {
                label: 'Expenses',
                backgroundColor: '#FAB918',
                barThickness: 12,
                borderRadius: 12,
                data: [35, 19, 40, 61, 16, 55, 30],
            },
        ],
    };

    barOptions.value = {
        animation: {
            duration: 0,
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    font: {
                        weight: 700,
                    },
                    padding: 28,
                },
                position: 'top',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500,
                    },
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
            },
            y: {
                // ticks: {
                //     callback(value: number) {
                //         return '$' + value + 'k';
                //     },
                //     color: textColorSecondary,
                // },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                },
            },
        },
    };
};
</script>
<template>
    <div class="layout-dashboard">
        <div class="grid">
            <div class="col-12 flex align-items-center justify-content-between flex-wrap gap-5">
                <div class="mx-auto sm:mx-0">
                    <span class="block text-xl font-semibold mb-2">Total Balance</span>
                    <div class="flex align-items-center">
                        <span class="font-semibold text-2xl">$57,401<span class="text-color-secondary text-base">.26</span></span>
                        <span class="text-green-700 border-round font-semibold ml-4 p-2 white-space-nowrap" :style="{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }">+$401 Today</span>
                    </div>
                </div>
                <div class="mx-auto sm:mx-0">
                    <Button type="button" class="p-button-rounded p-button-outlined p-button-secondary mr-1 sm:mr-3" icon="pi pi-calendar" />
                    <Button type="button" class="p-button-rounded p-button-secondary" icon="pi pi-plus" label="Add Quick Action" iconPos="right" />
                </div>
            </div>
            <div class="col-12 md:col-4" v-for="(metric, index) in metrics" :key="metric.title">
                <div class="card flex w-full relative h-14rem overflow-hidden" @mouseenter="showMetricButton(index)" @mouseleave="hideMetricButton(index)">
                    <div class="flex w-full justify-content-between p-1">
                        <div>
                            <span class="block white-space-nowrap font-semibold">{{ metric.title }}</span>
                            <span class="block font-semibold text-xl mt-2 white-space-nowrap">$12,345<span class="text-color-secondary text-sm">.67</span></span>
                        </div>
                        <div class="text-right">
                            <span class="block white-space-nowrap">{{ metric.profit }} <i class="pi pi-arrow-up text-green-500"></i></span>
                            <span class="block text-color-secondary mt-2 white-space-nowrap">vs last week</span>
                        </div>
                    </div>
                    <img :src="'/demo/images/dashboard/' + metric.image + '.svg'" class="absolute w-full bottom-0 left-0" />
                    <Button type="button" label="View Detail" icon="pi pi-eye " class="metric-button p-button-rounded p-button-secondary hidden font-semibold absolute p-ripple" :style="{ borderRadius: '50px', left: '36%', bottom: '10%' }"> </Button>
                </div>
            </div>
            <div class="h-full col-12 xl:col-8">
                <div class="card">
                    <div class="flex flex-column md:flex-row md:justify-content-between align-items-center mb-2">
                        <h4 class="white-space-nowrap">Recent Transactions</h4>
                        <Button type="button" class="p-button-text">See All Transactions</Button>
                    </div>
                    <DataTable :value="transactions" :rows="5" responsiveLayout="scroll">
                        <Column field="icon">
                            <template #body="slotProps">
                                <span class="white-space-nowrap flex w-3rem h-3rem align-items-center justify-content-center border-round-xl" :style="{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }">
                                    <i class="text-2xl text-color" :class="slotProps.data.icon"></i>
                                </span>
                            </template>
                        </Column>
                        <Column field="title">
                            <template #body="slotProps">
                                <span class="white-space-nowrap block font-semibold">{{ slotProps.data.title }}</span>
                                <span class="block text-color-secondary font-sm font-bold">{{ slotProps.data.date }}</span>
                            </template>
                        </Column>
                        <Column field="badge">
                            <template #body="slotProps">
                                <span class="white-space-nowrap p-2 surface-ground font-semibold">{{ slotProps.data.badge }}</span>
                            </template>
                        </Column>
                        <Column field="amount">
                            <template #body="slotProps">
                                <span class="transaction-amount" :class="{ 'text-green-700': transactions.received }">
                                    {{ slotProps.data.amount }}
                                </span>
                            </template>
                        </Column>
                        <Column style="text-align: center">
                            <template #body>
                                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-secondary" @click="toggle"></Button>
                                <Menu ref="menu" :popup="true" :model="items"></Menu>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <div class="h-full col-12 xl:col-4">
                <div class="card h-full">
                    <h4 class="white-space-nowrap mb-2">Expenses</h4>
                    <div v-for="expense in expenses" :key="expense.title" class="flex gap-3 w-full mt-4 align-items-center">
                        <img :src="`/demo/images/dashboard/${expense.image}.svg`" :alt="expense.title" class="w-3rem h-3rem" />
                        <div class="w-full">
                            <div class="flex flex-wrap w-full justify-content-between align-items-center">
                                <span class="font-semibold">{{ expense.title }}</span>
                                <div class="flex">
                                    <span class="font-semibold text-color-secondary pr-2 border-right-2 surface-border text-sm">{{ expense.value }}%</span>
                                    <span class="font-semibold ml-2 text-sm">{{ expense.amount }}</span>
                                </div>
                            </div>
                            <div class="border-round w-full overflow-hidden mt-2" style="height: 7px; background-color: var(--surface-border)">
                                <div class="border-left-round h-full" :style="{ background: expense.background, width: expense.value + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 xl:col-6">
                <div class="card h-full">
                    <div class="flex align-items-center">
                        <h4 class="white-space-nowrap mr-3 mb-0">Cards</h4>
                        <span class="w-2rem h-2rem flex justify-content-center align-items-center border-circle text-green-700 font-semibold" :style="{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }">2</span>
                    </div>

                    <div class="grid flex-column sm:flex-row grid-nogutter border-round-xl mt-4">
                        <div class="col-12 sm:col-6 p-4 border-round-top-xl sm:border-noround-right sm:border-round-left-xl justify-content-between" :style="{ backgroundColor: 'rgba(77, 182, 172, 0.1)' }">
                            <span class="block text-xl font-semibold">Total Credit</span>
                            <span class="block text-3xl font-semibold mt-3">$12,345<span class="text-xl font-semibold" :style="{ color: 'rgba(77, 182, 172, 0.7)' }">.67</span></span>
                        </div>
                        <div class="col-12 sm:col-6 p-4 border-round-bottom-xl sm:border-noround-left sm:border-round-right-xl flex align-items-center justify-content-center sm:justify-content-end" :style="{ backgroundColor: '#4DB6AC' }">
                            <Button
                                class="p-button p-button-rounded p-button-text p-button-success surface-section font-semibold"
                                :style="{ color: '#4DB6AC' }"
                                label="View Details"
                                icon="pi pi-eye font-semibold"
                                iconPos="right"
                                type="button"
                                pRipple
                            ></Button>
                        </div>
                    </div>

                    <div class="grid grid-nogutter flex-column md:flex-row mt-4 gap-4">
                        <div class="col">
                            <div class="card flex flex-column justify-content-between h-17rem bg-no-repeat bg-cover border-round-2xl shadow-none relative p-4 overflow-hidden" style="background-image: url('/demo/images/dashboard/card-1.svg')">
                                <div class="flex w-full align-items-center">
                                    <img src="/demo/images/dashboard/mastercard.svg" alt="mastercard" class="w-4rem mr-2" />
                                    <span class="text-2xl font-semibold white-space-nowrap">Personal Card</span>
                                    <img src="/demo/images/dashboard/chip.svg" alt="mastercard" class="w-3rem ml-auto" />
                                </div>
                                <div class="flex justify-content-between">
                                    <span class="font-semibold white-space-nowrap">1234 1234 1234 1234</span><span class="font-semibold"><span class="font-normal">Exp </span>12/23</span>
                                </div>
                                <div class="flex justify-content-between align-items-center mb-6">
                                    <span class="font-semibold">Limit</span>
                                    <div>
                                        <span class="font-bold px-2 border-right-2" style="color: #4db6ac; border-color: #4db6ac">100%</span>
                                        <span class="font-bold ml-2"> $300.00 / $123.00</span>
                                    </div>
                                </div>
                                <span class="h-3rem w-8 absolute bottom-0 left-0" style="border-bottom-left-radius: 1rem; background-color: rgba(77, 182, 172, 1)"></span>
                                <span class="h-3rem w-4 absolute bottom-0 right-0" style="border-bottom-right-radius: 1rem; background-color: rgba(77, 182, 172, 0.3)"></span>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card flex flex-column justify-content-between h-17rem bg-no-repeat bg-cover border-round-2xl shadow-none relative p-4 overflow-hidden" style="background-image: url('/demo/images/dashboard/card-2.svg')">
                                <div class="flex w-full align-items-center">
                                    <img src="/demo/images/dashboard/mastercard.svg" alt="mastercard" class="w-4rem mr-2" />
                                    <span class="text-2xl font-semibold white-space-nowrap">Business Card</span>
                                    <img src="/demo/images/dashboard/chip.svg" alt="mastercard" class="w-3rem ml-auto" />
                                </div>

                                <div class="flex justify-content-between">
                                    <span class="font-semibold white-space-nowrap">1234 1234 1234 1234</span><span class="font-semibold"><span class="font-normal">Exp </span>12/23</span>
                                </div>
                                <div class="flex justify-content-between align-items-center mb-6">
                                    <span class="font-semibold">Limit</span>
                                    <div>
                                        <span class="font-bold px-2 border-right-2" style="color: #4db6ac; border-color: #4db6ac">100%</span>
                                        <span class="font-bold ml-2"> $300.00 / $123.00</span>
                                    </div>
                                </div>
                                <span class="h-3rem w-4 absolute bottom-0 left-0" style="border-bottom-left-radius: 1rem; background-color: #fab710"></span>
                                <span class="h-3rem w-8 absolute bottom-0 right-0" style="border-bottom-right-radius: 1rem; background-color: rgba(250, 183, 16, 0.3)"></span>
                            </div>
                        </div>
                    </div>

                    <a role="button" v-ripple class="w-full border-1 border-dashed surface-border h-4rem border-round-xl mt-4 flex justify-content-center align-items-center cursor-pointer select-none">
                        <i class="pi pi-plus-circle text-xl mr-2 text-color-secondary"></i>
                        <span class="text-xl text-color-secondary">Add New Card</span>
                    </a>
                </div>
            </div>
            <div class="col-12 xl:col-6">
                <div class="card">
                    <h4>Savings</h4>
                    <Chart type="bar" :data="barData" :options="barOptions" style="height: 470px"></Chart>
                </div>
            </div>
        </div>
    </div>
</template>
