<template>
    <div class="grid">
        <div class="col-12 md:col-7 xl:col-12">

            <CustomTabView class="justify-content-between">

                <CustomTabPanel v-for="(pos, i) in DEPTH_CHART_POSITIONS" :key="i" :header="pos" contentClass="w-full">
                    <div v-show="pos === 'All'" class="surface-ground px-0 py-5">
                        <div class="grid grid-nogutter gap-6 justify-content-center">
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">LT</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">LG</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">C</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">RG</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">RT</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">TE</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-nogutter gap-6 justify-content-center">
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">QB</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">RB</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">FB</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">WR</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <!-- <div class="col-12 md:col-6 lg:col-2">
                                <div class="surface-card shadow-2 p-3 border-round-xl">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-900 text-xl font-medium mt-2">TE</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                            <i class="pi pi-unlock text-500 text-xl"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div class="flex flex-row justify-content-between">
                                            <div class="text-900 font-medium text-lg">F. LastName</div>
                                            <div class="text-900 font-medium text-lg">72</div>
                                        </div>
                                        <span class="text-500">Energy:</span><span class="text-green-500 font-medium"> 24%</span>
                                    </div>
                                    <hr />
                                </div>
                            </div> -->
                        </div>
                    </div>
                </CustomTabPanel>

            </CustomTabView>

        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { FileService } from '@/service/FileService';
import { useStore } from 'vuex';
import { useLayout } from '@/layout/composables/layout';
import CustomTabView from '@/components/CustomTabView.vue';
import CustomTabPanel from '@/components/CustomTabPanel.vue';
import World from "../../models/World";
import League from "../../models/League";
import User from "../../models/User";
import Team from "../../models/Team";
import Player from "../../models/Player";
import { DEPTH_CHART_POSITIONS, POSITIONS, OFF_POSITIONS, DEF_POSITIONS } from '@/data/constants';

export default {
    components: {},
    data() {
        return {
            POSITIONS,
            OFF_POSITIONS,
            DEF_POSITIONS,
            DEPTH_CHART_POSITIONS,
            selectedTeam: 0,
            filtered_positions: [],
            documentStyle: getComputedStyle(document.documentElement),
            textColor: '#212121',
            chartOptions: {
                animation: {
                    duration: 0,
                },
                responsive: true,
                maintainAspectRatio: false,
                cutout: '90%',
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057',
                        },
                    },
                },
            }
        };
    },
    methods: {
        togglePosition(pos) {
            const index = this.filtered_positions.indexOf(pos);
            if (index > -1) {
                this.filtered_positions.splice(index, 1);
            } else {
                this.filtered_positions.push(pos);
            }
        },
        getPositionCount(pos) {
            if (this.user) {
                return this.user.team?.players.filter(player => player.ratings.position === pos).length;
            }
            return 0;
        },
        isPositionSelected(pos) {
            return this.filtered_positions.includes(pos);
        },
    },
    computed: {
        user: {
            /* By default get() is used */
            get() {
                return User.query().with('team.players.*').first()
            },
            /* We add a setter */
            set(value) {
                this.$store.commit('updateUser', value)
            }
        },
        world: {
            /* By default get() is used */
            get() {
            return World.query().first()
            },
            /* We add a setter */
            set(value) {
            this.$store.commit('updateWorld', value)
            }
        },
        teams: {
            /* By default get() is used */
            get() {
                return Team.query().with('players.*').orderBy('name').all()
            },
            /* We add a setter */
            set(value) {
                this.$store.commit('updateTeams', value)
            }
        },
        players: {
            /* By default get() is used */
            get() {
                return Player.query().with('team').all();
            },
            /* We add a setter */
            set(value) {
                this.$store.commit('updatePlayers', value)
            }
        },
        filteredPlayers() {
            if (this.user.team) {
                if (this.filtered_positions.length === 0) {
                    return this.user.team.players;
                } else {
                    return this.user.team.players.filter(player =>
                        this.filtered_positions.includes(player.ratings.position)
                    );
                }
            }
            return [];
        },
    }
}

</script>

<style scoped lang="scss">
::v-deep(#files-fileupload) {
    .p-fileupload-buttonbar {
        display: none;
    }

    .p-fileupload-content {
        border: none;
    }
}

.remove-file-wrapper:hover {
    .remove-button {
        display: flex !important;
    }
}
.upload-button-hidden {
    &.p-fileupload {
        padding: 0;

        .p-fileupload-buttonbar {
            display: none;
        }

        .p-fileupload-content {
            border: 0 none;
        }

        .p-progressbar {
            display: none;
        }
    }
}

.selected-position {
    background-color: var(--surface-100);
}
</style>
