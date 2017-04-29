# hyperify

[![Build Status][0]][1]
[![Standard - JavaScript Style Guide][2]][3]

> Browserify transform for [hyperHTML][hyper] templates :zap:

Credit for the idea behind this module goes to [@WebReflection][WebReflection] for outlining a similar approach with https://github.com/WebReflection/viperHTML#handy-patterns. :+1:

## Example

index.js
```js
var hyperHTML = require('hyperhtml')
var template = require('./template.html')
var render = hyperHTML.bind(document.body)

template(render, {
  text: "Hello world!"
})
```

template.html
```html
<div>
  ${data.text}
</div>
```

The template compiles down to effectively the following function:

```js
function (render, data) {
  return render`<div>
    ${data.text}
  </div>`
}
```

## Usage

Install `hyperify` via [npm][npm]:

```sh
npm install hyperify -D
```

or [yarn][yarn]:

```sh
yarn add hyperify -D
```

Then add `hyperify` to your list of `browserify` transforms:

```sh
browserify -t hyperify index.js > bundle.js
```

## Options

 - **ext** - Define which file extension to apply the transform to. *Default: `'.html'`*
 - **args** - Define which arguments the template function should be called with. *Default: `['render', 'data']`*

## License

MIT

[0]: https://travis-ci.org/joshgillies/hyperify.svg?branch=master
[1]: https://travis-ci.org/joshgillies/hyperify
[2]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[3]: http://standardjs.com/
[npm]: https://npmjs.com
[yarn]: https://yarnpkg.com/
[hyper]: https://github.com/WebReflection/hyperHTML
[WebReflection]: https://github.com/WebReflection
