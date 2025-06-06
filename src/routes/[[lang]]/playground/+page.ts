import { getExamples } from '$lib'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, url }) => {
	const examples = getExamples()
	const exampleQuery = url.searchParams.get('q')
	const current = examples.find((el) => el.id === exampleQuery)
	return {
		examples,
		current: await current?.getContent()
	}
}
