import Team from '@/models/Team';
import League from '@/models/League';
import Player from '@/models/Player';
import Ratings from '@/models/Ratings';
import Overalls from '@/models/Overalls';
import Potentials from '@/models/Potentials';
import faker from 'faker';
import ITeam from '@/interfaces/ITeam';

export default class TeamService {
    private static instance: TeamService;

    constructor() {}

    public static getInstance(): TeamService {
        if (!TeamService.instance) {
            TeamService.instance = new TeamService();
        }

        return TeamService.instance;
    }

    handleCreateNewTeams(teams: ITeam[])
    {
        const _teams = teams.map(team => {
            return this.handleGenerateTeam(team);
        })

        console.log(_teams);

        Team.insert({
            data: _teams
        })
    }

    handleGenerateTeam(data) {
        return {
            id: data.tid + 1,
            lid: 1,
            tid: data.tid + 1,
            cid: data.cid,
            did: data.did,
            name: data.name,
            abbreviation: data.abbrev,
            img_url: data.img_url,
            country: 'USA',
            budget: {
                scouting: {
                    amount: data.budget.scouting.amount,
                    rank: data.budget.scouting.rank,
                },
                coaching: {
                    rank: data.budget.coaching.rank,
                    amount: data.budget.coaching.amount,
                },
                health: {
                    rank: data.budget.health.rank,
                    amount: data.budget.health.amount,
                },
                facilities: {
                    rank: data.budget.facilities.rank,
                    amount: data.budget.facilities.amount,
                }
            },
            strategy: data.strategy,
            population: data.pop,
            stadium_capacity: data.stadiumCapacity,
            seasons: data.seasons
        }
    }

    handleGetDefaultTeams() {
        const teams: Team[] = Team.all().map((team: Team) => {
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

    public async evaluateTeamPerformance(teamId: number, ratingsMap: Map<number, Ratings>): Promise<number> {
        const team = Team.query().with('players').where('id', teamId).first();

        if (!team) {
            throw new Error(`Team with id ${teamId} not found`);
        }

        let totalPlayerRating = 0;

        team.players.forEach((player: Player) => {
            const playerRating = ratingsMap.get(player.pid);
            if (playerRating) {
                totalPlayerRating += playerRating.overall;
            }
        });

        const averagePlayerRating = totalPlayerRating / team.players.length;
        
        return averagePlayerRating;
    }
}
