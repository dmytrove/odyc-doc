createGame({
	//title: "Mon jeu",
	background: 1,
	player: {
		sprite: `
          ...99...
          ...88...
          .000000.
          0.0000.0
          8.0000.8
          ..3333..
          ..3..3..
          ..0..0..
      `,
		position: [4, 4]
	},
	templates: {
		x: {
			sprite: 9
		},
		p: {
			sprite: `
        99999999
        91111119
        91111119
        99999999
        ...99...
        ...99...
        ...99...
        ...99...
      `,
			dialog: 'Vous êtes ici'
		}
	},
	map: `
      xxxxxxxx
      x......x
      x......x
      x....p.x
      x......x
      x......x
      x......x
      xxxxxxxx
    `
})
