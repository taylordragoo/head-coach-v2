<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);

const navigateToDashboard = () => {
    router.push({ name: 'e-commerce' });
};

const focus = (event) => {
    const regexNum = /^\d+$/;
    const isValid = regexNum.test(event.key);
    const nextElementInputRef = event.currentTarget.nextElementSibling.children[0];

    isValid && nextElementInputRef.focus();
};
</script>
<template>
    <div class="flex h-screen">
        <div class="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
            <img src="/layout/images/logo-dark.svg" class="h-4rem mt-4" alt="diamond-layout" />

            <div class="flex flex-column w-full align-items-center gap-4">
                <div class="mb-3">
                    <h2>Verification</h2>
                    <p>We have sent code to you email:</p>
                    <div class="flex align-items-center w-full justify-content-center">
                        <i class="pi pi-envelope text-600 mr-2"></i>
                        <span class="text-900 font-bold">dm**@gmail.com</span>
                    </div>
                </div>
                <div class="flex flex-column">
                    <div class="flex justify-content-between w-full align-items-center mb-4 gap-3">
                        <InputNumber inputId="val1" v-model="value1" inputClass="w-3rem text-center" :max="9" @keyup="focus($event)"></InputNumber>
                        <InputNumber inputId="val2" v-model="value2" inputClass="w-3rem text-center" :max="9" @keyup="focus($event)"></InputNumber>
                        <InputNumber inputId="val3" v-model="value3" inputClass="w-3rem text-center" :max="9" @keyup="focus($event)"></InputNumber>
                        <InputNumber inputId="val4" v-model="value4" inputClass="w-3rem text-center" :max="9"></InputNumber>
                    </div>
                    <div class="flex flex-wrap gap-2 justify-content-between">
                        <Button label="Cancel" class="flex-auto p-button-outlined" @click="navigateToDashboard"></Button>
                        <Button label="Verify" class="flex-auto" @click="navigateToDashboard"></Button>
                    </div>
                </div>
            </div>

            <p class="text-color-secondary font-semibold">A problem? <a href="#" class="primary-color" @click="navigateToDashboard">Click here</a> and let us help you.</p>
        </div>
        <div class="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat" style="background-image: url('/demo/images/auth/bg-login.jpg')">
            <div class="mt-auto mb-auto">
                <span class="block text-white text-7xl font-semibold">Verify your<br />Diamond<br />Account</span>
                <span class="block text-white text-3xl mt-4"
                    >Lorem ipsum dolor sit amet, consectetur<br />
                    adipiscing elit. Donec posuere velit nec enim<br />
                    sodales, nec placerat erat tincidunt.
                </span>
            </div>
        </div>
    </div>

    <AppConfig minimal></AppConfig>
</template>
