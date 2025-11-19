export function Stage(name, image, level, pokemonPool) {
	this.id = window.crypto.randomUUID();
	this.name = name;
	this.image = image;
	this.level = level;
	this.pokemonPool = pokemonPool;
	this.selectPokemonFromPool = function () {
		return this.pokemonPool[Math.floor(Math.random() * this.pokemonPool.length)];
	};
	this.selectPokemonLevel = function () {
		// TODO: Retornar com margem pra baixo.
		return this.level;
	};
}
