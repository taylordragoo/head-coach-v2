import Team from '@/models/Team';
import League from '@/models/League';
import Player from '@/models/Player';
import Ratings from '@/models/Ratings';
import Overalls from '@/models/Overalls';
import Potentials from '@/models/Potentials';
import faker from 'faker';
import ITeam from '@/interfaces/ITeam';

export default class TeamService {
    private static instance: TeamService;

    constructor() {}

    public static getInstance(): TeamService {
        if (!TeamService.instance) {
            TeamService.instance = new TeamService();
        }

        return TeamService.instance;
    }

    handleCreateNewTeams(teams: ITeam[])
    {
        const _teams = teams.map(team => {
            return this.handleGenerateTeam(team);
        })

        console.log(_teams);

        Team.insert({
            data: _teams
        })
    }

    handleGenerateTeam(data: any) {
        const staff = this.generateStaffForTeam(data.tid + 1);

        return {
            id: data.tid + 1,
            lid: 1,
            tid: data.tid + 1,
            cid: data.cid,
            did: data.did,
            name: data.name,
            abbreviation: data.abbrev,
            img_url: data.img_url,
            country: 'USA',
            budget: {
                scouting: {
                    amount: data.budget.scouting.amount,
                    rank: data.budget.scouting.rank,
                },
                coaching: {
                    rank: data.budget.coaching.rank,
                    amount: data.budget.coaching.amount,
                },
                health: {
                    rank: data.budget.health.rank,
                    amount: data.budget.health.amount,
                },
                facilities: {
                    rank: data.budget.facilities.rank,
                    amount: data.budget.facilities.amount,
                }
            },
            strategy: data.strategy,
            population: data.pop,
            stadium_capacity: data.stadiumCapacity,
            seasons: data.seasons,
            head_coach: staff.head_coach,
            offensive_coordinator: staff.offensive_coordinator,
            defensive_coordinator: staff.defensive_coordinator,
            qb_coach: staff.qb_coach,
            rb_coach: staff.rb_coach,
            te_coach: staff.te_coach,
            wr_coach: staff.wr_coach,
            oline_coach: staff.oline_coach,
            dline_coach: staff.dline_coach,
            linebacker_coach: staff.linebacker_coach,
            secondary_coach: staff.secondary_coach,
            special_teams_coach: staff.special_teams_coach,
            strength_coach: staff.strength_coach,
            coach: [staff.coach],
            owner: staff.owner,
            chief_executive_officer: staff.chief_executive_officer,
            general_manager: staff.general_manager,
            director_pro_scouting: staff.director_pro_scouting,
            director_college_scouting: staff.director_college_scouting,
            scout: [staff.scout],
            sports_medicine_director: staff.sports_medicine_director,
            doctor: [staff.doctor],
            trainer: [staff.trainer]
        }
    }

    generateStaffForTeam(teamId: number) {
        return {
            head_coach: this.generateStaffMember(teamId, 'Head Coach'),
            offensive_coordinator: this.generateStaffMember(teamId, 'Offensive Coordinator'),
            defensive_coordinator: this.generateStaffMember(teamId, 'Defensive Coordinator'),
            qb_coach: this.generateStaffMember(teamId, 'QB Coach'),
            rb_coach: this.generateStaffMember(teamId, 'RB Coach'),
            te_coach: this.generateStaffMember(teamId, 'TE Coach'),
            wr_coach: this.generateStaffMember(teamId, 'WR Coach'),
            oline_coach: this.generateStaffMember(teamId, 'OLine Coach'),
            dline_coach: this.generateStaffMember(teamId, 'DLine Coach'),
            linebacker_coach: this.generateStaffMember(teamId, 'Linebacker Coach'),
            secondary_coach: this.generateStaffMember(teamId, 'Secondary Coach'),
            special_teams_coach: this.generateStaffMember(teamId, 'Special Teams Coach'),
            strength_coach: this.generateStaffMember(teamId, 'Strength Coach'),
            coach: this.generateStaffMember(teamId, 'Coach'),
            owner: this.generateStaffMember(teamId, 'Owner'),
            president: this.generateStaffMember(teamId, 'President'),
            chief_executive_officer: this.generateStaffMember(teamId, 'Chief Executive Officer'),
            general_manager: this.generateStaffMember(teamId, 'General Manager'),
            director_pro_scouting: this.generateStaffMember(teamId, 'Director of Pro Scouting'),
            director_college_scouting: this.generateStaffMember(teamId, 'Director of College Scouting'),
            scout: this.generateStaffMember(teamId, 'Scout'),
            sports_medicine_director: this.generateStaffMember(teamId, 'Sports Medicine Director'),
            doctor: this.generateStaffMember(teamId, 'Doctor'),
            trainer: this.generateStaffMember(teamId, 'Trainer'),
        }
    }
    
