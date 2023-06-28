import World from '@/models/World';
import ChampionController from "@/controllers/ChampionController";
import LeagueController from "@/controllers/LeagueController";

export default class WorldService {
    private static instance: WorldService;
    private championController: ChampionController;
    private leagueController: LeagueController;

    private constructor() {
        this.championController = ChampionController.getInstance();
        this.leagueController = LeagueController.getInstance();
    }

    public static getInstance(): WorldService {
        if (!WorldService.instance) {
            WorldService.instance = new WorldService();
        }

        return WorldService.instance;
    }

    handleCreateNewWorld() {
        World.insert({
            data: {
                id: 0,
                user_id: 0,
                date: '01/01/2023',
                phase: 1,
                season: 2023
            }
        })

        this.championController.createDefaultChampions();
        this.leagueController.createDefaultLeagues();

        return;
    }
}
