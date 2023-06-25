import { CareerService } from '@/service/index';

export default class CareerController {

    constructor() {
        this.careerService = new CareerService();
    }

    create(request) {
        console.log(request.type);
        const x = request.type

        switch(x) {
            case 'new':
                this.careerService.handleCreateNewCareer(request)
                break;
            case 'default':
                this.careerService.handleCreateDefaultDatabase(request)
                break;
            case 'generate':
                // this.careerService.handleNewScheduleDefault(request)
                break;
            default:
                return;
        }
    }

    update(request) {
        this.careerService.handleSaveCareer(request).then(function() {
            console.log("Saving...")
        })
    }

    delete(db) {
        this.careerService.handleDeleteCareer(db)
    }
}
