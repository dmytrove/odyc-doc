<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

## <Emoji src="🤏" /> Taille des sprites

Par défaut, les sprites font **8 × 8 pixels**, mais vous pouvez modifier cette taille via les options `cellWidth` et `cellHeight` :

```js
createGame({
	// ...
	cellWidth: 16,
	cellHeight: 32
})
```

<Aside>
Tous les sprites ont la même taille, mais vous pouvez simuler des tailles différentes en combinant plusieurs sprites pour représenter un seul élément.
</Aside>
