import { Model } from '@vuex-orm/core'
import Counter from '@/models/Counter';
import Synergy from '@/models/Synergy';

export default class Champion extends Model {
    static entity = 'champions'
    static fields () {
        return {
            cid: this.number(null),
            name: this.attr(''),
            full_name: this.attr(''),
            role: this.attr(''),
            damage: this.number(0),
            toughness: this.number(0),
            control: this.number(0),
            mobility: this.number(0),
            utility: this.number(0),
            type: this.attr(''),
            eml: this.attr(''),
            top: this.number(0),
            jungle: this.number(0),
            mid: this.number(0),
            adc: this.number(0),
            sup: this.number(0),
            counters: this.hasMany(Counter, 'pid'),
            synergys: this.hasMany(Synergy, 'pid')
        }
    }
}

