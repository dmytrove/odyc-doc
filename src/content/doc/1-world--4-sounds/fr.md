<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
import Sound from '../../../lib/ui/Doc/SoundDemo.svelte'
</script>

# <Emoji src="🎶" />Les Sons

Odyc.js utilise **PFXR**, une petite bibliothèque JavaScript conçue spécialement pour générer des effets sonores de manière procédurale. Elle permet de créer, personnaliser et jouer des sons très légers.

---

## <Emoji src="✏️"/> Définir un son dans un template

Un son peut être associé à un élément de la carte via la clé `sound`. Il sera joué automatiquement lorsque le joueur entre en contact avec cet élément.

```js
templates: {
  E: {
    sprite: 3,
    sound: "HIT"
  }
}
```

---

## <Emoji src="👀"/> Formats acceptés

La clé `sound` accepte plusieurs formats:

### Un nom de preset

```js
sound: 'FALL'
```

Voici la liste des presets disponibles. Cliquez sur un nom pour entendre le type de son correspondant. Chaque clic génère une variation aléatoire du son.

Attention à `RANDOM`, baissez le volume avant de cliquer dessus.

<Sound/>

### Un tableau `[preset, seed]`

Pour que le son soit toujours le même, vous pouvez préciser un nombre (seed):

```js
sound: ['LASER', 12345]
```

L'outil Son du playground peut vous aider à trouver le son qui convient.

### Une URL PFXR

Vous pouvez utiliser [l'interface de Pfxr](https://achtaitaipai.github.io/pfxr/) pour créer un son personnalisé, puis coller l'URL générée:

```js
sound: 'https://achtaitaipai.github.io/pfxr/?fx=1,0.3,...'
```

<Aside>Odyc.js ne se connecte pas au site: toutes les informations sont directement lues dans l'URL. Aucun accès internet n'est requis au moment de jouer le son.</Aside>

### Un objet de configuration

Pour un contrôle total, utilisez un objet décrivant les paramètres du son:

```js
sound: {
  waveForm: 2,
  frequency: 440,
  sustainTime: 0.2,
  decayTime: 0.5
}
```

La liste complète des paramètres est disponible [ici](https://github.com/achtaitaipai/pfxr/tree/main/packages/synth#sound).

---

## <Emoji src="🔊"/> Volume global

Le volume des sons peut être ajusté dans la configuration initiale du jeu avec la clé `volume`:

```js
createGame({
	volume: 0.8
})
```

Valeur par défaut : `0.5`

---

## <Emoji src="🎙️"/> Voix de personnages

Les voix de personnages sont des sons spéciaux qui jouent pendant la frappe du texte des dialogues pour créer des personnalités distinctes. Pour plus d'informations sur l'implémentation des voix de personnages, consultez la section [Dialogues](/doc/world-building/dialogues#voix-de-personnages).
