import World from '@/models/World';

export default class WorldService {
    private static instance: WorldService;

    private constructor() {}

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

        return World.query().first().$toJson();
    }
}
