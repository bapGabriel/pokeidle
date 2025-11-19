import { CONFIG } from "./config.js";

export const API = {
	getPokemon: async (index) => {
		return fetch(`${CONFIG.API_URL}/pokemon/${index}`)
			.then((response) => response.json())
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {});
	},

	getType: async (index) => {
		return fetch(`${CONFIG.API_URL}/type/${index}`)
			.then((response) => response.json())
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {});
	},
};
