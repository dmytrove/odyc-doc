import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import { mdsvexOptions } from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexOptions.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ status, path, referrer, referenceType }) => {
				if (status === 404 && path.startsWith('/pagefind/')) {
					console.warn(`⚠️ Ignoring missing Pagefind file during prerender: ${path}`)
					return 'ignore'
				}

				// Let all other errors behave normally
				return 'fail'
			}
		}
	}
}

export default config
