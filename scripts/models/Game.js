import { BattleManager } from "./BattleManager.js";
import { Player } from "./Player.js";
import { PokemonAlly } from "./PokemonAlly.js";
import { Resource } from "./Resource.js";
import { Stage } from "./Stage.js";

export function Game() {
	this.lastUpdateTime = performance.now();

	this.player = new Player("Jogador");
	this.stages = [new Stage("Rota 1", "", 2, [1, 4, 7])];
	this.upgrades = [];

	this.battleManager = new BattleManager(this.stages);

	this.pokedollars = new Resource("Pokedólares", 0);
	this.pokeballs = new Resource("Pokebolas", 10);

	this.boundGameLoop = this.gameLoop.bind(this);
}

Game.prototype.start = async function () {
	await this.battleManager.loadNextEnemy();
	this.setupEventListeners();
	window.requestAnimationFrame(this.boundGameLoop);
};

Game.prototype.gameLoop = function (currentTime) {
	const deltaTime = (currentTime - this.lastUpdateTime) / 1000;
	this.lastUpdateTime = currentTime;

	this.processGameLogic(deltaTime);
	this.renderGame();

	window.requestAnimationFrame(this.boundGameLoop);
};

Game.prototype.renderGame = function () {
	if (this.battleManager.currentEnemy) {
		const enemy = this.battleManager.currentEnemy;

		document.getElementById("pokemon-enemy-health").innerText = `${enemy.health}/${enemy.maxHealth}`;

		const healthPercentage = (enemy.health / enemy.maxHealth) * 100;
		document.getElementById("pokemon-enemy-health-bar").style.width = `${Math.max(0, healthPercentage)}%`;
	}

	document.getElementById("resource-pokeballs-quantity").innerText = `${Math.floor(this.pokeballs.quantity)}`;
	document.getElementById("resource-pokedollars-quantity").innerText = `$${Math.floor(this.pokedollars.quantity)}`;

	document.getElementById("stats-player-attack").innerText = this.player.attack;
};

Game.prototype.processGameLogic = function (deltaTime) {
	this.pokedollars.add(1 * deltaTime);

	if (this.battleManager.currentEnemy && this.battleManager.currentEnemy.health <= 0) {
		this.battleManager.handleEnemyDefeat(this.pokedollars);
	}

	if (this.battleManager.currentEnemy) {
	}
};

Game.prototype.setupEventListeners = function () {
	const attackButton = document.getElementById("action-attack-enemy");
	const captureButton = document.getElementById("action-capture-enemy");
	if (attackButton) {
		attackButton.addEventListener("click", this.playerAttack.bind(this));
	}
	if (captureButton) {
		captureButton.addEventListener("click", this.playerCapture.bind(this));
	}
};

Game.prototype.playerAttack = function () {
	const clickDamage = this.player.getClickDamage();

	if (this.battleManager.currentEnemy) {
		this.battleManager.currentEnemy.takeDamage(clickDamage);
	}
};

Game.prototype.playerCapture = function () {
	if (this.pokeballs.quantity <= 0) return;

	this.pokeballs.quantity -= 1;
	if (this.battleManager.currentEnemy) {
		const enemy = this.battleManager.currentEnemy;

		const captureChance = Math.min(100 - (enemy.health / enemy.maxHealth) * 100, 100);
		const random = Math.floor(Math.random() * 101);

		const isSucessfulCapture = random <= captureChance;

		if (isSucessfulCapture) {
			console.log("Pokémon capturado!");

			const capturedPokemon = new PokemonAlly();
			capturedPokemon.clonePokemon(enemy);
			capturedPokemon.createDisplay();
			this.player.pokemonSet.push(capturedPokemon);
			this.battleManager.currentEnemy = null;
			this.battleManager.loadNextEnemy();
		}
	}
};
