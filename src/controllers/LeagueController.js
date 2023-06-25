import { TeamController } from '@/controllers/index';
import LeagueService from '@/service/LeagueService';

export default class LeagueController {

    constructor() {
        this.leagueService = new LeagueService()
        this.teamController = new TeamController()
    }

    create() {
        this.leagueService.handleCreateNewLeagues()
        for(let i = 1; i < 31; i++) {
            this.teamController.create(i)
        }
    }

    read(obj) {

    }

    update(obj) {

    }

    delete(obj) {

    }
}
