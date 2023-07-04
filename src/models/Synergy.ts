import { Model } from '@vuex-orm/core'
import Champion from '@/models/Champion';

export default class Synergy extends Model {
    static entity = 'synergys'
    static fields () {
        return {
            id: this.attr(null),
            pid: this.number(null),
            cid: this.hasOne(Champion, 'cid'),
            synergy: this.number(null)
        }
    }
}
