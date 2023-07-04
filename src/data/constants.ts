export const DIFFICULTY = {
    Easy: -0.25,
    Normal: 0,
    Hard: 0.25,
    Insane: 1,
};

export type PHASE = {
    name: string;
    startWeek: number;
    endWeek: number;
};

export const DEFAULT_PHASE: {
        PRESEASON: number;
        SPRING_SEASON: number;
        SPRING_PLAYOFFS: number;
        MID_SEASON_INVITATIONAL: number;
        SUMMER_SEASON: number;
        SUMMER_PLAYOFFS: number;
        REGIONAL_FINALS: number;
        WORLD_CHAMPIONSHIP: number;
        OFFSEASON: number;
    } = {
        PRESEASON: 0,
        SPRING_SEASON: 1,
        SPRING_PLAYOFFS: 2,
        MID_SEASON_INVITATIONAL: 3,
        SUMMER_SEASON: 4,
        SUMMER_PLAYOFFS: 5,
        REGIONAL_FINALS: 6,
        WORLD_CHAMPIONSHIP: 7,
        OFFSEASON: 8,
};

export const LEC_PHASE: {
        PRESEASON: number;
        WINTER_SEASON: number;
        WINTER_PLAYOFFS: number;
        SPRING_SEASON: number;
        SPRING_PLAYOFFS: number;
        MID_SEASON_INVITATIONAL: number;
        SUMMER_SEASON: number;
        SUMMER_PLAYOFFS: number;
        REGIONAL_FINALS: number;
        WORLD_CHAMPIONSHIP: number;
        OFFSEASON: number;
    } = {
        PRESEASON: 0,
        WINTER_SEASON: 1,
        WINTER_PLAYOFFS: 2,
        SPRING_SEASON: 3,
        SPRING_PLAYOFFS: 4,
        MID_SEASON_INVITATIONAL: 5,
        SUMMER_SEASON: 6,
        SUMMER_PLAYOFFS: 7,
        REGIONAL_FINALS: 8,
        WORLD_CHAMPIONSHIP: 9,
        OFFSEASON: 10,
}

const LEC_SCHEDULE: Phase[] = [
    { id: 0, name: 'PRESEASON', startWeek: 1, endWeek: 2 },
    { id: 1, name: 'WINTER_SEASON', startWeek: 3, endWeek: 10 },
    { id: 2, name: 'WINTER_PLAYOFFS', startWeek: 11, endWeek: 13 },
    { id: 3, name: 'SPRING_SEASON', startWeek: 14, endWeek: 21 },
    { id: 4, name: 'SPRING_PLAYOFFS', startWeek: 22, endWeek: 24 },
    { id: 5, name: 'MID_SEASON_INVITATIONAL', startWeek: 25, endWeek: 27 },
    { id: 6, name: 'SUMMER_SEASON', startWeek: 28, endWeek: 35 },
    { id: 7, name: 'SUMMER_PLAYOFFS', startWeek: 36, endWeek: 38 },
    { id: 8, name: 'REGIONAL_FINALS', startWeek: 39, endWeek: 41 },
    { id: 9, name: 'WORLD_CHAMPIONSHIP', startWeek: 42, endWeek: 44 },
    { id: 10, name: 'OFFSEASON', startWeek: 45, endWeek: 52 }
];

const DEFAULT_SCHEDULE: Phase[] = [
    { id: 0, name: 'PRESEASON', startWeek: 1, endWeek: 2 },
    { id: 1, name: 'SPRING_SEASON', startWeek: 3, endWeek: 10 },
    { id: 2, name: 'SPRING_PLAYOFFS', startWeek: 11, endWeek: 13 },
    { id: 3, name: 'MID_SEASON_INVITATIONAL', startWeek: 14, endWeek: 16 },
    { id: 4, name: 'SUMMER_SEASON', startWeek: 17, endWeek: 24 },
    { id: 5, name: 'SUMMER_PLAYOFFS', startWeek: 25, endWeek: 27 },
    { id: 6, name: 'REGIONAL_FINALS', startWeek: 28, endWeek: 30 },
    { id: 7, name: 'WORLD_CHAMPIONSHIP', startWeek: 31, endWeek: 33 },
    { id: 8, name: 'OFFSEASON', startWeek: 34, endWeek: 52 }
];

