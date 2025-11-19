import { Game } from "./models/Game.js";

document.addEventListener("DOMContentLoaded", async () => {
	const app = new Game();
	app.start();
});
