<template>
    <Button class="layout-config-button p-link" @click="onConfigSidebarToggle()" style="cursor: pointer">
        <i class="pi pi-cog"></i>
    </Button>
    <Sidebar v-model:visible="configSidebarVisible" position="right" class="w-full sm:w-18rem">
        <div class="px-2">
            <h5>Helper Functions</h5>
            <div class="flex w-full justify-content-between align-items-center mb-2">
                <Button type="button" severity="danger" class="inline-flex w-full text-center" @click="setDepthChart()">Set Depth Chart</Button>
            </div>
            <div class="flex w-full justify-content-between align-items-center mb-2">
                <Button type="button" severity="danger" class="w-full text-center" @click="clearDepthChart()">Clear Depth Chart</Button>
            </div>
            <div class="flex w-full justify-content-between align-items-center mb-2">
                <Button type="button" severity="danger" class="w-full items-center" @click="generateNewData()">Generate New Data</Button>
            </div>
            <hr />
        </div>
    </Sidebar>
</template>

<script>
import Sidebar from 'primevue/sidebar';
import { usePrimeVue } from 'primevue/config';
import { useLayout } from '@/layout/composables/layout';
import DatabaseController from "../controllers/DatabaseController";
import TeamController from "../controllers/TeamController";
import World from "../models/World";
import League from "../models/League";
import User from "../models/User";
import Team from "../models/Team";
import Player from "../models/Player";
import { DEPTH_CHART_POSITIONS } from '@/data/constants';

export default {
    data() {
        return {
            PrimeVue: usePrimeVue(),
            chart: 'offense',
            layoutConfig: null,
            layoutState: null,
            setScale: null,
            configSidebarVisible: false
        };
    },
    methods: {
        async setDepthChart() {
            let db = await this.databaseController.openExistingDatabase("Ted Jones");

            const seedData = [];

            for (const position of DEPTH_CHART_POSITIONS) {
                // Get players for the current position and sort them by 'overall' rating in descending order
                const players = this.user.team.players.filter(player => player.ratings.position === position);
                players.sort((a, b) => b.ratings.overall - a.ratings.overall);

                // Rank players and push them to seedData
                players.forEach((player, index) => {
                    seedData.push({
                        id: player.id,
                        team_id: 1,
                        player_id: player.pid,
                        position: player.ratings.position,
                        rank: index + 1  // Rank is index + 1 because index is 0-based
                    });
                });
            }

            db.depthChart.bulkPut(seedData).then(() => {
                console.log('Depth Chart seeded!');
            }).catch((err) => {
                console.error('Error seeding database: ', err);
            });
        },
        async clearDepthChart() {
            let db = await this.databaseController.openExistingDatabase("Ted Jones");
            db.depthChart.clear().then(() => {
                console.log('Depth Chart cleared!');
            }).catch((err) => {
                console.error('Error clearing database: ', err);
            });
        },
        onConfigSidebarToggle() {
            this.configSidebarVisible = !this.configSidebarVisible;
        },
        async generateNewData() {
            let db = await this.databaseController.openExistingDatabase("default");
            // db.teams.clear();
            // db.players.clear();
            await this.teamController.create();
        }
    },
    computed: {
        user: {
            get() {
                return User.query().with('team', (query) => {
                        query.with('players', (query) => {
                        query.with('ratings.overalls|potentials');
                    })
                }).first();
            },
            set(value) {
                this.$store.commit('updateUser', value)
            }
        },
        world: {
            get() {
                return World.query().with('leagues.teams.players.*').first()
            },
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
        }
    },
    mounted() {
        const layout = useLayout();
        this.layoutConfig = layout.layoutConfig;
        this.layoutState = layout.layoutState;
        this.setScale = layout.setScale;
        this.databaseController = DatabaseController.getInstance()
        this.teamController = TeamController.getInstance()
    },
}

</script>

<style scoped>
.p-button {
    display: inline-flex;
    flex-direction: column;
}
</style>
