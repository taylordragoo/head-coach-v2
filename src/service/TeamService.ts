import Team from '@/models/Team';
import faker from 'faker';

export default class TeamService {
    private static instance: TeamService;

    constructor() {}

    public static getInstance(): TeamService {
        if (!TeamService.instance) {
            TeamService.instance = new TeamService();
        }

        return TeamService.instance;
    }

    handleCreateNewTeam(lid, tid)
    {
        const team = this.handleGenerateTeam(lid, tid);
        Team.insert({
            data: team
        })
    }

    handleGenerateTeam(lid, tid) {
        const team = new Team();

        // Generate team name and abbreviatio
        team.lid = lid;
        team.tid = tid;
        team.name = faker.company.companyName();
        team.abbreviation = faker.address.countryCode();

        // Generate team country
        team.country = faker.address.country();

        // Generate team budget
        // team.budget.scouting.amount = faker.random.number({ min: 10000, max: 50000, precision: 100 });
        // team.budget.scouting.rank = faker.random.number({ min: 1, max: 5 });
        // team.budget.coaching.amount = faker.random.number({ min: 10000, max: 50000, precision: 100 });
        // team.budget.coaching.rank = faker.random.number({ min: 1, max: 5 });
        // team.budget.health.amount = faker.random.number({ min: 10000, max: 50000, precision: 100 });
        // team.budget.health.rank = faker.random.number({ min: 1, max: 5 });
        // team.budget.facilities.amount = faker.random.number({ min: 10000, max: 50000, precision: 100 });
        // team.budget.facilities.rank = faker.random.number({ min: 1, max: 5 });

        // Generate team strategy
        const strategies = ['aggressive', 'defensive', 'balanced'];
        team.strategy = faker.random.arrayElement(strategies);

        // Generate team coach ratings
        // const coachRatings = [50, 60, 70, 80, 90, 100];
        // team.coach.top = faker.random.arrayElement(coachRatings);
        // team.coach.jgl = faker.random.arrayElement(coachRatings);
        // team.coach.mid = faker.random.arrayElement(coachRatings);
        // team.coach.adc = faker.random.arrayElement(coachRatings);
        // team.coach.sup = faker.random.arrayElement(coachRatings);
        // team.coach.topJGL = faker.random.arrayElement(coachRatings);
        // team.coach.jglJGL = faker.random.arrayElement(coachRatings);
        // team.coach.midJGL = faker.random.arrayElement(coachRatings);
        // team.coach.adcJGL = faker.random.arrayElement(coachRatings);
        // team.coach.supJGL = faker.random.arrayElement(coachRatings);

        return team;
    }

    handleGetDefaultTeams() {
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

        return teams;
    }
}
