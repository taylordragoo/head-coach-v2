<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';

const { layoutState } = useLayout();

const selectedAmount = ref(null);

const amount = [
    { label: '*****24', value: { id: 1, name: '*****24', code: 'A1' } },
    { label: '*****75', value: { id: 2, name: '*****75', code: 'A2' } },
];
</script>
<template>
    <Sidebar v-model:visible="layoutState.rightMenuVisible.value" position="right" class="w-full sm:w-18rem">
        <div class="px-2">
            <h5>Activity</h5>
            <div class="widget-timeline mb-5">
                <div class="pt-0 pr-3 pb-3 pl-3 border-left-1 surface-border relative ml-2">
                    <span class="absolute left-0 top-0 bg-blue-500 text-white border-circle w-2rem h-2rem inline-flex align-items-center justify-content-center" style="transform: translateX(-50%)">
                        <i class="pi pi-dollar"></i>
                    </span>
                    <div class="font-semibold mb-2 ml-2">New Sale</div>
                    <div class="text-sm p-text-secondary ml-2">Richard Jones has purchased a blue t-shirt for<strong>$79</strong>.</div>
                </div>
                <div class="pt-0 pr-3 pb-3 pl-3 border-left-1 surface-border relative ml-2">
                    <span class="absolute left-0 top-0 bg-indigo-500 text-white border-circle w-2rem h-2rem inline-flex align-items-center justify-content-center" style="transform: translateX(-50%)">
                        <i class="timeline-icon pi pi-download"></i>
                    </span>
                    <div class="font-semibold mb-2 ml-2">Withdrawal Initiated</div>
                    <div class="text-sm p-text-secondary ml-2">Your request for withdrawal of <strong>$2500</strong> has been initiated.</div>
                </div>
                <div class="pt-0 pr-3 pb-3 pl-3 border-left-1 surface-border relative ml-2">
                    <span class="absolute left-0 top-0 bg-purple-500 text-white border-circle w-2rem h-2rem inline-flex align-items-center justify-content-center" style="transform: translateX(-50%)">
                        <i class="timeline-icon pi pi-question"></i>
                    </span>
                    <div class="font-semibold mb-2 ml-2">Question Received</div>
                    <div class="text-sm p-text-secondary ml-2">Jane Davis has posted a <strong>new question</strong> about your product.</div>
                </div>
                <div class="pt-0 pr-3 pb-3 pl-3 border-left-1 surface-border relative ml-2">
                    <span class="absolute left-0 top-0 bg-green-500 text-white border-circle w-2rem h-2rem inline-flex align-items-center justify-content-center" style="transform: translateX(-50%)">
                        <i class="timeline-icon pi pi-comment"></i>
                    </span>
                    <div class="font-semibold mb-2 ml-2">Comment Received</div>
                    <div class="text-sm p-text-secondary ml-">
                        Claire Smith has upvoted your store along with a
                        <strong>comment</strong>.
                    </div>
                </div>
            </div>

            <hr />

            <h5>Quick Withdraw</h5>

            <div class="p-fluid">
                <div>
                    <InputText type="text" placeholder="Amount" class="mb-3" />
                </div>
                <div>
                    <Dropdown :options="amount" optionLabel="label" v-model="selectedAmount" placeholder="*****24" class="mb-3"></Dropdown>
                </div>
                <div>
                    <Button v-ripple label="Confirm" icon="pi pi-check"></Button>
                </div>
            </div>

            <hr />

            <h5>Shipment Tracking</h5>
            <p>Track your ongoing shipments to customers.</p>
            <img class="logo-image" src="/layout/images/sidebar-right/staticmap.png" alt="diamond-vue" style="width: 100%" />
        </div>
    </Sidebar>
</template>
