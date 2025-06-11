import { getLangFromUrl } from '$lib'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', getLangFromUrl(event.url)),
	})
}