export type PLAYER_STATE = {
    FREE_AGENT: 1,
    RETIRED: 2,
    SIGNED: 3
};

export type PLAYER_CONTRACT = {
    amountPerYear: number,
    length: number,
    salaries: [],
    teamOption: false,
    playerOption: false
}

export type PLAYER_SALARY = {
    amount: number,
    season: number
}

export const PLAYER_INJURY = {
    gamesRemaining: number,
    type: string,
    severity: "Minor" | "Major" | "Career Ending"
}

export const BudgetItem = {
    amount: number,
    rank: number
}

export const GAME = {
    gid: null,
    homeTeam: {
        tid: number,
    },
    won: {
        tid: number,
        pts: number
    },
    lost: {
        tid: number,
        pts: number
    }
}

export const DEFAULT_CONFS = [
    {
        "cid": 0,
        "name": "American Conference",
    },
    {
        "cid": 1,
        "name": "National Conference",
    },

];

export const DEFAULT_DIVS = [
    {
        "did": 0,
        "cid": 0,
        "name": "East",
    },
    {
        "did": 1,
        "cid": 0,
        "name": "North",
    },
    {
        "did": 2,
        "cid": 0,
        "name": "South",
    },
    {
        "did": 3,
        "cid": 0,
        "name": "West",
    },
    {
        "did": 4,
        "cid": 1,
        "name": "East",
    },
    {
        "did": 5,
        "cid": 1,
        "name": "North",
    },
    {
        "did": 6,
        "cid": 1,
        "name": "South",
    },
    {
        "did": 7,
        "cid": 1,
        "name": "West",
    },
];

export const PLAYER_GAME_STATS = {
    passing: {
        name: "Passing",
        stats: [
            "pssCmp",
            "pss",
            "cmpPct",
            "pssYds",
            "pssTD",
            "pssInt",
            "pssSk",
            "pssSkYds",
            "qbRat",
            "fmbLost",
            "fp",
        ],
        sortBy: ["pssYds"],
    },
    rushing: {
        name: "Rushing",
        stats: [
            "rus",
            "rusYds",
            "rusYdsPerAtt",
            "rusLng",
            "rusTD",
            "fmbLost",
            "fp",
        ],
        sortBy: ["rusYds"],
    },
    receiving: {
        name: "Receiving",
        stats: ["tgt", "rec", "recYds", "recYdsPerAtt", "recLng", "recTD", "fp"],
        sortBy: ["recYds"],
    },
    kicking: {
        name: "Kicking",
        stats: [
            "fg",
            "fga",
            "fgPct",
            "fgLng",
            "xp",
            "xpa",
            "xpPct",
            "kickingPts",
            "fp",
        ],
        sortBy: ["kickingPts"],
    },
    punting: {
        name: "Punting",
        stats: ["pnt", "pntYdsPerAtt", "pntIn20", "pntTB", "pntLng", "pntBlk"],
        sortBy: ["pnt"],
    },
    returns: {
        name: "Returns",
        stats: [
            "kr",
            "krYds",
            "krYdsPerAtt",
            "krLng",
            "krTD",
            "pr",
            "prYds",
            "prYdsPerAtt",
            "prLng",
            "prTD",
        ],
        sortBy: ["krYds", "prYds"],
    },
    defense: {
        name: "Defense",
        stats: [
            "defTckSolo",
            "defTckAst",
            "defTck",
            "defTckLoss",
            "defSk",
            "defSft",
            "defPssDef",
            "defInt",
            "defIntYds",
            "defIntTD",
            "defIntLng",
            "defFmbFrc",
            "defFmbRec",
            "defFmbYds",
            "defFmbTD",
            "defFmbLng",
        ],
        sortBy: ["defTck"],
    },
};

