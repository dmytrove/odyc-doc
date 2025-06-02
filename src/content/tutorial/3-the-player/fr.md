<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
</script>

Pour introduire le héros de notre jeu, nous allons utiliser le paramètre `player`. Ce paramètre contient deux propriétés : `sprite` et `position`.

Pour l'instant, nous allons simplement changer la couleur de notre héros, mais dans la section suivante nous verrons comment dessiner des sprites plus complexes.

Les paramètres par défaut du joueur sont les suivants :

```js
player: {
    sprite: 0,
    position: [0, 0]
}
```

Ces paramètres positionnent le joueur en haut à gauche de l'écran et représente le joueur par un carré noir. Modifions ces valeurs pour personnaliser l'apparence et la position initiale du héros.

Les coordonnées sont indiquées sous forme de tableau `[x, y]`, où `x` représente la colonne et `y` la ligne sur la grille du jeu. Par exemple, `[4, 4]` place le héros au centre si votre grille est de taille 8x8.

<Aside>

N'hésitez pas à expérimentez avec différentes valeurs pour `sprite` et `position` afin de mieux comprendre leur impact sur le jeu.

</Aside>
