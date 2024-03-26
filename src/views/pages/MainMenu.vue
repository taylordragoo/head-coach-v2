<template>
    <div class="flex h-screen">
        <div class="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
            <img :src="'/layout/images/logo-dark.svg'" class="h-4rem mt-4" alt="diamond-layout" />
            <div class="flex flex-column align-items-center gap-4">
                <div class="row"></div>
                <div class="col-sm-12">
                    <div v-if='this.databases.length > 0' class='row'>
                        <Button type="button" @click='openContinue' label="Continue" style="width:20rem" class="mb-2" />
                    </div>
                    <div v-else></div>
                    <div class='row'>
                        <Button type="button" @click="openNew" label="New" style="width:20rem" class="mb-2"/>
                    </div>
                    <div class='row'>
                        <Button type="button" label="Editor" style="width:20rem" class="mb-2"/>
                    </div>
                    <div class='row'>
                        <Button type="button" label="Settings" style="width:20rem" class="mb-2"/>
                    </div>
                    <div class='row'>
                        <Button @click="closeApp" type="button" label="Quit" style="width:20rem" class="mb-2"/>
                    </div>
                </div>
                <div class="row"></div>
            </div>

            <p class="text-color-secondary font-semibold"></p>
        </div>
        <div
            class="w-8 hidden lg:flex flex-column justify-content-between align-items-center px-6 py-6 bg-cover bg-norepeat"
            :style="{
                    backgroundImage: `url('/demo/images/auth/bg-login.jpg') `,
                }"
        >
            <div class="mt-auto mb-auto">
                <span class="block text-white text-7xl font-semibold">General<br />Manager <br />2024</span>
                <span class="block text-white text-3xl mt-4"
                >Lorem ipsum dolor sit amet, consectetur<br />
                            adipiscing elit. Donec posuere velit nec enim<br />
                            sodales, nec placerat erat tincidunt.
                        </span>
            </div>
            <div class="flex align-items-center gap-5"></div>
        </div>
    </div>

    <Dialog v-model:visible="coachDialog" :style="{width: '800px'}" header="New Coach Details" :modal="true" :draggable="false" :closable="false" class="p-fluid">
        <div class='formgrid grid'>
            <div class="field col">
                <label >First Name</label>
                <InputText id="name" v-model='first_name' required="true" autofocus :class="{'p-invalid': submitted && !first_name}" />
                <small class="p-invalid" v-if="submitted && !first_name">First Name is required.</small>
            </div>
            <div class="field col">
                <label>Last Name</label>
                <InputText id="name" v-model="last_name" required="true" autofocus :class="{'p-invalid': submitted && !last_name}" />
                <small class="p-invalid" v-if="submitted && !last_name">Last Name is required.</small>
            </div>
        </div>

        <div class="formgrid grid">
            <div class="field col">
                <label>Age</label>
                <InputNumber id="age" v-model="age" required="true" autofocus :class="{'p-invalid': submitted && !age}" />
                <small class="p-invalid" v-if="submitted && !age">Age is required.</small>
            </div>

            <div class="field col">
                <label>Playing Experience</label>
                <Dropdown id="inventoryStatus" v-model='exp' :options="statuses" optionLabel="label" placeholder="Past playing experience...">
                    <template>
                        <div>{{statuses.label}}</div>
                    </template>
                </Dropdown>
            </div>
        </div>

        <div class="formgrid grid">
            <div class="field col">
                <label>League Selection</label>
                <Dropdown id="inventoryStatus" v-model='league' :options="leagues" optionLabel="name" placeholder="Select a team..."></Dropdown>
            </div>

            <div class="field col">
              <label>Team Selection</label>
              <Dropdown id="inventoryStatus" v-model='team' :options="league.teams" optionLabel="name" placeholder="Select a team..."></Dropdown>
            </div>

            <div class="field col">
                <label>Skillset</label>
                <Dropdown id="inventoryStatus" v-model='skill' :options="skills" optionLabel="skill" placeholder="Choose your skillset..."></Dropdown>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Create" icon="pi pi-check" class="p-button-text" @click="createNewCareer" />
        </template>
    </Dialog>

    <Dialog v-model:visible="continueDialog" :style="{width: '800px'}" header="Continue previous save..." close-icon="false" :draggable="false" :closable="false" :modal="true" class="p-fluid bg-white">
        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-1" v-for='save in this.databases'>
                <div class="p-fluid">
                    <h5>{{ save }}</h5>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Week</label>
                        <div class="col-12 md:col-10">
                            <InputText id="name3" type="text" disabled/>
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Year</label>
                        <div class="col-12 md:col-10">
                            <InputText id="email3" type="text" disabled/>
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0"> </label>
                        <div class="col-12 md:col-8">
                            <Button type="button" to='/dashboard' @click='loadSelectedCareer(save)' label="Continue Save" class="mb-2" />
                        </div>
                        <div class="col-12 md:col-2">
                            <Button type="button" to='/dashboard' @click='deleteSelectedCareer(save)' label="Delete" class="mb-2 p-button-danger" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="loadingDialog" :style="{width: '800px'}" :draggable="false" :closable="false" :modal="true" class='p-fluid bg-white'>
        <div class="justify-content-center">
            <h5>Loading...</h5>
            <div class="grid">
                <div class="col">
                    <ProgressBar :value="value1" show-progress variant="success" mode="determinate" :showValue="false"> Percent Complete: {{value1}}% </ProgressBar>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script>
