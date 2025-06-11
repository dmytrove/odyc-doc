<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="🎬" /> Title & End Screen

The message box is used to display information like the **game title** when starting up, or an **end message** when the player wins or loses.

<img src="/doc/title.png" alt="Title screen example" />

---

## <Emoji src="✏️" /> Title screen

When the game starts, you can show a **title screen** using the `title` property:

```js
createGame({
	title: 'My Awesome Game'
})
```

To add **line breaks**, use a multiline string:

```js
createGame({
	title: `** AN AWESOME GAME **






        by John Doe`
})
```

---

## <Emoji src="🏁" /> Ending the game

To end the game when the player touches a specific element, use the `end` property in a `template`.
The message will be shown, and then the game will restart from the beginning.

```js
createGame({
	templates: {
		X: {
			sprite: 2,
			end: 'The End...'
		}
	}
})
```

<Aside>

If you want to end the game **without showing a message**, you can use `end: true`.

</Aside>

---

## <Emoji src="🪄" /> Showing multiple messages

You can display several messages in sequence by using an array of strings:

```js
createGame({
	title: ['An awesome game', 'by John Doe']
})
```

```js
createGame({
	templates: {
		X: {
			sprite: 2,
			end: ['You lost', 'Game Over...']
		}
	}
})
```

---

## <Emoji src="💥" /> Add effects and colors

Just like with dialogues, you can enhance the text with **colors** and **animations**.

<Aside>

See the [dialogue formatting section](/doc/world-building/dialogues#adding-effects-and-colors-to-text) for more details.

</Aside>
