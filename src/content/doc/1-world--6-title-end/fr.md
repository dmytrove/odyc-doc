<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
import Emoji from '../../../lib/ui/Doc/Emoji.svelte'
</script>

# <Emoji src="🎬" /> Titre et fin du jeu

La boîte de message est un composant utilisé pour afficher des informations comme le **titre du jeu** au démarrage, ou un **message de fin** lorsque le joueur termine ou échoue.

<img src="/doc/title.png" alt="Exemple d'écran de titre" />

---

## <Emoji src="✏️" /> Le titre

Au démarrage du jeu, vous pouvez configurer un **écran de titre** avec la propriété `title`:

```js
createGame({
	title: 'Mon Super Jeu'
})
```

Vous pouvez ajouter des **sauts de ligne** en utilisant une chaîne multiligne:

```js
createGame({
	title: `** UN SUPER JEU **






        par John Doe`
})
```

---

## <Emoji src="🏁" /> Fin de jeu

Pour déclencher la fin du jeu lorsqu’un joueur touche un élément, utilisez la propriété `end` dans un `template`.
Le message s’affichera, puis le jeu redémarrera depuis le début.

```js
createGame({
	templates: {
		X: {
			sprite: 2,
			end: 'Fin...'
		}
	}
})
```

<Aside>

Si vous souhaitez terminer le jeu sans afficher de message, vous pouvez écrire `end: true`.

</Aside>

---

## <Emoji src="🪄" /> Enchaîner plusieurs messages

Vous pouvez afficher plusieurs messages successifs en passant un tableau de chaînes de caractères:

```js
createGame({
	title: ['Un super jeu', 'par John Doe']
})
```

```js
createGame({
	templates: {
		X: {
			sprite: 2,
			end: ['Perdu', 'Fin...']
		}
	}
})
```

---

## <Emoji src="💥" /> Ajouter des effets et des couleurs

De la même façon qu'avec les dialogues, vous pouvez enrichir le texte avec des **couleurs** et des **animations**.

<Aside>

Voir la [page consacrée aux dialogues](/fr/doc/world-building/dialogues#ajouter-des-effets-et-des-couleurs-au-texte) pour plus de détails sur la mise en forme.

</Aside>
