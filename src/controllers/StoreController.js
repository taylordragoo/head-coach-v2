import StoreService from '@/service/StoreService';

export default class StoreController {

    constructor() {
        this.storeService = new StoreService()
    }

    create() {
        return this.storeService.handleCreateNewStore()
    }

    read(obj) {

    }

    update(obj) {

    }

    delete(obj) {

    }
}
