var test = require('tape')
var validator = require('../')

var validResponseStrings = [
	[
		'220-word\r\n more words\r\n220 final',
		'multi-line strings are separated by carriage return and newline'
	],[
		'220 single line',
		'single line responses start with a set of numbers and a space'
	]
]

test('all valid response strings are ok', function(t) {
	validResponseStrings.forEach(function(arr) {
		t.ok(validator(arr[0]), arr[1])
	})
	t.end()
})

var invalidResponseStrings = [
	[
		undefined,
		'undefined is not allowed'
	],[
		null,
		'null is not allowed'
	],[
		'',
		'an empty string is not allowed'
	],[
		{},
		'a non-string is not allowed'
	],[
		[],
		'neither is this one'
	],[
		'220-word\r\n more\nwords\r\n220 final',
		'a newline character by itself is not allowed'
	],[
		'220-word\r\n more\rwords\r\n220 final',
		'a carriage return character by itself is not allowed'
	],[
		'220 first\r\n second\r\n 220 third',
		'first line of a multi-line must contain a hypen *immediately* after the number'
	],[
		'220 -first\r\n second\r\n 220 third',
		'first line of a multi-line must contain a hypen *immediately* after the number'
	],[
		'220-single line',
		'single lines must not have a hyphen'
	]
]

test('all invalid response strings are bad', function(t) {
	invalidResponseStrings.forEach(function(arr) {
		t.notOk(validator(arr[0]), arr[1])
	})
	t.end()
})
