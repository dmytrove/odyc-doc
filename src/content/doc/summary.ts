import { languages } from '$lib'

type Lang = keyof typeof languages

export type DocPost = { [lang in Lang]: string } & { path: string }

export type Summary = Array<
	{ [lang in Lang]: string } & {
		items: Array<DocPost>
	}
>

export const summary: Summary = [
	{
		en: 'Tutorials',
		fr: 'Tutoriels',
		items: [
			{ en: 'Introduction', fr: 'Introduction', path: '1-tutorial--1-introduction' },
			{ en: 'Create Game', fr: 'Créer le jeu', path: '1-tutorial--2-create-game' },
			{ en: 'Add Dialog', fr: 'Ajouter des dialogues', path: '1-tutorial--3-add-dialog' }
		]
	},
	{
		en: 'Recipes',
		fr: 'Recettes',
		items: [{ en: 'Sprites', fr: 'Sprites', path: '2-recipes--1-sprites' }]
	}
]
