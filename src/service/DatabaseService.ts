import Dexie from "dexie";
import CareerController from "@/controllers/CareerController";
import {RequestData} from "@/interfaces/IRequestData";
import User from '@/models/User';
import World from '@/models/World';
import League from '@/models/League';
import Team from '@/models/Team';
import Player from '@/models/Player';
import Match from "@/models/Match";
import Born from "@/models/Born";
import College from "@/models/College";
import Draft from "@/models/Draft";
import Ratings from "@/models/Ratings";
import Health from "@/models/Health";
import Injury from "@/models/Injury";
import Relative from "@/models/Relative";
import Salary from "@/models/Salary";
import Stat from "@/models/Stat";
import Transaction from "@/models/Transaction";
import Award from "@/models/Award";
import Overalls from "@/models/Overalls";
import Potentials from "@/models/Potentials";
import Skill from "@/models/Skill";
import Phase from "@/models/Phase";
import Contract from "@/models/Contract";
import TrainingSchedule from "@/models/TrainingSchedule";
import Activity from "@/models/Activity";
import Conference from "@/models/Conference";
import Division from "@/models/Division";
import Season from "@/models/Season";
import Staff from "@/models/Staff";

class DatabaseService {
    private static instance: DatabaseService;
    public db: any;
    public dbTemplate: any;
    public db_name: string;

    public modelConfig = {
        user: User,
        players: Player,
        teams: Team,
        matches: Match,
        awards: Award,
        transactions: Transaction,
        draft: Draft,
        health: Health,
        born: Born,
        ratings: Ratings,
        college: College,
        salaries: Salary,
        stats: Stat,
        injuries: Injury,
        contracts: Contract,
        relatives: Relative,
        overalls: Overalls,
        potentials: Potentials,
        skills: Skill,
        phases: Phase,
        training_schedules: TrainingSchedule,
        activities: Activity,
        conference: Conference,
        division: Division,
        Season: Season,
        staff: Staff,
        leagues: League,
        world: World,
    }

    private constructor(name: string = 'default') {
        this.dbTemplate = new Dexie(name);
        this.db_name = name;
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

    public async handleGetAllDatabases() {
        return Dexie.getDatabaseNames();
    }

    async initialize() {
        await this.initDB(this.dbTemplate);
        const count = await this.dbTemplate.world.count();
        if (count === 0) {
            const data = this.generateData();
            console.log(data);
            await this.populateDB(data);
            return data;
        } else {
            return await this.handleGetCareerDataFromDatabase(this.dbTemplate);
        }
    }

    generateData() {
        const cc :CareerController = CareerController.getInstance();
        return cc.createDefaultData();
    }

    async newGame(request: any) {
        console.log(request);
        this.db = new Dexie(request.first + " " + request.last);
        await this.initDB(this.db);
        await this.copyDB(this.dbTemplate, this.db);
    
        await User.insert({
            data: {
                id: 0,
                first: request.first,
                last: request.last,
                age: request.age,
                exp: request.exp,
                skill: request.skill,
                team_id: request.team_id
            }
        });
    
        for (const [tableName, model] of Object.entries(this.modelConfig)) {
            const data = await this.db.table(tableName).toArray();
            await model.insert({ data });
        }
    
        await this.handleCloseDatabase(this.dbTemplate);
    }

    async initDB(db) {
        const schema = {};
        Object.keys(this.modelConfig).forEach(modelName => {
            schema[modelName] = 'id';
        });
    
        db.version(1).stores(schema);
        await db.open().catch((error) => {
            console.error("Failed to open db: ", error);
        });
    }

    async copyDB(dbFrom, dbTo) {
        for (const tableName of Object.keys(this.modelConfig)) {
            const data = await dbFrom.table(tableName).toArray();
            await this.handleBulkPutOperation(dbTo[tableName], data, tableName);
        }
    }

    async handleSaveCareer() {
        try {
            let u: User = User.all();
            u = u[0];
            console.log(u);
            const db_name = u.first + " " + u.last;
    
            const t = Team.all().map(team => {
                return {
                    ...team,
                    budget: {
                        scouting: {...team.budget.scouting},
                        coaching: {...team.budget.coaching},
                        health: {...team.budget.health},
                        facilities: {...team.budget.facilities},
                    },
                    coach: {...team.coach},
                };
            });
    
            const request = Object.keys(this.modelConfig).reduce((acc, modelName) => {
                if (modelName === 'teams') {
                    acc[modelName] = t;
                } else {
                    acc[modelName] = this.modelConfig[modelName].all();
                }
                return acc;
            }, {type: "save", db: db_name});
    
            console.log(request);
    
            const db: Dexie | null = await this.handleOpenExistingDatabase(request.db);
    
            if (db) {
                for (const modelName of Object.keys(this.modelConfig)) {
                    const modelData = request[modelName];
                    if (modelData && modelData.length > 0) {
                        await this.handleBulkPutOperation(db[modelName], modelData, modelName);
                    }
                }
            }
        } catch (error) {
            console.error("Error saving career data:", error);
        }
    }

    public async handleOpenExistingDatabase(name: string) {
        if (await this.handleDbExistence(name)) {
            const db = new Dexie(name);
            const schema = {};
            Object.keys(tthis.modelConfig).forEach(tableName => {
                schema[tableName] = 'id';
            });
    
            db.version(1).stores(schema);
    
            try {
                if (!db.isOpen()) {
                    await db.open();
                }
                return db;
            } catch (error) {
                console.error("Failed to open db: ", error);
                return null;
            }
        } else {
            console.log("Database does not exist");
            return null;
        }
    }

    public async handleGetCareerDataFromDatabase(db: Dexie) {
        try {
            const careerData = {};
    
            for (const tableName of Object.keys(this.modelConfig)) {
                const data = await db.table(tableName).toArray();
                careerData[tableName] = data;
            }
    
            return careerData;
        } catch (error) {
            console.error("Failed to get career data from db: ", error);
        }
    }
    
    async populateDB(request) {
        for (const tableName of Object.keys(this.modelConfig)) {
            if (request[tableName] && request[tableName].length > 0) {
                // Correctly access the table using Dexie's table() method
                await this.handleBulkPutOperation(this.dbTemplate.table(tableName), request[tableName], tableName);
            }
        }
    }

    public async handleCloseDatabase(db: Dexie) {
        if(this.handleDbStatus(db)) {
            await db.close();
            console.log("Database successfully closed");
        } else {
            console.log("Database is not open");
        }
    }

    public handleDbStatus(db: Dexie) {
        if (db.isOpen()) {
            console.log("Database is open");
            return true
        } else {
            console.log("Database is not open");
            return false
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
                console.log(`Last ${table.name}'s id was: ${lastKey ?? 'N/A'}`);
            }).catch(Dexie.BulkError, function(e) {
                console.error(`Some ${table.name}s did not succeed. However, ${100000 - e.failures.length} ${table.name}s was added successfully`);
            });
        }
    };

    async handleBulkPutOperation(db, items, modelName) {
        try {
            console.log(`Model name: ${modelName}`); // This should log a string representing the table name
            await db.bulkPut(items);
            console.log(`Bulk put operation successful for ${modelName}`);
        } catch (error) {
            console.error(`Error in bulk put operation for ${modelName}: `, error);
        }
    }
}

export default DatabaseService;