    generateStaffMember(teamId: number, role: string) {
        const baseSkills = {
            team_id: teamId,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            role: role,
            contract: {
                amount: faker.datatype.number({min: 100000, max: 1000000}),
                expires: faker.datatype.number({ min: 2025, max: 2030 }),
            },
            leadership: faker.datatype.number({min: 10, max: 20}),
            adaptability: faker.datatype.number({min: 10, max: 20}),
            ambition: faker.datatype.number({min: 10, max: 20}),
            discipline: faker.datatype.number({min: 10, max: 20}),
            motivation: faker.datatype.number({min: 10, max: 20}),
            contract_negotiations: faker.datatype.number({min: 10, max: 20}),
            rookie_player_management: faker.datatype.number({min: 1, max: 5}),
            veteran_player_management: faker.datatype.number({min: 1, max: 5}),
            player_ability_analysis: faker.datatype.number({min: 1, max: 5}),
            player_potential_analysis: faker.datatype.number({min: 1, max: 5}),
            staff_ability_analysis: faker.datatype.number({min: 1, max: 5}),
            data_analysis: faker.datatype.number({min: 1, max: 5}),
            offensive_technical: faker.datatype.number({min: 1, max: 5}),
            defensive_technical: faker.datatype.number({min: 1, max: 5}),
            play_calling_ability: faker.datatype.number({min: 1, max: 5}),
            gameplan: faker.datatype.number({min: 1, max: 5}),
            throwing_technical: faker.datatype.number({min: 1, max: 5}),
            hands_technical: faker.datatype.number({min: 1, max: 5}),
            routes_technical: faker.datatype.number({min: 1, max: 5}),
            blocking_technical: faker.datatype.number({min: 1, max: 5}),
            tackling_technical: faker.datatype.number({min: 1, max: 5}),
            coverage_technical: faker.datatype.number({min: 1, max: 5}),
            kicking_technical: faker.datatype.number({min: 1, max: 5}),
            punting_technical: faker.datatype.number({min: 1, max: 5}),
            athletic_training: faker.datatype.number({min: 1, max: 5}),
            medical_training: faker.datatype.number({min: 1, max: 5}),
        }
    
        let roleSpecificSkills = {};

        switch(role) {
            case 'Head Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 20}),
                    offensive_technical: faker.datatype.number({min: 10, max: 20}),
                    defensive_technical: faker.datatype.number({min: 10, max: 20}),
                    throwing_technical: faker.datatype.number({min: 10, max: 20}),
                    hands_technical: faker.datatype.number({min: 10, max: 20}),
                    routes_technical: faker.datatype.number({min: 10, max: 20}),
                    blocking_technical: faker.datatype.number({min: 10, max: 20}),
                    tackling_technical: faker.datatype.number({min: 10, max: 20}),
                    coverage_technical: faker.datatype.number({min: 10, max: 20}),
                    kicking_technical: faker.datatype.number({min: 10, max: 20}),
                    punting_technical: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Offensive Coordinator':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 20}),
                    offensive_technical: faker.datatype.number({min: 10, max: 20}),
                    defensive_technical: faker.datatype.number({min: 10, max: 20}),
                    throwing_technical: faker.datatype.number({min: 10, max: 20}),
                    hands_technical: faker.datatype.number({min: 10, max: 20}),
                    routes_technical: faker.datatype.number({min: 10, max: 20}),
                    blocking_technical: faker.datatype.number({min: 10, max: 20}),
                    tackling_technical: faker.datatype.number({min: 10, max: 20}),
                    coverage_technical: faker.datatype.number({min: 10, max: 20}),
                    kicking_technical: faker.datatype.number({min: 10, max: 20}),
                    punting_technical: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Defensive Coordinator':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 20}),
                    offensive_technical: faker.datatype.number({min: 10, max: 20}),
                    defensive_technical: faker.datatype.number({min: 10, max: 20}),
                    throwing_technical: faker.datatype.number({min: 10, max: 20}),
                    hands_technical: faker.datatype.number({min: 10, max: 20}),
                    routes_technical: faker.datatype.number({min: 10, max: 20}),
                    blocking_technical: faker.datatype.number({min: 10, max: 20}),
                    tackling_technical: faker.datatype.number({min: 10, max: 20}),
                    coverage_technical: faker.datatype.number({min: 10, max: 20}),
                    kicking_technical: faker.datatype.number({min: 10, max: 20}),
                    punting_technical: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'QB Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            
            case 'RB Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'TE Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'WR Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'Linebacker Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'DLine Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'OLine Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'Special Teams Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'Secondary Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'Strength Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'Coach':
                roleSpecificSkills = {
                    // Player Management
                    rookie_player_management: faker.datatype.number({min: 10, max: 20}),
                    veteran_player_management: faker.datatype.number({min: 10, max: 20}),
                    
                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                    
                    // Coaching
                    gameplan: faker.datatype.number({min: 10, max: 20}),
                    play_calling_ability: faker.datatype.number({min: 10, max: 18}),
                    offensive_technical: faker.datatype.number({min: 10, max: 18}),
                    defensive_technical: faker.datatype.number({min: 10, max: 18}),
                    throwing_technical: faker.datatype.number({min: 14, max: 18}),
                    hands_technical: faker.datatype.number({min: 10, max: 15}),
                    routes_technical: faker.datatype.number({min: 10, max: 15}),
                    blocking_technical: faker.datatype.number({min: 10, max: 15})
                }
                break;
            case 'Owner':
                roleSpecificSkills = {
                    leadership: faker.datatype.number({min: 10, max: 20}),
                    adaptability: faker.datatype.number({min: 10, max: 20}),
                    ambition: faker.datatype.number({min: 10, max: 20}),
                    discipline: faker.datatype.number({min: 10, max: 20}),
                    motivation: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Chief Executive Officer':
                    roleSpecificSkills = {
                        leadership: faker.datatype.number({min: 10, max: 20}),
                        adaptability: faker.datatype.number({min: 10, max: 20}),
                        ambition: faker.datatype.number({min: 10, max: 20}),
                        discipline: faker.datatype.number({min: 10, max: 20}),
                        motivation: faker.datatype.number({min: 10, max: 20}),
                    }
                    break;
            case 'President':
                roleSpecificSkills = {
                    leadership: faker.datatype.number({min: 10, max: 20}),
                    adaptability: faker.datatype.number({min: 10, max: 20}),
                    ambition: faker.datatype.number({min: 10, max: 20}),
                    discipline: faker.datatype.number({min: 10, max: 20}),
                    motivation: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'General Manager':
                roleSpecificSkills = {
                    leadership: faker.datatype.number({min: 10, max: 20}),
                    adaptability: faker.datatype.number({min: 10, max: 20}),
                    ambition: faker.datatype.number({min: 10, max: 20}),
                    discipline: faker.datatype.number({min: 10, max: 20}),
                    motivation: faker.datatype.number({min: 10, max: 20}),
                    contract_negotiations: faker.datatype.number({min: 10, max: 20}),

                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Director of Pro Scouting':
                roleSpecificSkills = {
                    leadership: faker.datatype.number({min: 10, max: 20}),
                    adaptability: faker.datatype.number({min: 10, max: 20}),
                    ambition: faker.datatype.number({min: 10, max: 20}),
                    discipline: faker.datatype.number({min: 10, max: 20}),
                    motivation: faker.datatype.number({min: 10, max: 20}),
                    contract_negotiations: faker.datatype.number({min: 10, max: 20}),

                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Director of College Scouting':
                roleSpecificSkills = {
                    leadership: faker.datatype.number({min: 10, max: 20}),
                    adaptability: faker.datatype.number({min: 10, max: 20}),
                    ambition: faker.datatype.number({min: 10, max: 20}),
                    discipline: faker.datatype.number({min: 10, max: 20}),
                    motivation: faker.datatype.number({min: 10, max: 20}),
                    contract_negotiations: faker.datatype.number({min: 10, max: 20}),

                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Scout':
                roleSpecificSkills = {
                    leadership: faker.datatype.number({min: 10, max: 20}),
                    adaptability: faker.datatype.number({min: 10, max: 20}),
                    ambition: faker.datatype.number({min: 10, max: 20}),
                    discipline: faker.datatype.number({min: 10, max: 20}),
                    motivation: faker.datatype.number({min: 10, max: 20}),
                    contract_negotiations: faker.datatype.number({min: 10, max: 20}),

                    // Scouting
                    player_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    player_potential_analysis: faker.datatype.number({min: 10, max: 20}),
                    staff_ability_analysis: faker.datatype.number({min: 10, max: 20}),
                    data_analysis: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Sports Medicine Director':
                roleSpecificSkills = {
                    athletic_training: faker.datatype.number({min: 10, max: 20}),
                    medical_training: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Doctor':
                roleSpecificSkills = {
                    athletic_training: faker.datatype.number({min: 10, max: 20}),
                    medical_training: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            case 'Trainer':
                roleSpecificSkills = {
                    athletic_training: faker.datatype.number({min: 10, max: 20}),
                     medical_training: faker.datatype.number({min: 10, max: 20}),
                }
                break;
            default:
                break;
        }
    
        return {...baseSkills, ...roleSpecificSkills};
    }

    handleGetDefaultTeams() {
        const teams: Team[] = Team.all().map(team => {
            const newTeam = new Team();
            Object.assign(newTeam, team, {
                budget: {
                    scouting: { amount: team.budget.scouting.amount, rank: team.budget.scouting.rank },
                    coaching: { amount: team.budget.coaching.amount, rank: team.budget.coaching.rank },
                    health: { amount: team.budget.health.amount, rank: team.budget.health.rank },
                    facilities: { amount: team.budget.facilities.amount, rank: team.budget.facilities.rank },
                },
                coach: { ...team.coach },
            });
            return newTeam;
        });

        return teams;
    }

    public async evaluateTeamPerformance(teamId: number, ratingsMap: Map<number, Ratings>): Promise<number> {
        const team = Team.query().with('players').where('id', teamId).first();

        if (!team) {
            throw new Error(`Team with id ${teamId} not found`);
        }

        let totalPlayerRating = 0;

        team.players.forEach((player: Player) => {
            const playerRating = ratingsMap.get(player.pid);
            if (playerRating) {
                totalPlayerRating += playerRating.overall;
            }
        });

        const averagePlayerRating = totalPlayerRating / team.players.length;
        
        return averagePlayerRating;
    }
}