import {
    TeamController,
    WorldController,
    CareerController
}  from '@/controllers/index';
import DatabaseController from "../../controllers/DatabaseController";
import moment from "moment/moment";
import { NodeService } from '@/service/NodeService';
// import { Dialog, ProgressBar } from 'primevue/dialog';

export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            age: null,
            exp: '',
            league: { teams: [] },
            team: null,
            skill: null,
            players: null,
            teams: null,
            leagues: null,
            value1: 0,
            db: null,
            databases: [],
            existing_db_names: [],
            interval: null,
            loading: false,
            deleting: false,
            creating: false,
            coachDialog: false,
            continueDialog: false,
            loadingDialog: false,
            selectedTreeTableValue: null,
            treeTableValue: null,
            selectedTreeValue: null,
            treeValue: null,
            statuses: [
                {label: 'None', value: 0 },
                {label: 'High School', value: 1 },
                {label: 'College', value: 2 },
                {label: 'Professional', value: 3 },
                {label: 'Hall Of Fame', value: 4 }
            ],
            skills: [
                { value: 0, skill: "Team Builder" },
                { value: 1, skill: "Staff Builder" },
                { value: 2, skill: "Youth Specialist" },
            ],
            worldController: null,
            leagueController: null,
            teamController: null,
            playerController: null,
            careerController: null
        }
    },
    created() {
        this.teamController = new TeamController()
        this.careerController = new CareerController()
        this.worldController = new WorldController()
        this.databaseController = DatabaseController.getInstance()
        this.getDefaultTeamsLeagues() // Check for existing saves
        this.nodeService = new NodeService();
    },
    mounted() {
        this.$store.dispatch('resetState')
      // this.nodeService.getTreeTableNodes().then((data) => (this.treeTableValue = data));
    },
    watch: {
        value1() {
            let obj = this
            if(obj.value1 > 100) {
                obj.endProgress();
                console.log("Loading over")
            }
        }
    },
    methods: {
        async getDefaultTeamsLeagues() {
            const data = await this.databaseController.initDefaultDatabase();
            console.log(data);
            this.leagues = data.leagues;
            this.teams = data.teams;
            this.players = data.players
            this.treeTableValue = this.assignTeamsToLeagues(this.leagues, this.teams, this.players)
            const obj = this
            this.databases = await this.databaseController.getAllDatabases();
            const index = this.databases.indexOf('default')
            obj.databases.splice(index,1)
        },
        assignTeamsToLeagues(leagues, teams, players) {
        // This will hold our transformed data
            let leagueTree = [];

            for (let league of leagues) {
                let leagueTeams = teams.filter(team => team.lid === league.id);
                for (let team of leagueTeams) {
                league.teams.push(team);
                let teamPlayers = players.filter(player => player.team_id === team.id);
                for (let player of teamPlayers) {
                    team.players.push(player);
                }
                }
            }

            for (let league of leagues) {
                // Find the teams for the current league
                let leagueTeams = teams.filter(team => team.lid === league.id);

                // Transform the leagueTeams into the required format
                let children = leagueTeams.map(team => {
                // Find the players for the current team
                let teamPlayers = players.filter(player => player.team_id === team.id);

                // Transform the teamPlayers into the required format
                let playerChildren = teamPlayers.map(player => ({
                    key: `${team.lid}-${team.id}-${player.id}`,
                    data: player,
                }));

                return {
                    key: `${team.lid}-${team.id}`,
                    data: team,
                    children: playerChildren, // Add the players as children of the team
                };
                });

                // Transform the league into the required format, including its teams
                let leagueNode = {
                key: String(league.id),
                data: league,
                children,
                };

                // Add the transformed league to our result array
                leagueTree.push(leagueNode);
            }

            return leagueTree;
        },
        async loadSelectedCareer(name) {
            let obj = this
            let db_name = name;
            obj.loading = true
            obj.restartTimer();

            console.log("DB: " + db_name)
            this.careerController.loadSelectedCareer(db_name);
        },
        createNewCareer() {
            let obj = this
            obj.coachDialog = false
            obj.loadingDialog = true;
            obj.creating = true

            let create_user = {
            id: 0,
            first: obj.first_name,
            last: obj.last_name,
            age: obj.age,
            exp: obj.exp.label,
            skill: obj.skill.skill,
            team_id: obj.team.id,
            }

            obj.restartTimer();
            setTimeout(() => {
                obj.databaseController.createNewDatabase(create_user)
            }, 2000);
        },
        closeApp() {
            console.log("Close App")
            window.ipcRenderer.send('quit-app');
        },
        openNew() {
            this.coach = {};
            this.submitted = false;
            this.coachDialog = true;
        },
        openContinue() {
            this.coach = {};

            this.submitted = false;
            this.continueDialog = true;
        },
        hideDialog() {
            console.log("Hide Dialog")
            this.coachDialog = false;
            this.continueDialog = false;
            this.loadingDialog = false;
            this.submitted = false;

            if(this.loading) {
            console.log("Loading")
            this.$router.push('/home')
            this.loading = false
            }

            if(this.creating) {
            console.log("Creating")
            this.$router.push('/home')
            this.creating = false
            }

            if(this.deleting) {
            console.log("Deleting")
            this.$router.push('/')
            this.deleting = false
            }
        },
        async startProgressAndLongRunningFunction() {
                // Start the progress bar
                this.restartTimer();

                // Start the long-running function
                const longRunningFunctionPromise = this.longRunningFunction();

                // Wait for the long-running function to complete
                await longRunningFunctionPromise;

                // Stop the progress bar
                // this.endProgress();
            },
        restartTimer() {
            clearInterval(this.interval);
            this.value1 = 0;
            setTimeout(() => {
                this.startProgress();
            }, 100);
        },
        startProgress() {
            this.continueDialog = false
            this.coachDialog = false
            this.loadingDialog = true
            this.interval = setInterval(() => {
                let newValue = this.value1 + Math.floor(Math.random() * 10) + 1;
                this.value1 = newValue;
                console.log(this.value1);
            }, 500);
        },
        endProgress() {
            clearInterval(this.interval);
            this.interval = null;
            setTimeout(() => {
                this.hideDialog()
            }, 500);
        },
        deleteSelectedCareer(db) {
            let obj = this
            obj.deleting = true
            obj.restartTimer();
            this.careerController.delete(db);
        }
    }
}
</script>
