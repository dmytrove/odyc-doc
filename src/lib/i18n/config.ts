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
		'paint.copy': 'Copy'
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
		'gamewindow.screenshotName': 'odyc-cature-d-ecran',
		'gamewindow.recordName': 'odyc-video',

		'paint.horizontalMirror': 'Miroir horizontal',
		'paint.verticalMirror': 'Miroir vertical',
		'paint.rotate': 'Tourner',
		'paint.clear': 'Supprimer',
		'paint.width': 'Largeur',
		'paint.height': 'Hauteur',
		'paint.copy': 'Copier'
	}
} as const
