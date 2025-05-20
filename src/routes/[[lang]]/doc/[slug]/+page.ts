import { getDocPosts } from '$lib'
import { error } from '@sveltejs/kit'
import type { EntryGenerator, PageLoad } from './$types'
import { languagesUrl } from '$lib/i18n'

export const entries: EntryGenerator = async () => {
	return [{ lang: 'en', slug: 'prout' }]
	// let posts: { slug: string; lang: string }[] = []
	// const postsSlugs = await getDocPosts()
	// for (let i = 0; i < languagesUrl.length; i++) {
	// 	const lang = languagesUrl[i]
	// 	for (let j = 0; j < postsSlugs.length; j++) {
	// 		const { slug } = postsSlugs[j]
	// 		posts.push({ slug, lang })
	// 	}
	// }
	// return posts
}

export const load: PageLoad = async ({ params }) => {
	// const { slug } = params
	// try {
	// 	const post = await import(`../../../../content/doc/hello.md`)
	//
	// 	return {
	// 		Content: post.default,
	// 		meta: { ...post.metadata, slug }
	// 	}
	// } catch (err) {
	// 	//@ts-ignore
	// 	error(404, err)
	// }
}
