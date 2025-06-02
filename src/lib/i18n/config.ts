export const languages = {
	fr: 'français',
	en: 'english'
}
export const defaultLang = 'en'

export const languagesUrl = Object.keys(languages).filter((el) => el !== defaultLang)

export const ui = {
	en: {
		'playground.refresh': 'Refresh',
		'playground.format': 'Format code',
		'playground.paint': 'Paint',
		'playground.sounds': 'Sounds',
		'playground.settings': 'Settings',
		'playground.loadExample': 'Load an example',
		'playground.save': 'Save locally',
		'playground.open': 'Open',
		'playground.export': 'Download',
		'playgroung.vimMode': 'Vim Mode',
		'playgroung.autoRefresh': 'Auto-refresh',
		'playgroung.autoSave': 'Auto-save',

		'gamewindow.fullscreen': 'Fullscreen',
		'gamewindow.screenshot': 'Screenshot',
		'gamewindow.screenshotName': 'odyc-screenshot',
		'gamewindow.recordName': 'odyc-video',

		'paint.horizontalMirror': 'Horizontal Mirror',
		'paint.verticalMirror': 'Vertical Mirror',
		'paint.rotate': 'Rotate',
		'paint.clear': 'Clear',
		'paint.width': 'Width',
		'paint.height': 'Height',
		'paint.copy': 'Copy',
		'paint.up': 'Nudge Up',
		'paint.right': 'Nudge Right',
		'paint.down': 'Nudge Down',
		'paint.left': 'Nudge Left',

		'doc.note': 'Note',
		'doc.warning': 'Warning',
		'doc.overview': 'Overview',
		'doc.onThisPage': 'On this page',
		'doc.edit': 'Edit this page',

		'doc.previous': 'Previous',
		'doc.next': 'Next',

		'header.theme': 'Toggles light & dark',
		'header.selectLang': 'Select Language',
		'header.menu': 'Menu',
		'header.closeMenu': 'Close',

		'nav.doc': 'Docs',
		'nav.tutorial': 'Tutorial',
		'nav.playground': 'Playground',

		'tutorial.previous': 'Previous',
		'tutorial.next': 'Next',
		'tutorial.solve': 'Solve'
	},
	fr: {
		'playground.refresh': 'Actualiser',
		'playground.format': 'Formater le code',
		'playground.paint': 'Dessiner',
		'playground.sounds': 'Sons',
		'playground.settings': 'Paramètres',
		'playground.loadExample': 'Charger un exemple',
		'playground.save': 'Sauvegarder en local',
		'playground.open': 'Ouvrir',
		'playground.export': 'Télécharger',
		'playgroung.vimMode': 'Mode Vim',
		'playgroung.autoRefresh': 'Actualisation automatique',
		'playgroung.autoSave': 'Sauvegarde automatique',

		'gamewindow.fullscreen': 'Plein écran',
		'gamewindow.screenshot': "Capture d'écran",
		'gamewindow.screenshotName': 'odyc-capture-d-ecran',
		'gamewindow.recordName': 'odyc-video',

		'paint.horizontalMirror': 'Miroir horizontal',
		'paint.verticalMirror': 'Miroir vertical',
		'paint.rotate': 'Tourner',
		'paint.clear': 'Tout effacer',
		'paint.width': 'Largeur',
		'paint.height': 'Hauteur',
		'paint.copy': 'Copier',
		'paint.up': 'Décaler vers le haut',
		'paint.right': 'Décaler vers la droite',
		'paint.down': 'Décaler vers le bas',
		'paint.left': 'Décaler vers la gauche',

		'doc.note': 'Note',
		'doc.warning': 'Attention',
		'doc.overview': "Vue d'ensemble",
		'doc.onThisPage': 'Sur cette page',
		'doc.previous': 'Précédent',
		'doc.next': 'Suivant',
		'doc.edit': 'Modifier cette page',

		'header.theme': 'Thème clair / sombre',
		'header.selectLang': 'Sélection de la langue',
		'header.menu': 'Menu',
		'header.closeMenu': 'Fermer',

		'nav.doc': 'Documentation',
		'nav.tutorial': 'Tutoriel',
		'nav.playground': 'Editeur',

		'tutorial.previous': 'Précédent',
		'tutorial.next': 'Suivant',
		'tutorial.solve': 'Résoudre'
	}
} as const
