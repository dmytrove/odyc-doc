Les `templates` ne sont pas définis que par leur sprite vous pouvez également définir s'ils sont solides, visibles, s'ils déclenchent une fin et dans le cas qui nous intéresse: s'ils ouvrent une boîte de dialogue.

## `dialog`

Lorsqu’un paramètre dialog est défini pour un template, une boîte de dialogue s’ouvre lorsque le player "touche" l'élément. Cela permet une narration dynamique et engage le joueur.

Mettons que l'on veuille créer une pancarte:

```js
createGame({
	//...
	templates: {
		//...
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
	}
	//...
})
```

Il ne vous reste alors plus qu'à ajouter un élément `p` sur votre `map`.
