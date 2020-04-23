var assert = require("assert")
var sx = require("./dist/classnames")

describe("sx", function () {
  var classes = {
    Button: "ns_Button_Button",
    span: "ns_Button_span",
    _flat: "ns_Button__flat",
    "_size-xl": "ns_Button__size-xl",
    _size__m: "ns_Button__size__m",
  }

  it("should return empty string", function () {
    assert.equal(sx(), "")
    assert.equal(sx(classes), "")
    assert.equal(sx(classes, { flat: false }), "")
  })

  it("should return block name", function () {
    assert.equal(sx(classes, "Button"), classes["Button"])
  })

  it("should return modifiers", function () {
    assert.equal(sx(classes, { flat: true }), classes["_flat"])
    assert.equal(
      sx(classes, { flat: true, size: "xl", unknown: "is" }),
      classes["_flat"] + " " + classes["_size-xl"],
    )
    assert.equal(
      sx(classes, { flat: true }, { size: "xl" }, { unknown: "is" }),
      classes["_flat"] + " " + classes["_size-xl"],
    )
  })

  it("supports a string of class names", function () {
    assert.equal(
      sx(classes, "Button", "span", "unknwn"),
      classes["Button"] + " " + classes["span"] + " unknwn",
    )
    assert.equal(sx(classes, "span"), classes["span"])
    assert.equal(
      sx(classes, "Button", "span unknwn"),
      classes["Button"] + " " + classes["span"] + " unknwn",
    )
  })

  it("supports an array of class names", function () {
    assert.equal(sx(classes, ["Button"]), classes["Button"])
    assert.equal(
      sx(classes, ["Button"], ["span", "unknwn"]),
      classes["Button"] + " " + classes["span"] + " unknwn",
    )
  })

  it("should ignore, except for valid objects", function () {
    assert.equal(
      sx(classes, null, undefined, 1, 0, true, false, "", { size: "xl" }, "a", [
        "span",
        "c",
      ]),
      classes["_size-xl"] + " a " + classes["span"] + " c",
    )
  })

  it("should be trimmed", function () {
    assert.equal(
      sx(classes, "", " Button  ", "  span", [" "]),
      classes["Button"] + " " + classes["span"],
    )
  })

  it("should dedupe", function () {
    assert.equal(
      sx(classes, "Button", "span", "Button", "span"),
      classes["Button"] + " " + classes["span"],
    )
  })

  it("should be custom prefixes", function () {
    sx.settings.prefix = "_"
    sx.settings.separator = "__"
    assert.equal(sx(classes, { size: "m" }), classes["_size__m"])
  })
})
