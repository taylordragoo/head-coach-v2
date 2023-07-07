import {Model} from "@vuex-orm/core";

export default class Activity extends Model {
    static entity: string = 'activity';

    static fields(): { affectedAttributes: Attr, description: String, id: Attr, name: String } {
        return {
            id: this.attr(null),
            name: this.string(''),
            description: this.string(''),
            affectedAttributes: this.attr([]), // e.g., ['passing', 'shooting']
        }
    }
}
