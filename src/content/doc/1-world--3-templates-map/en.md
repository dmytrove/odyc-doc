<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="🌍" /> Templates and the Map

`templates` define all the objects in your game — obstacles, items, characters, etc.  
Each template is associated with a unique character (e.g. `"X"`, `"$"`, `"e"`, `"#"`).  
You can then assign a set of properties to each template and place them in the `map`.

---

## <Emoji src="⚙️" /> Template properties

Each template accepts the following properties:

| Property    | Default value | Description                                                                                                            |
| ----------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `solid`     | `false`       | Determines whether the player can pass through the object.                                                             |
| `visible`   | `true`        | Whether the sprite is visible or not.                                                                                  |
| `sprite`    | None          | Defines the visual appearance of the object ([see sprites](/en/doc/world-building/sprites)).                           |
| `sound`     | None          | Sound played when interacting with the object ([see sounds](/en/doc/world-building/sounds)).                           |
| `dialog`    | None          | Dialog displayed when the player interacts with the object ([see dialogs](/en/doc/world-building/dialogues)).          |
| `end`       | None          | Ends the game with a custom message ([see title & end screen](/en/doc/world-building/title-and-end)).                  |
| `onCollide` | None          | Called when the player **collides** with the object ([see events](/en/doc/interaction-and-logic/events)).              |
| `onEnter`   | None          | Called when the player **enters the tile** containing the object ([see events](/en/doc/interaction-and-logic/events)). |
| `onLeave`   | None          | Called when the player **leaves the tile** containing the object ([see events](/en/doc/interaction-and-logic/events)). |

```js
createGame({
	templates: {
		r: {
			sprite: 6,
			sound: ['HIT', 999],
			visible: false,
			end: 'Game Over'
		},
		g: {
			sprite: 7,
			dialog: "I'm grass.",
			solid: false
		}
	}
})
```

---

## <Emoji src="🗺️" /> The Map

The `map` defines how objects are arranged in the world using an ASCII grid.
Each character in the grid corresponds to a `template`.

💡 Creating a map is a lot like drawing a sprite!

- Each character defined in `templates` is interpreted.
- Spaces, tabs, and empty lines are ignored.
- Any undefined character is treated as an empty cell.

```js
createGame({
	templates: {
		x: { sprite: 0 },
		g: { sprite: 7 },
		r: { sprite: 4 }
	},
	map: `
    xxxxxxxxxxxxxxxx
    x..............x
    x...........g..x
    x..............x
    x..............x
    x....r.........x
    x..............x
    xxxxxxxxxxxxxxxx
  `
})
```
