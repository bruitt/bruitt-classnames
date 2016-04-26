(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(); // CommonJS
  } else {
    global.suitnames = factory(); // Globals
  }
}(this, function() {
  'use strict';

  var settings = {
    prefix: '-',
    separator: '-'
  };

  var slice = Array.prototype.slice;
  var toString = Object.prototype.toString;

  function flatten() {
    return [].concat.apply([], this);
  }

  function includes(obj) {
    return (this.indexOf(obj) !== -1);
  }

  /**
   * toType([]) -> 'array'
   *
   * @param {*} object
   * @return {string}
   */
  function toType(object) {
    return toString.call(object).slice(8, -1).toLowerCase();
  }

  /**
   * is.array([]) -> true
   *
   * @param {*} object
   * @return {string}
   */
  var is = {};
  ['string', 'boolean', 'array', 'object', 'number'].forEach(function(type) {
    is[type] = function(object) {
      return toType(object) === type;
    };
  });

  /**
   * uniq(['a', 'b', 'a', 'b']) -> ['a', 'b']
   *
   * @param {Array} array
   * @return {Array}
   */
  function uniq(array) {
    return array.filter(function(el, i) {
      return array.indexOf(el) === i;
    });
  }

  /**
   * exclude([null, undefined, 1, 0, true, false, '', 'a', ' b  ']) -> ['a', 'b']
   *
   * @param {Array} array
   * @return {string[]}
   */
  function exclude(array) {
    return array
      .filter(function(el) {
        return is.string(el) && el.trim() !== '';
      })
      .map(function(className) {
        return className.trim();
      });
  }

  /**
   * split(' a  b  ') -> ['a', 'b']
   *
   * @param {string} className
   * @return {string[]}
   */
  function split(className) {
    return className.trim().split(/ +/);
  }

  /**
   * toClassName(['a', 'b']) -> 'a b'
   *
   * @param {string[]} names
   * @return {string}
   */
  function toClassName(names) {
    return names.join(' ').trim();
  }

  function getModifier(key, value, prefix, separator) {
    if (is.string(value) || is.number(value)) {
      return prefix + key + separator + value;
    }
    return prefix + key;
  }

  /**
   * getClassNamesByProps(['a'], { a: 'foo' }, '-', '-') -> [ '-a-foo' ]
   *
   * @param {string[]} propNames
   * @param {Object|Array} props
   * @param {string} [prefix]
   * @return {string[]}
   */
  function getClassNamesByProps(propNames, props, prefix, separator) {
    prefix = prefix || '';
    separator = separator || '';

    if (is.object(props)) {
      return  Object.keys(props)
        .map(function(name) {
          return propNames[getModifier(name, props[name], prefix, separator)];
        });
    }

    if (is.array(props)) {
      return props
        .map(function(name) {
          return propNames[name];
        });
    }

    return [];
  }

  /**
   * @context {Object} classes
   * @param {...Object|string} [props|className]
   * @return {string}
   */
  function suitnames(/* , [...props|className] */) {
    var classes = this;
    if (!classes) {
      return '';
    }

    var prefix = '-';
    var separator = '-';

    var args = slice.call(arguments);
    var classNames = flatten.call(args.map(function (arg) {
      switch (toType(arg)) {
        case 'string':
          return getClassNamesByProps(classes, split(arg), settings.prefix, settings.separator);
        case 'array':
        case 'object':
          return getClassNamesByProps(classes, arg, settings.prefix, settings.separator);
        default:
          break;
      };
    }));

    return toClassName(exclude(uniq(classNames)));
  }

  suitnames.settings = settings;

  return suitnames;
}));
