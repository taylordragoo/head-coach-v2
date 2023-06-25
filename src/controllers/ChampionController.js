import ChampionService from '@/service/ChampionService';

export default class ChampionController {

    constructor() {
        this.championService = new ChampionService()
    }

    create() {
        this.championService.handleCreateDefaultChampions()
    }

    read(obj) {

    }

    update(obj) {

    }

    delete(obj) {

    }

}
