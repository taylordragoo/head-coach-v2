export const DIFFICULTY = {
    Easy: -0.25,
    Normal: 0,
    Hard: 0.25,
    Insane: 1,
};

export type PHASE = {
    id: number;
    name: string;
    display_name: string;
    startWeek: number;
    endWeek: number;
};

export const DEFAULT_SCHEDULE: PHASE[] = [
    { id: 0, name: 'END_OF_SEASON', display_name: 'End of Season', startWeek: 7, endWeek: 8 },
    { id: 1, name: 'FREE_AGENCY', display_name: 'Free Agency', startWeek: 9, endWeek: 12 },
    { id: 2, name: 'SCOUTING_COMBINE', display_name: 'Scouting Combine', startWeek: 13, endWeek: 14 },
    { id: 3, name: 'PRO_DAYS', display_name: 'Pro Days', startWeek: 15, endWeek: 16 },
    { id: 4, name: 'DRAFT', display_name: 'Draft', startWeek: 17, endWeek: 18 },
    { id: 5, name: 'AFTER_DRAFT', display_name: 'Post-Draft Free Agency', startWeek: 19, endWeek: 20 },
    { id: 6, name: 'ROOKIE_MINICAMP', display_name: 'Rookie Minicamp', startWeek: 21, endWeek: 22 },
    { id: 7, name: 'OTA', display_name: 'Organized Team Activities', startWeek: 23, endWeek: 26 },
    { id: 8, name: 'TRAINING_CAMP', display_name: 'Training Camp', startWeek: 27, endWeek: 30 },
    { id: 9, name: 'PRESEASON', display_name: 'Preseason', startWeek: 31, endWeek: 34 },
    { id: 10, name: 'REGULAR_SEASON', display_name: 'Regular Season', startWeek: 35, endWeek: 44 },
    { id: 11, name: 'PLAYOFFS', display_name: 'Playoffs', startWeek: 45, endWeek: 1 },
    { id: 12, name: 'SUPER_BOWL', display_name: 'Super Bowl', startWeek: 2, endWeek: 3 },
    { id: 13, name: 'POST_SEASON', display_name: 'Post-Season', startWeek: 4, endWeek: 6 }
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

export type PLAYER_INJURY = {
    gamesRemaining: number,
    type: string,
    severity: "Minor" | "Major" | "Career Ending"
}

export type BudgetItem = {
    amount: number,
    rank: number
}

export type GAME = {
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

export const COACH_ROLES = [
    "Head Coach",
    "Offensive Coordinator",
    "Defensive Coordinator",
    "Quarterbacks Coach",
    "Running Backs Coach",
    "Wide Receivers Coach",
    "Tight Ends Coach",
    "Offensive Line Coach",
    "Defensive Line Coach",
    "Linebackers Coach",
    "Secondary Coach",
    "Strengh & Conditioning Coach",
    "Special Teams Coach",
    "Coach"
];

export const EXECUTIVE_ROLES = [
    "Owner",
    "President",
    "Chief Executive Officer",
];

export const FRONT_OFFICE_ROLES = [
    "General Manager",
    "Assistant General Manager",
    "Directory of Pro Scouting",
    "Director of College Scouting",
    "Scout"
];

export const SPORTS_MED_ROLES = [
    "Director of Sports Medicine",
    "Director of Sports Science",
    "Doctor",
    "Trainer",
    "Sports Scientist"
]

export const POSITIONS = [
    "QB",
    "RB",
    "WR",
    "TE",
    "OL",
    "DL",
    "LB",
    "CB",
    "S",
    "K",
    "P",
    "RS"
];

export const DEPTH_CHART_POSITIONS = [
    "All",
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
    "LE",
    "RE",
    "DT",
    "LOLB",
    "MLB",
    "ROLB",
    "CB",
    "SS",
    "FS",
    "K",
    "P",
    "KR",
    "PR",
    "LS",
];

export const OFF_POSITIONS = [
    "QB",
    "RB",
    "WR",
    "TE",
    "OL",
    "K",
];

export const DEF_POSITIONS = [
    "DL",
    "LB",
    "CB",
    "S",
    "P",
];

export const MAX_POSITION_COUNTS = {
    QB: 5,
    RB: 5,
    FB: 2,
    WR: 8,
    TE: 5,
    LT: 3,
    LG: 3,
    C: 3,
    RG: 3,
    RT: 3,
    DT: 6,
    LE: 4,
    RE: 4,
    LOLB: 4,
    MLB: 4,
    ROLB: 4,
    CB: 8,
    FS: 4,
    SS: 4,
    K: 2,
    P: 2,
    KR: 2,
    PR: 2,
    LS: 2
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
    "STR",
    "SPD",
    "END",
    "THP",
    "THA",
    "BSC",
    "ELU",
    "RTR",
    "HND",
    "RBK",
    "PBK",
    "PCV",
    "TCK",
    "PRS",
    "RNS",
    "KPW",
    "KAC",
    "PPW",
    "PAC",
];