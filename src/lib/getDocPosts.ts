import { slugify } from '$lib'
import { docSummary } from '../content/doc/summary'
import { defaultLang, getLangFromUrl } from './i18n'

export function getAllPosts(url?: URL) {
	const lang = url ? getLangFromUrl(url) : defaultLang
	const prefix = lang === defaultLang ? '' : '/' + lang
	return docSummary.flatMap((category) =>
		category.items.map((el) => ({
			title: el[lang],
			category: category[lang],
			path: el.path,
			url: `${prefix}/doc/${slugify(category[defaultLang])}/${slugify(el[defaultLang])}`
		}))
	)
}

export function getFirstDocPost(currentUrl: URL) {
	return getAllPosts(currentUrl)[0].url
}

export function makeDocPostUrl(category: string, post: string, currentUrl: URL) {
	const lang = getLangFromUrl(currentUrl)
	const prefix = lang === defaultLang ? '/' : '/' + lang + '/'
	return prefix + `doc/${slugify(category)}/${slugify(post)}`
}

export function getNeighborsPost(url: URL) {
	const posts = getAllPosts(url)
	const previous = posts.find((_, i) => posts[i + 1] && posts[i + 1].url === url.pathname)
	const next = posts.find((_, i) => posts[i - 1] && posts[i - 1].url === url.pathname)
	return { previous, next }
}
