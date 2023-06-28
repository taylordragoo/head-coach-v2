import ChampionService from '@/service/ChampionService';

export default class ChampionController {
    private championService: ChampionService;
    private static instance: ChampionController;

    private constructor() {
        this.championService = ChampionService.getInstance();
    }

    public static getInstance(): ChampionController {
        if (!ChampionController.instance) {
            ChampionController.instance = new ChampionController();
        }

        return ChampionController.instance;
    }

    createDefaultChampions() {
        this.championService.handleCreateDefaultChampions()
    }

}
