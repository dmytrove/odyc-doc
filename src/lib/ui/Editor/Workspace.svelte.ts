import { debounce } from '$lib/functions'
import { acceptCompletion, autocompletion } from '@codemirror/autocomplete'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { linter } from '@codemirror/lint'
import { Compartment, EditorState, type Extension } from '@codemirror/state'
import { EditorView, hoverTooltip, keymap, ViewUpdate } from '@codemirror/view'
import { vim } from '@replit/codemirror-vim'
import { basicSetup } from 'codemirror'
import { customTheme } from './theme'
import { TsServer } from './TsServer'

const vimMode = new Compartment()

const extensions: Extension[] = [
	basicSetup,
	javascript(),
	EditorState.tabSize.of(2),
	customTheme,
	vimMode.of([])
]

type Props = {
	defaultCode?: string
	container: HTMLElement
	onChange: (value: string) => void
}

export class Workspace {
	#editorView: EditorView
	#editorState: EditorState
	#onCodeChange: (value: string) => void
	#tsServer: TsServer

	constructor({ defaultCode, container, onChange }: Props) {
		this.#onCodeChange = debounce(onChange, 200)
		this.#tsServer = new TsServer()

		this.#editorState = EditorState.create({
			doc: defaultCode ?? '',
			extensions: [
				...extensions,
				linter(
					async () => {
						return await this.#tsServer.lint()
					},
					{ delay: 0 }
				),
				autocompletion({
					activateOnTyping: true,
					override: [this.#tsServer.autocomplete],
					defaultKeymap: true
				}),
				// hoverTooltip(
				// 	async (_, pos) => {
				// 		return await this.#tsServer.hoverTooltip(pos)
				// 	},
				// 	{ hideOnChange: true }
				// ),
				keymap.of([...defaultKeymap, { key: 'Tab', run: acceptCompletion }, indentWithTab]),
				EditorView.updateListener.of(this.#handleChange)
			]
		})

		this.#editorView = new EditorView({
			state: this.#editorState,
			parent: container
		})
	}

	#handleChange = (view: ViewUpdate) => {
		const code = view.state.doc.toString()
		this.#tsServer.update(code)
		if (view.docChanged) this.#onCodeChange(code)
	}

	toggleVim(value: boolean) {
		const ext = value ? vim() : []
		this.#editorView.dispatch({
			effects: vimMode.reconfigure(ext)
		})
	}

	updateCode(newCode: string) {
		if (newCode === this.#editorView.state.doc.toString()) return
		this.#editorView.dispatch({
			changes: {
				from: 0,
				to: this.#editorView.state.doc.length,
				insert: newCode
			}
		})
	}
}
