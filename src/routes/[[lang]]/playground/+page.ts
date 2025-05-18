import { getExamples } from '$lib'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, url }) => {
	const examples = getExamples()
	const currentExample = url.searchParams.get('example')
	const code = await examples.find(({ id }) => id === currentExample)?.getContent()
	return {
		examples,
		code
	}
}
