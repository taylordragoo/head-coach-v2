import { Model } from '@vuex-orm/core'
import Season from '@/models/Season';
import Stats from '@/models/Stats';
import Player from '@/models/Player';

export default class Team extends Model {
    static entity = 'team'
    static fields() {
        return {
            id: this.attr(null),
            tid: this.attr(null),
            lid: this.attr(null),
            name: this.attr(''),
            abbreviation: this.attr(''),
            country: this.attr(''),
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
            coach: this.attr({
                top: 0,
                jgl: 0,
                mid: 0,
                adc: 0,
                sup: 0,
                topJGL: 0,
                jglJGL: 0,
                midJGL: 0,
                adcJGL: 0,
                supJGL: 0,
            }),
            seasons: this.hasMany(Season, 'tid'),
            stats: this.hasMany(Stats, 'tid'),
            players: this.hasMany(Player, 'tid')
        };
    }
}

