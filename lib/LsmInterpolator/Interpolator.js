const _ = require('underscore');

class Interpolator {
	constructor(coeffs) {
		this._coeffs = coeffs;
	}

	of(x) {
		return _(this._coeffs).reduce((sum, coeff, i) => sum + coeff * x ** i, 0);
	}

	std(xs, ys) {
		const errors = _(xs).reduce(
			(sum, x, i) => sum + (this.of(x) - ys[i]) ** 2,
			0
		);

		return Math.sqrt(errors / (xs.length + 1));
	}
}

module.exports = Interpolator;
