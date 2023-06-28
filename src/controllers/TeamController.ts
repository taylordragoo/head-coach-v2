import { PlayerController } from '@/controllers/index';
import TeamService from '@/service/TeamService';

export default class TeamController {
    private static instance: TeamController;
    public teamService: TeamService;
    public playerController: PlayerController;

    constructor() {
        this.teamService = TeamService.getInstance();
        this.playerController = PlayerController.getInstance();
    }

    public static getInstance(): TeamController {
        if (!TeamController.instance) {
            TeamController.instance = new TeamController();
        }

        return TeamController.instance;
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
