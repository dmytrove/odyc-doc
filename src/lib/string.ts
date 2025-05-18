export function getDirName(path: string) {
	return path.match(/([^\/]+)(?=\/([^\/]+)$)/)?.[0] ?? null
}

export function getFileName(path: string) {
	return path.match(/([^\/]+)(?=\.[^\/]+$)/)?.[0] ?? null
}

export function getNumberPrefix(text: string) {
	return text.match(/^\d+(?=-)/)?.[0] ?? null
}

export function removeNumberPrefix(text: string) {
	return text.replace(/^\d+-/, '')
}

export function capitalize(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}
