function Game() {
	this.lastUpdateTime = performance.now();

	this.player = new Player("Jogador");
	this.stages = [];
	this.upgrades = [];

	this.battleManager = new BattleManager(this.stages);

	this.pokedollars = new Resource("Pokedólares", 0);
	this.pokeballs = new Resource("Pokebolas", 10);

	this.boundGameLoop = this.gameLoop.bind(this);
}

Game.prototype.start = async function () {
	const pokemonFirstStageIds = await API.getAllPokemonByEvolutionStage(1);

	this.stages.push(new Stage("Rota 1", "", 1, pokemonFirstStageIds));
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

		document.getElementById("pokemon-enemy-health").innerText = `${Math.floor(enemy.health)}/${Math.floor(enemy.maxHealth)}`;

		const healthPercentage = (enemy.health / enemy.maxHealth) * 100;
		document.getElementById("pokemon-enemy-health-bar").style.width = `${Math.max(0, healthPercentage)}%`;
	}

	document.getElementById("resource-pokeballs-quantity").innerText = `${Math.floor(this.pokeballs.quantity)}`;
	document.getElementById("resource-pokedollars-quantity").innerText = `$${Math.floor(this.pokedollars.quantity)}`;

	document.getElementById("stats-player-attack").innerText = this.player.attack;

	this.player.pokemonSet.forEach((ally) => {
		if (document.getElementById(`pokemon-ally-${ally.id}`)) {
			document.getElementById(`pokemon-ally-level-${ally.id}`).innerText = `Lv. ${Math.floor(ally.level)}`;
			document.getElementById(`pokemon-ally-attack-${ally.id}`).innerText = `${Math.floor(ally.attack)}`;
			document.getElementById(`pokemon-ally-defense-${ally.id}`).innerText = `${Math.floor(ally.defense)}`;
			document.getElementById(`pokemon-ally-speed-${ally.id}`).innerText = `${Math.floor(ally.speed)}`;
			document.getElementById(`pokemon-ally-regen-${ally.id}`).innerText = `${Math.floor(ally.regen)}`;
			document.getElementById(`pokemon-ally-health-${ally.id}`).innerText = `${Math.floor(ally.health)}/${Math.floor(ally.maxHealth)}`;
			document.getElementById(`pokemon-ally-exp-${ally.id}`).innerText = `${Math.floor(ally.experience)}/${Math.floor(CONFIG.BASE_EXPERIENCE * Math.pow(CONFIG.POKEMON_EXPERIENCE_MULTIPLIER, ally.level))}`;

			const healthPercentage = (ally.health / ally.maxHealth) * 100;
			const expPercentage = (ally.experience / (CONFIG.BASE_EXPERIENCE * Math.pow(CONFIG.POKEMON_EXPERIENCE_MULTIPLIER, ally.level))) * 100;

			document.getElementById(`pokemon-ally-health-bar-${ally.id}`).style.width = `${Math.max(0, healthPercentage)}%`;
			document.getElementById(`pokemon-ally-exp-bar-${ally.id}`).style.width = `${Math.max(0, expPercentage)}%`;
		}
	});

	const currentStage = this.battleManager.getCurrentStageConfig();
	const stageThreatPercentage = (currentStage.threat / (CONFIG.BASE_EXPERIENCE * Math.pow(CONFIG.POKEMON_EXPERIENCE_MULTIPLIER, currentStage.level))) * 100;

	document.getElementById(`stage-name`).innerText = `${currentStage.name}`;
	document.getElementById(`stage-level`).innerText = `Lv. ${currentStage.level}`;
	document.getElementById("stage-threat-bar").style.width = `${Math.max(0, stageThreatPercentage)}%`;
};

Game.prototype.processGameLogic = function (deltaTime) {
	this.pokedollars.add(1 * deltaTime);

	if (this.battleManager.currentEnemy) {
		this.battleManager.currentEnemy.regenerate(deltaTime);
		this.player.pokemonSet.forEach((ally) => {
			ally.regenerate();
		});

		this.battleManager.handleAllyAutoAttacks(this.player, deltaTime);
		this.battleManager.handleEnemyAutoAttacks(this.player, deltaTime);
	}

	if (this.battleManager.currentEnemy && this.battleManager.currentEnemy.health <= 0) {
		this.battleManager.handleEnemyDefeat(this.pokedollars, this.player);
	}

	this.cleanupDeadAllies();
};

Game.prototype.setupEventListeners = function () {
	const attackButton = document.getElementById("action-attack-enemy");
	const captureButton = document.getElementById("action-capture-enemy");
	const pokeballBuyButton = document.getElementById("pokeball-buy");
	if (attackButton) attackButton.addEventListener("click", this.playerAttack.bind(this));
	if (captureButton) captureButton.addEventListener("click", this.playerCapture.bind(this));
	if (pokeballBuyButton) pokeballBuyButton.addEventListener("click", this.playerBuyPokeball.bind(this));
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

Game.prototype.playerBuyPokeball = function () {
	if(this.pokedollars.quantity >= 100){
		this.pokedollars.quantity -= 100;
		this.pokeballs.quantity++;
		console.log("Comprou a bola");
	}else{
		console.log("tu é pobre fi");
		
	}
};

Game.prototype.cleanupDeadAllies = function () {
	this.player.pokemonSet = this.player.pokemonSet.filter((ally) => {
		if (ally.health <= 0) {
			const allyDiv = document.getElementById(`pokemon-ally-${ally.id}`);

			if (allyDiv) {
				allyDiv.remove();
			}

			return false;
		} else {
			return true;
		}
	});
};
