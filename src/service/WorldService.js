import World from '@/models/World';

export default class WorldService {

    handleCreateNewWorld()
    {
        World.insert({
            data: {
                id: 0,
                user_id: 0,
                date: '01/01/2023',
                phase: 1,
                season: 2023
            }
        })
    }
}
