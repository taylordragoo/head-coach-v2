import League from '@/models/League';

export default class LeagueService {

    handleCreateNewLeagues()
    {
        League.insert({
            data: [
                {
                    id: 1,
                    name: "Legends Champions Korea",
                    abbrev: "LCK",
                    country: "South Korea",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 2,
                    name: "Legends Pro League",
                    abbrev: "LPL",
                    country: "China",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 3,
                    name: "Legends EMEA Championship",
                    abbrev: "LEC",
                    country: "Europe, Middle East & Africa",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 4,
                    name: "Legends Champions Series",
                    abbrev: "LCS",
                    country: "North America",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 5,
                    name: "Pacific Champions Series",
                    abbrev: "PCS",
                    country: "Taiwan, Hong Kong, Macau, & Southeast Asia",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 6,
                    name: "Vietnam Champions Series",
                    abbrev: "VCS",
                    country: "Vietnam",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 7,
                    name: "Campeonato Brasileiro de Legends",
                    abbrev: "CBL",
                    country: "Brazil",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 8,
                    name: "Legends Japan League",
                    abbrev: "LJL",
                    country: "Japan",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 9,
                    name: "Liga Latino America",
                    abbrev: "LLA",
                    country: "Mexico",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 10,
                    name: "Legends Circuit Oceania",
                    abbrev: "LCO",
                    country: "Australia",
                    wid: 0,
                    phase: 0,
                    tier: 1
                },
                {
                    id: 11,
                    name: "LCK Academy Championship",
                    abbrev: "LCKAC",
                    country: "South Korea",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 12,
                    name: "LCS Academy Championship",
                    abbrev: "LCSAC",
                    country: "North America",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 13,
                    name: "LPL Academy Championship",
                    abbrev: "LPLAC",
                    country: "China",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 14,
                    name: "LEC Academy Championship",
                    abbrev: "LECAC",
                    country: "Europe, Middle East & Africa",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 15,
                    name: "PCS Academy Champsionship",
                    abbrev: "PCSAC",
                    country: "Taiwan, Hong Kong, Macau, & Southeast Asia",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 16,
                    name: "VCS Academy Championship",
                    abbrev: "VCSAC",
                    country: "Vietnam",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 17,
                    name: "CBL Academy Championship",
                    abbrev: "CBLAC",
                    country: "Brazil",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 18,
                    name: "LJL Academy Championship",
                    abbrev: "LJLAC",
                    country: "Japan",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 19,
                    name: "LLA Academy Championship",
                    abbrev: "LLAAC",
                    country: "Mexico",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 20,
                    name: "LCO Academy Championship",
                    abbrev: "LCOAC",
                    country: "Australia",
                    wid: 0,
                    phase: 0,
                    tier: 2
                },
                {
                    id: 21,
                    name: "La Legend Francaise",
                    abbrev: "LFL",
                    country: "France",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 22,
                    name: "Turkey Championship League",
                    abbrev: "TCL",
                    country: "Turkey",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 23,
                    name: "LVP Superliga",
                    abbrev: "LVP",
                    country: "Spain",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 24,
                    name: "Prime League",
                    abbrev: "PL",
                    country: "Germany, Austria, Switzerland",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 25,
                    name: "Northern Legends Championship",
                    abbrev: "NLC",
                    country: "Nordics, UK, Ireland",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 26,
                    name: "Ultraliga",
                    abbrev: "UL",
                    country: "Poland & Baltics",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 27,
                    name: "Liga Portuguesa de Legends",
                    abbrev: "LPDL",
                    country: "Portugal",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 28,
                    name: "Greek Legends League",
                    abbrev: "NLC",
                    country: "GLL",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 29,
                    name: "PG National League",
                    abbrev: "PGNL",
                    country: "Italy",
                    wid: 0,
                    phase: 0,
                    tier: 3
                },
                {
                    id: 30,
                    name: "Arabian League",
                    abbrev: "NLC",
                    country: "Middle East & North Africa",
                    wid: 0,
                    phase: 0,
                    tier: 3
                }
            ]
        })
    }
}
