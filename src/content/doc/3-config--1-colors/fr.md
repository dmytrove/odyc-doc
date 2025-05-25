<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import PaintDemo from '../../../lib/ui/Doc/PaintDemo.svelte'
import ColorsDemo from '../../../lib/ui/Doc/ColorsDemo.svelte'
</script>

# <Emoji src="🫟" /> Modifier les couleurs dujeu

Odyc.js utilise une palette de couleurs personnalisable pour dessiner les sprites, les dialogues et l’interface du jeu. Une palette est fournie par défaut, mais vous pouvez la remplacer ou l’ajuster comme vous le souhaitez.

## <Emoji src="🌈" /> Personnalisation de la palette

Voici la palette prédéfinie. Cliquez sur une couleur pour copier son code hexadécimal.

<ColorsDemo/>

_Ces couleurs proviennent de l’excellente palette [Open Color](https://yeun.github.io/open-color/)._

Vous pouvez remplacer cette palette avec votre propre liste de couleurs :

```js
createGame({
	// ...
	colors: [
		'red',
		'orange',
		'lab(50% 40 59.5)',
		'hwb(12 50% 0%)',
		'#f06595',
		'#f09',
		'oklch(60% 0.15 50)',
		'hsl(150 30% 60%)',
		'light-dark(white, black)',
		'black'
	]
})
```

`colors` doit recevoir un tableau de chaînes interprétées comme des [couleurs CSS](https://developer.mozilla.org/fr/docs/Web/CSS/color_value)(noms de couleurs, codes hexadécimaux, RGB, HSL, LAB, etc...)

---

## <Emoji src="💅"/> Apparence des dialogues et des messages

Vous pouvez également personnaliser l’apparence des boîtes de dialogue et de message avec des options supplémentaires.

### Boîte de dialogue

- `dialogColor` → couleur du texte
- `dialogBackground` → couleur du fond
- `dialogBorder` → couleur de la bordure

Ces valeurs peuvent être une [couleur CSS](https://developer.mozilla.org/fr/docs/Web/CSS/color_value) ou un chiffre correspondant à une couleur de la palette.

```javascript
createGame({
	// ...
	dialogBackground: '#228be6',
	dialogBorder: 3,
	dialogColor: 'white'
})
```

### Boîte de message

- `messageColor` → couleur du texte
- `messageBackground` → couleur du fond

Ces valeurs peuvent être une [couleur CSS](https://developer.mozilla.org/fr/docs/Web/CSS/color_value) ou un chiffre correspondant à une couleur de la palette.

```javascript
createGame({
	//...
	messageColor: 'red',
	messageBackground: '#228be6'
})
```
