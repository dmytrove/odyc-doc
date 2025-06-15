<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="💬"/> Dialogues

Dialogues let you add conversations, hints, or narrative elements to your game.  
You can also enhance them with visual effects, color highlights, and character voices.

---

## <Emoji src="✏️"/> Defining a dialogue

To assign a dialogue to a game element, use the `dialog` property in the `templates` section:

```javascript
createGame({
	templates: {
		'@': {
			dialog: 'Hello world!'
		}
	}
})
```

Every time the player interacts with the `@` element, a dialogue box will display `Hello world!`.

---

## <Emoji src="⛓️‍💥"/> Splitting a dialogue

To force a line break, use the `|` character.

```js
'Hello!|How are you?|Have a great day!'
```

<Aside variant="Note">
To insert empty lines, just use multiple <code>|</code> in a row.
</Aside>

---

## <Emoji src="💥"/> Adding effects and colors to text

You can make your dialogue more expressive with simple syntax for **visual effects** and **color changes**.

<video src="/doc/dialog-fx.webm" autoplay loop muted playsinline/>

### Effects

| Effect           | Syntax        | Description               |
| ---------------- | ------------- | ------------------------- |
| Vertical wave    | `~your text~` | Letters move up and down  |
| Horizontal wave  | `_your text_` | Letters wave side to side |
| Random shake     | `your %text%` | Chaotic shaking           |
| Horizontal shake | `your =text=` | Left-right shaking        |
| Vertical shake   | `your ^text^` | Up-down shaking           |
| Blinking         | `your °text°` | Flashing on/off           |

### Colors

To apply a color, wrap text in `<n>`, where `n` is the index of a color in [your palette](/doc/configuration/colors#customizing-the-palette):

```js
'<3>Blue text<3>'
```

You can also combine effects and colors:

```js
'~<2>Gray text with wave effect<2>~'
```

---

## <Emoji src="🫥"/> Displaying special characters

To display a reserved character (like `%`, `~`, `_`, `^`, `=`, `°`), escape it with **two backslashes** `\\`:

```js
'I only have 56\\% battery left'
```

will display:

_I only have 56% battery left_

---

## <Emoji src="🎤"/> Character Voices

You can add character voices to dialogues to make conversations more engaging. Character voices are generated using different voice templates with optional variations.

### Voice Templates

Available voice templates:

| Template | Description |
| -------- | ----------- |
| `BLIP` | Default, friendly character voice |
| `HIT` | Lower, tougher character voice |
| `PICKUP` | Higher, cheerful character voice |
| `JUMP` | Medium, bouncy character voice |
| `FALL` | Smooth, falling character voice |
| `POWERUP` | Sawtooth wave, energetic voice |
| `LASER` | Sharp, robotic character voice |
| `BLIP_RANDOM` | Random variation per character |

### Adding Voices to Dialogues

To add character voices to a dialogue, use the second parameter of `openDialog()`:

```javascript
// Basic voice
await game.openDialog("Hello world!", { template: "BLIP" })

// Different voice templates
await game.openDialog("I'm a robot!", { template: "LASER" })
await game.openDialog("So happy!", { template: "PICKUP" })

// Random voice per character
await game.openDialog("Every letter sounds different!", { template: "BLIP_RANDOM" })
```

### Voice Variation Modes

You can control how voice variations work:

```javascript
// Fixed seed - same voice every time
await game.openDialog("Consistent voice", { template: "BLIP", seed: 42 })

// Random seed per dialog - same throughout the dialog
await game.openDialog("Random but consistent", { template: "BLIP", seed: null })

// Random per character (automatic with BLIP_RANDOM)
await game.openDialog("Chaotic voices!", { template: "BLIP_RANDOM" })
```

### Default Character Voices in Templates

You can define a default voice for a character in their template. This voice will automatically be used when the player interacts with that character:

```javascript
createGame({
  templates: {
    'R': {
      sprite: 2,
      dialog: "I'm a robot!",
      voice: { template: "HIT" }
    },
    'F': {
      sprite: 3, 
      dialog: "I'm friendly!",
      voice: { template: "BLIP", seed: 42 }
    },
    'Q': {
      sprite: 4,
      dialog: "I'm silent...",
      // No voice property - this character is silent
    }
  }
})
```

When the player interacts with character 'R', their dialog will automatically use the HIT voice template. Character 'F' will use BLIP with a fixed seed, and character 'Q' will be silent.

### Silent Dialogues

Dialogues without a voice parameter are completely silent:

```javascript
// Silent dialog - no character sounds
await game.openDialog("This is silent text")

// Voiced dialog - plays character sounds  
await game.openDialog("This has character sounds", { template: "BLIP" })
```

<Aside variant="Note">
Character voices only play for letters and numbers. Spaces, punctuation marks, and special characters are always silent.
</Aside>
