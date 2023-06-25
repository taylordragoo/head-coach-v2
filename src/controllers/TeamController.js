import { PlayerController } from '@/controllers/index';
import TeamService from '@/service/TeamService';

export default class TeamController {

    constructor() {
        this.teamService = new TeamService()
        this.playerController = new PlayerController()
    }

    create(lid) {
        for(let i = 0; i < 10; i++) {
            this.teamService.handleCreateNewTeam(lid, i)
            this.playerController.create(i)
        }
    }

    read(obj) {
        this.teamService.handleGetDefaultTeams();
    }

    update(obj) {

    }

    delete(obj) {

    }
}
