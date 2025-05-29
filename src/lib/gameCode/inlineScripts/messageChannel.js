/**@type {Map<string,(e:MessageEvent)=>void>}*/
var messageListeners = new Map()

/**@type MessagePort*/
var port

addEventListener('message', (e) => {
	if (e.ports[0]) {
		port = e.ports[0]
		port.onmessage = (e) => handleMessage(e)
	}
})

/**
 * @param e {MessageEvent}
 */
function handleMessage(e) {
	if (e.data.type && typeof e.data.type === 'string' && messageListeners.has(e.data.type)) {
		//@ts-ignore
		messageListeners.get(e.data.type)(e)
	}
}
