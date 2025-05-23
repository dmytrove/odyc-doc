import { escapeSvelte, mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { codeToHtml } from 'shiki'
import { shikiTheme } from './shiki-theme.js'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	smartypants: false,
	highlight: {
		highlighter: async (code, lang) => {
			const html = await codeToHtml(code, {
				lang: lang,
				theme: shikiTheme
			})
			return escapeSvelte(html)
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexOptions.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: { adapter: adapter() }
}

export default config
