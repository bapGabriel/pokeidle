export function Player(name) {
	this.name = name;
	this.attack = 1;
	this.pokemonSet = [];

	this.getClickDamage = function () {
		return this.attack;
	};
}
