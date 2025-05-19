import type { Req, Res } from './worker'

const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })

// 1. Crée le MessageChannel et démarre port2
const { port1, port2 } = new MessageChannel()
worker.postMessage(port1, [port1])

const listeners = new Map<
	number,
	{ resolve: (value: unknown) => void; reject: (err: unknown) => void }
>()

port2.onmessage = ({ data }: MessageEvent<Res>) => {
	const { id, result, error } = data
	console.log(result)
	const handler = listeners.get(id)
	if (!handler) return
	listeners.delete(id)
	error ? handler.reject(error) : handler.resolve(result)
}

let seq = 0
function rpc(req: Req): Promise<unknown> {
	const id = ++seq
	return new Promise((resolve, reject) => {
		listeners.set(id, { resolve, reject })
		port2.postMessage({ id, ...req })
	})
}

console.log(rpc({ type: 'additionner', payload: { a: 0, b: 1 } }))
console.log(rpc({ type: 'soustraire', payload: { a: 2, b: 0 } }))
