import { page } from '$app/state'
import { slugify } from '$lib'
import { summary, type DocCategory, type DocItem } from '../content/doc/summary'
import { defaultLang, getLangFromUrl, languages, languagesUrl } from './i18n'

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

export function getFirstDocPost(currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const category = summary[0][lang]
	const post = summary[0].items[0][lang]
	return makeDocPostUrl(category, post, currentUrl)
}

export function makeDocPostUrl(category: string, post: string, currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const prefix = lang === defaultLang ? '/' : '/' + lang + '/'
	return prefix + `doc/${slugify(category)}/${slugify(post)}`
}

export function getNextPost(category: string, title: string, currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const items = summary.flatMap((c) => c.items.map((el) => ({ ...el, category: c })))
	const next = items.find((_, i) => {
		const previous = items[i - 1]
		if (!previous) return false
		return previous.category[lang] === category && previous[lang] === title
	})
	if (next)
		return {
			url: makeDocPostUrl(next.category[lang], next[lang], currentUrl),
			title: next[lang]
		}
}

export function getpreviousPost(category: string, title: string, currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const items = summary.flatMap((c) => c.items.map((el) => ({ ...el, category: c })))
	const previous = items.find((_, i) => {
		const next = items[i + 1]
		if (!next) return false
		return next.category[lang] === category && next[lang] === title
	})
	if (previous)
		return {
			url: makeDocPostUrl(previous.category[lang], previous[lang], currentUrl),
			title: previous[lang]
		}
}

export function getDocLocales(categorySlug: string, titleSlug: string, currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const post = summary
		.flatMap((c) => c.items.map((el) => ({ ...el, category: c })))
		.find((el) => slugify(el.category[lang]) === categorySlug && slugify(el[lang]) === titleSlug)
	if (!post) return []
	return Object.entries(languages).map(([key, langName]) => {
		const prefix = key === defaultLang ? '/' : '/' + key + '/'
		//@ts-ignore
		const url = prefix + `doc/${slugify(post.category[key])}/${slugify(post[key])}`
		return { url, lang: langName }
	})
}
