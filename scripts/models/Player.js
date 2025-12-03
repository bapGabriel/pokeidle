function Player(name) {
	this.name = name;
	this.attack = CONFIG.PLAYER_INITIAL_ATTACK;
	this.pokemonSet = [];

	this.getClickDamage = function () {
		return this.attack;
	};
}
