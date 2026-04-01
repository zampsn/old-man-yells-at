<p align="center"><img src="/static/old-man-yells-at.png" width="128" alt="Old man yells at" /></p>
<h3 align="center">old-man-yells-at</h3>
<p align="center">
<a href="https://npmjs.com/package/old-man-yells-at"><img src="https://badgen.net/npm/v/old-man-yells-at" alt="npm"></a> 
<a href="https://github.com/zampsn/old-man-yells-at/actions"><img src="https://github.com/zampsn/old-man-yells-at/actions/workflows/ci.yaml/badge.svg" alt="workflow status">
<a href="https://codecov.io/gh/zampsn/old-man-yells-at"><img src="https://codecov.io/gh/zampsn/old-man-yells-at/graph/badge.svg?token=ACgVjXxFeS" alt="code coverage"/></a></a>
</p>

---

You've got an opinion. A strong one. About something that probably doesn't deserve this much energy. old-man-yells-at is a TypeScript package that turns that frustration into art — specifically, Abe Simpson shaking his fist at whatever you point it at. Pass in a target, get back a meme. Simple as that.

## Getting Started

### Install

```sh
npm install old-man-yells-at@v1
```

### Usage

```ts
import { yellAt } from 'old-man-yells-at';

// create a meme and save it to a file
const builder = await yellAt('path/to/target.png');
await builder.toFile('output.png');

// customize the output size
await yellAt('path/to/target.png')
  .then((b) => b.resize(256, 256).toFile('output.png'));

// get the result as a buffer
const buffer = await (await yellAt('path/to/target.png')).toBuffer();

// get the result as a sharp instance for further processing
const sharpInstance = await (await yellAt('path/to/target.png')).toSharp();
```