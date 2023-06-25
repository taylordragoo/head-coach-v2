<script setup>
import { ref } from 'vue';

const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh',
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
    },
    {
        separator: true,
    },
    {
        label: 'Home',
        icon: 'pi pi-home',
    },
]);

const loading = ref([false, false, false]);

const load = (index) => {
    loading.value[index] = true;
    setTimeout(() => (loading.value[index] = false), 1000);
};
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-6">
            <div class="card">
                <h5>Default</h5>
                <div class="flex flex-wrap gap-2">
                    <Button label="Submit"></Button>
                    <Button label="Disabled" :disabled="true"></Button>
                    <Button label="Link" class="p-button-link" />
                </div>
            </div>

            <div class="card">
                <h5>Severities</h5>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" />
                    <Button label="Secondary" class="p-button-secondary" />
                    <Button label="Success" class="p-button-success" />
                    <Button label="Info" class="p-button-info" />
                    <Button label="Warning" class="p-button-warning" />
                    <Button label="Danger" class="p-button-danger" />
                </div>
            </div>

            <div class="card">
                <h5>Text</h5>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" class="p-button-text" />
                    <Button label="Secondary" class="p-button-secondary p-button-text" />
                    <Button label="Success" class="p-button-success p-button-text" />
                    <Button label="Info" class="p-button-info p-button-text" />
                    <Button label="Warning" class="p-button-warning p-button-text" />
                    <Button label="Help" class="p-button-help p-button-text" />
                    <Button label="Danger" class="p-button-danger p-button-text" />
                    <Button label="Plain" class="p-button-plain p-button-text" />
                </div>
            </div>

            <div class="card">
                <h5>Outlined</h5>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" class="p-button-outlined" />
                    <Button label="Secondary" class="p-button-outlined p-button-secondary" />
                    <Button label="Success" class="p-button-outlined p-button-success" />
                    <Button label="Info" class="p-button-outlined p-button-info" />
                    <Button label="Warning" class="p-button-outlined p-button-warning" />
                    <Button label="Help" class="p-button-outlined p-button-help" />
                    <Button label="Danger" class="p-button-outlined p-button-danger" />
                </div>
            </div>

            <div class="card">
                <h5>Button Set</h5>
                <span class="p-buttonset">
                    <Button label="Save" icon="pi pi-check" />
                    <Button label="Delete" icon="pi pi-trash" />
                </span>
            </div>

            <div class="card">
                <h5>SplitButton</h5>
                <div class="flex flex-wrap gap-2">
                    <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-secondary"></SplitButton>
                    <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-success"></SplitButton>
                    <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-info"></SplitButton>
                    <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-warning"></SplitButton>
                    <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-danger"></SplitButton>
                </div>
            </div>

            <div class="card">
                <h5>Templating</h5>
                <div class="flex flex-wrap gap-2">
                    <Button type="button">
                        <img alt="logo" src="/demo/images/logo/primevue-white.svg" style="width: 1.5rem" />
                    </Button>
                    <Button type="button" class="p-button-outlined p-button-success">
                        <img alt="logo" src="/demo/images/logo/primevue.svg" style="width: 1.5rem" />
                        <span class="ml-2 text-bold">PrimeVue</span>
                    </Button>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6">
            <div class="card">
                <h5>Icons</h5>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-star-fill"></Button>
                    <Button label="Submit" icon="pi pi-bookmark"></Button>
                    <Button label="Submit" icon="pi pi-bookmark" iconPos="right"></Button>
                </div>
            </div>

            <div class="card">
                <h5>Raised</h5>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" class="p-button-raised" />
                    <Button label="Secondary" class="p-button-raised p-button-secondary" />
                    <Button label="Success" class="p-button-raised p-button-success" />
                    <Button label="Info" class="p-button-raised p-button-info" />
                    <Button label="Warning" class="p-button-raised p-button-warning" />
                    <Button label="Help" class="p-button-raised p-button-help" />
                    <Button label="Danger" class="p-button-raised p-button-danger" />
                </div>
            </div>

            <div class="card">
                <h5>Rounded</h5>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" class="p-button-rounded" />
                    <Button label="Secondary" class="p-button-rounded p-button-secondary" />
                    <Button label="Success" class="p-button-rounded p-button-success" />
                    <Button label="Info" class="p-button-rounded p-button-info" />
                    <Button label="Warning" class="p-button-rounded p-button-warning" />
                    <Button label="Help" class="p-button-rounded p-button-help" />
                    <Button label="Danger" class="p-button-rounded p-button-danger" />
                </div>
            </div>

            <div class="card">
                <h5>Rounded Icons</h5>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-check" class="p-button-rounded" />
                    <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary" />
                    <Button icon="pi pi-search" class="p-button-rounded p-button-success" />
                    <Button icon="pi pi-user" class="p-button-rounded p-button-info" />
                    <Button icon="pi pi-bell" class="p-button-rounded p-button-warning" />
                    <Button icon="pi pi-heart" class="p-button-rounded p-button-help" />
                    <Button icon="pi pi-times" class="p-button-rounded p-button-danger" />
                </div>
            </div>

            <div class="card">
                <h5>Rounded Text</h5>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-check" class="p-button-rounded p-button-text mr-2 mb-2" />
                    <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text" />
                    <Button icon="pi pi-search" class="p-button-rounded p-button-success p-button-text" />
                    <Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-text" />
                    <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
                    <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
                    <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
                    <Button icon="pi pi-filter" class="p-button-rounded p-button-plain p-button-text" />
                </div>
            </div>

            <div class="card">
                <h5>Rounded Outlined</h5>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-check" class="p-button-rounded p-button-outlined" />
                    <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-outlined" />
                    <Button icon="pi pi-search" class="p-button-rounded p-button-success p-button-outlined" />
                    <Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-outlined" />
                    <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-outlined" />
                    <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-outlined" />
                    <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined" />
                </div>
            </div>

            <div class="card">
                <h5>Loading</h5>
                <div class="flex flex-wrap gap-2">
                    <Button type="button" label="Search" icon="pi pi-search" :loading="loading[0]" @click="load(0)" />
                    <Button type="button" label="Search" icon="pi pi-search" iconPos="right" :loading="loading[1]" @click="load(1)" />
                    <Button type="button" icon="pi pi-search" :loading="loading[2]" @click="load(2)" />
                    <Button type="button" label="Search" :loading="loading[3]" @click="load(3)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .p-button {
        margin-bottom: 0.5rem;

        &:not(.p-button-icon-only) {
            display: flex;
            width: 100%;
        }
    }

    .p-buttonset {
        .p-button {
            margin-bottom: 0;
        }
    }
}
</style>
