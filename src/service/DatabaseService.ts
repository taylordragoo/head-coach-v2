import Dexie from "dexie";
import CareerController from "@/controllers/CareerController";

class DatabaseService {
    private static instance: DatabaseService;
    public db: any;
    public dbTemplate: any;
    public db_name: string;
    public careerController: CareerController;

    private constructor() {
        this.careerController = CareerController.getInstance();
        this.dbTemplate = new Dexie("default");
    }

    public static getInstance(name: string): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService(name);
        } else if (DatabaseService.instance.db_name !== name) {
            throw new Error(`Attempted to get instance with name ${name}, but instance already exists with name ${DatabaseService.instance.db_name}`);
        }

        return DatabaseService.instance;
    }

    public handleGetName() {
        return this.db.name;
    }

    public handleGetTables() {
        return this.db.tables;
    }

    public handleGetAllDatabases() {
        return Dexie.getDatabaseNames();
    }

    async initialize() {
        await this.initDB(this.dbTemplate);
        const count = await this.dbTemplate.world.count();
        if (count === 0) {
            const data = this.generateData();
            console.log(data);
            this.populateDB(data);
        }
    }

    async newGame(name) {
        await this.initDB(this.db);
        await this.copyDB(this.dbTemplate, this.db);
    }

    async initDB(db) {
        db.version(1).stores({
            world: "id"
        });
        await db.open().catch((error) => {
            console.error("Failed to open db: ", error);
        });
    }

    generateData() {
        return this.careerController.createDefaultData();
    }

    populateDB(request) {
        // Populate the db with initial data
        this.dbTemplate.world.put(request.world).then(function(lastKey) {
            console.log("Last world's id was: " + lastKey); // Will be 100000.
        }).catch(Dexie.BulkError, function(e) {
            // Explicitely catching the bulkAdd() operation makes those successful
            // additions commit despite that there were errors.
            console.error("Some worlds did not succeed. However, " +
                100000 - e.failures.length + " worlds was added successfully");
        });
    }

    async copyDB(dbFrom, dbTo) {
        // Copy data from dbFrom to dbTo
        const users = await dbFrom.user.toArray();
        await dbTo.user.bulkAdd(users);
    }

    public async handleOpenDatabase(name: string) {
        if (await this.handleDbExistence(name)) {
            this.db = await Dexie.open(name);
            return this.db;
        }
    }

    public async handleDbExistence(name: string) {
        if (!(await Dexie.exists(name))) {
            console.log(`${name} Db does not exist`);
            return false;
        } else {
            console.log(`${name} Db does exist`);
            return true;
        }

        return false;
    };


    public async handleDeleteCareer(db) {
        try {
            await Dexie.delete(db);
            console.log("Database successfully deleted");
        } catch (err) {
            console.error("Could not delete database", err);
        }
    }

    public async handleTableOperation(table, data) {
        if (table) {
            const operation = Array.isArray(data) ? table.bulkPut : table.put;
            await operation(data).then(function(lastKey) {
                console.log(`Last ${table.name}'s id was: ${lastKey}`);
            }).catch(Dexie.BulkError, function(e) {
                console.error(`Some ${table.name}s did not succeed. However, ${100000 - e.failures.length} ${table.name}s was added successfully`);
            });
        }
    };

    private async handleBulkPutOperation(collection, items, itemName): Promise<void> {
        try {
            const lastKey = await collection.bulkPut(items);
            console.log(`Last ${itemName}'s id was: ${lastKey}`);
        } catch (e) {
            if (e instanceof Dexie.BulkError) {
                console.error(`Some ${itemName}s did not succeed. However, ` + (100000 - e.failures.length) + ` ${itemName}s was added successfully`);
            } else {
                throw e;
            }
        }
    }
}

export default DatabaseService;
