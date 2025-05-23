<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
</script>

# Les Dialogues

Dans OdyCJS, les dialogues permettent de faire parler vos personnages ou d’afficher des messages au joueur. Ils peuvent être déclenchés automatiquement ou dynamiquement, et enrichis avec des effets visuels et des couleurs.

---

## Définir un dialogue

Pour associer un dialogue à un élément du jeu, utilisez la propriété `dialog` dans la définition de vos templates :

```javascript
createGame({
	templates: {
		'@': {
			dialog: 'Bonjour,|comment allez-vous ?'
		}
	}
})
```

<Aside>
Le caractère <code>|</code> permet de séparer le dialogue en plusieurs lignes successives.
</Aside>

---

## Ouvrir un dialogue dynamiquement

Vous pouvez également déclencher un dialogue à tout moment en utilisant la méthode `openDialog` de l’objet `game` :

```javascript
const game = createGame()

game.openDialog('Bonjour !|Comment allez-vous ?')
```

---

## Découper un dialogue long

Utilisez le caractère `|` pour séparer un dialogue en **plusieurs parties**. Chaque segment sera affiché **séparément, dans l’ordre** :

```js
'Bonjour !|Comment allez-vous ?|Bonne journée !'
```

---

## Ajouter des effets et des couleurs au texte

Pour rendre vos dialogues plus dynamiques, vous pouvez appliquer des effets et des couleurs directement dans le texte en utilisant une syntaxe simple :

### Effets disponibles :

| Effet                | Syntaxe   | Description                       |
| -------------------- | --------- | --------------------------------- |
| Vague verticale      | `~texte~` | Lettres qui montent et descendent |
| Vague horizontale    | `_texte_` | Lettres qui ondulent latéralement |
| Secousse aléatoire   | `%texte%` | Tremblement désordonné            |
| Secousse horizontale | `=texte=` | Secousse gauche-droite            |
| Secousse verticale   | `^texte^` | Secousse haut-bas                 |

### Couleurs :

<!--
TODO Lien vers les couleurs
-->

Pour appliquer une couleur, encadrez le texte avec `<n>`, où `n` correspond à l’index de la couleur dans votre palette :

```js
'<1>Texte en couleur 1<1> '
```

```js
'~<2>Texte stylisé<2>~'
```

---

## Afficher des caractères spéciaux

Si vous souhaitez afficher un caractère réservé (comme `%`, `~`, `_`, `<`, `^`, `=`, `\`) sans déclencher d’effet, précédez-le de deux antislash `\` :

```js
'Il ne me reste que 56\\% de batterie'
```

---

## Personnaliser l’apparence de la boîte de dialogue

OdyCJS permet de personnaliser les couleurs de la boîte de dialogue via les paramètres `dialogColor` et `dialogBackground`. Ces paramètres acceptent des valeurs de couleurs CSS, ou un chiffre correspondant à l'index d'une couleur de votre palette :

```javascript
createGame({
	// ...
	dialogBackground: '#228be6',
	dialogBorder: 3,
	dialogColor: 'white'
})
```
