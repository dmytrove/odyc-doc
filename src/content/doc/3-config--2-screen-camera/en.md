<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="🎥" /> The Camera

The camera controls which part of the game world is visible.  
You can customize the **sprite size**, **screen size**, and **tracking behavior** for either a smooth or snappy follow effect.

---

## <Emoji src="📐" /> Sprite Size

By default, each sprite is **8 × 8 pixels**, but you can change this using `cellWidth` and `cellHeight`:

```js
createGame({
	cellWidth: 16,
	cellHeight: 32
})
```

<Aside>
All sprites share the same size.  
To simulate larger objects, you can combine multiple sprites together.
</Aside>

---

## <Emoji src="🖥️" /> Screen Size

The screen size defines the visible area of the world.
It is measured in **grid cells**, not pixels:

```js
createGame({
	screenWidth: 16,
	screenHeight: 12
})
```

---

## <Emoji src="📍" /> Camera Tracking

By default, the camera **snaps instantly** when the player moves off screen.

To enable **smooth tracking**, define a central invisible **tracking zone** around the player.
The camera will only move when the player exits this zone.

These dimensions are also in grid cells, not pixels.

<div class="relative">
<video src="/doc/camera-example.webm" autoplay loop muted playsinline />
<div class="absolute inset-[33%] border-4 border-blue-500"></div>
</div>

```js
createGame({
	screenWidth: 12,
	screenHeight: 12,
	cameraWidth: 4,
	cameraHeight: 4
})
```

<Aside variant="Warning">

To enable smooth tracking, you must define **both** `cameraWidth` **and** `cameraHeight`.

</Aside>
