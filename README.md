# html-attrs-sorter-promisified

Promise-based API to sort html attributes.

## How to install it?

```bash
$ npm install --save-dev html-attrs-sorter-promisified
```

## Dependencies

- [`posthtml`](https://github.com/posthtml/posthtml)
- [`posthtml-attrs-sorter`](https://github.com/mrmlnc/posthtml-attrs-sorter)

## How to use it?

First, things first:

```js
var sorter = require('html-attrs-sorter-promisified');
```

**Single input:**

```js
var htmlString = '<button id="1" disabled class="btn btn-primary" type="button">Search</button>';

sorter.attributesSorting(htmlString).then(result => console.log(result[0]));
// Outputs:
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
```

**Two inputs:**

```js
var htmlString = '<button id="1" disabled class="btn btn-primary" type="button">Search</button>';
var htmlString2 = '<button id="1" type="button" disabled class="btn btn-primary">Search</button>';

sorter.attributesSorting(htmlString, htmlString2).then(result => {
	console.log(result[0]);
	console.log(result[1]);
});
// Outputs:
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
```

**`N` inputs:**

```js
var htmlString = '<button id="1" disabled class="btn btn-primary" type="button">Search</button>';
var htmlString2 = '<button id="1" type="button" disabled class="btn btn-primary">Search</button>';
var htmlString3 = '<button id="1" type="button" class="btn btn-primary" disabled>Search</button>';

sorter.attributesSorting(htmlString, htmlString2, htmlString3).then(result => {
	for (var prop in result) {
	  console.log(result[prop]);
	}
});
// Outputs:
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
```

**Config order:**

Since this module uses `posthtml-attrs-sorter` under to hood, it inherits [its default config object](https://github.com/mrmlnc/posthtml-attrs-sorter#options):

```js
{
  "order": [
    "class", "id", "name",
    "data-.+", "ng-.+", "src",
    "for", "type", "href",
    "values", "title", "alt",
    "role", "aria-.+",
    "$unknown$"
  ]
}
```

It's very simple to override the `order` configuration, though. Check the following example:

```
// Gives "id" and "type" a higher priority
sorter.updateDefaultAttrsSorterOptions({
  "order": [
    "id", "type", "class", "name",
    "data-.+", "ng-.+", "src",
    "for", "href",
    "values", "title", "alt",
    "role", "aria-.+",
    "$unknown$"
  ]
});

var htmlString = '<button id="1" disabled class="btn btn-primary" type="button">Search</button>';
sorter.attributesSorting(htmlString).then(result => console.log(result[0]));
// Outputs:
// '<button id="1" type="button" class="btn btn-primary" disabled>Search</button>'
// Instead of (default behaviour):
// '<button class="btn btn-primary" id="1" type="button" disabled>Search</button>'
```
