import PlayerService from '@/service/PlayerService';
import StoreService from '../service/StoreService';

export default class PlayerController {

    constructor() {
        this.playerService = new PlayerService()
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
