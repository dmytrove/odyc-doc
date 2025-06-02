Les paramètres `templates` et `map` permettent de définir le monde dans lequel évolue le joueur.

### Les Templates

Les `templates` sont des modèles qui définissent tous les éléments du jeu. C'est grâce à eux que vous pourrez définir les murs, les ennemis, les pancartes et tout le reste. Lorsqu'un template est défini vous pouvez ensuite l'utiliser dans votre carte.

Pour définir un template pour un mur, par exemple :

```js
createGame({
	//...
	templates: {
		x: {
			sprite: 9
		}
	}
})
```

Le caractère `x` représente ici un mur et est associé à un sprite spécifique. Vous pouvez utiliser n'importe quel caractère pour représenter différents éléments dans vos templates.

### Dessiner la Map

La `map` utilise les templates définis précédemment pour créer l'environnement du jeu. Chaque caractère dans la `map` correspond à un template et permet de dessiner la carte.

Voici comment utiliser le template de mur pour dessiner un enclos :

```js
createGame({
	//...
	map: `
      xxxxxxxx
      x......x
      x......x
      x......x
      x......x
      x......x
      x......x
      xxxxxxxx
    `
})
```

- Chaque caractère présent dans `templates` sera transformé en l'objet correspondant dans le jeu.
- Les nouvelles lignes marquent le début d'une nouvelle rangée.
- Les espaces, tabulations et lignes vides sont ignorés.
- Tout autre caractère est interprété comme un espace vide.

C'est à votre tour maintenant ! Ajoutez des objets, agrandissez la map, expérimentez pour créer un monde riche et intéressant pour votre jeu.
