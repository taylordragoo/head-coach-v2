import Team from '@/interfaces/ITeam';

export default interface ILeague {
    id: number
    abbrev: string
    name: string
    country: string
    wid: number
    teams: Team[]
    phase: number
    tier: number
}