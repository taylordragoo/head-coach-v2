import PlayerService from '@/service/PlayerService';

export default class PlayerController {
    private static instance: PlayerController;
    public playerService: PlayerService;

    constructor() {
        this.playerService = PlayerService.getInstance();
    }

    public static getInstance(): PlayerController {
        if (!PlayerController.instance) {
            PlayerController.instance = new PlayerController();
        }

        return PlayerController.instance;
    }

    create(tid) {
        for(let i = 0; i < 5; i++) {
            this.playerService.handleCreatePlayers(tid)
        }
    }

    read(obj) {

    }

    update(obj) {

    }

    delete(obj) {

    }

}