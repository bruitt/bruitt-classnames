import { flatten, type, uniq } from "ramda"

let settings = {
  prefix: "-",
  separator: "-"
}

let is = {};
["String", "Boolean", "Array", "Object", "Number"].forEach(type => {
  is[type] = object => type(object) === type
})

let exclude = array => {
  return array
    .filter(el => is.String(el) && (el.trim() !== ""))
    .map(className => className.trim())
}

let split = className => className.trim().split(/ +/)

let toClassName = names => names.join(" ").trim()

let getModifier = (key, value, prefix, separator) => {
  if (is.String(value) || is.Number(value)) {
    return prefix + key + separator + value
  }
  return prefix + key
}

let getClassNames = (propNames, props, prefix = "", separator = "") => {
  if (is.Object(props)) {
    return Object.keys(props)
      .filter(name => props[name])
      .map(name => propNames[getModifier(name, props[name], prefix, separator)])
  }

  if (is.Array(props)) {
    return props.map(name => propNames[name])
  }

  return []
}

let classnames = (classes, ...args) => {
  if (!classes) {
    return ""
  }

  let {prefix, separator} = setting

  let mapArg = arg => {
    switch (type(arg)) {
      case "String":
        return getClassNames(classes, split(arg), prefix, separator)
      case "Array":
      case "Object":
        return getClassNames(classes, arg, prefix, separator)
      default:
        return null
    }
  }

  let classNames = flatten(args.map(mapArg))
  return toClassName(exclude(uniq(classNames)))
}

classnames.settings = settings

export default classnames
