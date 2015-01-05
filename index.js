var endOfLineSequence = '\r\n' // https://tools.ietf.org/html/rfc959#page-4

module.exports = function ftpValidateResponse(string) {
	var isStringValid = false

	if (!isValidString(string)) {
		return false
	}

	var lines = string.split(endOfLineSequence).slice(0, -1)

	// although not explicitly stated in RFC-959, inserting new line
	// or carriage return characters is poor practice, and should
	// not be tolerated
	return linesContainNoNewlinesOrCarriageReturns(lines)
			&& (isMultiLineAndStartsWithNumberAndHyphen(lines) || isSingleLineAndStartsWithNumberAndSpace(lines))
}

function isValidString(string) {
	return string // non-zero length
		&& typeof string === 'string'
		&& string.length - string.lastIndexOf('\r\n') === 2 // the very end of the string must be the "end of sequence" characters
}

function linesContainNoNewlinesOrCarriageReturns(lines) {
	return lines.every(function(line) {
		return line.indexOf('\r') < 0 && line.indexOf('\n') < 0
	})
}

function isMultiLineAndStartsWithNumberAndHyphen(lines) {
	return lines.length > 1 && /^\d+-/.test(lines[0])
}

function isSingleLineAndStartsWithNumberAndSpace(lines) {
	return lines.length === 1 && /^\d+\s/.test(lines[0])
}
