import { Pokemon } from "./Pokemon.js";

export function PokemonAlly() {
	Pokemon.call(this);

	this.experience = 0;
}

PokemonAlly.prototype = Object.create(Pokemon.prototype);
PokemonAlly.prototype.constructor = PokemonAlly;
