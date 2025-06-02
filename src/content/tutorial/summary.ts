import type { Lang } from '$lib'

export type TutorialItem = { [lang in Lang]: string } & { path: string }

export const tutorialSummary = [
	{ en: 'Introduction', fr: 'Introduction', path: '1-introduction' },
	{ en: 'Name the game', fr: 'Nommer le jeu', path: '2-name-the-game' },
	{ en: 'The Player', fr: 'Le joueur', path: '3-the-player' },
	{ en: 'Draw', fr: 'Dessiner', path: '4-draw' },
	{ en: 'The Map', fr: 'La Carte', path: '5-the-map' },
	{ en: 'The Dialogues', fr: 'Les dialogues', path: '6-the-dialogues' }
]
