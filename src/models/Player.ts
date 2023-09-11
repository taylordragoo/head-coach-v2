import { Model } from '@vuex-orm/core';
import Team from '@/models/Team';

export default class Player extends Model {
    static entity: string = 'player';

    static fields() {
        return {
            id: this.attr(null),
            team_id: this.attr(''),
            statsTids: this.attr([]),
            languages: this.attr([]),
            firstName: this.string(''),
            lastName: this.string(''),
            userID: this.string(''),
            born: this.attr({
                year: 0,
                country: '',
                loc: '',
                maleFemale: ''
            }),
            ratings: this.attr([]),
            champions: this.attr([]),
            championsRnk: this.attr({}),
            championAverage: this.number(-1),
            pos: this.string(''),
            hgt: this.number(0),
            weight: this.number(0),
            college: this.string(''),
            awards: this.attr([]),
            yearsFreeAgent: this.number(0),
            retiredYear: this.number(null),
            injury: this.attr({
                type: '',
                gamesRemaining: 0
            }),
            ptModifier: this.number(1),
            pick: this.number(0),
            ban: this.number(0),
            hof: this.boolean(false),
            watch: this.boolean(false),
            gamesUntilTradeable: this.number(0),
            value: this.number(0),
            valueNoPot: this.number(0),
            valueMMR: this.number(0),
            valueFuzz: this.number(0),
            valueNoPotFuzz: this.number(0),
            valueWithContract: this.number(0),
            salaries: this.attr([]),
            contract: this.attr({
                amount: 0,
                exp: 0
            }),
            pid: this.number(0),
            diedYear: this.number(null),
            team: this.belongsTo(Team, 'team_id')
        }
    }
}