export const PLAYER_SUMMARY = {
    summaryPss: {
        name: "SummaryQB",
        onlyShowIf: ["QB"],
        stats: [
            "gp",
            "av",
            "qbRec",
            "cmpPct",
            "pssYds",
            "pssYdsPerAtt",
            "pssTD",
            "pssInt",
        ],
    },
    summaryRus: {
        name: "SummaryRus",
        onlyShowIf: ["RB"],
        stats: ["gp", "av", "rus", "rusYds", "rusYdsPerAtt", "rusTD"],
    },
    summaryRec: {
        name: "SummaryRec",
        onlyShowIf: ["WR", "TE"],
        stats: ["gp", "av", "rec", "recYds", "recYdsPerRec", "recTD"],
    },
    summaryOL: {
        name: "SummaryOL",
        onlyShowIf: ["OL"],
        stats: ["gp", "av"],
    },
    summaryKic: {
        name: "SummaryKic",
        onlyShowIf: ["K"],
        stats: ["gp", "av", "fg", "fga", "xp", "xpa"],
    },
    summaryPunt: {
        name: "SummaryPunt",
        onlyShowIf: ["P"],
        stats: ["gp", "av", "pnt", "pntYds", "pntYdsPerAtt"],
    },
    summaryDef: {
        name: "SummaryDef",
        onlyShowIf: ["DL", "LB", "CB", "S"],
        stats: ["gp", "av", "defTck", "defSk", "defFmbRec", "defInt"],
    },
};

export const PLAYER_STATS_TABLES = {
    passing: {
        name: "Passing",
        onlyShowIf: ["pss"],
        stats: [
            "gp",
            "gs",
            "qbRec",
            "pssCmp",
            "pss",
            "cmpPct",
            "pssYds",
            "pssTD",
            "pssTDPct",
            "pssInt",
            "pssIntPct",
            "pssLng",
            "pssYdsPerAtt",
            "pssAdjYdsPerAtt",
            "pssYdsPerCmp",
            "pssYdsPerGame",
            "qbRat",
            "pssSk",
            "pssSkYds",
            "pssNetYdsPerAtt",
            "pssAdjNetYdsPerAtt",
            "pssSkPct",
            "fp",
            "av",
        ],
    },
    rushing: {
        name: "Rushing and Receiving",
        onlyShowIf: ["rus", "rec"],
        stats: [
            "gp",
            "gs",
            "rus",
            "rusYds",
            "rusTD",
            "rusLng",
            "rusYdsPerAtt",
            "rusYdsPerGame",
            "rusPerGame",
            "tgt",
            "rec",
            "recYds",
            "recTD",
            "recLng",
            "recYdsPerRec",
            "recPerGame",
            "recYdsPerGame",
            "recCatchPct",
            "touches",
            "ydsPerTouch",
            "ydsFromScrimmage",
            "rusRecTD",
            "fmb",
            "fp",
            "av",
        ],
    },
    defense: {
        name: "Defense, Fumbles, and Penalties",
        onlyShowIf: ["gp"],
        stats: [
            "gp",
            "gs",
            "defInt",
            "defIntYds",
            "defIntTD",
            "defIntLng",
            "defPssDef",
            "defFmbFrc",
            "defFmbRec",
            "defFmbYds",
            "defFmbTD",
            "defFmbLng",
            "defSk",
            "defTck",
            "defTckSolo",
            "defTckAst",
            "defTckLoss",
            "defSft",
            "fmb",
            "fmbLost",
            "pen",
            "penYds",
            "av",
        ],
    },
    kicking: {
        name: "Kicking and Punting",
        onlyShowIf: ["fga", "xpa", "pnt"],
        stats: [
            "gp",
            "gs",
            "fg0",
            "fga0",
            "fg20",
            "fga20",
            "fg30",
            "fga30",
            "fg40",
            "fga40",
            "fg50",
            "fga50",
            "fgLng",
            "fg",
            "fga",
            "fgPct",
            "xp",
            "xpa",
            "xpPct",
            "pnt",
            "pntYds",
            "pntLng",
            "pntBlk",
            "pntYdsPerAtt",
            "fp",
            "av",
        ],
    },
    returns: {
        name: "Kick and Punt Returns",
        onlyShowIf: ["pr", "kr"],
        stats: [
            "gp",
            "gs",
            "pr",
            "prYds",
            "prTD",
            "prLng",
            "prYdsPerAtt",
            "kr",
            "krYds",
            "krTD",
            "krLng",
            "krYdsPerAtt",
            "allPurposeYds",
            "av",
        ],
    },
};

