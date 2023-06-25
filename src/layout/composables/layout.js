import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: true,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'dark',
    theme: 'blue',
    scale: 14,
    menuTheme: 'darkgray',
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    rightMenuVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    searchBarActive: false,
    sidebarActive: false,
    anchored: false,
    activeMenuItem: null,
    overlaySubmenuActive: false,
});

export function useLayout() {
    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutState.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };
    const showRightMenu = () => {
        layoutState.rightMenuVisible = !layoutState.rightMenuVisible;
    };
    const onConfigSidebarToggle = () => {
        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
    };
    const toggleSearchBar = () => {
        layoutState.searchBarActive = !layoutState.searchBarActive;
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.overlaySubmenuActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    const isDesktop = computed(() => window.innerWidth > 991);

    const isSlim = computed(() => layoutConfig.menuMode === 'slim');
    const isHorizontal = computed(() => layoutConfig.menuMode === 'horizontal');
    const isOverlay = computed(() => layoutConfig.menuMode === 'overlay');
    const isCompact = computed(() => layoutConfig.menuMode === 'compact');
    const isStatic = computed(() => layoutConfig.menuMode === 'static');
    const isReveal = computed(() => layoutConfig.menuMode === 'reveal');
    const isDrawer = computed(() => layoutConfig.menuMode === 'drawer');

    return {
        layoutConfig: toRefs(layoutConfig),
        layoutState: toRefs(layoutState),
        setScale,
        onMenuToggle,
        isSidebarActive,
        showRightMenu,
        onConfigSidebarToggle,
        toggleSearchBar,
        isDarkTheme,
        setActiveMenuItem,
        isSlim,
        isHorizontal,
        isCompact,
        isOverlay,
        isStatic,
        isReveal,
        isDrawer,
        isDesktop,
    };
}
