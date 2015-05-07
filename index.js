'use strict';
var isWindows = process.platform === 'win32';

// https://github.com/iojs/io.js/blob/b97b96d05a05429f5eccf1588f183a925fbececa/lib/os.js#L25-L40
module.exports = function () {
	var path;

	if (isWindows) {
		path = process.env.TEMP ||
			process.env.TMP ||
			(process.env.SystemRoot || process.env.windir) + '\\temp';
	} else {
		path = process.env.TMPDIR ||
			process.env.TMP ||
			process.env.TEMP ||
			'/tmp';
	}

	if (/[\\\/]$/.test(path)) {
		path = path.slice(0, -1);
	}

	return path;
};
