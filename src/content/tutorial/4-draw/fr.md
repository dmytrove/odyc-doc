<script>
import Aside from '../../../lib/ui/Doc/Aside.svelte'
</script>

Un sprite est représenté par une chaîne de caractères, chaque ligne correspondant à une rangée de pixels.

Voici un exemple de sprite :

```js
 sprite: `
          ...00...
          ...00...
          .000000.
          0.0000.0
          0.0000.0
          ..0000..
          ..0..0..
          ..0..0..
      `,
```

Chaque chiffre est interprété comme une couleur (0 : noir, 1 : blanc...), tandis que les espaces, les tabulations et les lignes vides sont ignorés. Les autres caractères représentent des pixels transparents.

Dans l'exemple, le caractère `.` est utilisé pour marquer les espaces vides, mais cela pourrait tout aussi bien être un tiret bas `_`.

Essayez de dessiner un sprite pour le joueur.

<Aside>

En cliquant sur le pinceau au dessus de l'éditeur, vous accéderez à un outil vous permettant de créer un dessin plus rapidement.

</Aside>
