import { Model } from '@vuex-orm/core'
import League from '@/models/League';

export default class Phase extends Model {
    static entity = 'phase'
    static fields () {
        return {
            id: this.attr(null),
            date: this.attr(''),
            season: this.number(1),
        }
    }
}
