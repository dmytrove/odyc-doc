import screenshots from './screenshot.js?raw'
import odyc from 'odyc/dist/index.global.js?raw'
import handleErrorScript from './handleErrors?raw'
export const buildGame = (code: string, debug = true) => /* html */ `
<html>
<head>
<meta charset="utf-8" />
${
	debug
		? `
<style>
.odyc_wrapper:focus-within{
  outline: 1px solid blue;
}
</style>`
		: ''
}
</head>
<body>
  <div id="app"></div>
  ${
		debug
			? `
    <script>
${handleErrorScript}
  </script>`
			: ''
	}
  <script>
${odyc}
const {createGame, createSound} = odyc
//startofthegame
${code}
//endofthegame
 ${debug ? screenshots : ''}
  </script>
</body>
</html>
`

export const parseCode = (code: string) => {
	return code.match(/(?<=\/\/startofthegame\n)((.|\n)*)(?=\n\/\/endofthegame)/gm)
}

export function updateIframe(code: string, iframe: HTMLIFrameElement): void {
	const source = buildGame(code)
	iframe.srcdoc = source
}
