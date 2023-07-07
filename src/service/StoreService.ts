import VuexORM, { Database } from '@vuex-orm/core';
import Vuex from 'vuex';
import User from '@/models/User';
import World from '@/models/World';
import League from '@/models/League';
import Team from '@/models/Team';
import Player from '@/models/Player';
import Counter from '@/models/Counter';
import Synergy from '@/models/Synergy';
import Champion from '@/models/Champion';
import TrainingSchedule from "@/models/TrainingSchedule";
import Activity from "@/models/Activity";

class StoreService {
    private static instance: StoreService;
    public store: any;
    public database: Database;

    private constructor() {
        this.database = new Database();
        this.database.register(League);
        this.database.register(World);
        this.database.register(User);
        this.database.register(Team);
        this.database.register(Player);
        this.database.register(Counter);
        this.database.register(Synergy);
        this.database.register(Champion);
        this.database.register(TrainingSchedule);
        this.database.register(Activity);

        this.store = new Vuex.Store({
            actions: {
                resetState({ commit }) {
                    commit('RESET_STATE')
                }
            },
            mutations: {
                RESET_STATE() {
                    this.dispatch('entities/deleteAll')
                }
            },
            plugins: [VuexORM.install(this.database)],
        });
    }

    public static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }

        return StoreService.instance;
    }

    public getStore(): any {
        return this.store;
    }

    public getVuexDatabase(): Database {
        return this.database;
    }
}

export default StoreService;
