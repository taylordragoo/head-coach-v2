import Dexie from "dexie";
import CareerController from "@/controllers/CareerController";
import User from "@/models/User";
import World from "@/models/World";
import League from "@/models/League";
import Team from "@/models/Team";
import Player from "@/models/Player";
import Champion from "@/models/Champion";
import Counter from "@/models/Counter";
import Synergy from "@/models/Synergy";

class DatabaseService {
    private static instance: DatabaseService;
    public db: any;
    public dbTemplate: any;
    public db_name: string;

    private constructor(name: string = 'default') {
        this.dbTemplate = new Dexie(name);
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
            // this.dbTemplate.close();
        } else {
            return await this.handleGetCareerDataFromDatabase(this.dbTemplate);
        }
    }

    async newGame(request) {
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
        })

        const user = await User.query().first().$toJson();
        await this.db.user.put(user);
        // await this.handleTableOperation(this.db.user, user);

        const player = await this.db.table('players').toArray();
        const team = await this.db.table('teams').toArray();
        const world = await this.db.table('world').toArray();
        const league = await this.db.table('leagues').toArray();
        const champs = await this.db.table('champions').toArray();
        const counters = await this.db.table('counters').toArray();
        const synergys = await this.db.table('synergys').toArray();
        const matches = await this.db.table('matches').toArray();

        await Team.insert({ data: team })
        await Player.insert({ data: player })
        await League.insert({ data: league })
        await World.insert({ data: world })
        await Champion.insert({ data: champs })
        await Counter.insert({ data: counters })
        await Synergy.insert({ data: synergys })
        await Match.insert({ data: matches })

        await this.handleCloseDatabase(this.dbTemplate);

    }

    async initDB(db) {
        db.version(1).stores({
            user: "id",
            teams: "id",
            players: "id",
            world: 'id',
            leagues: "id",
            champions: "$id",
            counters: "id",
            synergys: "id",
            matches: "id"
        });
        await db.open().catch((error) => {
            console.error("Failed to open db: ", error);
        });
    }

    generateData() {
        const cc :CareerController = CareerController.getInstance();
        return cc.createDefaultData();
    }

    async copyDB(dbFrom, dbTo) {
        // Copy data from dbFrom to dbTo
        const world = await dbFrom.world.toArray();
        const champions = await dbFrom.champions.toArray();
        const counters = await dbFrom.counters.toArray();
        const synergys = await dbFrom.synergys.toArray();
        const players = await dbFrom.players.toArray();
        const teams = await dbFrom.teams.toArray();
        const leagues = await dbFrom.leagues.toArray();

        await this.handleBulkPutOperation(dbTo.world, world, 'world');
        await this.handleBulkPutOperation(dbTo.champions, champions, 'champion');
        await this.handleBulkPutOperation(dbTo.leagues, leagues, 'league');
        await this.handleBulkPutOperation(dbTo.counters, counters, 'counter');
        await this.handleBulkPutOperation(dbTo.synergys, synergys, 'synergy');
        await this.handleBulkPutOperation(dbTo.players, players, 'player');
        await this.handleBulkPutOperation(dbTo.teams, teams, 'team');
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

            const p = Player.all().map(player => {
                return {
                    ...player,
                    born: {...player.born},
                    injury: {...player.injury},
                    contract: {...player.contract},
                    ratings: player.ratings.map(rating => ({...rating})),
                    champions: [...player.champions],
                    championsRnk: {...player.championsRnk},
                    awards: [...player.awards],
                    salaries: [...player.salaries],
                    statsTids: Array.from(player.statsTids),
                    languages: Array.from(player.languages)
                };
            });

            const request = {
                type: "save",
                user: u,
                world: World.all(),
                players: p,
                teams: t,
                leagues: League.all(),
                counters: Counter.all(),
                synergys: Synergy.all(),
                champions: Champion.all(),
                db: db_name,
            }

            console.log(request)

            const db: Dexie | null = await this.handleOpenExistingDatabase(request.db);

            if(db) {
                await this.handleBulkPutOperation(db.world, request.world, 'world');
                await this.handleBulkPutOperation(db.champions, request.champions, 'champions');
                await this.handleBulkPutOperation(db.leagues, request.leagues, 'leagues');
                await this.handleBulkPutOperation(db.counters, request.counters, 'counters');
                await this.handleBulkPutOperation(db.synergys, request.synergys, 'synergys');
                await this.handleBulkPutOperation(db.players, request.players, 'players');
                await this.handleBulkPutOperation(db.teams, request.teams, 'teams');
                await this.handleBulkPutOperation(db.user, request.user, 'user');
            }

        } catch (error) {
            console.error(error);
        }
    }

    public async handleOpenExistingDatabase(name: string) {
        if (await this.handleDbExistence(name)) {
            const db = new Dexie(name);
            db.version(1).stores({
                user: "id",
                teams: "id",
                players: "id",
                world: 'id',
                leagues: "id",
                champions: "$id",
                counters: "id",
                synergys: "id",
            });
            try {
                if(this.handleDbStatus(db)) {
                    return db;
                } else {
                    await db.open();
                    return db;
                }
            } catch (error) {
                console.error("Failed to open db: ", error);
                return null;
            }
        } else {
            console.log("Database does not exist")
            return null;
        }
    }

    public async handleGetCareerDataFromDatabase(db: Dexie) {
        try {
            const teams: Team[] = await db.table('teams').toArray();
            const players: Player[] = await db.table('players').toArray();
            const user: User[] = await db.table('user').toArray();
            const world: World[] = await db.table('world').toArray();
            const leagues: League[] = await db.table('leagues').toArray();
            const champions: Champion[] = await db.table('champions').toArray();
            const counters: Counter[] = await db.table('counters').toArray();
            const synergys: Synergy[] = await db.table('synergys').toArray();

            return {
                user: user,
                world: world,
                players: players,
                teams: teams,
                leagues: leagues,
                counters: counters,
                synergys: synergys,
                champions: champions
            };
        } catch (error) {
            console.error("Failed to get career data from db: ", error);
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

    async populateDB(request) {
        await this.handleBulkPutOperation(this.dbTemplate.world, request.world, 'world');
        await this.handleBulkPutOperation(this.dbTemplate.champions, request.champions, 'champion');
        await this.handleBulkPutOperation(this.dbTemplate.leagues, request.leagues, 'league');
        await this.handleBulkPutOperation(this.dbTemplate.counters, request.counters, 'counter');
        await this.handleBulkPutOperation(this.dbTemplate.synergys, request.synergys, 'synergy');
        await this.handleBulkPutOperation(this.dbTemplate.players, request.players, 'player');
        await this.handleBulkPutOperation(this.dbTemplate.teams, request.teams, 'team');
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
            if(collection) {
                console.log(collection)
                const lastKey = await collection.bulkPut(items);
                console.log(`Last ${itemName}'s id was: ${lastKey}`);
            }
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
