import Dexie from 'dexie';
import DatabaseController from "@/controllers/DatabaseController";
import WorldController from "@/controllers/WorldController";
import World from '@/models/World'
import Champion from '@/models/Champion'
import Counter from '@/models/Counter'
import Synergy from '@/models/Synergy'
import Player from '@/models/Player'
import Team from '@/models/Team'
import League from '@/models/League'

class CareerService {
    private static instance: CareerService;
    private worldController: WorldController;
    public tableNames = ['user', 'world', 'players', 'teams', 'leagues', 'champions', 'counters', 'synergys'];

    private constructor() {
        this.worldController = WorldController.getInstance();
    }

    public static getInstance(): CareerService {
        if (!CareerService.instance) {
            CareerService.instance = new CareerService();
        }

        return CareerService.instance;
    }

    public async handleCareerData(request, db) {
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

        const teams = Team.all().map(team => {
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

        const players = Player.all().map(player => {
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

        const data = {
            type: "default",
            db_name: 'default',
            world: World.query().first().$toJson(),
            players: players,
            teams: teams,
            leagues: League.all(),
            counters: Counter.all(),
            synergys: Synergy.all(),
            champions: Champion.all()
        }

        return data;
    }

    public async handleDeleteCareer(db) {
        const dbc = DatabaseController.getInstance();
        await dbc.deleteDatabase(db);
    }

    public async handleCreateNewCareer(request) {
        const dbc = DatabaseController.getInstance();
        if(await this.handleDbExistence(request))
        return await this.handleCareerData(request, db);
    }

    public async handleSaveCareer(request) {
        console.log(`Save Database ${request.user}`);
        const db = this.createStore(request);
        await this.handleDbExistence(db);
        return await this.handleCareerData(request, db);
    }

    public async handleCreateDefaultWorld(): Promise<any> {
        return this.worldController.createWorld();
    }

}

export default CareerService;
