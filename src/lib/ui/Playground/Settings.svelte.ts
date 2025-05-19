import { browser } from '$app/environment'

const VIMMODEKEY = 'odyc-playground-settings-vimmode'
const AUTOREFRESHKEY = 'odyc-playground-settings-autorefresh'

export class Settings {
	#vimMode = $state(false)
	#autoRefresh = $state(true)

	constructor() {
		if (browser) {
			const vimMode = localStorage.getItem(VIMMODEKEY)
			if (vimMode) this.#vimMode = Boolean(+vimMode)
			const autoRefresh = localStorage.getItem(AUTOREFRESHKEY)
			if (autoRefresh) this.#autoRefresh = Boolean(+autoRefresh)
		}
	}

	get vimMode() {
		return this.#vimMode
	}

	set vimMode(value: boolean) {
		localStorage.setItem(VIMMODEKEY, Number(value).toString())
		this.#vimMode = value
	}

	get autoRefresh() {
		return this.#autoRefresh
	}

	set autoRefresh(value: boolean) {
		localStorage.setItem(AUTOREFRESHKEY, Number(value).toString())
		this.#autoRefresh = value
	}
}
