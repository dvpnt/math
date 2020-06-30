const _ = require('underscore');

class Interpolator {
	constructor(coeffs) {
		this._coeffs = coeffs;
	}

	of(x) {
		return _(this._coeffs).reduce((sum, coeff, i) => sum + coeff * x ** i, 0);
	}

	error(xs, ys) {
		return _(xs).reduce((error, x, i) => error + Math.abs(this.of(x) - ys[i]), 0);
	}
}

module.exports = Interpolator;
