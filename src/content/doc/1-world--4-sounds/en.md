<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import Sound from '../../../lib/ui/Doc/SoundDemo.svelte'
</script>

# <Emoji src="🎶" /> Sounds

Odyc.js uses **PFXR**, a lightweight JavaScript library made specifically for generating procedural sound effects. It allows you to create, customize, and play very compact audio assets.

---

## <Emoji src="✏️"/> Defining a sound in a template

A sound can be associated with a game element using the `sound` key. It will automatically be played when the player interacts with that element.

```js
templates: {
  E: {
    sprite: 3,
    sound: "HIT"
  }
}
```

---

## <Emoji src="👀"/> Accepted formats

The `sound` key accepts several formats:

### A preset name

```js
sound: 'FALL'
```

Here's a list of available presets. Click a name to hear an example. Each click generates a random variation.

Be careful with `RANDOM` — turn your volume down before clicking.

<Sound/>

### An array `[preset, seed]`

If you want the sound to always be the same, you can specify a number (seed):

```js
sound: ['LASER', 12345]
```

You can use the Sound tool in the playground to find the perfect sound.

### A PFXR URL

You can create a custom sound using [the Pfxr interface](https://achtaitaipai.github.io/pfxr/) and paste the generated URL:

```js
sound: 'https://achtaitaipai.github.io/pfxr/?fx=1,0.3,...'
```

<Aside>Odyc.js does not connect to the site: all information is read directly from the URL. No internet connection is required to play the sound.</Aside>

### A configuration object

For full control, use an object describing the sound parameters:

```js
sound: {
  waveForm: 2,
  frequency: 440,
  sustainTime: 0.2,
  decayTime: 0.5
}
```

You can find the complete list of parameters [here](https://github.com/achtaitaipai/pfxr/tree/main/packages/synth#sound).

---

## <Emoji src="🔊"/> Global volume

The overall sound volume can be adjusted via the `volume` key in the initial game configuration:

```js
createGame({
	volume: 0.8,
})
```

Default value: `0.5`
