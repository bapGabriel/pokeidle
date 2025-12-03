function BattleManager(initialStages) {
	this.stages = initialStages;
	this.currentStageIndex = 0;
	this.isLoading = false;
	this.currentEnemy = null;

	this.getCurrentStageConfig = function () {
		return this.stages[this.currentStageIndex];
	};

	this.loadNextEnemy = async function () {
		if (this.isLoading) return;
		document.getElementById("pokemon-enemy-loading").classList.add("hidden");
		this.isLoading = true;

		const currentStage = this.getCurrentStageConfig();

		const enemyIndex = currentStage.selectPokemonFromPool();

		const enemyPokemon = new PokemonEnemy();

		await enemyPokemon
			.create(enemyIndex, currentStage.selectPokemonLevel())
			.then(async (pokemon) => {
				document.getElementById("event-log").innerText = `Um ${pokemon.name} selvagem aparece!`;
				await enemyPokemon.getType();
			})
			.catch((error) => {
				enemyPokemon.id = -1;
				enemyPokemon.name = "MISSINGNO";
				enemyPokemon.level = Number.MAX_SAFE_INTEGER;
				enemyPokemon.sprite = "#";

				enemyPokemon.maxHealth = Number.MAX_SAFE_INTEGER;
				enemyPokemon.health = Number.MAX_SAFE_INTEGER;
				enemyPokemon.attack = Number.MAX_SAFE_INTEGER;
				enemyPokemon.defense = Number.MAX_SAFE_INTEGER;
				enemyPokemon.speed = Number.MAX_SAFE_INTEGER;
				enemyPokemon.regen = Number.MAX_SAFE_INTEGER;

				document.getElementById("event-log").innerText = `!!! P3R1G% ! 3RR# !!!`;
			})
			.finally(() => {
				this.currentEnemy = enemyPokemon;
				document.getElementById("pokemon-enemy-loading").classList.add("hidden");
				this.isLoading = false;

				document.getElementById("pokemon-enemy-image").src = this.currentEnemy.sprite;
				document.getElementById("pokemon-enemy-name").innerText = this.currentEnemy.name;
				document.getElementById("pokemon-enemy-level").innerText = `Lv. ${this.currentEnemy.level}`;
				document.getElementById("pokemon-enemy-health").innerText = `${this.currentEnemy.health}/${this.currentEnemy.maxHealth}`;
				document.getElementById("pokemon-enemy-health-bar").style.width = `${Math.floor((this.currentEnemy.health / this.currentEnemy.maxHealth) * 100)}%`;
			});
	};

	this.handleEnemyDefeat = function (gamePokedollars, player, stage) {
		gamePokedollars.add(this.currentEnemy.goldAwarded);

		player.pokemonSet.forEach((ally) => {
			ally.gainExperience(this.currentEnemy.awardExperience());
		});

		const currentStage = this.getCurrentStageConfig();

		currentStage.gainThreat();

		this.currentEnemy = null;

		if (!this.isLoading) {
			document.getElementById("pokemon-enemy-loading").classList.remove("hidden");
			this.loadNextEnemy();
		}
	};

	this.handleAllyAutoAttacks = function (player, deltaTime) {
		const target = this.currentEnemy;

		player.pokemonSet.forEach((ally) => {
			ally.attackTimer += deltaTime;

			const requiredCooldown = 60 / ally.speed;

			if (ally.attackTimer >= requiredCooldown) {
				ally.performAutoAttack(target);

				ally.attackTimer -= requiredCooldown;
			}
		});
	};

	this.handleEnemyAutoAttacks = function (player, deltaTime) {
		this.currentEnemy.attackTimer += deltaTime;
		const requiredCooldown = 60 / this.currentEnemy.speed;

		if (this.currentEnemy.attackTimer >= requiredCooldown) {
			this.currentEnemy.performAutoAttack(player.pokemonSet);

			this.currentEnemy.attackTimer -= requiredCooldown;
		}
	};
}
