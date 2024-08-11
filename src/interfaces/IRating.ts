import IOveralls from './IOveralls';
import IPotentials from './IPotentials';
import ISkill from './ISkill';

export default interface IRating {
	position: string
	position_archetype: string
	mental_archetype: string
	// Technical
	carrying: number
	catching: number
	kick_accuracy: number
	kick_power: number
	man_coverage: number
	pass_blocking: number
	play_action: number
	punt_accuracy: number
	punt_power: number
	route_running: number
	run_blocking: number
	shed_block: number
	tackle: number
	throw_accuracy_deep: number
	throw_accuracy_mid: number
	throw_accuracy_short: number
	throw_on_the_run: number
	throw_power: number
	zone_coverage: number
	// Mental
	aggresion: number
	aniticipation: number
	bravery: number
	composure: number
	concentration: number
	decisions: number
	determination: number
	flair: number
	leadership: number
	off_the_ball: number
	positioning: number
	teamwork: number
	vision: number
	work_rate: number
	// Physical
	acceleration: number
	agility: number
	speed: number
	stamina: number
	strength: number
	vertical: number
}