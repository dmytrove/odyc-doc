type DocPost = {
	title: string
	slug: string
}
export const getDocPosts = async () => {
	const posts: DocPost[] = await Promise.all(
		Object.entries(import.meta.glob('../content/doc/*.md')).map(async ([path, resolver]) => {
			const resolved = (await resolver()) as { metadata: DocPost }
			const { metadata } = resolved
			const slug = path.split('/').pop()?.slice(0, -3) ?? ''
			return { ...metadata, slug }
		})
	)

	return posts
}
