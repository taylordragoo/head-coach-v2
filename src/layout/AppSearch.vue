<script setup>
import { useLayout } from '@/layout/composables/layout';

const { layoutState } = useLayout();
</script>
<template>
    <Dialog
        v-model:visible="layoutState.searchBarActive.value"
        :style="{ width: '50vw' }"
        :breakpoints="{ '992px': '75vw', '576px': '90vw' }"
        :closeOnEscape="true"
        :closable="false"
        :dismissableMask="true"
        :draggable="false"
        :modal="true"
        @onShow="focusOnInput()"
        :pt="{
            header: { class: 'hidden' },
            content: { class: 'p-0 border-round-sm' },
        }"
    >
        <div class="search-container">
            <i class="pi pi-search"></i>
            <InputText type="text" class="p-inputtext search-input" placeholder="Search" @keydown="onInputKeydown($event)" />
        </div>
    </Dialog>
</template>
