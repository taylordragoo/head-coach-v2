import VuexORM from '@vuex-orm/core';
import User from '@/models/User';
import World from '@/models/World';
import League from '@/models/League';
import Team from '@/models/Team';
import Player from '@/models/Player';
import Vuex from 'vuex';
import Counter from '@/models/Counter';
import Synergy from '@/models/Synergy';
import Champion from '@/models/Champion';

class StoreService {

    private static instance: StoreService;
    private store: EnhancedStore;
    private orm: ORM<ORMCommonState>;

    private constructor() {
        this.orm = new ORM<ORMCommonState>();
        this.orm.register(League, World);

        const rootReducer = combineReducers({
            orm: createReducer(this.orm),
        });

        this.store = configureStore({
            reducer: rootReducer,
        });
    }

    public static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }

        return StoreService.instance;
    }

    public getStore(): EnhancedStore {
        return this.store;
    }

    handleCreateNewStore()
    {
        console.log("Handle New Store")
        const database = new VuexORM.Database()
        this.handleRegisterModels(database)

        let store = new Vuex.Store({
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
            plugins: [VuexORM.install(database)]
        })

        return store
    }

    handleRegisterModels(database)
    {
        database.register(User);
        database.register(World);
        database.register(League);
        database.register(Team);
        database.register(Player);
        database.register(Counter);
        database.register(Synergy);
        database.register(Champion);
    }
}
