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
        let nextTeamId = 1
        let nextPlayerId = 1

        for(let k = 1; k < 31; k++) {
            for(let i = 0; i < 10; i++) {

                const teamId = nextTeamId++
                this.teamService.handleCreateNewTeam(k, teamId)

                // Generate unique player IDs
                for(let j = 0; j < 10; j++) {
                    const playerId = nextPlayerId++
                    this.playerController.create(playerId, teamId)
                }
            }
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
