;(function () {
	const TIMEBETWEENFRAMES = 1000 / 30

	class GameCopy {
		/**@type{number}*/
		#width
		/**@type{number}*/
		#height
		/**@type{HTMLCanvasElement}*/
		canvas

		/**@type{CanvasRenderingContext2D}*/
		#resultCtx

		/**@type{HTMLCanvasElement}*/
		#rendererCanvas
		/**@type{HTMLCanvasElement|null}*/
		#filterCanvas
		/**@type{HTMLCanvasElement}*/
		#dialogCanvas
		/**@type{HTMLCanvasElement}*/
		#promptCanvas
		/**@type{HTMLCanvasElement}*/
		#messageCanvas

		constructor() {
			this.#rendererCanvas = /**@type {HTMLCanvasElement} */ (
				document.querySelector('canvas.odyc-renderer-canvas')
			)
			this.#filterCanvas = /**@type {HTMLCanvasElement|null} */ (
				document.querySelector('canvas.odyc-filter-canvas')
			)
			this.#dialogCanvas = /**@type {HTMLCanvasElement} */ (
				document.querySelector('canvas.odyc-dialog-canvas')
			)
			this.#promptCanvas = /**@type {HTMLCanvasElement} */ (
				document.querySelector('canvas.odyc-prompt-canvas')
			)
			this.#messageCanvas = /**@type {HTMLCanvasElement} */ (
				document.querySelector('canvas.odyc-message-canvas')
			)
			this.#width = Math.max(
				...[this.#rendererCanvas, this.#dialogCanvas, this.#messageCanvas].map((el) => el.width)
			)
			this.#height = Math.max(
				...[this.#rendererCanvas, this.#dialogCanvas, this.#messageCanvas].map((el) => el.height)
			)
			this.canvas = document.createElement('canvas')
			this.canvas.width = this.#width
			this.canvas.height = this.#height
			this.#resultCtx = /** @type {CanvasRenderingContext2D}*/ (this.canvas.getContext('2d'))

			this.update()
		}

		update() {
			const frames = [
				this.#filterCanvas ? this.#glCanvasTo2dCanvas(this.#filterCanvas) : this.#rendererCanvas,
			]
			if (this.#dialogCanvas.style.display !== 'none') frames.push(this.#dialogCanvas)
			if (this.#promptCanvas.style.display !== 'none') frames.push(this.#promptCanvas)
			if (this.#messageCanvas.style.display !== 'none') frames.push(this.#messageCanvas)
			const backgroundColor = getComputedStyle(document.body, null).getPropertyValue(
				'background-color'
			)
			this.#resultCtx.imageSmoothingEnabled = false
			this.#resultCtx.fillStyle = backgroundColor
			this.#resultCtx.fillRect(0, 0, this.#width, this.#height)
			frames.forEach((el) => this.#resultCtx?.drawImage(el, 0, 0, this.#width, this.#height))
		}

		/**
		 * @param filename{string}
		 */
		save(filename) {
			const dataURL = this.canvas.toDataURL('image/png')
			const link = document.createElement('a')
			link.href = dataURL
			link.download = filename + '.png'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}

		/**
		 * @param canvas {HTMLCanvasElement}
		 * */
		#glCanvasTo2dCanvas(canvas) {
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
	}

	class CanvasRecorder {
		/**@type {MediaRecorder} */
		#mediaRecorder
		/**@type {Blob[]}*/
		#chunks = []

		/**@type {string}*/
		#mimeType

		/**
		 * @param canvas {HTMLCanvasElement}
		 */
		constructor(canvas) {
			this.#mimeType =
				[
					'video/webm',
					'video/webm,codecs=vp9',
					'video/vp8',
					'video/webm\;codecs=vp8',
					'video/webm\;codecs=daala',
					'video/webm\;codecs=h264',
					'video/mpeg',
				].find((el) => MediaRecorder.isTypeSupported(el)) ?? ''

			const stream = canvas.captureStream(TIMEBETWEENFRAMES)
			this.#mediaRecorder = new MediaRecorder(stream, {
				mimeType: this.#mimeType,
			})

			this.#mediaRecorder.ondataavailable = (e) => {
				this.#chunks.push(e.data)
			}
		}

		start() {
			this.#chunks = []
			this.#mediaRecorder.start(100)
		}

		stop() {
			this.#mediaRecorder.stop()
		}

		/**
		 * @param filename {string}
		 */
		save(filename) {
			const blob = new Blob(this.#chunks, { type: this.#mimeType })
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.style.display = 'none'
			link.href = url
			link.download = filename + '.webm'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}
	}

	onload = () => {
		/**@type {GameCopy} */
		let copy
		/**@type {CanvasRecorder} */
		let recorder

		let lastFrame = 0
		let frameRequest = 0
		/**@type {(now:number)=>void}*/
		const loop = (now) => {
			if (now - lastFrame > TIMEBETWEENFRAMES) {
				if (!copy) copy = new GameCopy()
				lastFrame = now
				copy.update()
			}
			frameRequest = requestAnimationFrame(loop)
		}

		addEventListener('message', (e) => {
			if (e.ports[0]) {
				port = e.ports[0]
				port.onmessage = (e) => handleMessage(e)
			}
		})

		messageListeners.set('screenshot', (e) => {
			if (!copy) copy = new GameCopy()
			copy.update()
			copy.save(e.data.filename)
		})
		messageListeners.set('start-record', (e) => {
			if (!copy) copy = new GameCopy()
			if (!recorder) recorder = new CanvasRecorder(copy.canvas)
			copy.update()
			requestAnimationFrame(loop)
			recorder.start()
			port.postMessage({ type: 'start-record' })
		})
		messageListeners.set('stop-record', (e) => {
			if (!copy) copy = new GameCopy()
			if (!recorder) recorder = new CanvasRecorder(copy.canvas)
			cancelAnimationFrame(frameRequest)
			recorder.stop()
			port.postMessage({ type: 'stop-record' })
			recorder.save(e.data.filename)
		})
	}
})()
