<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="🎥" /> La Caméra

La caméra contrôle la portion visible du monde. Vous pouvez ajuster **la taille des sprites**, **la taille de l’écran**, ainsi que **le comportement du suivi** pour obtenir un effet plus fluide ou plus rigide selon vos besoins.

---

## <Emoji src="📐" /> Taille des sprites

Par défaut, les sprites font **8 × 8 pixels**, mais vous pouvez ajuster cette taille via les options `cellWidth` et `cellHeight` :

```js
createGame({
	cellWidth: 16,
	cellHeight: 32,
})
```

<Aside>
Tous les sprites ont la même taille.  
Vous pouvez simuler des objets plus grands en combinant plusieurs sprites.
</Aside>

---

## <Emoji src="🖥️" /> Taille de l’écran

La taille de l’écran détermine la portion visible du monde pour le joueur.
Elle s’exprime en **nombre de cases** (et non en pixels) :

```js
createGame({
	screenWidth: 16,
	screenHeight: 12,
})
```

---

## <Emoji src="📍" /> Suivi de la caméra

Par défaut, la caméra se **recentre brutalement** lorsque le joueur sort de l’écran.

Pour obtenir un **suivi fluide**, vous pouvez définir une **zone centrale** invisible (un rectangle autour du joueur).
La caméra ne bougera que si le joueur sort de cette zone.

Ces dimensions sont également définies en nombre de cases et non en pixels.

<div class="relative">
<video src="/doc/camera-example.webm" autoplay loop muted playsinline />
<div class="absolute inset-[33%] border-4 border-blue-500"></div>
</div>

```js
createGame({
	screenWidth: 12,
	screenHeight: 12,
	cameraWidth: 4,
	cameraHeight: 4,
})
```

<Aside variant="Warning">

Pour activer le suivi fluide, vous devez définir **à la fois** `cameraWidth` **et** `cameraHeight`.

</Aside>
