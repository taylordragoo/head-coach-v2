import { Model } from '@vuex-orm/core'

export default class Stats extends Model {
    static entity = 'stats'

    static fields() {
        return {
            tid: this.attr(0),
            season: this.attr(''),
            seasonSplit: this.attr(''),
            playoffs: this.boolean(false),
            gp: this.attr(0),
            oppTw: this.attr(0),
            oppInh: this.attr(0),
            oppJM: this.attr(0),
            pts: this.attr(0),
            oppPts: this.attr(0),
            wardP: this.attr(0),
            wardD: this.attr(0),
            kda: this.attr(0),
            oppWardP: this.attr(0),
            oppWardD: this.attr(0),
            oppKDA: this.attr(0),
            oppKls: this.attr(0),
            oppDth: this.attr(0),
            oppAst: this.attr(0),
            opprh: this.attr(0),
            rh: this.attr(0),
            scTwr: this.attr(0),
            scKills: this.attr(0),
            grExpTwr: this.attr(0),
            grExpKills: this.attr(0),
            grGldTwr: this.attr(0),
            grGldKills: this.attr(0),
            tmBuffTwr: this.attr(0),
            tmBuffKills: this.attr(0),
            tmBAdjTwr: this.attr(0),
            tmBAdjKills: this.attr(0),
            TPTwr: this.attr(0),
            TPKills: this.attr(0),
            TwTwr: this.attr(0),
            TwKills: this.attr(0),
            CKTwr: this.attr(0),
            CKKills: this.attr(0),
            CSTwr: this.attr(0),
            CSKills: this.attr(0),
            AgTwr: this.attr(0),
            AgKills: this.attr(0),
            ChmpnTwr: this.attr(0),
            ChmpnKills: this.attr(0),
            riftKills: this.attr(0),
            riftAssists: this.attr(0),
            firstBlood: this.attr(0),
            rid: this.attr(0)
        }
    }
}
``
