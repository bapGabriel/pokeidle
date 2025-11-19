import { PokemonEnemy } from "./PokemonEnemy.js";

export function BattleManager(initialStages) {
	this.stages = initialStages;
	this.currentStageIndex = 0;
	this.isLoading = false;
	this.currentEnemy = null;

	this.getCurrentStageConfig = function () {
		return this.stages[this.currentStageIndex];
	};

	this.loadNextEnemy = async function () {
		if (this.isLoading) return;
		this.isLoading = true;

		const currentStage = this.getCurrentStageConfig();

		const enemyIndex = currentStage.selectPokemonFromPool();

		const enemyPokemon = new PokemonEnemy();

		await enemyPokemon.create(enemyIndex, currentStage.selectPokemonLevel());

		this.currentEnemy = enemyPokemon;
		this.isLoading = false;

		document.getElementById("pokemon-enemy-image").src = this.currentEnemy.sprite;
		document.getElementById("pokemon-enemy-name").innerText = this.currentEnemy.name;
		document.getElementById("pokemon-enemy-level").innerText = `Lv. ${this.currentEnemy.level}`;
		document.getElementById("pokemon-enemy-health").innerText = `${this.currentEnemy.health}/${this.currentEnemy.maxHealth}`;
		document.getElementById("pokemon-enemy-health-bar").style.width = `${Math.floor((this.currentEnemy.health / this.currentEnemy.maxHealth) * 100)}%`;
	};
}
