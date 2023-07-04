import DatabaseController from "@/controllers/DatabaseController";
import WorldController from "@/controllers/WorldController";
import World from '@/models/World'
import Champion from '@/models/Champion'
import Counter from '@/models/Counter'
import Synergy from '@/models/Synergy'
import Player from '@/models/Player'
import Team from '@/models/Team'
import League from '@/models/League'
import User from '@/models/User'
import {Dexie} from "dexie";

class CareerService {
    private static instance: CareerService;
    public tableNames = ['user', 'world', 'players', 'teams', 'leagues', 'champions', 'counters', 'synergys'];

    private constructor() {}

    public static getInstance(): CareerService {
        if (!CareerService.instance) {
            CareerService.instance = new CareerService();
        }

        return CareerService.instance;
    }

    public async handleCareerData(request, db): Promise<any> {
        try {
            for (const tableName of this.tableNames) {
                const table = db.table(tableName);
                const data = request[tableName];
                await this.handleTableOperation(table, data);
            }
        } catch (err) {
            console.log(`Error: ${err}`);
        } finally {
            return db;
        }
    };

    public handleGetDefaultData: any = () => {

        const teams: Team[] = Team.all().map(team => {
            return {
                ...team,
                budget: {
                    scouting: { ...team.budget.scouting },
                    coaching: { ...team.budget.coaching },
                    health: { ...team.budget.health },
                    facilities: { ...team.budget.facilities },
                },
                coach: { ...team.coach },
            };
        });

        const players: Player[] = Player.all().map(player => {
            return {
                ...player,
                born: { ...player.born },
                injury: { ...player.injury },
                contract: { ...player.contract },
                ratings: player.ratings.map(rating => ({ ...rating })),
                champions: [...player.champions],
                championsRnk: { ...player.championsRnk },
                awards: [...player.awards],
                salaries: [...player.salaries],
                statsTids: Array.from(player.statsTids),
                languages: Array.from(player.languages)
            };
        });

        return {
            type: "default",
            db_name: 'default',
            world: World.all(),
            players: players,
            teams: teams,
            leagues: League.all(),
            counters: Counter.all(),
            synergys: Synergy.all(),
            champions: Champion.all()
        };
    }

    public async handleLoadSelectedCareer(name: string): Promise<void> {
        try {
            const dbc: DatabaseController = DatabaseController.getInstance();
            const db: Dexie | null = await dbc.openDatabase(name);
            if (db) {
                const data: any= await dbc.getCareerDataFromDatabase(db);
                await this.handleInsertVuexData(data);
            }
        } catch (error) {
            console.error(`Failed to load career: ${error}`);
        }
    }


    public async handleInsertVuexData(request): Promise<void>{
        try {
            // insert data into vuex-orm store
            await Team.insert({ data: request.teams })
            await User.insert({ data: request.user })
            await Player.insert({ data: request.players })
            await League.insert({ data: request.leagues })
            await World.insert({ data: request.world })
            await Champion.insert({ data: request.champions })
            await Counter.insert({ data: request.counters })
            await Synergy.insert({ data: request.synergys })
        } catch (err) {
            console.log(`Error: ${err}`);
        }
        return;
    }

    public async handleDeleteCareer(db): Promise<void> {
        const dbc: DatabaseController = DatabaseController.getInstance();
        await dbc.deleteDatabase(db);
    }

    public async handleCreateNewCareer(request): Promise<any> {
        const dbc: DatabaseController = DatabaseController.getInstance();
        if(await this.handleDbExistence(request))
        return await this.handleCareerData(request, db);
    }

    public async handleSaveCareer(): Promise<void> {
        try {
            const dbc: DatabaseController = DatabaseController.getInstance();
            await dbc.saveDatabase();
        } catch (error) {
            console.error(`Failed to save career: ${error}`);
        }
    }

    public async handleCreateDefaultWorld(): Promise<any> {
        const wc: WorldController = WorldController.getInstance();
        return wc.createWorld();
    }

}

export default CareerService;
