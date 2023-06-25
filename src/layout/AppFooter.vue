<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();
const logo = computed(() => {
    return layoutConfig.colorScheme === 'dark' ? 'white' : 'dark';
});
</script>

<template>
    <div class="layout-footer">
        <div class="footer-logo-container">
            <img :src="'/layout/images/logo-' + logo + '.svg'" alt="diamond-layout" />
            <span class="footer-app-name">DIAMOND</span>
        </div>
        <span class="footer-copyright">&#169; Your Organization - 2022</span>
    </div>
</template>
