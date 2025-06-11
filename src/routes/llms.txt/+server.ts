export const prerender = true
export async function GET() {
	const rawDocs = import.meta.glob('../../content/doc/*/en.md', {
		query: '?raw',
		import: 'default',
	})
	const docs = (await Promise.all(Object.values(rawDocs).map((loader) => loader()))) as string[]
	const content = docs
		.map((el) => el.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''))
		.join('\n---\n')

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain',
			'Content-Disposition': `inline; filename="llms-full"`,
		},
	})
}
