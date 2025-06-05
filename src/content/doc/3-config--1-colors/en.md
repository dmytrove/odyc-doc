<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import PaintDemo from '../../../lib/ui/Doc/PaintDemo.svelte'
import ColorsDemo from '../../../lib/ui/Doc/ColorsDemo.svelte'
</script>

# <Emoji src="🫟" /> Customizing Colors

Odyc.js uses a predefined color palette to render sprites, dialogs, and messages.  
You can replace or adjust it however you like.

---

## <Emoji src="🌈" /> Customizing the Palette

Here is the default color palette. Click a color to copy its hex code.

<ColorsDemo/>

_These colors are based on the excellent [Open Color](https://yeun.github.io/open-color/) palette._

You can override the palette with your own array of colors:

```js
createGame({
	// ...
	colors: [
		'red',
		'orange',
		'lab(50% 40 59.5)',
		'hwb(12 50% 0%)',
		'#f06595',
		'#f09',
		'oklch(60% 0.15 50)',
		'hsl(150 30% 60%)',
		'light-dark(white, black)',
		'black'
	]
})
```

The `colors` array should contain strings that represent valid [CSS colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) — color names, hex codes, RGB, HSL, LAB, etc.

---

## <Emoji src="🌈" /> Background Color

Use the `background` option to set the background color.

```javascript
createGame({
	//...
	background: '#ff00ff'
})
```

The `background` value can be a [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) or a number pointing to a color in your palette.

---

## <Emoji src="💅"/> Dialog and Message Appearance

You can also customize the appearance of dialog and message boxes with dedicated options.

### Dialog Box

- `dialogColor` → text color
- `dialogBackground` → background color
- `dialogBorder` → border color

These values can be any [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) or a number referring to a color from your palette.

```javascript
createGame({
	// ...
	dialogBackground: '#228be6',
	dialogBorder: 3,
	dialogColor: 'white'
})
```

<Aside>

The colors defined for the dialog box also apply to the `prompt` window.

</Aside>

### Message Box

- `messageColor` → text color
- `messageBackground` → background color

These also accept any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) or a palette index.

```javascript
createGame({
	//...
	messageColor: 'red',
	messageBackground: '#228be6'
})
```
