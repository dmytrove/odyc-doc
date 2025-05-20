/** @param filename{string}*/
function makeScreenShot(filename) {
	const rendererCanvas = /**@type {HTMLCanvasElement} */ (
		document.querySelector('canvas.odyc-renderer-canvas')
	)
	const filterOrigin = /**@type {HTMLCanvasElement} */ (
		document.querySelector('canvas.odyc-filter-canvas')
	)
	/**@type {HTMLCanvasElement|null} */
	const dialogCanvas = /**@type {HTMLCanvasElement} */ (
		document.querySelector('canvas.odyc-dialog-canvas')
	)
	/**@type {HTMLCanvasElement|null} */
	const messageCanvas = /**@type {HTMLCanvasElement} */ (
		document.querySelector('canvas.odyc-message-canvas')
	)

	const filterCanvas = filterOrigin ? glCanvasTo2dCanvas(filterOrigin) : null

	const frames = [filterCanvas ?? rendererCanvas]
	if (dialogCanvas.style.display !== 'none') frames.push(dialogCanvas)
	if (messageCanvas.style.display !== 'none') frames.push(messageCanvas)
	const width = Math.max(...frames.map((el) => el.width))
	const height = Math.max(...frames.map((el) => el.height))

	const backgroundColor = getComputedStyle(document.body, null).getPropertyValue('background-color')

	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const ctx = canvas.getContext('2d')
	if (!ctx) return
	ctx.imageSmoothingEnabled = false
	ctx.fillStyle = backgroundColor
	ctx.fillRect(0, 0, width, height)
	frames.forEach((el) => ctx?.drawImage(el, 0, 0, width, height))
	const dataURL = canvas.toDataURL('image/png')
	const link = document.createElement('a')
	link.href = dataURL
	link.download = filename + '.png'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

addEventListener('message', (e) => {
	if (e.data.type === 'screenshot') {
		const filename = e.data.filename
		makeScreenShot(filename)
	}
})

/**@param canvas {HTMLCanvasElement}*/
function glCanvasTo2dCanvas(canvas) {
	const gl = /**@type {WebGLRenderingContext}*/ (
		canvas.getContext('webgl', { preserveDrawingBuffer: true })
	)
	const w = canvas.width,
		h = canvas.height
	const pixels = new Uint8Array(w * h * 4)
	gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

	const rowSize = w * 4
	const tempRow = new Uint8Array(rowSize)
	for (let y = 0; y < h / 2; y++) {
		const topOffset = y * rowSize
		const bottomOffset = (h - y - 1) * rowSize
		tempRow.set(pixels.subarray(topOffset, topOffset + rowSize))
		pixels.copyWithin(topOffset, bottomOffset, bottomOffset + rowSize)
		pixels.set(tempRow, bottomOffset)
	}
	const imgData = new ImageData(new Uint8ClampedArray(pixels), w, h)
	const copyCanvas = document.createElement('canvas')
	copyCanvas.width = w
	copyCanvas.height = h
	const ctx = copyCanvas.getContext('2d')
	ctx?.putImageData(imgData, 0, 0)
	return copyCanvas
}
