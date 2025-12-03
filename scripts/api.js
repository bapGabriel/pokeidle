async function fetchPokemonData(index) {
	return fetch(`${CONFIG.API_URL}/pokemon/${index}`)
		.then((response) => response.json())
		.catch((err) => {
			console.error(err);
		})
		.finally(() => {});
}

async function fetchTypeData(index) {
	return fetch(`${CONFIG.API_URL}/type/${index}`)
		.then((response) => response.json())
		.catch((err) => {
			console.error(err);
		})
		.finally(() => {});
}

const API = {
	getPokemon: async (index) => {
		if (POKEMONCACHE[index]) {
			return POKEMONCACHE[index];
		} else {
			const data = await fetchPokemonData(index);
			POKEMONCACHE[index] = data;

			return data;
		}
	},

	getAllPokemonByEvolutionStage: async (stage) => {
		const listData = await fetch(`${CONFIG.API_URL}/evolution-chain?limit=50`).then((response) => response.json());

		const pokemon = [];

		for (const item of listData.results) {
			const chain = await fetch(item.url).then((response) => response.json());
			const chainURL = chain.chain.species.url.split("/");
			const pokemonID = chainURL.pop() || chainURL.pop();
			pokemon.push(Number.parseInt(pokemonID));
		}

		return pokemon;
	},

	getType: async (index) => {
		if (POKEMONTYPES.types[index]) {
			return POKEMONTYPES.types[index];
		} else {
			const data = await fetchTypeData(index);
			POKEMONTYPES.types[index] = {
				name: data.name,
				doubleDamageFrom: [],
				doubleDamageTo: [],
				halfDamageFrom: [],
				halfDamageTo: [],
				noDamageFrom: [],
				noDamageTo: [],
			};

			return data;
		}
	},
};
