function createSplatterParticle(originX, originY, containerElement) {
	const particle = document.createElement("div");

	const startX = originX + (Math.random() - 0.5) * 20;
	const startY = originY + (Math.random() - 0.5) * 20;

	particle.style.left = `${startX}px`;
	particle.style.top = `${startY}px`;

	const size = 5 + Math.random() * 10;
	particle.style.width = `${size}px`;
	particle.style.height = `${size}px`;

	const redHue = 0 + Math.random() * 20;
	particle.style.backgroundColor = `hsl(${redHue}, 100%, 50%)`;
	particle.style.position = "absolute";
	particle.style.zIndex = 2;
	particle.style.borderRadius = "20px";

	containerElement.appendChild(particle);

	const duration = 500 + Math.random() * 300;
	const endX = startX + (Math.random() - 0.5) * 500;
	const endY = startY + (Math.random() - 0.5) * 500;

	particle.animate(
		[
			{ transform: `translate(0, 0) scale(1)`, opacity: 1 },
			{ transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 },
		],
		{
			duration: duration,
			easing: "ease-out",
			fill: "forwards",
		}
	).onfinish = () => {
		particle.remove();
	};
}

function createDamageParticle(originX, originY, containerElement, damageValue) {
	const particle = document.createElement("div");

	const startX = originX + (Math.random() - 0.5) * 20;
	const startY = originY + (Math.random() - 0.5) * 20;

	particle.style.left = `${startX}px`;
	particle.style.top = `${startY}px`;

	const size = 5 + Math.random() * 10;
	particle.style.width = `${size}px`;
	particle.style.height = `${size}px`;

	const redHue = 0 + Math.random() * 20;
	particle.style.color = `hsl(${redHue}, 100%, 50%)`;
	particle.style.position = "absolute";
	particle.style.zIndex = 2;
	particle.style.borderRadius = "20px";
	particle.style.fontSize = "4rem";
	particle.innerHTML = damageValue;

	containerElement.appendChild(particle);

	const duration = 1000 + Math.random() * 300;
	const endX = startX + (Math.random() - 0.5) * 500;
	const endY = startY + (Math.random() - 0.5) * 500;

	particle.animate(
		[
			{ transform: `translate(0, 0) scale(1)`, opacity: 1 },
			{ transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 },
		],
		{
			duration: duration,
			easing: "ease-out",
			fill: "forwards",
		}
	).onfinish = () => {
		particle.remove();
	};
}
