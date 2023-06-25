<script setup>
import AppConfig from '@/layout/AppConfig.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToDashboard = () => {
    router.push({ name: 'e-commerce' });
};
</script>
<template>
    <div class="flex h-screen">
        <div class="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
            <img src="/layout/images/logo-dark.svg" class="h-4rem mt-4" alt="diamond-layout" />

            <div class="flex flex-column align-items-center gap-4">
                <div class="mb-3">
                    <h2>Screen Locked</h2>
                    <p>Please enter your password</p>
                </div>

                <span class="p-input-icon-left w-full md:w-25rem">
                    <span class="p-input-icon-left w-full md:w-25rem">
                        <i class="pi pi-lock"></i>
                        <InputText id="password" type="password" class="w-full" placeholder="Password" />
                    </span>
                </span>
                <Button type="button" icon="pi pi-lock-open" label="UNLOCK" class="w-full md:w-25rem" @click="navigateToDashboard"></Button>
            </div>

            <p class="text-color-secondary font-semibold">A problem? <a href="#" class="primary-color" @click="navigateToDashboard">Click here</a> and let us help you.</p>
        </div>
        <div class="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat" style="background-image: url('/demo/images/auth/bg-login.jpg')">
            <div class="mt-auto mb-auto">
                <span class="block text-white text-7xl font-semibold"
                    >Enter your<br />Password for<br />
                    Access</span
                >
                <span class="block text-white text-3xl mt-4"
                    >Lorem ipsum dolor sit amet, consectetur<br />
                    adipiscing elit. Donec posuere velit nec enim<br />
                    sodales, nec placerat erat tincidunt.
                </span>
            </div>
        </div>
    </div>

    <AppConfig simple></AppConfig>
</template>
