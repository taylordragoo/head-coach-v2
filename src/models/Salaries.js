import { Model } from '@vuex-orm/core'

export default class Salaries extends Model {
    static entity = 'salaries'
    static fields () {
        return {
            id: this.uid(),
            pid: this.attr(null),
            amount: this.number(null),
            season: this.number(null)
        }
    }
}
