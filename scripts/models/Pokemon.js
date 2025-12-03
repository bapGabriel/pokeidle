function Pokemon() {
	this.id = "";
	this.name = "";
	this.sprite = "";

	this.maxHealth = 0;
	this.health = 0;
	this.attack = 0;
	this.defense = 0;
	this.speed = 0;
	this.regen = 0;

	this.baseMaxHealth = 0;
	this.baseAttack = 0;
	this.baseDefense = 0;
	this.baseSpeed = 0;
	this.baseRegen = 0;

	this.type = 0;
	this.level = 0;

	this.attackTimer = 0;
	this.isDead = false;
}

Pokemon.prototype.create = function (pokemon, level = 1) {
	return new Promise(async (resolve, reject) => {
		try {
			const data = await API.getPokemon(pokemon);
	
			if(!data || !data.sprites || !data.stats){
				throw new Error("A API retornou uma estrutura de dados inválida.")
			}
			
			this.id = window.crypto.randomUUID();
			this.name = data.name;
			this.sprite = data.sprites.front_default;
	
			this.maxHealth = data.stats.find((s) => s.stat.name === "hp").base_stat;
			this.health = this.maxHealth;
	
			this.attack = data.stats.find((s) => s.stat.name === "attack").base_stat;
			this.defense = data.stats.find((s) => s.stat.name === "defense").base_stat;
			this.speed = data.stats.find((s) => s.stat.name === "speed").base_stat;
			this.regen = data.stats.find((s) => s.stat.name === "special-defense").base_stat / data.stats.find((s) => s.stat.name === "special-attack").base_stat;
	
			this.baseMaxHealth = this.maxHealth;
			this.baseAttack = this.attack;
			this.baseDefense = this.defense;
			this.baseSpeed = this.speed;
			this.baseRegen = this.regen;
	
			const typeURL = data.types[0].type.url.split("/");
			this.type = typeURL.pop() || typeURL.pop();
			this.level = level;
	
			this.levelScale();

			resolve(this);
		} catch (error) {
			reject(new Error("Erro criando Pokemon: ", error))
		}
	});
};

Pokemon.prototype.getType = async function () {
	const data = await API.getType(this.type);
	return data;
};

Pokemon.prototype.levelScale = function () {
	this.maxHealth = Math.floor(this.baseMaxHealth * Math.pow(CONFIG.POKEMON_HEALTH_MULTIPLIER, this.level));
	this.attack = this.baseAttack * Math.pow(CONFIG.POKEMON_ATTACK_MULTIPLIER, this.level);
	this.defense = this.baseDefense * Math.pow(CONFIG.POKEMON_DEFENSE_MULTIPLIER, this.level);
	this.speed = this.baseSpeed * Math.pow(CONFIG.POKEMON_SPEED_MULTIPLIER, this.level);
	this.regen = this.baseRegen * Math.pow(CONFIG.POKEMON_REGEN_MULTIPLIER, this.level);
	this.health = this.maxHealth;
};

Pokemon.prototype.takeDamage = function (damage) {
	// const defenseMultiplier = 0.5;
	// const minDamage = 1;

	// const damageReduction = this.defense * defenseMultiplier;

	// const finalDamage = Math.max(minDamage, damage - damageReduction);

	finalDamage = damage * (damage / (damage + this.defense));

	this.health -= finalDamage;

	if (this.health < 0) {
		this.isDead = true;
		this.health = 0;
	}

	this.takeDamageAnimation(Math.floor(finalDamage));
};

Pokemon.prototype.regenerate = function (deltaTime) {
	if (this.isDead) return;
	if (this.health < this.maxHealth) {
		this.health += this.regen / 60;
	}
	if (this.health >= this.maxHealth) {
		this.health = this.maxHealth;
	}
};
