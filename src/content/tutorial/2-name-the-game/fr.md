<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
</script>

Il est temps de commencer à personnaliser votre jeu. Pour ajouter des paramètres, vous devez informer la fonction `createGame` de l’apparence souhaitée pour votre jeu.

Par exemple:

```js
createGame({
	title: 'Mon Jeu',
	background: 1
})
```

Permet de modifier le titre et la couleur de fond de votre jeu. Pour la propriété background, vous pouvez spécifier n’importe quel nombre entre 0 et 9. Chaque numéro correspond à une couleur différente. Si la [palette par défaut](http://localhost:5173/fr/doc/configuration/colors#personnaliser-la-palette) ne vous convient pas, vous apprendrez plus tard comment définir vos propres couleurs.

<Aside>

Chaque fois que vous modifiez le code, le jeu redémarre depuis le début. Lorsqu’un paramètre title est spécifié, vous devez appuyer sur la touche espace ou entrée pour passer l’écran du titre. Pendant le développement du jeu le titre peut s'avérer embêtant, utilisez `//` au début d'une ligne pour la désactiver.

```js
createGame({
	//title: 'Mon Jeu',
	background: 1
})
```

</Aside>
