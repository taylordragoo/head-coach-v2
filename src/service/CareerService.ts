import Dexie from 'dexie';
import DatabaseController from "@/controllers/DatabaseController";
import WorldController from "@/controllers/WorldController";

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
