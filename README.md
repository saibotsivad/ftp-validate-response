# ftp-validate-response

Given some FTP server response string, check if it conforms to the RFC specs.

You can use it as a synchronous function, like this:

	var validator = require('ftp-validate-response')
	assertTrue(validator('220 Everything is fine'))

Or as an async function, like this:

	var validator = require('ftp-validate-response')
	validator('220 Everything is fine', function(valid) {
		assertTrue(valid)
	})

## License

Published under the [VOL](http://veryopenlicense.com).

	Very Open License (VOL)

	The contributor(s) to this creative work voluntarily grant permission
	to any individual(s) or entities of any kind
	- to use the creative work in any manner,
	- to modify the creative work without restriction,
	- to sell the creative work or derivatives thereof for profit, and
	- to release modifications of the creative work in part or whole under any license
	with no requirement for compensation or recognition of any kind.
