export const FONT_SIZE = 48
export class Drawing {
	#grid: string[][]
	#width = $state(8)
	#height = $state(8)
	constructor(sprite?: string) {
		this.#grid = this.#createGrid(this.#width, this.#height)
		if (sprite) this.text = sprite
	}

	display(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = 'white'
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = 'black'
		ctx.font =
			FONT_SIZE +
			"px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
		ctx.textBaseline = 'middle'
		ctx.textAlign = 'center'
		for (let y = 0; y < this.#grid.length; y++) {
			const row = this.#grid[y]
			for (let x = 0; x < row.length; x++) {
				const char = row[x]
				ctx.fillText(char, (x + 0.5) * FONT_SIZE, (y + 0.5) * FONT_SIZE)
			}
		}
	}

	clear() {
		this.#grid = this.#createGrid(this.#width, this.#height)
	}

	putPixel(x: number, y: number, value: string) {
		this.#grid[y][x] = value
	}

	get text() {
		let result = '`\n'
		for (let y = 0; y < this.#height; y++) {
			result += '\t'
			for (let x = 0; x < this.#width; x++) {
				const char = this.#grid[y][x]
				result += char
			}
			result += '\n'
			if (y === this.#height - 1) result += '\t\t\t`'
		}
		return result
	}

	set text(value: string) {
		const rows = value
			.replace(/'|"|`/gm, '')
			.trim() //removes whitespace from both ends
			.replace(/[ \t]/gm, '') //removes tabs and whitespaces
			.split(/\n+/gm) //split by lines and ignore multiple return
		const height = rows.length
		const width = Math.max(...rows.map((row) => row.length))

		let newGrid = this.#createGrid(width, height)

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const char = rows[y]?.charAt(x)
				newGrid[y][x] = char ?? '.'
			}
		}
		this.#grid = newGrid
		this.#width = width
		this.#height = height
	}

	get width() {
		return this.#width
	}

	get height() {
		return this.#height
	}

	#createGrid(width: number, height: number) {
		return [...new Array(height)].map(() => [...new Array(width)].map(() => '.'))
	}

	resize(dWidth: number, dHeight: number, dx = 0, dy = 0) {
		const width = this.width + dWidth
		const height = this.height + dHeight
		const newGrid = this.#createGrid(width, height)
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const c = this.#grid[y + dy]?.[x + dx]
				if (c !== undefined) newGrid[y][x] = c
			}
		}
		this.#width = width
		this.#height = height
		this.#grid = newGrid
	}

	#addCol() {}
}
