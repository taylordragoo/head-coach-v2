import { Model } from '@vuex-orm/core'

export default class Staff extends Model {
    static entity = 'staff'

    static fields() {
        return {
            id: this.attr(null),
            name: this.attr(''),
            position: this.attr(''),
            image: this.attr(''),
            bio: this.attr('')
        }
    }
}