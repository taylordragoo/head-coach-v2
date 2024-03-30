import { Model } from '@vuex-orm/core'
import Season from '@/models/Season';
import Stat from '@/models/Stat';
import Player from '@/models/Player';
import League from "@/models/League";
import Staff from '@/models/Staff';
import Contract from '@/models/Contract';

export default class Team extends Model {
    static entity: string = 'team'

    static fields() {
        return {
            id: this.attr(null),
            tid: this.attr(null),
            lid: this.attr(null),
            cid: this.attr(null),
            name: this.attr(''),
            img_url: this.attr(''),
            abbreviation: this.attr(''),
            country: this.attr(''),
            population: this.attr(0),
            stadium_capacity: this.attr(0),
            retired_numbers: this.attr(''),
            budget: this.attr({
                scouting: {
                    amount: 0,
                    rank: 0,
                },
                coaching: {
                    amount: 0,
                    rank: 0,
                },
                health: {
                    amount: 0,
                    rank: 0,
                },
                facilities: {
                    amount: 0,
                    rank: 0,
                },
            }),
            strategy: this.attr(''),
            seasons: this.hasMany(Season, 'tid'),
            stats: this.hasMany(Stat, 'tid'),
            players: this.hasMany(Player, 'team_id'),
            league: this.belongsTo(League, 'lid'),
            head_coach: this.hasOne(Staff, 'tid'),
            offensive_coordinator: this.hasOne(Staff, 'tid'),
            defensive_coordinator: this.hasOne(Staff, 'tid'),
            qb_coach: this.hasOne(Staff, 'tid'),
            rb_coach: this.hasOne(Staff, 'tid'),
            wr_coach: this.hasOne(Staff, 'tid'),
            te_coach: this.hasOne(Staff, 'tid'),
            oline_coach: this.hasOne(Staff, 'tid'),
            dline_coach: this.hasOne(Staff, 'tid'),
            linebacker_coach: this.hasOne(Staff, 'tid'),
            secondary_coach: this.hasOne(Staff, 'tid'),
            st_coach: this.hasOne(Staff, 'tid'),
            coach: this.hasOne(Staff, 'tid'),
        };
    }

    id!: number
    tid!: number
    lid!: number
    cid!: number
    name!: string | null
    img_url!: string | null
    abbreviation!: string | null
    country!: string | null
    population!: number | null
    stadium_capacity!: number | null
    retired_numbers!: string | null
    budget!: {
        scouting: {
            amount: number | null
            rank: number | null
        },
        defense: {
            amount: number | null
            rank: number | null
        },
        health: {
            amount: number | null
            rank: number | null
        },
        facilities: {
            amount: number | null
            rank: number | null
        },
    }
    strategy!: string | null
    seasons!: Season[] | null
    stats!: Stat[] | null
    players!: Player[]
    league!: League
    head_coach!: Staff | null
    offensive_coordinator!: Staff | null
    defensive_coordinator!: Staff | null
    qb_coach!: Staff | null
    rb_coach!: Staff | null
    wr_coach!: Staff | null
    te_coach!: Staff | null
    oline_coach!: Staff | null
    dline_coach!: Staff | null
    secondary_coach!: Staff | null
    st_coach!: Staff | null
    coach!: Staff | null
}
