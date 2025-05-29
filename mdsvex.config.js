import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'
import { escapeSvelte } from 'mdsvex'
import { codeToHtml } from 'shiki'
import { shikiTheme } from './shiki-theme.js'
import { toc } from 'mdast-util-toc'
import { visit } from 'unist-util-visit'
import slugify from 'slugify'
import remarkGithubAlert from 'remark-github-blockquote-alert'

function remarkAddHeadingId() {
	return (tree) => {
		const seen = new Set()

		visit(tree, 'heading', (node) => {
			const text = node.children
				.filter((c) => c.type === 'text' || c.type === 'inlineCode')
				.map((c) => c.value)
				.join(' ')
				.toLowerCase()

			let slug = slugify(text, { lower: true, strict: true })

			let uniqueSlug = slug
			let i = 1
			while (seen.has(uniqueSlug)) {
				uniqueSlug = `${slug}-${i++}`
			}
			seen.add(uniqueSlug)

			node.data = node.data || {}
			node.data.hProperties = node.data.hProperties || {}
			node.data.id = uniqueSlug
			node.data.hProperties.id = uniqueSlug
		})
	}
}

export default function remarkInjectTocInFrontmatter() {
	return (tree, file) => {
		const tocNode = toc(tree, { maxDepth: 6 }) // on peut rester large ici
		const items = []

		// Fonction récursive pour parcourir la hiérarchie TOC
		function extractItems(node, currentDepth = 1) {
			if (!node || !node.children) return

			for (const child of node.children) {
				if (child.type === 'listItem') {
					const link = child.children?.[0]?.children?.find((n) => n.type === 'link')
					if (link) {
						const title = link.children
							.map((el) => el.value)
							.join(' ')
							.replace(/<.*>/g, '')
							.trim()
						items.push({
							title,
							url: link.url,
							depth: currentDepth
						})
					}

					// Récursion sur les sous-niveaux (sous-listes)
					const subList = child.children?.find((n) => n.type === 'list')
					if (subList) extractItems(subList, currentDepth + 1)
				}
			}
		}

		if (tocNode.map) {
			extractItems(tocNode.map)
		}

		file.data.fm = {
			...(file.data.fm || {}),
			toc: items
		}
	}
}

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang) => {
			const html = await codeToHtml(code, {
				lang: lang,
				theme: shikiTheme,
				transformers: []
			})
			return escapeSvelte(html)
		}
	},
	remarkPlugins: [remarkGithubAlert, remarkAddHeadingId, remarkInjectTocInFrontmatter]
	// rehypePlugins: [rehypeSlug]
}
