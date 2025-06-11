import { getExamples } from '$lib'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, url }) => {
	const examples = getExamples()
	return {
		examples,
	}
}
