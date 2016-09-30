import test from 'ava';
import m from './';

const os = {tmpdir: m};

test(t => {
	// https://github.com/nodejs/node/blob/3e7a14381497a3b73dda68d05b5130563cdab420/test/parallel/test-os.js#L6-L38
	process.env.TMPDIR = '/tmpdir';
	process.env.TMP = '/tmp';
	process.env.TEMP = '/temp';

	if (process.platform === 'win32') {
		t.is(os.tmpdir(), '/temp');
		process.env.TEMP = '';
		t.is(os.tmpdir(), '/tmp');
		process.env.TMP = '';
		const expected = (process.env.SystemRoot || process.env.windir) + '\\temp';
		t.is(os.tmpdir(), expected);
		process.env.TEMP = '\\temp\\';
		t.is(os.tmpdir(), '\\temp');
		process.env.TEMP = '\\tmpdir/';
		t.is(os.tmpdir(), '\\tmpdir/');
		process.env.TEMP = '\\';
		t.is(os.tmpdir(), '\\');
		process.env.TEMP = 'C:\\';
		t.is(os.tmpdir(), 'C:\\');
	} else {
		t.is(os.tmpdir(), '/tmpdir');
		process.env.TMPDIR = '';
		t.is(os.tmpdir(), '/tmp');
		process.env.TMP = '';
		t.is(os.tmpdir(), '/temp');
		process.env.TEMP = '';
		t.is(os.tmpdir(), '/tmp');
		process.env.TMPDIR = '/tmpdir/';
		t.is(os.tmpdir(), '/tmpdir');
		process.env.TMPDIR = '/tmpdir\\';
		t.is(os.tmpdir(), '/tmpdir\\');
		process.env.TMPDIR = '/';
		t.is(os.tmpdir(), '/');
	}
});
