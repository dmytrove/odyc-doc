import { slugify, type DocPostFrontamatter } from '$lib'
import { defaultLang, getLangFromUrl, ui } from '$lib/i18n'
import { error } from '@sveltejs/kit'
import { docSummary } from '../../../../../content/doc/summary'
import type { EntryGenerator, PageLoad } from './$types'

export const entries: EntryGenerator = () => {
	let posts: { lang?: string; category: string; title: string }[] = []
	Object.keys(ui).forEach((lang) => {
		docSummary.forEach((group) => {
			const category = group[defaultLang]
			group.items.forEach((item) => {
				const title = item[defaultLang]
				posts.push({
					lang: lang === defaultLang ? undefined : lang,
					category: slugify(category),
					title: slugify(title)
				})
			})
		})
	})
	return posts
}

export const load: PageLoad = async ({ url, params }) => {
	const { category, title } = params
	const lang = getLangFromUrl(url)
	const group = docSummary.find((el) => slugify(el[defaultLang]) === category)
	if (!group) error(404)
	const post = group.items.find((el) => slugify(el[defaultLang]) === title)
	if (!post) error(404)
	const md = await import(`../../../../../content/doc/${post.path}/${lang}.md`)
	return {
		title: post[lang],
		category: group[lang],
		path: post.path,
		metadata: md.metadata as DocPostFrontamatter,
		Content: md.default
	}
}
