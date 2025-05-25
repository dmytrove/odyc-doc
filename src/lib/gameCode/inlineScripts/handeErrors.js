window.onerror = (event, source, lineno, colno, error) => {
	if (error?.message && error.name) {
		const div = document.createElement('div')
		div.textContent = error.name + ': ' + error.message
		div.style.setProperty('position', 'absolute')
		div.style.setProperty('bottom', '0')
		div.style.setProperty('left', '0')
		div.style.setProperty('right', '0')
		div.style.setProperty('color', '#e03131')
		div.style.setProperty('background-color', '#fff5f5')
		div.style.setProperty('padding', '.8rem .5rem')
		div.style.setProperty(
			'font-family',
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
		)
		div.style.setProperty('border-top', '1px solid currentColor')
		document.body.append(div)
	}
}
