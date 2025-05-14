import { js_beautify } from 'js-beautify';

export function formatJs(code: string) {
	const options = { indent_size: 2, space_in_empty_paren: true };
	return js_beautify(code, {
		indent_size: 2,
		space_in_empty_paren: true,
		preserve_newlines: true,
		max_preserve_newlines: 2
	});
}

/* OUTPUT
{
  "completed": false,
  "id": 1,
  "title": "delectus aut autem",
  "userId": 1,
}
*/
