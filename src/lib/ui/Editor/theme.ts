import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const theme = EditorView.theme(
	{
		'.cm-content': {
			caretColor: 'var(--editor-caret-color)'
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: 'var(--editor-cursor-border-color)'
		},
		'&': {
			color: 'var(--editor-default-text-color)',
			backgroundColor: 'var(--editor-background-editor)'
		},
		'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{
				backgroundColor: 'var(--editor-selection-background-color)'
			},
		'.cm-activeLine': {
			backgroundColor: 'var(--editor-active-line-background)'
		},
		'.cm-gutters': {
			backgroundColor: 'var(--editor-gutter-background)',
			color: 'var(--editor-gutter-text-color)',
			borderColor: 'var(--editor-gutter-border-color)'
		},
		'.cm-activeLineGutter': {
			backgroundColor: 'var(--editor-active-gutter-line-background)'
		}
	},
	{ dark: false }
);

const highlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: 'var(--editor-color-keyword)' },
	{
		tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
		color: 'var(--editor-color-name)'
	},
	{ tag: [t.function(t.variableName), t.labelName], color: 'var(--editor-color-function)' },
	{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: 'var(--editor-color-constant)' },
	{ tag: [t.definition(t.name), t.separator], color: 'var(--editor-color-definition)' },
	{
		tag: [
			t.typeName,
			t.className,
			t.number,
			t.changed,
			t.annotation,
			t.modifier,
			t.self,
			t.namespace
		],
		color: 'var(--editor-color-type-name)'
	},
	{
		tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
		color: 'var(--editor-color-operator)'
	},
	{ tag: [t.meta, t.comment], color: 'var(--editor-color-comment)' },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
	{ tag: t.strikethrough, textDecoration: 'line-through' },
	{ tag: t.link, color: 'var(--editor-color-link)', textDecoration: 'underline' },
	{ tag: t.heading, fontWeight: 'bold', color: 'var(--editor-color-heading)' },
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: 'var(--editor-color-atom)' },
	{ tag: [t.processingInstruction, t.string, t.inserted], color: 'var(--editor-color-string)' },
	{ tag: t.invalid, color: 'var(--editor-color-invalid)' }
]);

export const customTheme = [theme, syntaxHighlighting(highlightStyle)];
