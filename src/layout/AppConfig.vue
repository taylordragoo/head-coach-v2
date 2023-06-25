<script setup>
import Sidebar from 'primevue/sidebar';
import { usePrimeVue } from 'primevue/config';

import { ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const PrimeVue = usePrimeVue();
const { setScale, layoutConfig, layoutState, onConfigSidebarToggle } = useLayout();

const componentThemes = ref([
    { name: 'blue', color: '#2196F3' },
    { name: 'green', color: '#4CAF50' },
    { name: 'lightgreen', color: '#8BC34A' },
    { name: 'purple', color: '#9C27B0' },
    { name: 'deeppurple', color: '#673AB7' },
    { name: 'indigo', color: '#3F51B5' },
    { name: 'orange', color: '#FF9800' },
    { name: 'cyan', color: '#00BCD4' },
    { name: 'pink', color: '#E91E63' },
    { name: 'teal', color: '#009688' },
]);
const menuThemes = ref([
    { name: 'white', color: '#ffffff', logoColor: 'dark', componentTheme: null },
    { name: 'darkgray', color: '#343a40', logoColor: 'white', componentTheme: null },
    { name: 'blue', color: '#2196F3', logoColor: 'white', componentTheme: 'blue' },
    { name: 'bluegray', color: '#455a64', logoColor: 'white', componentTheme: 'lightgreen' },
    { name: 'brown', color: '#5d4037', logoColor: 'white', componentTheme: 'cyan' },
    { name: 'cyan', color: '#00BCD4', logoColor: 'white', componentTheme: 'cyan' },
    { name: 'green', color: '#4CAF50', logoColor: 'white', componentTheme: 'green' },
    { name: 'indigo', color: '#3F51B5', logoColor: 'white', componentTheme: 'indigo' },
    { name: 'deeppurple', color: '#673AB7', logoColor: 'white', componentTheme: 'deeppurple' },
    { name: 'orange', color: '#FF9800', logoColor: 'dark', componentTheme: 'orange' },
    { name: 'pink', color: '#E91E63', logoColor: 'white', componentTheme: 'pink' },
    { name: 'purple', color: '#9C27B0', logoColor: 'white', componentTheme: 'purple' },
    { name: 'teal', color: '#009688', logoColor: 'white', componentTheme: 'teal' },
]);

defineProps({
    simple: {
        type: Boolean,
        default: false,
    },
});
const scales = ref([12, 13, 14, 15, 16]);

watch(layoutConfig.menuMode, (newVal) => {
    if (newVal === 'static') {
        layoutState.staticMenuDesktopInactive.value = false;
    }
});

const colorScheme = ref(layoutConfig.colorScheme.value);

const changeColorScheme = (colorScheme) => {
    const themeLink = document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const currentColorScheme = 'theme-' + layoutConfig.colorScheme.value.toString();
    const newColorScheme = 'theme-' + colorScheme;
    const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);

    replaceLink(themeLink, newHref, () => {
        layoutConfig.colorScheme.value = colorScheme;
    });
};

const changeTheme = (theme) => {
    const themeLink = document.getElementById('theme-link');
    const themeHref = themeLink.getAttribute('href');
    const newHref = themeHref.replace(layoutConfig.theme.value, theme);

    replaceLink(themeLink, newHref, () => {
        layoutConfig.theme.value = theme;
    });
};
const changeMenuTheme = (theme) => {
    layoutConfig.menuTheme.value = theme;
};

const replaceLink = (linkElement, href, onComplete) => {
    if (!linkElement || !href) {
        return;
    }

    const id = linkElement.getAttribute('id');
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();

        const element = document.getElementById(id);
        element && element.remove();

        cloneLinkElement.setAttribute('id', id);
        onComplete && onComplete();
    });
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};

const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};

const onChangeRipple = () => {
    PrimeVue.config.ripple = !PrimeVue.config.ripple;
};

const changeInputStyle = (styleClass) => {
    PrimeVue.config.inputStyle = styleClass;
};
</script>

