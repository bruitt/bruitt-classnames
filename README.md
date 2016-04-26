# suitnames

suitnames is a simple utility to manage CSS modules with SUIT CSS -like naming
conventions on React.

Shamefully based on [bem-classnames](https://github.com/pocotan001/bem-classnames),
which is in turn
inspired by [classnames](https://github.com/JedWatson/classnames).

``` sh
npm install suitnames
```

## Usage

``` js
var styles = require('style.css');
var sx = require('suitnames').bind(styles);

sx('elementSelector')
sx('BlockSelector', this.props)
sx(/* [...props|className] */);
```

**Simple**

Attention: classes would be added only if they are exported from cssmodules
style, otherwise they would be skipped.
Works best with `localIdentName=[name]-[local]`.

``` js
var styles = require('Button.css');
var sx = require('suitnames').bind(styles);

sx('Button', { color: 'green', block: true });  // "Button-Button Button--color-green Button--block"
sx({ disabled: true });  // "Button--disabled"
sx('a b', ['c', 'd']);  // "Button-a Button-b Button-c Button-d"
```

**Custom prefix**

``` js
// Default prefixes:
//
// sx.settings = {
//   prefix: '-',
//   separator: '-'
// };

sx.settings.prefix = '_';
sx.settings.separator = '---';
sx(styles, { flat: true });  // => styles['_flat']
sx(styles, { country: 'gb' });  // => styles['_country---gb']
```
