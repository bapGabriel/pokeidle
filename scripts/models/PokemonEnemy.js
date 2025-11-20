import { createSplatterParticle } from "../utils/visual.js";
import { Pokemon } from "./Pokemon.js";

export function PokemonEnemy() {
	Pokemon.call(this);

	this.goldAwarded = 10;
}

PokemonEnemy.prototype = Object.create(Pokemon.prototype);
PokemonEnemy.prototype.constructor = PokemonEnemy;

PokemonEnemy.prototype.performAutoAttack = function (targets) {
	targets.forEach((target) => {
		target.takeDamage(this.attack / 10);
	});
};

PokemonEnemy.prototype.takeDamageAnimation = function () {
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

		const numberOfParticles = 5 + Math.floor(Math.random() * 5);
		for (let i = 0; i < numberOfParticles; i++) {
			createSplatterParticle(centerX, centerY, gameContainer);
		}
	}
};
