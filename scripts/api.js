import { CONFIG } from "./config.js";
import { POKEMONCACHE } from "./data/pokemonCache.js";
import { POKEMONTYPES } from "./data/pokemonTypes.js";

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

export const API = {
	getPokemon: async (index) => {
		if (POKEMONCACHE[index]) {
			return POKEMONCACHE[index];
		} else {
			const data = await fetchPokemonData(index);
			POKEMONCACHE[index] = data;

			return data;
		}
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
