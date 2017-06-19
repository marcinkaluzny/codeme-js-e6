function Auto(marka, model) {
	this.marka = marka;
	this.model = model;
}

Object.assign(Auto.prototoype, {
	pobierzMarka: function () {
		return this.marka;
	}
});

let audiA4 = new Auto("Audi", "A4");

Auto.prototype.pobierzModel = function () {
	return this.model;
}

audiA4.pobierzModel();

Auto.prototype.ustawPredkoscMax = function (predkoscMax) {
	this.predkoscMax = predkoscMax;
}


function AutoOsobowe(marka, model, typNadwozia) {
	Auto.call(this, marka, model);

	this.typNadwozia = typNadwozia;
}
AutoOsobowe.prototype = Object.create(Auto.prototype);

function AutoCiezarowe(marka, model, ladownosc) {
	Auto.call(this, marka, model);
}
AutoCiezarowe.prototype = Object.create(Auto.prototype);

//AutoOsobowe.inherits(Auto);

class AutoOsobowe extends Auto {
	constructor(marka, model, typNadwozia) {
		super(marka, model);

		this.typNadwozia = typNadwozia;
	}
}

new AutoOsobowe('Opel', 'Corsa', 'sedan');
