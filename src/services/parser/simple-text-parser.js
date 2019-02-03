// Libraries
import Parser from "simple-text-parser"
const parser = new Parser();

// A function for adding keys through a parser
//
// @param matcher -> String or regular expression for matching phrase
// @param key -> A key or set of keys to be pressed
// @param event -> An event type of press, hold, release

const addKey = (matcher, type, value, modifier, event) => {
  parser.addRule(matcher, () => {
    return {type: type, value: value, event: event, modifier: modifier}
  })
}

// Trigger the parse
const parse = (data) => {
  let parsedData = parser.toTree(data.text.toLowerCase())
  return { actions: parsedData, complete: data.complete }
}

module.exports = {
  parse: parse,
  addKey: addKey
}
