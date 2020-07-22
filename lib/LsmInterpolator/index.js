const _ = require('underscore');
const math = require('mathjs');
const Interpolator = require('./Interpolator');

function createLsmInterpolator({xs, ys, coeffsCount}) {
	const coeffsRange = _(coeffsCount).isObject() ?
		_.range(coeffsCount.min, coeffsCount.max + 1) :
		_.range(coeffsCount, coeffsCount + 1);

	const interpolators = _(coeffsRange)
		.chain()
		.map((coeffsCount) => {
			const line = _.range(0, coeffsCount);

			const lsmMatrix = _(line).map(
				(i) => _(line).map(
					(j) => _(xs).reduce((sum, x) => sum + x ** (i + j), 0)
				)
			);

			if (Math.abs(math.det(lsmMatrix)) < 1e-5) return;

			const lsmVector = _(line).map(
				(i) => _(xs).reduce((sum, x, j) => sum + x ** i * ys[j], 0)
			);

			return new Interpolator(math.lusolve(lsmMatrix, lsmVector));
		})
		.compact()
		.value();

	if (_(interpolators).isEmpty()) {
		throw new Error('Failed to fit interpolator');
	}

	return _(interpolators).min((interpolator) => interpolator.std(xs, ys));
}

module.exports = createLsmInterpolator;
