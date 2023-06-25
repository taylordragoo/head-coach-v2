import { Model } from '@vuex-orm/core'
import League from '@/models/League';

export default class World extends Model {
    static entity = 'world'
    static fields () {
        return {
            id: this.attr(null),
            date: this.attr(''),
            season: this.number(null),
            user_id: this.attr(null),
            leagues: this.hasMany(League, 'wid'),
        }
    }
}
