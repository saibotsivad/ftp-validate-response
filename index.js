var endOfLineSequence = '\r\n' // https://tools.ietf.org/html/rfc959#page-4

module.exports = function ftpValidateResponse(string, callback) {
	var isStringValid = true

	if (!string || typeof string !== 'string' || string.length <= 0) {
		isStringValid = false
	} else if (string.length - string.lastIndexOf('\r\n') !== 2) {
		// the very end of the string must be the "end of sequence" characters
		isStringValid = false
	} else {
		var lines = string.slice(0, -2).split(endOfLineSequence)

		// although not explicitly stated in RFC-959, inserting new line
		// or carriage return characters is poor practice, and should
		// not be tolerated
		var linesWithOnlyAllowedCharacters = lines.filter(function(line) {
			return line.indexOf('\r') < 0 && line.indexOf('\n') < 0
		})
		isStringValid = isStringValid && linesWithOnlyAllowedCharacters.length === lines.length

		if (lines.length > 1) {
			// the first line of a multiline must contain a hyphen immediately after the number
			isStringValid = isStringValid && /^\d+-/.test(lines[0])
		} else {
			// single line strings must start with digits, immediately followed by a space
			isStringValid = isStringValid && /^\d+\s/.test(lines[0])
		}

	}

	if (callback && typeof callback === 'function') {
		callback(isStringValid)
	} else {
		return isStringValid
	}
}
