import { Pokemon } from "./Pokemon.js";

export function PokemonEnemy() {
	Pokemon.call(this);

	this.goldAwarded = 1;
}

PokemonEnemy.prototype = Object.create(Pokemon.prototype);
PokemonEnemy.prototype.constructor = PokemonEnemy;
