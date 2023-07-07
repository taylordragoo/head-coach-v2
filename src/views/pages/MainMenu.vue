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
                <span class="block text-white text-7xl font-semibold">League<br />Manager <br />2024</span>
                <span class="block text-white text-3xl mt-4"
                >Lorem ipsum dolor sit amet, consectetur<br />
                            adipiscing elit. Donec posuere velit nec enim<br />
                            sodales, nec placerat erat tincidunt.
                        </span>
            </div>
            <div class="flex align-items-center gap-5">
<!--                <span class="text-white font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>-->
<!--                <i class="pi pi-github text-3xl p-1 surface-overlay border-circle cursor-pointer"></i>-->
<!--                <i class="pi pi-twitter text-3xl p-1 surface-overlay border-circle cursor-pointer"></i>-->
            </div>
        </div>
    </div>

    <Dialog v-model:visible="coachDialog" :style="{width: '800px'}" header="New Coach Details" :modal="true" class="p-fluid">
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
                <label>Team Selection</label>
                <Dropdown id="inventoryStatus" v-model='team' :options="teams" optionLabel="name" placeholder="Select a team..."></Dropdown>
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

    <Dialog v-model:visible="continueDialog" :style="{width: '800px'}" header="Continue previous save..." close-icon="false" :modal="true" class="p-fluid bg-white">
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

    <Dialog v-model:visible="loadingDialog" :style="{width: '800px'}" :modal="true" class='p-fluid bg-white'>
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
import { Dexie } from 'dexie';
import {
    UserController,
    TeamController,
    WorldController,
    CareerController
}  from '@/controllers/index';
import DatabaseController from "../../controllers/DatabaseController";
import moment from "moment/moment";

export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            age: null,
            exp: '',
            team: null,
            skill: null,
            teams: null,
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
            userController: null,
            worldController: null,
            leagueController: null,
            teamController: null,
            playerController: null,
            careerController: null
        }
    },
    created() {
        this.userController = new UserController()
        this.teamController = new TeamController()
        this.careerController = new CareerController()
        this.worldController = new WorldController()
        this.databaseController = DatabaseController.getInstance()
    },
    mounted() {
        this.$store.dispatch('resetState')
        this.checkForData()
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
      async checkForData() {
        const obj = this
        const db = this.databaseController;
        await db.initDefaultDatabase();
        this.databases = await db.getAllDatabases();

        console.log(this.databases);
        console.log(moment('2023-07-10').week()); // This is a Monday
        console.log(moment('2023-07-09').week());
        const index = this.databases.indexOf('default')
        obj.databases.splice(index,1)

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
          skill: obj.skill,
          team_id: 0
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
