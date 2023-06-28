import { CareerService } from '@/service/index';

class CareerController {
    private static instance: CareerController;
    private careerService: CareerService;

    private constructor() {
        this.careerService = CareerService.getInstance();
    }

    public static getInstance(): CareerController {
        if (!CareerController.instance) {
            CareerController.instance = new CareerController();
        }

        return CareerController.instance;
    }

    public createDefaultData: any = () => {
        this.careerService.handleCreateDefaultWorld();
        const data = this.careerService.handleGetDefaultData();

        return data;
    }

    public createNewCareer: any = (request) => {
        this.careerService.handleCreateNewWorld(request);
    }
}

export default CareerController;
