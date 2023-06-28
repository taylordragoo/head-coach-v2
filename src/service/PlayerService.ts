import Player from '@/models/Player';
import faker from 'faker';

export default class PlayerService {
    private static instance: PlayerService;

    constructor() {}

    public static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }

        return PlayerService.instance;
    }

    handleCreatePlayers(tid) {
        const p = this.handleGeneratePlayer(tid)
        Player.insert({
            data: p
        })

        console.log("Player Created");
    }

    handleGeneratePlayer(tid) {
        const player = new Player();

        player.tid = tid;
        player.statsTids = [player.tid];
        player.languages = [faker.address.country()];
        player.firstName = faker.name.firstName();
        player.lastName = faker.name.lastName();
        player.userID = faker.internet.userName(player.firstName, player.lastName);
        player.born = {
            year: faker.date.past(30).getFullYear(),
            country: faker.address.country(),
            loc: faker.address.countryCode(),
            maleFemale: faker.random.arrayElement(['Male', 'Female'])
        };
        player.ratings = [{
            fuzz: faker.random.number({ min: 1, max: 5, precision: 0.01 }),
            ovr: faker.datatype.number({ min: 1, max: 20 }),
            pos: faker.random.arrayElement(['TOP', 'JGL', 'MID', 'ADC', 'SUP']),
            pot: faker.datatype.number({ min: 1, max: 20 }),
            season: faker.date.recent().getFullYear(),
            seasonSplit: faker.random.arrayElement(['Spring', 'Summer']),
            region: faker.random.arrayElement(['BR', 'NA', 'EU', 'KR', 'CN']),
            MMR: faker.datatype.number({ min: 2000, max: 3000 }),
            rank: faker.random.arrayElement(['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger']),
            oldOVR: faker.datatype.boolean()
        }];
        player.champions = Array.from({ length: 10 }, () => faker.datatype.number({ min: 1, max: 20 }));
        player.pos = faker.random.arrayElement(['TOP', 'JGL', 'MID', 'ADC', 'SUP']);
        player.hgt = faker.datatype.number({ min: 60, max: 84 });
        player.weight = faker.datatype.number({ min: 100, max: 300 });
        player.college = faker.random.arrayElement(['Harvard University', 'Stanford University', 'Massachusetts Institute of Technology', 'California Institute of Technology']);
        player.awards = [];
        player.yearsFreeAgent = 0;
        player.retiredYear = null;
        player.injury = {
            type: faker.random.arrayElement(['Healthy', 'Day-to-Day', 'Out for Season']),
            gamesRemaining: faker.datatype.number({ min: 0, max: 82 })
        };
        player.ptModifier = faker.random.number({ min: 0.5, max: 1.5, precision: 0.01 });
        player.pick = 0;
        player.ban = 0;
        player.hof = faker.datatype.boolean();
        player.watch = faker.datatype.boolean();
        player.gamesUntilTradable = 0;
        player.value = faker.random.number({ min: 40, max: 60, precision: 0.01 });
        player.valueNoPot = faker.datatype.number({ min: 1, max: 100 });
        player.valueMMR = faker.datatype.number({ min: 2000, max: 3000 });
        player.valueFuzz = faker.random.number({ min: 40, max: 60, precision: 0.01 });
        player.valueNoPotFuzz = faker.datatype.number({ min: 1, max: 100 });
        player.valueWithContract = player.value;
        player.salaries = [];
        player.contract = {
            amount: faker.random.number({ min: 10000, max: 1000000 }),
            exp: faker.date.future().getFullYear()
        };
        player.diedYear = null;

        return player;
    }

    handleConvertRating(value) {
        return Math.ceil(value / 5);
    }
}
