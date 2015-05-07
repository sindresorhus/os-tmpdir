'use strict';
var assert = require('assert');
var test = require('ava');
var osTmpdir = require('./');
var os = {tmpdir: osTmpdir};

test(function (t) {
	// https://github.com/iojs/io.js/blob/9ec3109272d3c82c7ba271f421a2a9ee98940dab/test/parallel/test-os.js#L6-L28
	process.env.TMPDIR = '/tmpdir';
	process.env.TMP = '/tmp';
	process.env.TEMP = '/temp';

	if (process.platform === 'win32') {
		assert.equal(os.tmpdir(), '/temp');
		process.env.TEMP = '';
		assert.equal(os.tmpdir(), '/tmp');
		process.env.TMP = '';
		var expected = (process.env.SystemRoot || process.env.windir) + '\\temp';
		assert.equal(os.tmpdir(), expected);
		process.env.TEMP = '\\temp\\';
		assert.equal(os.tmpdir(), '\\temp');
	} else {
		assert.equal(os.tmpdir(), '/tmpdir');
		process.env.TMPDIR = '';
		assert.equal(os.tmpdir(), '/tmp');
		process.env.TMP = '';
		assert.equal(os.tmpdir(), '/temp');
		process.env.TEMP = '';
		assert.equal(os.tmpdir(), '/tmp');
		process.env.TMPDIR = '/tmpdir/';
		assert.equal(os.tmpdir(), '/tmpdir');
	}

	t.end();
});
