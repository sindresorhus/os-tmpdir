'use strict';
var assert = require('assert');
var test = require('ava');
var osTmpdir = require('./');
var os = {tmpdir: osTmpdir};

test(function (t) {
	// https://github.com/nodejs/io.js/blob/3e7a14381497a3b73dda68d05b5130563cdab420/test/parallel/test-os.js#L6-L38
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
		process.env.TEMP = '\\tmpdir/';
		assert.equal(os.tmpdir(), '\\tmpdir/');
		process.env.TEMP = '\\';
		assert.equal(os.tmpdir(), '\\');
		process.env.TEMP = 'C:\\';
		assert.equal(os.tmpdir(), 'C:\\');
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
		process.env.TMPDIR = '/tmpdir\\';
		assert.equal(os.tmpdir(), '/tmpdir\\');
		process.env.TMPDIR = '/';
		assert.equal(os.tmpdir(), '/');
	}

	t.end();
});
