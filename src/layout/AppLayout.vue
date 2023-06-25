<script setup>
import { computed, watch, ref, onBeforeUnmount } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppConfig from './AppConfig.vue';
import AppRightMenu from './AppRightMenu.vue';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppSearch from './AppSearch.vue';
import AppFooter from './AppFooter.vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);
const topbarRef = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const containerClass = computed(() => {
    const menuThemeClass = layoutConfig.colorScheme.value === 'light' ? `layout-sidebar-${layoutConfig.menuTheme.value}` : '';

    return [
        menuThemeClass,
        {
            'layout-overlay': layoutConfig.menuMode.value === 'overlay',
            'layout-static': layoutConfig.menuMode.value === 'static',
            'layout-slim': layoutConfig.menuMode.value === 'slim',
            'layout-horizontal': layoutConfig.menuMode.value === 'horizontal',
            'layout-compact': layoutConfig.menuMode.value === 'compact',
            'layout-reveal': layoutConfig.menuMode.value === 'reveal',
            'layout-drawer': layoutConfig.menuMode.value === 'drawer',
            'layout-sidebar-dim': layoutConfig.colorScheme.value === 'dim',
            'layout-sidebar-dark': layoutConfig.colorScheme.value === 'dark',
            'layout-overlay-active': layoutState.overlayMenuActive.value || layoutState.staticMenuMobileActive.value,
            'layout-mobile-active': layoutState.staticMenuMobileActive.value,
            'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
            'p-ripple-disabled': !layoutConfig.ripple.value,
            'p-input-filled': layoutConfig.inputStyle.value === 'filled',
            'layout-sidebar-active': layoutState.sidebarActive.value,
            'layout-sidebar-anchored': layoutState.anchored.value,
        },
    ];
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.overlaySubmenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarRef.value) return;

    const sidebarEl = topbarRef?.value.$el.querySelector('.layout-sidebar');
    const topbarEl = topbarRef?.value.$el.querySelector('.topbar-left > a');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <div class="layout-content-wrapper">
            <div class="layout-topbar-menu-section">
                <AppTopbar ref="topbarRef"></AppTopbar>
            </div>

            <div class="layout-content">
<!--                <AppBreadcrumb />-->

                <router-view />
            </div>
            <AppFooter />
        </div>
<!--        <AppConfig></AppConfig>-->
        <AppSearch />
<!--        <AppRightMenu></AppRightMenu>-->
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss"></style>
