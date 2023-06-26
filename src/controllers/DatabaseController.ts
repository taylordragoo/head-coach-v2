import DatabaseService from '@/service/DatabaseService';
import CareerController from "@/controllers/CareerController";

class DatabaseController {
    private static instance: DatabaseController;
    public databaseService: DatabaseService;
    public careerController: CareerController;

    private constructor(databaseName: string = 'default') {

        this.databaseService = DatabaseService.getInstance(databaseName);
        this.careerController = CareerController.getInstance();
    }

    public static getInstance(databaseName: string = 'default'): DatabaseController {
        if (!DatabaseController.instance) {
            DatabaseController.instance = new DatabaseController(databaseName);
        }

        return DatabaseController.instance;
    }

    public getName() {
        return this.databaseService.handleGetName();
    }

    public getTables() {
        return this.databaseService.handleGetTables();
    }

    public getAllDatabases() {
        return this.databaseService.handleGetAllDatabases();
    }

    public initDefaultDatabase() {
        return this.databaseService.initialize();
    }

    public createNewDatabase(databaseName: string) {
        return this.databaseService.newGame(databaseName);
    }

    public deleteDatabase(databaseName: string) {
        return this.databaseService.handleDeleteCareer(databaseName);
    }

}

export default DatabaseController;
