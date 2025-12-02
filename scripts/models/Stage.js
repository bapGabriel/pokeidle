import { CONFIG } from "../config.js";

export function Stage(name, image, level, pokemonPool) {
	this.id = window.crypto.randomUUID();
	this.name = name;
	this.image = image;
	this.level = level;
	this.threat = 0;
	this.pokemonPool = pokemonPool;
	this.selectPokemonFromPool = function () {
		return this.pokemonPool[Math.floor(Math.random() * this.pokemonPool.length)];
	};
	this.selectPokemonLevel = function () {
		// TODO: Retornar com margem pra baixo.
		return this.level;
	};
	this.gainThreat = function () {
		this.threat += 1;
		const threatRequired = Math.floor(CONFIG.BASE_EXPERIENCE * Math.pow(CONFIG.POKEMON_EXPERIENCE_MULTIPLIER, this.level));
		if (this.threat >= threatRequired) {
			this.threat -= threatRequired;
			this.level += 1;
		}
	};
}
