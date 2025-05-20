const game = createGame({
	player: {
		sprite: `
			........
			..8..8..
			.888888.
			88088088
			.888888.
			..8..8..
			..8..8..
			.88..88.
			`,
		position: [1, 1]
	},
	templates: {
		// Bell
		b: {
			sprite: `
			...9....
			...9....
			...9....
			...9....
			..555...
			.55555..
			.55555..
			5555555.
			`,
			sound: createSound('PICKUP', 1560136431384798)
		},

		// wall
		x: {
			sprite: 9
		}
	},
	map: `
	xxxxxxxx
	x......x
	x......x
	x......x
	x...b..x
	x......x
	x......x
	xxxxxxxx
	`,
	background: 7
})
