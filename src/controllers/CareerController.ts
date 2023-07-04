import { CareerService } from '@/service/index';
import DatabaseController from "@/controllers/DatabaseController";

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
        return this.careerService.handleGetDefaultData();
    }

    public loadSelectedCareer: any = (name: string) => {
        return this.careerService.handleLoadSelectedCareer(name);
    }

    public insertVuexData: any = (request) => {
        this.careerService.handleInsertVuexData(request);
    }

    public createNewCareer: any = (request) => {
        this.careerService.handleCreateNewWorld(request);
    }

    public saveCareer: any = () => {
        this.careerService.handleSaveCareer();
    }
}

export default CareerController;
