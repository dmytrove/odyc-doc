<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="💬"/> Les Dialogues

Les dialogues permettent d'introduire des conversations, des indices ou des éléments narratifs... Vous pouvez également les enrichir avec des effets visuels et des couleurs.

---

## <Emoji src="✏️"/> Définir un dialogue

Pour associer un dialogue à un élément du jeu, utilisez la propriété `dialog` dans la définition de vos templates :

```javascript
createGame({
	templates: {
		'@': {
			dialog: 'Bonjour le monde !'
		}
	}
})
```

À chaque fois que le joueur rentrera en contact avec un élément `@`, la boîte de dialogue affichera `Bonjour le monde !`.

---

## <Emoji src="⛓️‍💥"/> Découper un dialogue

Pour forcer un retour à la ligne utilisez le caractère `|`.

```js
'Bonjour !|Comment allez-vous ?|Bonne journée !'
```

<Aside variant="Note">
Pour laisser des lignes vides, il est possible de faire suivre plusieurs <code>|</code>.
</Aside>

---

## <Emoji src="💥"/> Ajouter des effets et des couleurs au texte

Pour rendre votre dialogue plus dynamique, vous pouvez lui appliquer des effets et des couleurs en utilisant une syntaxe simple.

<video src="/doc/dialog-fx.webm" autoplay loop muted playsinline/>

### Effets

| Effet                | Syntaxe         | Description                       |
| -------------------- | --------------- | --------------------------------- |
| Vague verticale      | `~votre texte~` | Lettres qui montent et descendent |
| Vague horizontale    | `_votre texte_` | Lettres qui ondulent latéralement |
| Secousse aléatoire   | `votre %texte%` | Tremblement désordonné            |
| Secousse horizontale | `votre =texte=` | Tremblement gauche-droite         |
| Secousse verticale   | `votre ^texte^` | Tremblement haut-bas              |
| Clignotement         | `votre °texte°` | Apparition-dispariton             |

### Couleurs

Pour appliquer une couleur, encadrez le texte avec `<n>`, où `n` correspond à l’index de la couleur dans [votre palette](/fr/doc/configuration/colors#personnaliser-la-palette) :

```js
'<3>Texte bleu<3> '
```

Il est possible de combiner une couleur avec un effet.

```js
'~<2>Texte gris avec un mouvement de vague<2>~'
```

## <Emoji src="🫥"/> Afficher des caractères spéciaux

Si vous souhaitez afficher un caractère réservé (comme `%`, `~`, `_`, `^`, `=`, `°` ), précédez-le de deux antislash `\` :

```js
'Il ne me reste que 56\\% de batterie'
```

affichera :

_Il ne me reste que 56% de batterie_

---

## <Emoji src="🎙️"/> Voix de personnages

Vous pouvez ajouter des sons de voix synchronisés aux dialogues pour créer des voix de personnages distinctes. Ces sons jouent automatiquement pendant la frappe du texte, avec un timing de 30ms par caractère.

### Utilisation de base

```js
// Ouvrir un dialogue avec une voix spécifique
game.openDialog("Bonjour !", { template: "BLIP" })
```

### Templates de voix disponibles

| Template | Description |
|----------|-------------|
| `BLIP` | Bip électronique simple |
| `HIT` | Son d'impact grave |
| `PICKUP` | Son aigu de ramassage |
| `JUMP` | Son de saut |
| `FALL` | Son de chute |
| `POWERUP` | Son d'amélioration |
| `LASER` | Son laser futuriste |
| `BLIP_RANDOM` | Bips avec variations aléatoires |

### Modes de variation

```js
// Voix avec graine fixe (son identique à chaque fois)
game.openDialog("Texte", { template: "BLIP", seed: 42 })

// Voix aléatoire par dialogue (différent à chaque dialogue)
game.openDialog("Texte", { template: "BLIP", seed: null })

// Voix aléatoire par caractère (défaut)
game.openDialog("Texte", { template: "BLIP" })
```

### Voix par défaut dans les templates

Vous pouvez définir une voix par défaut pour un personnage dans son template. Cette voix sera automatiquement utilisée lorsque le joueur interagit avec ce personnage :

```javascript
createGame({
  templates: {
    'R': {
      sprite: 2,
      dialog: "Je suis un robot !",
      voice: { template: "HIT" }
    },
    'F': {
      sprite: 3, 
      dialog: "Je suis amical !",
      voice: { template: "BLIP", seed: 42 }
    },
    'Q': {
      sprite: 4,
      dialog: "Je suis silencieux...",
      // Pas de propriété voice - ce personnage est silencieux
    }
  }
})
```

Lorsque le joueur interagit avec le personnage 'R', son dialogue utilisera automatiquement le template de voix HIT. Le personnage 'F' utilisera BLIP avec une graine fixe, et le personnage 'Q' sera silencieux.

### Notes importantes

- Les espaces et la ponctuation sont silencieux
- Les dialogues sans paramètre `template` sont complètement silencieux
- Les sons de voix sont indépendants des autres effets sonores du jeu
