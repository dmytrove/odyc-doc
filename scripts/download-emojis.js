import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import emojisData from '../src/lib/emojis.json' with { type: 'json' }

// Utilitaire pour résoudre __dirname avec ESModules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Dossier de destination
const OUTPUT_DIR = path.join(__dirname, '../static/nemojis')

async function getEmojiList() {
	// const response = await fetch('https://googlefonts.github.io/noto-emoji-animation/data/api.json')
	// const data = await response.json()
	return emojisData.icons.map((icon) => {
		const name = icon.tags[0].slice(1, -1)
		return { code: icon.codepoint, name }
	})
}

async function downloadEmoji(code, name) {
	// const url = `https://fonts.gstatic.com/s/e/notoemoji/latest/${code}.webp`
	const url = `https://fonts.gstatic.com/s/e/notoemoji/latest/${code}/512.webp`
	const response = await fetch(url)
	if (!response.ok) throw new Error(`Failed to fetch ${url}`)
	const buffer = await response.arrayBuffer()
	const filePath = path.join(OUTPUT_DIR, `${code}.webp`)
	await fs.writeFile(filePath, Buffer.from(buffer))
}

async function main() {
	try {
		await fs.mkdir(OUTPUT_DIR, { recursive: true })
		const emojis = await getEmojiList()
		for (const { code, name } of emojis) {
			console.log(`downloading ${name} (${code})`)
			try {
				await downloadEmoji(code, name)
			} catch {
				console.error(`could not get emoji ${name}`)
			}
		}
	} catch (err) {
		console.error('Failed to fetch emoji list:', err)
	}
}

main()
