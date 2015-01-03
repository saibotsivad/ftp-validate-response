var test = require('tape')
var validator = require('../')

var validResponseStrings = [
	[ // #1
		'220-word\r\n more words\r\n220 final',
		'multi-line strings are separated by carriage return and newline'
	],[ // #2
		'220 single line',
		'single line responses start with a set of numbers and a space'
	],[ // #3
		/*
		RFC 959 states:
			> An FTP reply consists of a three digit number (transmitted as
			> three alphanumeric characters) followed by some text.
		In addition, it states:
			> A reply is defined to contain the 3-digit code, followed by Space <SP>
		Therefore, strictly speaking, this test string is valid. However, the RFC
		requires that a space follow the digits.
		In addition, the RFC states:
			> It is intended that the three digits contain enough encoded
			> information that the user-process (the User-PI) will not need
			> to examine the text
		Therefore, a properly implemented server *may* respond with a
		message like the following:
		*/
		'220 ',
		'a string containing only the status code followed by a space is valid'
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
		'220',
		'a status code must be followed by a space, see valid string #3 for explanation'
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
