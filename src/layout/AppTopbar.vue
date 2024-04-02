<template>
    <div class="layout-topbar">
        <div v-if='user != null' class="layout-breadcrumb viewname" style="text-transform: uppercase">
          <span>{{ league_phase + " | " + user.full_name + " | " + world.currentDayOfWeek + ' ' + world.date }}</span>
        </div>
        <div class="topbar-left">
            <span class="topbar-separator"></span>
        </div>

        <div class="layout-topbar-menu-section">
            <AppSidebar ref="sidebarRef"></AppSidebar>
        </div>

        <div class="layout-mask modal-in"></div>

        <div class="topbar-right">
            <ul class="topbar-menu">
                <li class="search-item">
                    <a tabindex="0" @click="toggleSearchBar()" class="p-trigger">
                        <i class="pi pi-search"></i>
                    </a>
                </li>
                <li class="static sm:relative">
                    <a tabindex="0" v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveActiveClass: 'fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                        <i class="pi pi-globe"></i>
                    </a>
                    <ul class="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-12rem mt-2 right-0 z-5 top-auto">
                        <li>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-user mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Profile</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-cog mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Settings</span>
                                </span>
                            </a>
                            <a v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-calendar mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Load</span>
                                </span>
                            </a>
                            <a @click='onTapbarSaveMenuButtonClick' v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-save mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Save</span>
                                </span>
                            </a>
                            <a @click='onTopbarExitMenuButtonClick' v-ripple class="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                <i class="pi pi-power-off mr-3"></i>
                                <span class="flex flex-column">
                                    <span class="font-semibold">Quit</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="profile-item static sm:relative">
                    <a @click="onTopbarContMenuButtonClick" tabindex="0" v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveActiveClass: 'fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                        <span class="flex flex-column">
                            <span class="profile-name">&nbsp; Continue</span>
                        </span>
                    </a>
                </li>
            </ul>
        </div>

        <Dialog mode='indeterminate' :draggable="false" :closable="false" v-model:visible="loadingDialog" :style="{width: '800px'}" :modal="true" class='p-fluid bg-white'>
          <div class="justify-content-center">
            <h5>Loading...</h5>
            <div class="grid">
              <div class="col">
                <ProgressBar :value="value1" show-progress variant="success" mode="determinate" :showValue="false"> Percent Complete: {{value1}}% </ProgressBar>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog mode='indeterminate' :draggable="false" :closable="false" v-model:visible="savingDialog" :style="{width: '800px'}" :modal="true" class='p-fluid bg-white'>
          <div class="justify-content-center">
            <h5>Saving...</h5>
            <div class="grid">
              <div class="col">
                <ProgressBar :value="value1" show-progress variant="success" mode="determinate" :showValue="false"> Percent Complete: {{value1}}% </ProgressBar>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog mode='indeterminate' :draggable="false" :closable="false" v-model:visible="exitDialog" :style="{width: '800px'}" :modal="true" class='p-fluid bg-white'>
          <div class="justify-content-center">
            <h5>Loading...</h5>
            <div class="grid">
              <div class="col">
                <ProgressBar :value="value1" show-progress variant="success" mode="determinate" :showValue="false"> Percent Complete: {{value1}}% </ProgressBar>
              </div>
            </div>
          </div>
        </Dialog>

    </div>
