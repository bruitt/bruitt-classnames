var assert = require('assert');
var sx = require('./');

describe('sx', function() {

  var classes = {
    'Button': 'ns-Button-Button',
    'span': 'ns-Button-span',
    '-flat': 'ns-Button--flat',
    '-size-xl': 'ns-Button--size-xl',
    '_size__m': 'ns-Button--size-m'
  };

  it('should return empty string', function() {
    assert.equal(sx(), '');
    assert.equal(sx.call(classes), '');
  });

  it('should return block name', function() {
    assert.equal(sx.call(classes, 'Button'), classes['Button']);
  });

  it('should return modifiers', function() {
    assert.equal(sx.call(classes, { flat: true }), classes['-flat']);
    assert.equal(sx.call(classes, { flat: true, size: 'xl', unknown: 'is' }), classes['-flat'] + ' ' + classes['-size-xl']);
    assert.equal(sx.call(classes, { flat: true }, { size: 'xl' }, { unknown: 'is' }), classes['-flat'] + ' ' + classes['-size-xl']);
  });

  it('supports a string of class names', function() {
    assert.equal(sx.call(classes, 'Button', 'span', 'unknwn'), classes['Button'] + ' ' + classes['span']);
    assert.equal(sx.call(classes, 'span'), classes['span']);
    assert.equal(sx.call(classes, 'Button', 'span unknw'), classes['Button'] + ' ' + classes['span']);
  });

  it('supports an array of class names', function() {
    assert.equal(sx.call(classes, ['Button']), classes['Button']);
    assert.equal(sx.call(classes, ['Button'], ['span', 'unknwn']), classes['Button'] + ' ' + classes['span']);
  });

  it('should ignore, except for valid objects', function() {
    assert.equal(sx.call(classes, null, undefined, 1, 0, true, false, '', { size: 'xl' }, 'a', ['span', 'c']), classes['-size-xl'] + ' ' + classes['span']);
  });

  it('should be trimmed', function() {
    assert.equal(sx.call(classes, '', ' Button  ', '  span', [' ']), classes['Button'] + ' ' + classes['span']);
  });

  it('should dedupe', function() {
    assert.equal(sx.call(classes, 'Button', 'span', 'Button', 'span'), classes['Button'] + ' ' + classes['span']);
  });

  it('should be custom prefixes', function() {
    sx.settings.prefix = '_';
    sx.settings.separator = '__';
    assert.equal(sx.call(classes, { size: 'm' }), classes['_size__m']);
  });

});
