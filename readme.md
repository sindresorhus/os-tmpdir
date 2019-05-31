**Deprecated:** This is not needed anymore. `require('os').tmpdir()` in Node.js 4 and up is good.

---

# os-tmpdir [![Build Status](https://travis-ci.org/sindresorhus/os-tmpdir.svg?branch=master)](https://travis-ci.org/sindresorhus/os-tmpdir)

> Node.js [`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir) [ponyfill](https://ponyfill.com)

Use this instead of `require('os').tmpdir()` to get a consistent behavior on different Node.js versions (even 0.8).


## Install

```
$ npm install os-tmpdir
```


## Usage

```js
const osTmpdir = require('os-tmpdir');

osTmpdir();
//=> '/var/folders/m3/5574nnhn0yj488ccryqr7tc80000gn/T'
```


## API

See the [`os.tmpdir()` docs](https://nodejs.org/api/os.html#os_os_tmpdir).


---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-os-tmpdir?utm_source=npm-os-tmpdir&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
