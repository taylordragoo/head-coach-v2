import { Model } from '@vuex-orm/core'
import Champion from '@/models/Champion';

export default class Counter extends Model {
    static entity = 'counters'
    static fields () {
        return {
            id: this.attr(null),
            pid: this.number(null),
            cid: this.hasOne(Champion, 'cid'),
            counter: this.number(null)
        }
    }
}
