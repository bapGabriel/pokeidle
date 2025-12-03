function PokemonAlly() {
	Pokemon.call(this);

	this.experience = 0;
}

PokemonAlly.prototype = Object.create(Pokemon.prototype);
PokemonAlly.prototype.constructor = PokemonAlly;

PokemonAlly.prototype.clonePokemon = function (pokemon) {
	this.id = pokemon.id;
	this.name = pokemon.name;
	this.sprite = pokemon.sprite;

	this.maxHealth = pokemon.maxHealth;
	this.health = this.maxHealth;

	this.attack = pokemon.attack;
	this.defense = pokemon.defense;
	this.speed = pokemon.speed;
	this.regen = pokemon.regen;

	this.baseMaxHealth = pokemon.baseMaxHealth;
	this.baseAttack = pokemon.baseAttack;
	this.baseDefense = pokemon.baseDefense;
	this.baseSpeed = pokemon.baseSpeed;
	this.baseRegen = pokemon.baseRegen;

	this.type = pokemon.type;
	this.level = pokemon.level;
};

PokemonAlly.prototype.performAutoAttack = function (target) {
	target.takeDamage(this.attack / 3);
};

PokemonAlly.prototype.createDisplay = async function () {
	const typeData = await this.getType();
	const pokemonDiv = document.createElement("div");
	pokemonDiv.innerHTML = `<div id="pokemon-ally-${this.id}" class="flex w-full">
                                        <div class="w-2"></div>
                                        <div
                                            class="flex w-full overflow-hidden border-r-0 rounded-lg rounded-r-none bg-slate-400 border-3 border-neutral-700">
                                            <div class="h-full border-r-3 border-neutral-700 aspect-square">
                                                <img src="${this.sprite}"
                                                    class="h-full w-full bg-slate-200 [image-rendering:pixelated]">
                                            </div>
                                            <div class="flex flex-col justify-between flex-1 px-2">
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col justify-between">
                                                        <div>
                                                            <span id="pokemon-ally-name-${this.id}" class="capitalize">${this.name}</span>
                                                            <span id="pokemon-ally-level-${this.id}">Lv. ${this.level}</span>
                                                        </div>
                                                        <div class="overflow-hidden border-2 rounded-xl border-neutral-700">
                                                            <div style="background-color: ${POKEMONTYPES.visual[typeData.name].hexColor};" class="bg-red-400 border-1 border-slate-200 rounded-xl">
                                                                <p class="capitalize text-center">${POKEMONTYPES.visual[typeData.name].translation}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="grid items-center grid-cols-2 gap-y-0.5 gap-x-2">
                                                        <div>
                                                            <span>Ataque:</span>
                                                            <span id="pokemon-ally-attack-${this.id}">${Math.floor(this.attack)}</span>
                                                        </div>
                                                        <div>
                                                            <span>Defesa:</span>
                                                            <span id="pokemon-ally-defense-${this.id}">${Math.floor(this.defense)}</span>
                                                        </div>
                                                        <div>
                                                            <span>Velocidade:</span>
                                                            <span id="pokemon-ally-speed-${this.id}">${Math.floor(this.speed)}</span>
                                                        </div>
                                                        <div>
                                                            <span>Regeneração:</span>
                                                            <span id="pokemon-ally-regen-${this.id}">${Math.floor(this.regen)}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex items-center gap-2">
                                                        <span>HP:</span>
                                                        <div class="w-full h-3 border-2 bg-slate-700 border-neutral-700">
                                                            <div id="pokemon-ally-health-bar-${this.id}" class="h-2 bg-green-400" style="width: 100%;"></div>
                                                        </div>
                                                        <span id="pokemon-ally-health-${this.id}">${Math.floor(this.health)}/${Math.floor(this.maxHealth)}</span>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <span>XP:</span>
                                                        <div class="w-full h-3 border-2 bg-slate-700 border-neutral-700">
                                                            <div id="pokemon-ally-exp-bar-${this.id}" class="h-2 bg-yellow-400" style="width: 0%;"></div>
                                                        </div>
                                                        <span id="pokemon-ally-exp-${this.id}">${Math.floor(this.experience)}/${Math.floor(CONFIG.BASE_EXPERIENCE * Math.pow(CONFIG.POKEMON_EXPERIENCE_MULTIPLIER, this.level))}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
	document.getElementById("player-pokemon-set").append(pokemonDiv);
};

PokemonAlly.prototype.takeDamageAnimation = function () {
	return;
};

PokemonAlly.prototype.gainExperience = function (value) {
	this.experience += value;
	const experienceRequired = Math.floor(CONFIG.BASE_EXPERIENCE * Math.pow(CONFIG.POKEMON_EXPERIENCE_MULTIPLIER, this.level));
	if (this.experience >= experienceRequired) {
		this.experience -= experienceRequired;
		this.level += 1;
		this.levelScale();
	}
};
