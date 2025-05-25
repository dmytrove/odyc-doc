<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import PaintDemo from '../../../lib/ui/Doc/PaintDemo.svelte'
</script>

# <Emoji src="🚀"/> Actions du jeu

intro

---

## <Emoji src="🙊"/> Ouvrir un dialogue

Vous pouvez déclencher un dialogue en utilisant la méthode `openDialog` de l’objet `game` :

```javascript
const game = createGame({
	//...
})

game.openDialog('Bonjour le monde !')
```

---

## <Emoji src="🎶"/> Jouer un son

Vous pouvez jouer un son manuellement en utilisant la méthode `playSound` de l’objet `game`:

```js
game.playSound('BLIP')
game.playSound('PICKUP', 42)
game.playSound('https://pfxr/...')
game.playSound({ frequency: 300, waveForm: 1 })
```

---
