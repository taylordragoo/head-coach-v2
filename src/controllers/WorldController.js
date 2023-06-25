import {
    ChampionController,
    LeagueController
} from '@/controllers/index';
import { WorldService } from '@/service/index';

export default class WorldController {

    constructor() {
        this.worldService = new WorldService()
        this.leagueController = new LeagueController()
        this.championController = new ChampionController()
    }

    create() {
        try {
            this.championController.create()
        } catch(e) {
            console.log(e)
        } finally {
            console.log("Champions created")
            this.worldService.handleCreateNewWorld()
            this.leagueController.create()
        }
    }

    read(obj) {

    }

    update(obj) {

    }

    delete(obj) {

    }
}