</template>
<script>
  import moment from 'moment';
  import AppSidebar from '@/layout/AppSidebar.vue';
  import AppBreadcrumb from './AppBreadcrumb.vue';
  import World from "../models/World";
  import League from "../models/League";
  import User from "../models/User";
  import Team from "../models/Team";
  import Player from "../models/Player";
  import Staff from "../models/Staff";
  import { CareerController } from "../controllers";

  export default {
    components: {
      AppSidebar,
      AppBreadcrumb,
    },
    data() {
      return {
        topbarMenuActive: false,
        items: [],
        careerController: null,
        loadingDialog: false,
        savingDialog: false,
        exitDialog: false,
        value1: 0,
        interval: null,
        loading: false,
        exiting: false,
        saving: false,
        continuing: false,
        finish_saving: false,
        save_count: 0
        // remaining properties as per your requirements
      };
    },
    created() {
      this.careerController = CareerController.getInstance();
      this.careerController.setPhaseBasedOnWeek();
    },
    watch: {
      value1() {
        let obj = this
        if(obj.value1 > 100) {
          obj.endProgress();
          obj.loadingDialog = false
          console.log("Loading over")
        }
      }
    },
    computed: {
      user: {
        /* By default get() is used */
        get() {
          return User.query().with('team', (query) => {
            query.with('players', (query) => {
              query.with('ratings.overalls|potentials');
            })
          }).first();
        },
        /* We add a setter */
        set(value) {
          this.$store.commit('updateUser', value)
        }
      },
      world: {
        /* By default get() is used */
        get() {
          return World.query().with('leagues.teams.players.*').first()
        },
        /* We add a setter */
        set(value) {
          this.$store.commit('updateWorld', value)
        }
      },
      league: {
        /* By default get() is used */
        get() {
          return League.query().with('teams').all()
        },
        /* We add a setter */
        set(value) {
          this.$store.commit('updateUser', value)
        }
      },
      league_phase() {
        const league = League.query().where('id', this.user?.team?.lid).first();
        return league?.phase_name || 'Unknown';
      },
      teams: {
        /* By default get() is used */
        get() {
          return Team.query().withAll().orderBy('name').all()
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
      staff: {
        /* By default get() is used */
        get() {
          return Staff.query().all();
        },
        /* We add a setter */
        set(value) {
          this.$store.commit('updateStaff', value)
        }
      }
    },
    methods: {
      async onTopbarContMenuButtonClick(event) {
        let obj = this
        obj.continuing = true;
        obj.openContinue();
        await this.$nextTick(); // Wait for the next DOM update cycle
        this.continueToTomorrow(this.world.date);
        setTimeout(() => {
            this.careerController.continueCareer();
        }, 500);
      },
      onTopbarExitMenuButtonClick(event) {
        let obj = this
        obj.exiting = true;
        obj.openExit();
      },
      onTapbarSaveMenuButtonClick() {
        let obj = this
        obj.saving = true;
        obj.careerController.saveCareer();
        obj.openSave()
      },
      getHumanDate: function(date) {
        return moment(date).format('MM/DD/YYYY');
      },
      getTomorrow: function(date) {
        let obj = this
        let new_date = moment(obj.getHumanDate(date)).add(1,'days');
        return new_date;
      },
      continueToTomorrow: function(date) {
        let obj = this
        const new_date = obj.getHumanDate(obj.getTomorrow(date))

        World.update({
          where: (world) => {
            return world.id === 0
          },
          data: {
            date: new_date
          }
        })

      },
      restartTimer() {
        clearInterval(this.interval);
        this.value1 = 0;
        setTimeout(() => {
          this.startProgress();
        }, 100);
      },
      startProgress() {
        let obj = this
        obj.interval = setInterval(() => {
          let newValue = obj.value1 + Math.floor(Math.random() * 10) + 1;
          this.value1 = newValue;
          console.log(this.value1);
        }, 500);
      },
      endProgress() {
        console.log('ending loading')
        let obj = this
        clearInterval(obj.interval);
        obj.interval = null;
        setTimeout(() => {
          obj.hideDialog()
        }, 500);
      },
      openContinue() {
        this.loadingDialog = true;
        const players = Player.query().where('tid', 0).get();

        this.restartTimer();
      },
      openSave() {
        this.savingDialog = true;
        this.restartTimer();
      },
      openExit() {
        this.exitDialog = true;
        this.restartTimer();
      },
      hideDialog() {
        if(this.exiting) {
          this.$router.push('/')
          this.exiting = false
          this.exitDialog = false;
        } else if(this.continuing) {
          // this.continueToTomorrow(this.world.date);
          this.continuing = false;
          this.loadingDialog = false;
        } else if(this.saving) {
          this.saving = false;
          this.savingDialog = false;
        }
      },
      bindOutsideClickListener() {
        if (!this.outsideClickListener) {
          this.outsideClickListener = (event) => {
            if (this.isOutsideClicked(event)) {
              this.topbarMenuActive = false;
            }
          };
          document.addEventListener('click', this.outsideClickListener);
        }
      },
      unbindOutsideClickListener() {
        if (this.outsideClickListener) {
          document.removeEventListener('click', this.outsideClickListener);
          this.outsideClickListener = null;
        }
      },
      isOutsideClicked(event) {
        if (!this.topbarMenuActive) return;

        const sidebarEl = document.querySelector('.layout-topbar-menu');
        const topbarEl = document.querySelector('.layout-topbar-menu-button');

        return !(
            sidebarEl.isSameNode(event.target) ||
            sidebarEl.contains(event.target) ||
            topbarEl.isSameNode(event.target) ||
            topbarEl.contains(event.target)
        );
      }
    },
  };
</script>
