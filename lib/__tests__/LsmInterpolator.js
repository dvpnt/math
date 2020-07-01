const _ = require('underscore');
const t = require('tap');
const {createLsmInterpolator} = require('..');

function interpolate(interpolator, xs) {
	return _(xs).map((x) => Number(interpolator.of(x).toFixed(3)));
}

t.test('LsmInterpolator', (t) => {
	const xs = [0.5, 1, 1.5, 2, 2.5, 3];
	const ys = [0.35, 0.8, 1.7, 1.85, 3.51, 1.02];

	t.test('with specific coeffs count', (t) => {
		const interpolator = createLsmInterpolator({xs, ys, coeffsCount: 2});

		t.strictSame(
			interpolate(interpolator, [0.5, 1.75, 3]),
			[0.708, 1.538, 2.369],
			'check interpolation'
		);

		t.end();
	});

	t.test('with autofit coeffs count', (t) => {
		const interpolator =
			createLsmInterpolator({xs, ys, coeffsCount: {min: 2, max: 10}});

		t.strictSame(
			interpolate(interpolator, [0.5, 1.75, 3]),
			[0.35, 1.675, 1.02],
			'check interpolation'
		);

		t.end();
	});

	t.end();
});
