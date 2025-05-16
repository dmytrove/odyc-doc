export const defaultColors = [
	'#212529', //black
	'#f8f9fa', //white
	'#ced4da', //gray
	'#228be6', //blue
	'#fa5252', //red
	'#fcc419', //yellow
	'#ff922b', //orange
	'#40c057', //green
	'#f06595', //pink
	'#a52f01' //brown,
];

export const initGrid = (width: number, height: number): number[][] => {
	const grid = [...new Array(height)].map(() => [...new Array(width)].map(() => -1));
	return grid;
};

const drawBg = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			ctx.fillStyle = (x + y) % 2 === 0 ? '#C0C0C0' : '#909090';
			ctx.fillRect(x, y, 1, 1);
		}
	}
};

export const drawGrid = (
	grid: number[][],
	width: number,
	height: number,
	ctx: CanvasRenderingContext2D
) => {
	drawBg(ctx, width, height);
	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];
		for (let x = 0; x < row.length; x++) {
			const colorIndex = row[x];
			if (defaultColors[colorIndex]) {
				ctx.fillStyle = defaultColors[colorIndex];
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
};

export const setGrid = (grid: number[][], x: number, y: number, value: number) => {
	const clone = grid.map((el) => [...el]);
	clone[y][x] = value;
	return clone;
};

export const mirrorGrid = (grid: number[][], width: number, height: number, vertical = false) => {
	const newGrid = initGrid(width, height);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const posX = vertical ? x : width - x - 1;
			const posY = vertical ? height - y - 1 : y;
			newGrid[y][x] = grid[posY][posX];
		}
	}
	return newGrid;
};

export const rotateGrid = (grid: number[][], width: number, height: number) => {
	const newGrid = initGrid(height, width);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			newGrid[x][height - 1 - y] = grid[y][x];
		}
	}
	return newGrid;
};

export const getMousePos = (e: MouseEvent, spriteWidth: number, spriteHeight: number) => {
	const target = e.target as HTMLElement;
	const { left, top, width, height } = target.getBoundingClientRect();
	const x = Math.floor(((e.clientX - left) / width) * spriteWidth);
	const y = Math.floor(((e.clientY - top) / height) * spriteHeight);
	return [x, y];
};

export const resizeGrid = (grid: number[][], width: number, height: number) => {
	const newGrid = initGrid(width, height);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const c = grid[y]?.[x];
			if (c !== undefined) newGrid[y][x] = c;
		}
	}
	return newGrid;
};

export const gridToString = (grid: number[][], width: number, height: number) => {
	let result = '`\n';
	for (let y = 0; y < height; y++) {
		result += '\t\t\t';
		for (let x = 0; x < width; x++) {
			const colorIndex = grid[y][x];
			result += defaultColors[colorIndex] ? colorIndex.toString() : '.';
		}
		result += '\n';
		if (y === height - 1) result += '\t\t\t`';
	}
	return result;
};

export const stringToGrid = (text: string) => {
	const rows = text
		.replace(/'|"|`/gm, '')
		.trim() //removes whitespace from both ends
		.replace(/[ \t]/gm, '') //removes tabs and whitespaces
		.split(/\n+/gm); //split by lines and ignore multiple return
	const height = rows.length;
	const width = Math.max(...rows.map((row) => row.length));

	let result = initGrid(width, height);

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const char = rows[y]?.charAt(x);
			const color = /\d/.test(char) ? Number(char) : -1;
			result[y][x] = color;
		}
	}
	return {
		grid: result,
		width,
		height
	};
};
