import { getDocPosts } from '$lib'
import { languagesUrl } from '$lib'
import type { EntryGenerator, PageServerLoad } from './$types'

export const entries: EntryGenerator = () => languagesUrl.map((el) => ({ lang: el }))
export const load: PageServerLoad = async ({ params }) => {
	return {
		post: await getDocPosts()
	}
}
