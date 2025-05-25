import { page } from '$app/state'
import { slugify } from '$lib'
import type { DocCategory, DocItem, summary } from '../content/doc/summary'
import { defaultLang, getLangFromUrl, languages, languagesUrl } from './i18n'

type DocPost = {
	title: string
	slug: string
}
export const getDocPosts = async () => {
	const entries = Object.entries(import.meta.glob('../content/doc/*/*/*.md')).map(
		([path, resolver]) => ({ path, resolver })
	)
	const posts = entries.map(({ path, resolver }) => {
		const chunks = path.split('/')
		const category = chunks.at(-3)!
		const title = chunks.at(-2)!
		const lang = chunks.at(-1)!.replace('.md', '')
		return { category, title, lang, path }
	})
	return posts
		.filter((post) => {
			if (!post.lang || !post.title || !post.category) return false
			if (!Object.keys(languages).includes(post.lang)) return false
			if (post.title.startsWith('_')) return false
			if (
				post.lang !== defaultLang &&
				!posts.some(
					(el) =>
						el.title === post.title && el.category === post.category && el.lang === defaultLang
				)
			)
				return false
			return true
		})
		.sort((a, b) => {
			return (
				a.category.localeCompare(b.category, 'en', {
					numeric: true,
					sensitivity: 'base'
				}) ||
				a.title.localeCompare(b.title, 'en', {
					numeric: true,
					sensitivity: 'base'
				})
			)
		})
		.map(({ title, category, ...el }) => ({
			category: category.replace(/^\d+-/, ''),
			title: title.replace(/^\d+-/, ''),
			...el
		}))
}

export function makeDocPostUrl(category: DocCategory, post: DocItem, currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const prefix = lang === defaultLang ? '/' : '/' + lang + '/'
	return prefix + `doc/${slugify(category[lang])}/${slugify(post[lang])}`
}
