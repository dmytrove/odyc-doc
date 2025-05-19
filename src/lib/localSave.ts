import { browser } from '$app/environment'

const ENTRYPOINT = 'odyc-saved-code'

export function saveLocaly(code: string) {
	if (browser) {
		localStorage.setItem(ENTRYPOINT, code)
	}
}

export function loadLocalSave() {
	if (!browser) return null
	return localStorage.getItem(ENTRYPOINT)
}
