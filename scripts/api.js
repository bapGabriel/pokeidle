const API = {
	baseURL: "https://pokeapi.co/api/v2",
	get: (endpoint) => {
		fetch(baseURL + endpoint)
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				//
			});
	},
};
