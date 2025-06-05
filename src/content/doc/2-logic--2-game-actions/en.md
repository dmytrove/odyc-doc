<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import PaintDemo from '../../../lib/ui/Doc/PaintDemo.svelte'
</script>

# <Emoji src="🚀" /> Game Actions

The `game` object exposes several methods to trigger visual or audio effects: show a message, open a dialogue, play a sound, or end the game.

These methods can be called dynamically at any point during gameplay (for example inside `onCollide`, `onEnter`, or from custom logic).

---

## <Emoji src="💬" /> Open a dialog

To trigger a dialog manually, use `game.openDialog()`:

```js
const game = createGame({
	// ...
})

game.openDialog('Hello world!')
```

This will display a dialog box with the provided text.
You can use text effects and colors as well (see [Dialogues](/doc/world-building/dialogues)).

---

## <Emoji src="🎶" /> Play a sound

To play a sound manually, use `game.playSound()`:

```js
game.playSound('BLIP')
game.playSound('PICKUP', 42)
game.playSound('https://pfxr/...')
game.playSound({ frequency: 300, waveForm: 1 })
```

You can pass a **preset name**, a **preset + seed**, a **PFXR URL**, or a **custom sound object**.
See [the Sounds page](/doc/world-building/sounds) for more details.

---

## <Emoji src="✉️" /> Show a message

The method `game.openMessage()` lets you show one or more message boxes:

```js
game.openMessage('Hello')
game.openMessage('Hello', 'Welcome')
game.openMessage('Hello and ~welcome~')
```

---

## <Emoji src="✋" /> Ask the player a question

The `game.prompt()` method lets you present multiple options to the player:

```js
await game.prompt('yes', 'no')
await game.prompt('Rock', 'Paper', 'Scissors')
```

This method returns a **promise** containing the **index** of the selected option: `0` → first option, `1` → second option…

This allows you to react based on the player's choice:

```js
const choice = await game.prompt('Go left', 'Go right')

if (choice === 0) {
	game.openMessage('You turned left')
} else {
	game.openMessage('You turned right')
}
```

---

## <Emoji src="🏁" /> End the game

To restart the game from the beginning, call `game.end()`.
If you provide one or more strings, they will be shown in the message box before restarting.

```js
game.end()
game.end('You win!')
game.end('Game over', 'But nice try.')
```

---

## <Emoji src="⏰" /> Chain actions

The methods `openDialog`, `openMessage`, and `playSound` **return a promise**, which lets you wait for one to finish before continuing.

For example, wait for a message to finish before playing a sound:

```js
await game.openMessage('Watch out...')
game.playSound('EXPLOSION')
```

Or create a sequence of dialogs with a sound in between:

```js
await game.openDialog('Are you ready?')
await game.playSound('BLIP')
await game.openDialog("Let's go.")
```
