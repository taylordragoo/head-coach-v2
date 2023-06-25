<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const confirmed = ref(false);

const value = ref(null);

const navigateToDashboard = () => {
    router.push({ name: 'e-commerce' });
};
</script>
<template>
    <div class="flex h-screen">
        <div class="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
            <img :src="'/layout/images/logo-dark.svg'" class="h-4rem mt-4" alt="diamond-layout" />

            <div class="flex flex-column align-items-center gap-4">
                <div class="mb-3">
                    <h2>Register</h2>
                    <p>Let's get started</p>
                </div>
                <div class="flex flex-column gap-4">
                    <span class="p-input-icon-left w-full">
                        <i class="pi pi-user"></i>
                        <InputText id="username" type="text" class="w-full md:w-25rem" placeholder="Username" />
                    </span>
                    <span class="p-input-icon-left w-full">
                        <i class="pi pi-envelope"></i>
                        <InputText id="email" type="text" class="w-full md:w-25rem" placeholder="Email" />
                    </span>
                    <span class="p-input-icon-left w-full">
                        <i class="pi pi-lock z-2"></i>
                        <Password id="password" v-model="value" placeholder="Password" class="w-full" :inputStyle="{ paddingLeft: '2.0rem' }" inputClass="w-full md:w-25rem" toggleMask showIcon="pi pi-eye" />
                    </span>
                    <div class="flex flex-wrap">
                        <Checkbox name="checkbox" v-model="confirmed" class="mr-2" binary></Checkbox>
                        <label htmlFor="checkbox" class="text-color font-semibold mr-2"> I have read the </label>
                        <a class="text-color-secondary font-semibold cursor-pointer hover:text-primary cursor-pointer">Terms and Conditions</a>
                    </div>
                    <Button label="SIGN UP" class="w-full mb-4" @click="navigateToDashboard"></Button>
                    <span class="font-semibold text-color-secondary">Already have an account? <a class="font-semibold cursor-pointer primary-color">Login</a></span>
                </div>
            </div>

            <p class="text-color-secondary font-semibold">A problem? <a href="#" class="primary-color" @click="navigateToDashboard">Click here</a> and let us help you.</p>
        </div>
        <div class="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat" :style="{ backgroundImage: `url('/demo/images/auth/bg-login.jpg')` }">
            <div class="mt-auto mb-auto">
                <span class="block text-white text-7xl font-semibold">Create a<br />Diamond<br />Account</span>
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
