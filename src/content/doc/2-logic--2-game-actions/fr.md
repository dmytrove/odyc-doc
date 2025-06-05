<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import PaintDemo from '../../../lib/ui/Doc/PaintDemo.svelte'
</script>

# <Emoji src="🚀" /> Actions du jeu

L’objet `game` expose plusieurs méthodes pour déclencher des actions visibles ou audibles : afficher un message, ouvrir un dialogue, jouer un son ou finir le jeu.

Ces méthodes peuvent être appelées dynamiquement à n’importe quel moment de la partie (par exemple lors d’un `onCollide`, `onEnter`, ou dans une logique personnalisée).

---

## <Emoji src="💬" /> Ouvrir un dialogue

Vous pouvez déclencher un dialogue avec `game.openDialog()` :

```js
const game = createGame({
	// ...
})

game.openDialog('Bonjour le monde !')
```

Cela affichera une boîte de dialogue avec le texte fourni.
Vous pouvez également utiliser les effets de texte et les couleurs (voir [Dialogues](/fr/doc/world-building/dialogues)).

---

## <Emoji src="🎶" /> Jouer un son

Pour jouer un son manuellement, utilisez `game.playSound()` :

```js
game.playSound('BLIP')
game.playSound('PICKUP', 42)
game.playSound('https://pfxr/...')
game.playSound({ frequency: 300, waveForm: 1 })
console.log('Not highlighted')
```

Vous pouvez passer un **preset**, un **preset + seed**, une **URL PFXR**, ou un **objet personnalisé**.
Voir [la page sur les sons](/fr/doc/world-building/sounds) pour plus de détails.

---

## <Emoji src="✉️" /> Afficher un message

La méthode `game.openMessage()` permet d’afficher un ou plusieurs messages dans la boîte de message:

```js
game.openMessage('Bonjour')
game.openMessage('Bonjour', 'Bienvenue')
game.openMessage('Bonjour et ~bienvenue~')
```

---

## <Emoji src="✋" /> Poser une question au joueur

La méthode `game.prompt()` permet de laisser le choix au joueur entre plusieurs options :

```js
await game.prompt('oui', 'non')
await game.prompt('Papier', 'Caillou', 'Ciseau')
```

Cette méthode retourne une **promesse** contenant l’**index** de l’option choisie: `0` → première option, `1` → deuxième option, etc...

Cela vous permet de réagir différemment selon le choix du joueur :

```js
const choix = await game.prompt('Aller à gauche', 'Aller à droite')

if (choix === 0) {
	game.openMessage('Vous tournez à gauche')
} else {
	game.openMessage('Vous tournez à droite')
}
```

---

## <Emoji src="🏁" /> Finir le jeu

La méthode `game.end()` permet de **relancer le jeu depuis le début**.
Si un ou plusieurs textes sont fournis, ils seront affichés via la boîte de message avant le redémarrage.

```js
game.end()
game.end('Gagné')
game.end('Perdu', 'Mais bien joué quand même')
```

---

## <Emoji src="⏰" /> Enchaîner les actions

Les méthodes `openDialog`, `openMessage` et `playSound` **retournent une promesse**, ce qui vous permet d’attendre la fin de l’action avant d’enchaîner la suite.

Par exemple, pour attendre la fin d’un message avant de jouer un son:

```js
await game.openMessage('Attention...')
game.playSound('EXPLOSION')
```

Et pour une séquence de dialogues avec un son entre deux:

```js
await game.openDialog('Tu es prêt ?')
await game.playSound('BLIP')
await game.openDialog('Alors allons-y.')
```
