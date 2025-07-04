<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="🪤" /> Events

To add interactivity, Odyc.js provides a simple event system.  
Events let you trigger actions or modify the game state when the player interacts with an element.

Events are defined inside `templates`.

---

## <Emoji src="🔎" /> Types of events

There are six types of events:

- **`onCollide`** — called when the player **collides** with the element
- **`onEnter`** — called when the player **enters a tile** containing the element
- **`onLeave`** — called when the player **leaves a tile** containing the element
- **`onScreenEnter`** — called when the element **enters the visible screen area**
- **`onScreenLeave`** — called when the element **leaves the visible screen area**
- **`onTurn`** — called at the **end of each turn**, after the player has attempted to move

```js
createGame({
  templates: {
    x: {
      onCollide() {
        alert(1)
      },
      onEnter() {
        alert(2)
      },
      onLeave() {
        alert(3)
      }
      onTurn(){
        alert(4)
      }
      onScreenEnter() {
        alert('hi')
      }
      onScreenLeave() {
        alert('bye')
      }
    }
  }
})
```

---

## <Emoji src="🎯" /> The target of the event

When an event is triggered, the affected object is passed as a parameter to the function.
You can use it to **modify the object dynamically** or even **remove it**.

```js
createGame({
	templates: {
		x: {
			onCollide(target) {
				target.remove()
			}
		}
	}
})
```

---

### <Emoji src="📋" /> Available properties

| Property / Method | Type                   | Description                                        | Read-only |
| ----------------- | ---------------------- | -------------------------------------------------- | --------- |
| `solid`           | `boolean`              | Makes the object passable or not                   | No        |
| `visible`         | `boolean`              | Shows or hides the object                          | No        |
| `sprite`          | `number` \| `string`   | Changes the appearance of the object               | No        |
| `sound`           | `string` \| `object`   | Changes the sound played on interaction            | No        |
| `dialog`          | `string` \| `string[]` | Modifies the text displayed in the dialog box      | No        |
| `end`             | `string` \| `string[]` | Triggers a custom game ending                      | No        |
| `symbol`          | `string`               | The character representing the object in the `map` | Yes       |
| `position`        | `[number, number]`     | `[x, y]` coordinates of the object on the map      | Yes       |
| `isOnScreen`      | `boolean`              | `true` if the element is on screen                 | Yes       |
| `remove`          | `() => void`           | Removes the object                                 | —         |

---

### Example: change a property

Let’s create a character that says "Hello" the first time, and "Hello again" next time:

```js
createGame({
	templates: {
		x: {
			dialog: 'Hello',
			onCollide(target) {
				target.dialog = 'Hello again'
			}
		}
	}
})
```

---

### Remove an object

To make an object disappear when touched, use the `remove()` method:

```js
createGame({
	templates: {
		x: {
			dialog: 'Hello',
			onCollide(target) {
				target.remove()
			}
		}
	}
})
```
