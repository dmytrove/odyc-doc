import { defaultLang, languages, ui } from './config'

export type Lang = keyof typeof languages

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/')
	if (lang in languages) return lang as keyof typeof ui
	return defaultLang
}

export function makeLocaleUrl(path: string, lang: keyof typeof ui) {
	if (!path.startsWith('/')) path = '/' + path
	if (lang === defaultLang) return path
	return '/' + lang + path
}

export function useTranslations(lang?: string) {
	const defaultTranslation = ui[defaultLang]
	const currentTranslation = lang && lang in ui ? ui[lang as keyof typeof ui] : defaultTranslation
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		if (key in currentTranslation) return currentTranslation[key]
		return defaultTranslation[key]
	}
}
