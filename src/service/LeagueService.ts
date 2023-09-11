import League from '@/models/League';
import Team from "@/models/Team";
import Match from "@/models/Match";
import _ from 'lodash';

export default class LeagueService {
    private static instance: LeagueService;

    constructor() {}

    public static getInstance(): LeagueService {
        if (!LeagueService.instance) {
            LeagueService.instance = new LeagueService();
        }

        return LeagueService.instance;
    }

    async handleCreateDefaultLeagues()
    {
        await League.insert({
            data: [
                {
                    id: 1,
                    name: "Legends Champions Korea",
                    abbrev: "LCK",
                    country: "South Korea",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 2,
                    name: "Legends Pro League",
                    abbrev: "LPL",
                    country: "China",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 3,
                    name: "Legends EMEA Championship",
                    abbrev: "LEC",
                    country: "Europe, Middle East & Africa",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 4,
                    name: "Legends Champions Series",
                    abbrev: "LCS",
                    country: "North America",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 5,
                    name: "Pacific Champions Series",
                    abbrev: "PCS",
                    country: "Taiwan, Hong Kong, Macau, & Southeast Asia",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 6,
                    name: "Vietnam Champions Series",
                    abbrev: "VCS",
                    country: "Vietnam",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 7,
                    name: "Campeonato Brasileiro de Legends",
                    abbrev: "CBL",
                    country: "Brazil",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 8,
                    name: "Legends Japan League",
                    abbrev: "LJL",
                    country: "Japan",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 9,
                    name: "Liga Latino America",
                    abbrev: "LLA",
                    country: "Mexico",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 10,
                    name: "Legends Circuit Oceania",
                    abbrev: "LCO",
                    country: "Australia",
                    wid: 0,
                    phase: 0,
                    tier: 1,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 11,
                    name: "LCK Academy Championship",
                    abbrev: "LCKAC",
                    country: "South Korea",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 12,
                    name: "LCS Academy Championship",
                    abbrev: "LCSAC",
                    country: "North America",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 13,
                    name: "LPL Academy Championship",
                    abbrev: "LPLAC",
                    country: "China",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 14,
                    name: "LEC Academy Championship",
                    abbrev: "LECAC",
                    country: "Europe, Middle East & Africa",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 15,
                    name: "PCS Academy Champsionship",
                    abbrev: "PCSAC",
                    country: "Taiwan, Hong Kong, Macau, & Southeast Asia",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 16,
                    name: "VCS Academy Championship",
                    abbrev: "VCSAC",
                    country: "Vietnam",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 17,
                    name: "CBL Academy Championship",
                    abbrev: "CBLAC",
                    country: "Brazil",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 18,
                    name: "LJL Academy Championship",
                    abbrev: "LJLAC",
                    country: "Japan",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 19,
                    name: "LLA Academy Championship",
                    abbrev: "LLAAC",
                    country: "Mexico",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 20,
                    name: "LCO Academy Championship",
                    abbrev: "LCOAC",
                    country: "Australia",
                    wid: 0,
                    phase: 0,
                    tier: 2,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 21,
                    name: "La Legend Francaise",
                    abbrev: "LFL",
                    country: "France",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 22,
                    name: "Turkey Championship League",
                    abbrev: "TCL",
                    country: "Turkey",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 23,
                    name: "LVP Superliga",
                    abbrev: "LVP",
                    country: "Spain",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 24,
                    name: "Prime League",
                    abbrev: "PL",
                    country: "Germany, Austria, Switzerland",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 25,
                    name: "Northern Legends Championship",
                    abbrev: "NLC",
                    country: "Nordics, UK, Ireland",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 26,
                    name: "Ultraliga",
                    abbrev: "UL",
                    country: "Poland & Baltics",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 27,
                    name: "Liga Portuguesa de Legends",
                    abbrev: "LPDL",
                    country: "Portugal",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 28,
                    name: "Greek Legends League",
                    abbrev: "NLC",
                    country: "GLL",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 29,
                    name: "PG National League",
                    abbrev: "PGNL",
                    country: "Italy",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                },
                {
                    id: 30,
                    name: "Arabian League",
                    abbrev: "NLC",
                    country: "Middle East & North Africa",
                    wid: 0,
                    phase: 0,
                    tier: 3,
                    scheduleType: 'DEFAULT'
                }
            ]
        })

        for(let i = 0; i < 30; i++) {
            await this.generateSchedule(i);
        }
    }

    async generateSchedule(leagueId) {
        let teams = Team.query().where('lid', leagueId).get();
        let shuffledTeams = _.shuffle(teams);
        let matches = this.handleGenerateMatches(shuffledTeams);

        for (let week in matches) {
            for (let match of matches[week]) {
                console.log(match);
                 await Match.insert({
                    data: {
                        homeTeamId: match.homeTeam.tid,
                        awayTeamId: match.awayTeam.tid,
                        week: parseInt(week) + 1,
                        leagueId: leagueId,
                    }
                });
            }
        }
    }

    handleGenerateMatches(teams) {
        let teams2 = teams.slice()
        let matches = []

        if (teams2.length % 2 === 1) {
            teams2.push(null)
        }

        const weeks = 2; // Define the number of rounds, it is missing in your function.

        for (let matchday = 0; matchday < weeks * (teams2.length - 1); matchday++) {
            matches.push([])
            for (let match = 0; match < teams2.length / 2; match++) {
                let homeTeam, awayTeam;

                if (matchday % 2 === 1) {
                    homeTeam = teams2[match]
                    awayTeam = teams2[teams2.length - match - 1]
                } else {
                    homeTeam = teams2[teams2.length - match - 1]
                    awayTeam = teams2[match]
                }

                if (homeTeam !== null && awayTeam !== null) {
                    matches[matchday].push({homeTeam: homeTeam, awayTeam: awayTeam})
                }
            }
            teams2 = [teams2[0], teams2[teams2.length - 1]].concat(teams2.slice(1, teams2.length - 1))
        }

        return matches;
    }
}