<template>
    <Button class="layout-config-button p-link" @click="onConfigSidebarToggle()" style="cursor: pointer">
        <i class="pi pi-cog"></i>
    </Button>
    <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="w-full sm:w-18rem">
        <div class="px-2">
            <h5>Color Scheme</h5>
            <div class="flex">
                <div class="field-radiobutton flex-auto">
                    <RadioButton name="colorScheme" value="light" v-model="colorScheme" id="theme3" @change="changeColorScheme('light')"></RadioButton>
                    <label for="theme3">Light</label>
                </div>
                <div class="field-radiobutton flex-auto">
                    <RadioButton name="colorScheme" value="dim" v-model="colorScheme" id="theme2" @change="changeColorScheme('dim')"></RadioButton>
                    <label for="theme2">Dim</label>
                </div>
                <div class="field-radiobutton flex-auto">
                    <RadioButton name="colorScheme" value="dark" v-model="colorScheme" id="theme1" @change="changeColorScheme('dark')"></RadioButton>
                    <label for="theme1">Dark</label>
                </div>
            </div>
            <hr />

            <template v-if="!simple">
                <h5>Menu Type</h5>
                <div class="flex flex-wrap row-gap-3">
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="static" v-model="layoutConfig.menuMode.value" inputId="mode1"></RadioButton>
                        <label for="mode1">Static</label>
                    </div>

                    <div class="flex align-items-center gap-2 w-6 pl-2">
                        <RadioButton name="menuMode" value="overlay" v-model="layoutConfig.menuMode.value" inputId="mode2"></RadioButton>
                        <label for="mode2">Overlay</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="slim" v-model="layoutConfig.menuMode.value" inputId="mode3"></RadioButton>
                        <label for="mode3">Slim</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6 pl-2">
                        <RadioButton name="menuMode" value="compact" v-model="layoutConfig.menuMode.value" inputId="mode4"></RadioButton>
                        <label for="mode4">Compact</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="horizontal" v-model="layoutConfig.menuMode.value" inputId="mode5"></RadioButton>
                        <label for="mode5">Horizontal</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6 pl-2">
                        <RadioButton name="menuMode" value="reveal" v-model="layoutConfig.menuMode.value" inputId="mode6"></RadioButton>
                        <label for="mode6">Reveal</label>
                    </div>
                    <div class="flex align-items-center gap-2 w-6">
                        <RadioButton name="menuMode" value="drawer" v-model="layoutConfig.menuMode.value" inputId="mode7"></RadioButton>
                        <label for="mode7">Drawer</label>
                    </div>
                </div>
            </template>
            <hr />
            <template v-if="!simple">
                <h5>Menu Theme</h5>
                <div class="flex flex-wrap gap-3" v-if="colorScheme === 'light'">
                    <div v-for="theme in menuThemes" :key="theme.name">
                        <a
                            style="cursor: pointer"
                            @click="changeMenuTheme(theme.name, theme.logoColor, theme.componentTheme)"
                            :title="theme.name"
                            :style="{ 'background-color': theme.color }"
                            class="w-2rem h-2rem cursor-pointer hover:shadow-4 border-round transition-duration-150 flex align-items-center justify-content-center"
                        >
                            <i v-if="theme.name === layoutConfig.menuTheme.value" class="pi pi-check text-white"></i>
                        </a>
                    </div>
                </div>
                <div v-if="colorScheme !== 'light'">
                    <p>Menu themes are only available in light mode and static, slim, overlay menu modes by design as large surfaces can emit too much brightness in dark mode.</p>
                </div>
            </template>
            <hr />

            <h5>Component Themes</h5>
            <div class="flex flex-wrap gap-3">
                <div v-for="(theme, i) in componentThemes" :key="i">
                    <a
                        :autoFocus="layoutConfig.theme === theme.name"
                        @click="() => changeTheme(theme.name)"
                        :style="{ 'background-color': theme.color }"
                        class="w-2rem h-2rem cursor-pointer hover:shadow-4 border-round transition-duration-150 flex align-items-center justify-content-center"
                    >
                        <i v-if="theme.name === layoutConfig.theme.value" class="pi pi-check text-white"></i>
                    </a>
                </div>
            </div>
            <hr />

            <h5>Scale</h5>
            <div class="flex align-items-center">
                <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
                <div class="flex gap-3 align-items-center">
                    <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
                </div>
                <Button icon="pi pi-plus" type="button" pButton @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
            </div>
            <hr />

            <template v-if="!simple">
                <h5>Input Style</h5>
                <div class="flex">
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value="outlined" v-model="layoutConfig.inputStyle.value" inputId="outlined_input" @change="changeInputStyle('outlined')"></RadioButton>
                        <label for="outlined_input">Outlined</label>
                    </div>
                    <div class="field-radiobutton flex-1">
                        <RadioButton name="inputStyle" value="filled" v-model="layoutConfig.inputStyle.value" @change="changeInputStyle('filled')" inputId="filled_input"></RadioButton>
                        <label for="filled_input">Filled</label>
                    </div>
                </div>
                <hr />

                <h5>Ripple Effect</h5>
                <InputSwitch v-model="layoutConfig.ripple.value" @change="onChangeRipple"></InputSwitch>
            </template>
        </div>
    </Sidebar>
</template>
