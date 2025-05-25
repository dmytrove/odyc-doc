import { slugify, type DocPostFrontamatter } from '$lib'
import { defaultLang, getLangFromUrl, ui } from '$lib/i18n'
import { error } from '@sveltejs/kit'
import { summary } from '../../../../../content/doc/summary'
import type { EntryGenerator, PageLoad } from './$types'

export const entries: EntryGenerator = () => {
	let posts: { lang?: string; category: string; title: string }[] = []
	Object.keys(ui).forEach((lang) => {
		summary.forEach((group) => {
			const category = group[lang as keyof typeof ui]
			group.items.forEach((item) => {
				const title = item[lang as keyof typeof ui]
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
	const group = summary.find((el) => slugify(el[lang]) === category)
	if (!group) error(404)
	const post = group.items.find((el) => slugify(el[lang]) === title)
	if (!post) error(404)
	const md = await import(`../../../../../content/doc/${post.path}/${lang}.md`)
	return {
		title: post[lang],
		category: group[lang],
		Content: md.default,
		metadata: md.metadata as DocPostFrontamatter
	}
}
