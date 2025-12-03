function PokemonEnemy() {
	Pokemon.call(this);

	this.goldAwarded = 1;
	this.expAwarded = 10;
}

PokemonEnemy.prototype = Object.create(Pokemon.prototype);
PokemonEnemy.prototype.constructor = PokemonEnemy;

PokemonEnemy.prototype.performAutoAttack = function (targets) {
	targets.forEach((target) => {
		target.takeDamage(this.attack / 3);
	});
};

PokemonEnemy.prototype.takeDamageAnimation = function (damageValue) {
	const spriteElement = document.getElementById("pokemon-enemy-image");

	if (spriteElement) {
		spriteElement.classList.add("damage-pulse");

		setTimeout(() => {
			spriteElement.classList.remove("damage-pulse");
		}, 250);

		const rect = spriteElement.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const gameContainer = document.getElementById("enemy-container");

		createDamageParticle(centerX, centerY, gameContainer, damageValue);
	}
};

PokemonEnemy.prototype.awardExperience = function () {
	const experienceAwarded = this.expAwarded * Math.pow(1.15, this.level);
	return experienceAwarded;
};
