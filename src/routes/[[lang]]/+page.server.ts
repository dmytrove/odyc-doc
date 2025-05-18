import { languagesUrl } from '$lib'
import type { EntryGenerator } from './$types'

export const entries: EntryGenerator = () => languagesUrl.map((el) => ({ lang: el }))
