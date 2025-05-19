/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope

export type Req = {
	type: 'additionner' | 'soustraire'
	payload: { a: number; b: number }
}
export type Res = {
	id: number
	result?: number
	error?: string
}

addEventListener('message', (e: MessageEvent) => {
	const port = e.data as MessagePort

	port.onmessage = ({ data }: MessageEvent<Req & { id: number }>) => {
		const { id, type, payload } = data
		let result: number

		switch (type) {
			case 'additionner':
				result = payload.a + payload.b
				setTimeout(() => port.postMessage(<Res>{ id, result }), 500)
				break
			case 'soustraire':
				result = payload.a - payload.b
				setTimeout(() => port.postMessage(<Res>{ id, result }), 100)
				break
		}
	}
})
