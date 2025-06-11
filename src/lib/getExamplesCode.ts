import { capitalize, getDirName, getFileName, getNumberPrefix, removeNumberPrefix } from './string'

const rawExamples = import.meta.glob('../content/examples/*/*.js', {
	query: '?raw',
	import: 'default',
})

export function getExamples() {
	return Object.keys(rawExamples)
		.map((el) => {
			const category = getDisplayName(getDirName(el) ?? '')
			const name = getDisplayName(getFileName(el) ?? '')
			const categoryIndex = getNumberPrefix(getDirName(el) ?? '')
			const nameIndex = getNumberPrefix(getFileName(el) ?? '')
			const getContent = rawExamples[el] as () => Promise<string>
			const id =
				removeNumberPrefix(getDirName(el) ?? '') + '-' + removeNumberPrefix(getFileName(el) ?? '')

			return {
				id,
				category,
				name,
				categoryIndex,
				nameIndex,
				getContent,
			}
		})
		.sort((a, b) => {
			return (
				Number(a.categoryIndex) - Number(b.categoryIndex) ||
				Number(a.nameIndex) - Number(b.nameIndex)
			)
		})
}

function getDisplayName(text: string) {
	const withoutPrefix = removeNumberPrefix(text)
	return capitalize(withoutPrefix.replace(/-/g, ' '))
}
