// Libraries
import Parser from "simple-text-parser"
import formatter from "voca"

const parser = new Parser();

// A function for adding keys through a parser
//
// @param matcher -> String or regular expression for matching phrase
// @param key -> A key or set of keys to be pressed
// @param event -> An event type of press, hold, release

const addKey = (matcher, key, event) => {
  parser.addRule(matcher, () => {
    return {type: "key", value: key, event: event}
  })
}

// Trigger the parse
const parse = (data) => {
  let parsedData = parser.toTree(data.text)
  return parsedData
}

module.exports = {
  parse: parse,
  addKey: addKey,
  addFormat: addFormat
}