export const TEAM_STATS_TABLES = {
    team: {
        name: "Team",
        stats: [
            "pts",
            "yds",
            "ply",
            "ydsPerPlay",
            "tov",
            "fmbLost",
            "pssCmp",
            "pss",
            "pssYds",
            "pssTD",
            "pssInt",
            "pssNetYdsPerAtt",
            "rus",
            "rusYds",
            "rusTD",
            "rusYdsPerAtt",
            "pen",
            "penYds",
            "drives",
            "drivesScoringPct",
            "drivesTurnoverPct",
            "avgFieldPosition",
            "timePerDrive",
            "playsPerDrive",
            "ydsPerDrive",
            "ptsPerDrive",
        ],
    },
    opponent: {
        name: "Opponent",
        stats: [
            "oppPts",
            "oppYds",
            "oppPly",
            "oppYdsPerPlay",
            "oppTov",
            "oppFmbLost",
            "oppPssCmp",
            "oppPss",
            "oppPssYds",
            "oppPssTD",
            "oppPssInt",
            "oppPssNetYdsPerAtt",
            "oppRus",
            "oppRusYds",
            "oppRusTD",
            "oppRusYdsPerAtt",
            "oppPen",
            "oppPenYds",
            "oppDrives",
            "oppDrivesScoringPct",
            "oppDrivesTurnoverPct",
            "oppAvgFieldPosition",
            "oppTimePerDrive",
            "oppPlaysPerDrive",
            "oppYdsPerDrive",
            "oppPtsPerDrive",
        ],
    },
};

export const POSITIONS = [
    "QB",
    "RB",
    "FB",
    "WR",
    "TE",
    "LT",
    "LG",
    "C",
    "RG",
    "RT",
    "DT",
    "LE",
    "RE",
    "OLB",
    "MLB",
    "CB",
    "FS",
    "SS",
    "K",
    "P",
    "KR",
    "PR",
];

export const MAX_POSITION_COUNTS = {
    QB: 4,
    RB: 5,
    FB: 2,
    WR: 7,
    TE: 4,
    LT: 3,
    LG: 3,
    C: 3,
    RG: 3,
    RT: 3,
    DT: 6,
    LE: 4,
    RE: 4,
    OLB: 6,
    MLB: 4,
    CB: 6,
    FS: 3,
    SS: 3,
    K: 1,
    P: 1,
};

export const MIN_POSITION_COUNTS = {
    QB: 2,
    RB: 2,
    FB: 1,
    WR: 5,
    TE: 2,
    LT: 1,
    LG: 1,
    C: 1,
    RG: 1,
    RT: 1,
    DT: 2,
    LE: 1,
    RE: 1,
    OLB: 2,
    MLB: 2,
    CB: 4,
    FS: 1,
    SS: 1,
    K: 1,
    P: 1,
};

export const RATINGS = [
    "HGT",
    "STR",
    "SPD",
    "END",
    "THP",
    "THA",
    "bsc",
    "elu",
    "rtr",
    "hnd",
    "rbk",
    "pbk",
    "pcv",
    "tck",
    "prs",
    "rns",
    "kpw",
    "kac",
    "ppw",
    "pac",
];
