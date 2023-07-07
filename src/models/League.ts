import { Model } from '@vuex-orm/core'
import Team from '@/models/Team';
import Conference from '@/models/Conference';
import Division from '@/models/Division';

export default class League extends Model {
    static entity = 'league'
    static fields () {
        return {
            id: this.attr(null),
            abbrev: this.attr(''),
            name: this.attr(''),
            country: this.string(''),
            wid: this.attr(null),
            teams: this.hasMany(Team, 'lid'),
            phase: this.number(0),
            tier: this.number(0),
            scheduleType: this.string('')
        }
    }
}
