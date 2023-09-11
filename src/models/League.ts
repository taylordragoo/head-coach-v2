import { Model } from '@vuex-orm/core'
import Team from '@/models/Team';
import { DEFAULT_SCHEDULE } from '@/data/constants';

export default class League extends Model {
    static entity: string = 'league'

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

    get phase_name() {

        let phase = null;
        // Find the matching phase in DEFAULT_SCHEDULE
        if(this.scheduleType === 'LEC') {
            phase = LEC_SCHEDULE.find(p => p.id === this.phase);
        } else {
            phase = DEFAULT_SCHEDULE.find(p => p.id === this.phase);
        }

        // If there is a matching phase, return its name. Otherwise, return 'Unknown'.
        return phase ? phase.name : 'Unknown';
    }
}
