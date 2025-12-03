function Resource(name, initialQuantity = 0) {
	this.name = name;
	this.quantity = initialQuantity;

	this.add = function (value) {
		this.quantity += value;
	};
}
